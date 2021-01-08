//SurveyForm is for user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

// const FIELDS = [
//   { label: 'Survey Title', name : 'title', noValueError : 'Please enter a title!'},
//   { label: 'Subject Line', name : 'subject', noValueError : 'Please enter a subject!'},
//   { label: 'Email Body', name : 'body', noValueError : 'Please enter an email body!'},
//   { label: 'Recipient List', name : 'emails', noValueError : 'Please enter a email list!'}
//
// ];

import formFields from './formFields' ;

class SurveyForm extends Component {
  renderFields(){
    return _.map(formFields, ({label, name}) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
    });
  }
  //<form onSubmit = {this.props.handleSubmit(() => this.props.onSurveySubmit())}>
  render() {
    return (
      <div>

        <form onSubmit = {this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="blue btn-flat left white-text">
            Cancel
          </Link>
          <button type="submit" className="orange btn-flat right white-text">
            Next Step
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }

}

//values is the object containing that 4 fields in surveyForm
function validate(values){
  const errors = {};

  // edge case : no email entered
  errors.recipients = validateEmails(values.recipients || '');

  // replaced with lodash foreach loop
  // if (!values.title){
  //   errors.title = 'You must enter a title!';
  // }
  //
  // if (!values.subject){
  //   errors.subject = 'You must enter a subject!';
  // }
  //
  // if (!values.body){
  //   errors.body = 'You must enter a body!';
  // }
  _.each(formFields, ({name, noValueError}) => {
    // use bracket to figure out name property on run-time
    if (!values[name]){
      errors[name] = noValueError;
    }
  });


  // if redux form find it is empty, ready to go
  return errors;
}

// run valiate every time user submit a form
// do not dump the value after clicking next step button to keep the original input
export default reduxForm({
  validate : validate,
  form : 'surveyForm',
  destroyOnUnmount : false
})(SurveyForm);
