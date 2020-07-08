import React from 'react';
import './App.scss';
import Form from './components/form.jsx';
import Display from './components/display.jsx';
import axios from 'axios';

export default function App() {
  const [state, setState] = React.useState({ data:[], displayBool:false })

  const setData = async (doc) => {
    var arr = {...state};
    arr.data.push( doc );
    await setState( arr );
  }

  const sendToFile = async() => {
    await axios.post('/data-to-file', state.data);
  }

  const toggleDisplay = () => {
    console.log( "Inside toggleDisplay" );
    setState(prevState => {
      return {...prevState, displayBool: !(prevState.displayBool) }
    });
  }

  React.useEffect(()=>{
    alert("Click 'Write to File' before 'Download File'");
  }, []);
  
  return(
    <div className="App">
      <div className="container">
        <div className="left-container">
          <h2>Input employee details</h2>
          <Form handleSubmit={setData}/>
        </div>
        <div className="right-container">
          <h2>View employee list</h2>
          <Display data={state.data} displayBool={state.displayBool}/>
          <br/>
          <button className="button is-link" onClick={toggleDisplay}>
            {state.displayBool===false?"Display List":"Close display"}
          </button>
          <div className="columns btn-container">
          <div className="column">
            <button className="button is-warning" onClick={sendToFile}>Write to File</button>
          </div>
          <div className="column">
            <a href='./data/data.json' className="button is-link" download="Data.json">Download File</a>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
