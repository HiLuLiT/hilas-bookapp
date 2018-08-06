import './Modal.scss';
import React from 'react';
import TextField from "material-ui/TextField";

import { connect } from 'react-redux';

export default class Modal extends React.Component  {
   constructor() {
    super();
    this.state = {
      input:'',
    };
  }

  validate = (targetValue, fieldName) => {
    let isError = false;
    const errors = {
          isDisabled: false
    };

    if (targetValue.length === 0) {
      isError = true;
      errors[fieldName+'Error'] = "Please fill field";
      errors.isDisabled = true;
    }
    
    this.setState({
      ...this.state,
      ...errors
    })

    return isError;
  }

  handleBookUpdate = () => {
      if (this.state.updatedBook) {
        this.props.onBookUpdate(this.state.updatedBook)  
       }
      this.props.onClose();
  }

  handleFieldChange= (targetValue, fieldName) =>  {
    const err = this.validate(targetValue, fieldName);
    if (!err) {
      const editedBook = this.state.updatedBook ? this.state.updatedBook : this.props.book;
      editedBook[fieldName] = targetValue;
      let errorField = fieldName+'Error';
      this.setState( {
        ...this.state,
        [errorField]: "",
        isDisabled: false,
        updatedBook: editedBook
      } )
    } 
  }

  render() {
    const { year, author, title } = this.props.book;
    const {onClose} = this.props;
    return (
			<div className="modal-overlay-div">
				<div className="modal">
          <div className="container">
             <h2>Edit Book</h2>
          <TextField name="title" 
                     floatingLabelText="Title"
                     defaultValue={title} 
                     onChange={(ev)=>this.handleFieldChange(ev.target.value, 'title')}
                     errorText={this.state.titleError}/>

          <TextField  name="author"
                      floatingLabelText="Author"
                      defaultValue={author} 
                      onChange={(ev)=>this.handleFieldChange(ev.target.value, 'author')} 
                      errorText={this.state.authorError}/>

          <TextField name="year"
                     floatingLabelText="Year"
                     defaultValue={year}  
                     onChange={(ev)=>this.handleFieldChange(ev.target.value, 'year')}
                     errorText={this.state.yearError}/>

          <button className="save" disabled={this.state.isDisabled} onClick={() => this.handleBookUpdate()}>Save</button>
          <button className="close" onClick={() => onClose()}>X </button>
          </div>
				</div>
			</div>
    );
  }
}