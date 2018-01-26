const en = {
  HELLO_MSG: 'Hello World!',
  HELLO_YOU_MSG: 'Hello {{ name }}',
  HELP_MSG: 'You can try: \'alexa, hello world\' or \'alexa, ask hello world my' +
  ' name is awesome Aaron\'',
  CANCEL_MSG: 'Bye',
  UNHANDLED_MSG: 'Sorry, I didn\'t get that. You can try: \'alexa, hello world\'' +
  ' or \'alexa, ask hello world my name is awesome Aaron\'',
  STOP_MSG: 'Bye',
  CARD: {
    PERSONALIZED: {
      TITLE: 'hello world',
      CONTENT: 'hello {{ name }}'
    },
    DEFAULT: {
      TITLE: 'hello world',
      CONTENT: 'hello world'
    }
  }
};

module.exports = {
  'en-US': {
    translation: en
  }
};
