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
    //fetch("https://todoapp-react-drf.herokuapp.com/api/task-list/")
    fetch("http://127.0.0.1:8000/api/task-list/")
      .then(response => response.json())
      .then(data =>
        //console.log("Data: ", data)
        this.setState({
          todoList: data
        })
      )
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    // console.log("Name: ", name);
    // console.log("Value: ", value);
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

    // var url = "https://todoapp-react-drf.herokuapp.com/api/task-create";
    var url = 'http://127.0.0.1:8000/api/task-create/'
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

  render() {
    let tasks = this.state.todoList;
    return (
      <div className="container">

        <div id="task-container">
          <div id="form-wrapper">
            <form id="form" onSubmit={this.handleSubmit}>
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input onChange={this.handleChange} className="from-control" id="title" value={this.state.activeItem.title} type="text" name="title" placeholder="Enter a task..." />
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
                  <div style={{ flex: 7 }}>
                    <span>{task.title}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <button className="btn btn-sm btn-outline-info">Edit </button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <button className="btn btn-sm btn-outline-dark delete">-</button>
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

