# Common problems during deployment and testing 
(Screenshots for common error messages from Terminal or Chrome inspect console. Photo naming convention: All first letters are in upper case.)


1. [HPM] Error occurred while trying to proxy request /api/current_user from localhost:3000 to http://localhost:5000 (ECONNREFUSED)

Usually means that port 5000 crashed or the process has locked up and cant restart - very common and very generic. This will happen quite often when using nodemon and developing Node apps. You'll need to kill the process on port 5000 and restart the servers.

Solution: find the process on port 5000 and kill -9 <br /> 
$ lsof -i tcp:5000 <br /> 
COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME node <br /> 
2917 wangguoxing 22u IPv6 0x7bdaacbff15b79dd 0t0 TCP *:commplex-main (LISTEN)<br /> 
$ kill -9 2917 <br /> 


2. createError.js:16 Uncaught (in promise) Error: Request failed with status code 403
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Common%20Deployment%20Issues/Insufficient%20Credit.png)

This means you have insufficient credits, please modify the scripts at /middlewares/requireCredits.js or Login with Google to add more credits. <br /> 
The default credit card for Stripe API has to be 4242 4242 4242 4242. 
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Common%20Deployment%20Issues/Credit%20Card%20Info.png)

If you encounter 'enter verification code', you can omit that message, go back to the payment page and re-submit.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Common%20Deployment%20Issues/Ignore%20SMS.png)

3. We can use npx to run ngrok and have it forward traffic to port 5000 without installing anything. <br />
To do this, open a new terminal and run:  npx ngrok http 5000 <br />

This address that was generated, in my case: <br />
Forwarding                    http://8edc862fdbb0.ngrok.io -> http://localhost:5000 <br />
This address will only exist for 8 hours. You'll want to keep this terminal session open and running while you are developing.  <br />
If you close the running ngrok session and re-run npx ngrok http 5000, the address will be different.  <br />
Testing Ngrok session (and the LocalTunnel usage) together with Sendgrid integration:  <br />
development mode : http://8edc862fdbb0.ngrok.io/api/surveys/webhooks (please generate a new ngrok address after re-rerunning the command)  <br />
Heroku mode: https://your_heroku_url/api/surveys/webhooks  <br />
In our case: https://guarded-atoll-79987.herokuapp.com/api/surveys/webhooks <br />

4. TypeError with SendGrid:
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Common%20Deployment%20Issues/TypeError%20With%20SG%20Integration%20Test.png)<br />
Solution:<br />
Sometimes it happens. However, this is perfect ok as it does prove the integration is working and is sending data through ngrok to your application.<br />
You can ignore this error message.<br />

5. 500 Internal Service Error:
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Common%20Deployment%20Issues/500%20Internal%20Server%20Error.png)<br />
Solution:<br />
This implies that something is wrong with the backend logic or routing.<br />
Make sure that surveyRoutes has the correct Path Parser import:<br />
const { Path } = require('path-parser');<br />
And in Heroku Dashboard, make sure the REDIRECT_DOMAIN does NOT have an '/':<br />
eg: https://cryptic-lake-82120.herokuapp.com/ will cause this problem.<br />

6. Sendgrid Repeatedly Ping Server error:
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Common%20Deployment%20Issues/SG%20Repeatedly%20Ping%20Server.png)<br />
Solution: <br />
Adding res.send({}); in post('/api/surveys/webhooks') method at surveyRoute.js <br />
Sending back nothing at all often tells an app that an error has occurred.Therefore Sendgrid will repeated Ping the server when we do ngrok local tunnel tests.<br />
Sending back anything at all lets the app know that things went fine.<br />

