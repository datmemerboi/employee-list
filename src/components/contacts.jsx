import React from 'react';

export default function Contacts(props) {
  const handleChoice = (event) => {
      var type = event.currentTarget.value;
      props.onChoice( props.id, type )
  }
  const handleInput = (event) => {
    var val = parseInt(event.target.value);
    props.onChange( props.id, val )
  }
  return(
    <div className="columns">
      <div className="column is-half">
        <div className="select is-rounded">
          <select className="input" onClick={handleChoice}>
            <option value="Primary">Primary</option>
            <option value="Emergency">Emergency</option>
            <option value="Office">Office Extension</option>
            <option value="Home">Home</option>
          </select>
        </div>
      </div>
      <div className="column is-half">
        <input
          type='tel'
          className="input"
          pattern="([1-9]{1}[0-9]{9}|[1-9]{1}[0-9]{7}|[1-9]{1}[0-9]+)"
          onInput={handleInput}/>
      </div>
    </div>
  );
}
