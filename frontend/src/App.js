import React from 'react';
import './App.css';

export class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: "",
        completed: false,
      },
      editing: false,
    }
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);

    this.startEdit = this.startEdit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.strikeUnstrike = this.strikeUnstrike.bind(this);

  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks() {
    console.log('fetching........')
    //TODO: change this to the heroku address before uploading
    fetch("https://todoapp-react-drf.herokuapp.com/api/task-list/")
    //fetch("http://127.0.0.1:8000/api/task-list/")
      .then(response => response.json())
      .then(data =>
        //console.log("Data: ", data)
        this.setState({
          todoList: data
        })
      )
  }

  deleteItem(task) {
    var csrftoken = this.getCookie('csrftoken')
    fetch(`https://todoapp-react-drf.herokuapp.com/api/task-delete/${task.id}/`, {
    // fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    }).then((response) => {

      this.fetchTasks()
    })
  }

  handleChange(e) {
    //eslint-disable-next-line
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: value,
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    var csrftoken = this.getCookie('csrftoken');

    var url = "https://todoapp-react-drf.herokuapp.com/api/task-create/";
    // var url = 'http://127.0.0.1:8000/api/task-create/'

    if (this.state.editing) {
      url = `https://todoapp-react-drf.herokuapp.com/api/task-update/${this.state.activeItem.id}/`
      // url = `http://127.0.0.1:8000/api/task-update/${this.state.activeItem.id}/`
      this.setState({
        editing: false,
      })
    }


    // Make POST request to our backend
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(this.state.activeItem)
    }).then((response) => {
      this.fetchTasks()
      this.setState({
        activeItem: {
          id: null,
          title: "",
          completed: false
        }
      })
    }).catch(function (error) {
      console.log("Error: ", error);
    })
  }


  startEdit(task) {
    this.setState({
      activeItem: task,
      editing: true,
    })
  }

  strikeUnstrike(task){

    task.completed = !task.completed;
    var csrftoken = this.getCookie('csrftoken');

    var url = `https://todoapp-react-drf.herokuapp.com/api/task-update/${task.id}/`
    //var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`

      fetch(url, {
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'completed': task.completed, 'title':task.title})
      }).then(() => {
        this.fetchTasks();
      })
    console.log("Task completed? ", task.completed);
  }

  render() {
    var tasks = this.state.todoList;
    var self = this;
    return (
      <div className="container">

        <div id="task-container">
          <div id="form-wrapper">
            <form id="form" onSubmit={this.handleSubmit}>
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input onChange={this.handleChange} className="from-control" id="title" value={this.state.activeItem.title} type="text" name="title" placeholder="Enter a task..." required />
                </div>

                <div style={{ flex: 1 }}>
                  <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                </div>

              </div>
            </form>
          </div>

          <div id="list-wrapper">
            {tasks.map((task, index) => {
              return (
                <div key={index} className="task-wrapper flex-wrapper">

                  <div onClick={() => self.strikeUnstrike(task)} style={{ flex: 7 }}>
                    {!task.completed ? (
                      <span>{task.title}</span>
                    ) : (
                      <span><strike>{task.title}</strike></span>
                    )}
                    
                  </div>
                  <div style={{ flex: 1 }}>
                    <button onClick={() => self.startEdit(task)} className="btn btn-sm btn-outline-info">Edit</button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <button onClick={() => self.deleteItem(task)} className="btn btn-sm btn-outline-dark delete">-</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default App

