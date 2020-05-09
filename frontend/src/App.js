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

  componentDidMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('fetching........')
    fetch("http://127.0.0.1:8000/api/task-list/")
    .then(response => response.json())
    .then(data => 
      console.log("Data: ", data)
      )
  }
  


  render() {
    return (
      <div className="container">

        <div className="task-container">
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

          </div>
        </div>
      </div>
    )
  }
}

export default App

