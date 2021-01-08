//This is a function, not export a class, use lower case v
//http://emailregex.com/ -> see javascript and HTML5 section
//HTML5 :
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//Javaript:
// const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// src/utils/validateEmails.js
// Line 4:22:  Unnecessary escape character: \[                                        no-useless-escape
// Line 4:47:  Unnecessary escape character: \[                                        no-useless-escape

export default (emails) => {
  const invalidEmails = emails.split(',').map(email => email.trim())
  .filter(email => re.test(email) === false)

  // must use backtick for template strings
  if (invalidEmails.length){
    return `These emails are invalid: ${invalidEmails}`;
  }
  return null;
};
