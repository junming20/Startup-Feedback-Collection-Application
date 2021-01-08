# Tests performed during application development process
captured from Chrome Inspection Console and MongoDB

1.Demo: axios posted a survey successfully as long as the credits is above 0. The googleID and transcationID are unique.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Project%20Tests/Console-Axios%20Post:survey.png)

2.Demo: if the title is missing, the dispatch action will have a stutus 403 to remind user to type in the title.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Project%20Tests/Console-Missing%20Title%20Error.png)

3.Demo: if we didn't add in the touched boolean property, even if the user enter this page without entering anything, the alert still will appear.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Project%20Tests/Console-Reson%20for%20touched%20property.png)

4.Demo: The twilio SendGrid will override the link with its own unique link to for user identification and user click tracking.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Project%20Tests/Console-SG:Customized%20Links%20Rewritten.png)

5.Demo: After a survey has been submitted, the redux-form state will change accordingly.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Project%20Tests/Console-Survey%20Logging.png)

6.Demo: axios test on get/surveys API call. Note that the dateSent and lastResponded field are already attached.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Project%20Tests/Console-Axios%20Get:surveys.png)

7.Demo: Inefficient Mongoose query as it selects a whole collection instead of pin-pointing one record. We should handle the entire logic within MongoDB.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Project%20Tests/MongoDB-Wrong%20Mongoose%20Query.png)

8.Demo: First survey has been created in the dev environment/dev database.We created Dev/Prod env to continue improve the application without the need to move the application to maintainence mode.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Project%20Tests/MongoDB-Survey%20Creation.png)

9.Demo:We added the last responsed date to record the last valid click from some user for statistic analysis.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Project%20Tests/MongoDB-Last%20Responded.png)

10.Demo:If the user has already clicked yes/no from an email, then we should make sure that even if the user return to the same email, any subsequent click of yes/no will be omitted to make sure the unique response and avoid dirty data.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Project%20Tests/MongoDB-Redundant%20Click.png)

11.Demo:We can easily change any MongoDB field, for example, change responded from true to false, and reset yes/no count number to any digit. Then refresh the page we will have the updated number/field. This fast update is useful in MongoDB testing.
![alt text](https://github.ccs.neu.edu/2020FACS5610SV/project-team_06/blob/master/Project%20Tests/MongoDB-Fast%20Change.png)
