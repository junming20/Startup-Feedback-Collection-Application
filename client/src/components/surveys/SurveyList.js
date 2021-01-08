import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';

class SurveyList extends Component {
  componentDidMount(){
    this.props.fetchSurveys();
  }

  // only mongoose recognize survey.id, in raw mongo query,
  // it only recognize survey._id
  // need to reverse the list for reverse chronological order
  renderSurveyList(){
    return this.props.surveys.reverse().map( survey => {
      return (
        <div className="card cyan darken-2" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Survey Sent On : {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes : {survey.yes}</a>
            <a>No : {survey.no}</a>
          </div>
        </div>
      );
    });
  }
  render() {

    return (
      <div>
        {this.renderSurveyList()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {surveys : state.surveys};
}

export default connect(mapStateToProps, {fetchSurveys})(SurveyList);
