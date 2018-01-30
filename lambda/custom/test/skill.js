const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('skill', '/index.js', 'handler');
import { responseHelper } from './utils/alexa';

// import intents
const launchRequestIntent = require('./service-requests/launch-request.json');
const helloWorldIntent = require('./service-requests/hello-world-intent.json');
const myNameIsIntent = require('./service-requests/my-name-is-intent.json');

describe('skill', () => {
  before((done) => {
    done();
  });

  function helloWorldCheck(r) {
    expect(responseHelper.getOutputSpeech(r)).to.be.equal('<speak> Hello World! </speak>');

    expect(r.response.card).to.deep.equal({
      content: 'hello world',
      title: 'hello world',
      type: 'Simple',
    });

    expect(r.response.shouldEndSession).to.be.true;
  }

  it('implement hello world intent test', () => {
    return wrapped.run(launchRequestIntent).then((r) => {
      helloWorldCheck(r);
    });
  });

  it('implement hello world intent test', () => {
    return wrapped.run(helloWorldIntent).then((r) => {
      helloWorldCheck(r);
    });
  });

  it('implement my name is intent test', () => {
    return wrapped.run(myNameIsIntent).then((r) => {
      expect(responseHelper.getOutputSpeech(r)).to.be.equal('<speak> Hello name </speak>');

      expect(r.response.card).to.deep.equal({
        content: 'hello world',
        title: 'hello world',
        type: 'Simple',
      });

      expect(r.response.shouldEndSession).to.be.true;
    });
  });
});
