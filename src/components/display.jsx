import React from 'react';

export default function Display(props){
  var content = props.data.map( (emp, index)=>{
    var contactContent = emp.Contacts.map( (doc, index)=>(
      <div key={index} className="slight-padding"><span>{doc.type} - {doc.number}</span></div>
    ));

    var skillsContent = emp.Skills.map((item, index)=>{
      if(index === emp.Skills.length-1) { return( <span key={index}>{item}</span> ) }
      else { return( <span key={index}>{item},</span> ) }
    });

    return(
      <div key={index} className="card">
        <h4>Employee #{index+1}</h4>
        <hr/>
        <p><strong>Name:</strong> { JSON.parse(JSON.stringify(emp.Name)) }</p>
        <p><strong>Designation:</strong> { JSON.parse(JSON.stringify(emp.Designation)) }</p>
        <label><strong>Contacts:</strong></label>{contactContent}
        <p><strong>Skills:</strong>  {skillsContent}</p>
        <p><strong>DOB:</strong> { JSON.parse(JSON.stringify(emp.DOB)) }</p>
      </div>
    );
  });
  if(props.displayBool===true)
    return(<React.Fragment> {content} </React.Fragment>)
  else
    return null;
}
