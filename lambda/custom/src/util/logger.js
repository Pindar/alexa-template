const Console = console;

module.exports = {
  log,
  debug
};

function log() {
  Console.log.apply(this, arguments);
}

function debug() {
  process.env.DEBUG === 'true' && Console.log.apply(this, arguments);
}
