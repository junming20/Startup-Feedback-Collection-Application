// SurveyNew is a switch to show SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = { formReview : false};
  // }
  state = {showFormReview : false};
  renderContent(){
    if (this.state.showFormReview === true){
      return (
        <SurveyFormReview
          onCancel={() => this.setState({showFormReview : false})}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({showFormReview : true})}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }

}

// when user toggle btw SurveyForm and SurveyFormReview, we keep the exisiting form formValues
// However, if navigate away to SurvewNew, then dump out all the existing values, default action not working
export default reduxForm({form : 'surveyForm'})(SurveyNew);
