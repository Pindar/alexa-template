const Console = console;

export function log() {
  Console.log.apply(this, arguments);
}

export function debug() {
  process.env.DEBUG === 'true' && Console.log.apply(this, arguments);
}
