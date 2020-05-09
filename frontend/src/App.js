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
    this.fetchTasks = this.fetchTasks.bind(this)
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

  render() {
    let tasks = this.state.todoList;
    return (
      <div className="container">

        <div id="task-container">
          <div id="form-wrapper">
            <form id="form">
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input className="from-control" id="title" type="text" name="title" placeholder="Enter a task" />
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

