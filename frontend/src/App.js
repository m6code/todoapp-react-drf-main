import React from 'react';
import './App.css';

function App() {

  constructor(props) {
    super(props)

    this.state = {
      
    }
  }


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
  );
}

export default App;
