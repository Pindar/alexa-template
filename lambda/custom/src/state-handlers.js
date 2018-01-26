const Logger = require('./util/logger');

const handlers = {
  'LaunchRequest'() {
    this.emit('SayHello');
  },
  'HelloWorldIntent'() {
    this.emit('SayHello');
  },
  'MyNameIsIntent'() {
    this.emit('SayHelloName');
  },
  'SayHello'() {
    this.response.speak(this.t('HELLO_MSG'))
      .cardRenderer(this.t('CARD.DEFAULT.TITLE'), this.t('CARD.DEFAULT.CONTENT'));
    this.emit(':responseReady');
  },
  'SayHelloName'() {
    var name = this.event.request.intent.slots.name.value;
    this.response.speak(this.t('HELLO_YOU_MSG', { name }))
      .cardRenderer(this.t('CARD.PERSONALIZED.TITLE'), this.t('CARD.DEFAULT.CONTENT', { name }));
    this.emit(':responseReady');
  },
  'SessionEndedRequest'() {
    Logger.log('Session ended with reason: ' + this.event.request.reason);
  },
  'AMAZON.StopIntent'() {
    this.response.speak(this.t('STOP_MSG'));
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent'() {
    this.response.speak(this.t('HELP_MSG'));
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent'() {
    this.response.speak(this.t('CANCEL_MSG'));
    this.emit(':responseReady');
  },
  'Unhandled'() {
    this.response.speak(this.t('UNHANDLED_MSG'));
  }
};

module.exports = handlers;
