const Alexa = require('alexa-sdk');
const stateHandlers = require('./src/state-handlers');
const languageStrings = require('./src/language-strings/languages');
const Logger = require('./src/util/logger');


// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = (event, context, callback) => {
  callback = debugOutput(event, context, callback);

  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = process.env.SKILL_APP_ID;
  alexa.debug = process.env.DEBUG;
  alexa.resources = languageStrings;

  alexa.registerHandlers(stateHandlers);

  alexa.execute();
};

function debugOutput(event, context, callback) {
  if (process.env.DEBUG !== 'true') {
    return;
  }
  Logger.debug('\n' + '******************* REQUEST **********************');
  Logger.debug('\n' + JSON.stringify(event, null, 2));

  var origCallback = callback;
  return function (error, response) {
    Logger.debug('\n' + '******************* RESPONSE  **********************');
    Logger.debug('\n' + JSON.stringify(response, null, 2));
    return origCallback(error, response);
  };
}
