// Naming convention:
// Mailer has uppercase M because it exports a class
// passport has lowercase p because it exports nothing
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// extend base component from react.js library
class Mailer extends helper.Mail {
  //1st param: an object that contains a subject and recipients
  //2nd param: html string got from surveyTemplate
  constructor({subject, recipients}, content){
    super();
    this.sgAPI = sendgrid(keys.sendGridKey);

    this.from_email = new helper.Email('wang.guox@northeastern.edu');
    this.subject = subject;
    // content does not have {} around it because we are not destructure it
    this.body = new helper.Content('text/html', content);
    // need to extract only email property from recipients Subdoc Collection
    this.recipients = this.formatAddresses(recipients);

    // base class has this built-in function
    this.addContent(this.body);

    // enable click tracking
    this.addClickTracking();

    this.addRecipients();
  }

  formatAddresses(recipients){
    //can not omit the () around {email} as destructure with arrow function needs it
    return recipients.map( ({email}) => {
      return new helper.Email(email);
    });
  }

  // SendGrid API requirement
  addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients(){
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    // invoke base function
    this.addPersonalization(personalize);
  }

  async send(){
    const request = this.sgAPI.emptyRequest({
      method : 'POST',
      path : '/v3/mail/send',
      body : this.toJSON()
    });

    const response = await this.sgAPI.API(request);
    return response;
  }
}

module.exports = Mailer;
