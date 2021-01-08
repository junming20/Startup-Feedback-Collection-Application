//SurveyFormReview shows the next step after user filled in SurveyForm
import React from 'react'
import { connect } from 'react-redux'
import formFields from './formFields'
import _ from 'lodash'
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    // for list element, we have to provide a unique key
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    )
  })
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className='pink darken-4 white-text btn-flat' onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className='cyan btn-flat right white-text'
      >
        Send Out Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  console.log(state)
  return {
    formValues: state.form.surveyForm.values
  }
}

// https://reactrouter.com/web/api/withRouter
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))
