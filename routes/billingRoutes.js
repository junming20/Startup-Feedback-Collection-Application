const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
// [0] {
// [0]   id: 'tok_1HwL1JE3SO7FLneuZhROYHdc',
// [0]   object: 'token',
// [0]   card: {
// [0]     id: 'card_1HwL1JE3SO7FLneuH0hnOYxG',
// [0]     object: 'card',
// [0]     address_city: null,
// [0]     address_country: null,
// [0]     address_line1: null,
// [0]     address_line1_check: null,
// [0]     address_line2: null,
// [0]     address_state: null,
// [0]     address_zip: null,
// [0]     address_zip_check: null,
// [0]     brand: 'Visa',
// [0]     country: 'US',
// [0]     cvc_check: 'unchecked',
// [0]     dynamic_last4: null,
// [0]     exp_month: 11,
// [0]     exp_year: 2023,
// [0]     funding: 'credit',
// [0]     last4: '4242',
// [0]     name: '123@gmail.com',
// [0]     tokenization_method: null
// [0]   },
// [0]   client_ip: '67.169.137.190',
// [0]   created: 1607490921,
// [0]   email: '123@gmail.com',
// [0]   livemode: false,
// [0]   type: 'card',
// [0]   used: false
// [0] }
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // deleted because requireLogin middleware handled this sign-in issue
    // if (!req.user){
    //   return res.status(401).send({error : 'You have to log in before adding credit!'})
    // }
    //console.log(req.body);
    const charge = await stripe.charges.create({
      amount : 500,
      currency : 'usd',
      description : '$5 for 50 credits',
      source : req.body.id
    });
    // console.log(charge);



    req.user.credits += 50;
    const user = await req.user.save(); // need to persist to database
    // these two user are two seperate objects in memory
    // we need to use the most up-to-date model after got back from database

    res.send(user);
  });
};
