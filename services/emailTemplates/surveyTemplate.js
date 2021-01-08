const keys = require('../../config/keys');


module.exports = (survey) => {
  //return '<div>' + survey.body + '</div>';
  return `
    <html>
      <body>
        <div style="text-align : center;">
          <h3>Our surveyMonkey team want your opinions!</h3>
          <p>Could you please anwser this question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
