import React from 'react';
import Skills from './skills.jsx';
import Contacts from './contacts.jsx';

export default class Form extends React.Component {
  constructor(props){
    super(props);
    this.nullState = {
      skillID: ['skill1'],
      skills: {'skill1':null},
      name:null,
      designation:null,
      dob:null,
      contactID:['contact1'],
      contacts:{'contact1':{'type':"Primary", 'number':0}},
    };
    this.state = this.nullState;
  }
  nameHandler = (event) => {
    this.setState({name:event.target.value})
  }
  desigHandler = (event) => {
    this.setState({designation:event.target.value})
  }
  dobHandler = (event) => {
    this.setState({dob:event.target.value})
  }
  anotherSkill = () => {
    var i = "skill"+( this.state.skillID.length + 1 ).toString()
    var updArr = JSON.parse( JSON.stringify( this.state.skillID ) ); updArr.push( i )
    var updDic = JSON.parse( JSON.stringify( this.state.skills ) ); updDic[i]=null;
    this.setState({ skillID: updArr, skills:updDic })
  }
  anotherContact = () => {
    if(this.state.contactID.length < 4){
      var i = "contact"+( this.state.contactID.length + 1 ).toString()
      var updArr = JSON.parse( JSON.stringify( this.state.contactID ) ); updArr.push( i )
      var updDic = JSON.parse( JSON.stringify( this.state.contacts ) ); updDic[i] = {};
      updDic[i].type="Primary"; updDic[i].number=0;
      this.setState({ contactID: updArr, contacts: updDic })
    }
  }
  handleSkillInput = (id, val) => {
    var updDic = JSON.parse( JSON.stringify( this.state.skills ) ); updDic[id]=val;
    this.setState({ skills: updDic })
  }
  handleChoice = (id, type) => {
    var updDic = JSON.parse( JSON.stringify( this.state.contacts ) ); updDic[id].type=type;
    this.setState({ contacts: updDic })
  }
  handleContactInput = (id, num) => {
    var updDic = JSON.parse( JSON.stringify( this.state.contacts ) ); updDic[id].number=num;
    this.setState({ contacts: updDic })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    var doc = {
      Name: this.state.name,
      Designation: this.state.designation,
      Contacts: Object.values( this.state.contacts ),
      Skills: Object.values( this.state.skills ),
      DOB: this.state.dob
    }
    this.props.handleSubmit( doc )
    console.log( this.state );
    this.formRef.reset();
  }
  render() {
    var contactComp = this.state.contactID.map( (value, index)=>(
      <div key={index}><Contacts id={value} onChange={this.handleContactInput} onChoice={this.handleChoice}/></div>
    ));
    var skillsComp = this.state.skillID.map( (value, index)=>(
      <div key={index}><Skills id={value} onChange={this.handleSkillInput} /></div>
    ));
    return(
      <React.Fragment>
        <form className="form" onSubmit={this.handleSubmit} ref={(element) => this.formRef = element}>
          <div>
            <label>Name:</label>
            <input className="input" type='text' onInput={this.nameHandler} format="\w+" required/>
          </div>
          <div>
            <label>Designation:</label>
            <input className="input" type='text' onInput={this.desigHandler} format="\w+" required/>
          </div>
          <div>
            <label>Contact Details:</label>
            {contactComp}
            <br/>
            <button className="button is-link" type='button' onClick={this.anotherContact}>+</button>
          </div>
          <br/>
          <div>
            <label>Skills:</label>
            {skillsComp}
            <br/>
            <button className="button is-link" type='button' onClick={this.anotherSkill}>+</button>
          </div>
          <br/>
          <div className="is-one-third">
            <label>Date of Birth:</label>
          </div>
          <div className="column is-half">
            <input className="input" type='date' onInput={this.dobHandler}/>
          </div>
          <br/>
          <button className="button is-link" type='submit'>Add Employee</button>
        </form>
      </React.Fragment>
    );
  }
}
