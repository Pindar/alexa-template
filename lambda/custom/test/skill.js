// include the testing framework
import alexaTest from 'alexa-skill-test-framework';
import languageStrings from '../src/language-strings/languages';

// initialize the testing framework
alexaTest.initialize(
  require('../index.js'),
  'amzn1.ask.skill.00000000-0000-0000-0000-000000000000',
  'amzn1.ask.account.VOID'
);
alexaTest.initializeI18N(languageStrings);
alexaTest.setLocale('en-US');

describe('skill', () => {
  it('implement hello world intent test', () => {
    alexaTest.test([
      {
        request: alexaTest.getLaunchRequest(),
        says: alexaTest.t('HELLO_MSG'),
        hasCardTitle: alexaTest.t('CARD.DEFAULT.TITLE'),
        hasCardContent: alexaTest.t('CARD.DEFAULT.CONTENT'),
        shouldEndSession: false
      }
    ]);
  });

  describe('implement my name is intent test', () => {
    const name = 'foobar';
    alexaTest.test([
      {
        request: alexaTest.getIntentRequest('MyNameIsIntent', { name }),
        says: alexaTest.t('HELLO_YOU_MSG', { name }),
        hasCardTitle: alexaTest.t('CARD.PERSONALIZED.TITLE'),
        hasCardContent: alexaTest.t('CARD.DEFAULT.CONTENT', {name}),
      }
    ]);
  });
});
