const _ =require('lodash');
// If you are receiving a "TypeError: Path is not a constructor" error
// while testing Sendgrid, change to:
const { Path } = require('path-parser');
// const Path = require('path-parser');

const {URL} = require('url');

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');

const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// skirt the issue when we attempt to require a model file multiple times
// need to cut trailing or leading spaces on each email
const Survey = mongoose.model('surveys');

// https://mongoosejs.com/docs/guide.html
// https://mongoosejs.com/docs/api.html
// https://mongoosejs.com/docs/api/query.html#query_Query-select
// query.select({ a: 1, b: 1 }); // 1 is true 0 is false
module.exports = app => {
  // make sure user login first
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({_user : req.user.id})
      .select({recipients : false});

    res.send(surveys);
  });


 // ngrok refresh every 30 seconds
 // {
 //   email: 'example@test.com',
 //   timestamp: 1607787436,
 //  'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
 //   event: 'click',
 //   category: [ 'cat facts' ],
 //   sg_event_id: 'xbgUevY2nIuC0yp-PuOOfw==',
 //   sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
 //   useragent: 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
 //   ip: '255.255.255.255',
 //   url: 'http://www.sendgrid.com/'
 // }

  // https://stackoverflow.com/questions/26156687/mongoose-find-update-subdocument
  app.post('/api/surveys/webhooks', (req, res) => {
    // console.log(req.body);
    // Step1 : extract the Path from URL:
    // url: 'http://localhost:3000/api/surveys/5fd4ed165be170836e7e5a10/yes',
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
      .map(({email, url}) => {
        const pathname = new URL(url).pathname;

        // Step2: Extract SurveyID and Choice (yes or no)
        // { surveyId: '5fd5152a9deae1079d4ccbd4', choice: 'no' }
        // { surveyId: '5fd515f7a5b1f509388c440e', choice: 'yes' }
        // console.log(p.test(pathname));

        // Step3: remove undefined elements
        const match = p.test(pathname);// match is either an object or a null, can not destructure here
        if (match){
          return {
            email : email,
            surveyId : match.surveyId,
            choice : match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({surveyId, email, choice}) => {
        Survey.updateOne({
          _id : surveyId,
          recipients : {
            $elemMatch : {email : email, responded : false}
          }
        }, {
          $inc: {[choice] : 1} ,
          $set: {'recipients.$.responded' : true},
          lastResponded : new Date()
        }).exec();
      })
      .value();





    // console.log(events);
    res.send({});
  });



  // app.post("/api/surveys/webhooks", (req, res) => {
  //   const p = new Path("/api/surveys/:surveyId/:choice");
  //
  //   _.chain(req.body)
  //     .map(({ email, url }) => {
  //       if (url) {
  //         const match = p.test(new URL(url).pathname);
  //         if (match) {
  //           return { email, surveyId: match.surveyId, choice: match.choice };
  //         }
  //       }
  //     })
  //     .compact()
  //     .uniqBy("email", "surveyId")
  //     .each(({ surveyId, email, choice }) => {
  //       Survey.updateOne(
  //         {
  //           _id: surveyId,
  //           recipients: {
  //             $elemMatch: { email: email, responded: false }
  //           }
  //         },
  //         {
  //           $inc: { [choice]: 1 },
  //           $set: { "recipients.$.responded": true },
  //           lastResponded: new Date()
  //         }
  //       ).exec();
  //     })
  //     .value();
  //
  //   res.send({});
  // });


  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thank you for participating our survey! - SurveyMonkey Team');
  });

  // create a survey and send out some emails
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
     const {title, subject, body, recipients} = req.body;

     const survey = new Survey({
       title,
       subject,
       body,
       recipients : recipients.split(',').map(email => {return {email : email.trim()}}),
       _user : req.user.id,
       dateSent : Date.now()
     });

     // serve a template
     // survey handles subject and recipients
     // survey template is the html inside the email
     const mailer = new Mailer(survey, surveyTemplate(survey));

     try {
       await mailer.send();
       await survey.save();
       req.user.credits -= 1;
       const user = await req.user.save();
       res.send(user);

     } catch (err) {
       //422 - unprocessable entity- the data entity body is wrong
       res.status(422).send(err);
     }

  });
};
