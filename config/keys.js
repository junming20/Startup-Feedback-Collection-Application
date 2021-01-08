if (process.env.NODE_ENV === 'production'){
  // the production stage - return prod set of keys
  module.exports = require('./prod');
} else {
  // the dev stage -return dev set of keys
  module.exports = require('./dev');
}




// Client ID: 1072589238602-nrkjd1o8fr7k3lngo9fjv2v8eva4q5dm.apps.googleusercontent.com
// Client Secret: FMgol2nsKQZ_qOkXgpy8KSKw

// add google in front to distinguish btw google and faebookClientID
// module.exports = {
//   googleClientID : '1072589238602-nrkjd1o8fr7k3lngo9fjv2v8eva4q5dm.apps.googleusercontent.com',
//   googleClientSecret : 'FMgol2nsKQZ_qOkXgpy8KSKw',
//   mongoURI : 'mongodb+srv://wang2019:Aa123123@cluster0.t0oho.mongodb.net/SurveyMonkey?retryWrites=true&w=majority',
//   cookieKey : 'ihasdhasdjkaljdkldjjdaiowjdnawdinaiwdawdi'
//
// };



// Replace <password> with the password for the wang2019 user.
// Replace <dbname> with the name of the database that connections will use by default.
// Ensure any option params are URL encoded.

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://wang2019:<password>@cluster0.t0oho.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
