import React from 'react';

export default function Skills(props) {
  const handleInput = (event)=>{
    var val = event.target.value;
    props.onChange( props.id, val);
  };
  return(
    <div className="columns">
      <div className="column is-half">
        <input className="input" type='text' onInput={ handleInput } />
      </div>
    </div>
  );
}
