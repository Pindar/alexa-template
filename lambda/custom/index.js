if (!global._babelPolyfill) {
  require('babel-polyfill');
}
import * as Alexa from 'alexa-sdk';
import stateHandlers from './src/state-handlers';
import languageStrings from './src/language-strings/languages';
import * as Logger from './src/util/logger';


// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


export const handler = (event, context, callback) => {
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
