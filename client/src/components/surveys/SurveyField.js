// SurveyField has the business logic to render label and text input
import React from 'react';

// {...input} is the same as
// onBlur = {input.onBlur} onChange = {input.onChange}
// the validation function auto runs in the first time
// redux consider everything to be invalid before user enters anything
// click in to activate touched boolean
export default ({ input, label, meta : {error, touched} }) => {
  // console.log(props.input);
  // console.log(meta);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{marginBottom : '5px'}}/>
      <div className="red-text" style={{marginBotton: '25px'}}>
        {touched && error}
      </div>
    </div>
  );
};
