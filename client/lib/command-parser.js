import parseArgs from 'minimist';
import parseCommands from 'minimist-subcommand';
import _s from 'underscore.string';


export var COMMAND_DEFINITION = {
  commands: {
    alias: null,
    character: {
      default: 'index',
      commands: {
        index: null,
        list: null,
        select: null,
        show: null,
      }
    },
    config: null,
    dictionary: null,
    guild: null,
    help: {
      default: 'index',
      commands: {
        character: null,
        index: null,
        item: null,
        list: null,
      }
    },
    item: {
      default: 'index',
      commands: {
        index: null,
        list: null,
        show: null,
      }
    },
    recruit: null,
  },
};

export var MINIMIST_OPTIONS_FOR_COMMAND = {
  '_test': { default: { a: true } },
  '_test2-foo': { default: { b: true } },
};

/*
 * @param {string} shellInput - Like linux/unix shell input.
 *                              e.g. 'cmd arg1 arg2 -x --foo bar'
 * @return {Array}
 */
export function shellInputToArgv(shellInput) {
  const trimmed = _s.trim(shellInput);
  if (trimmed === '') {
    return [];
  }
  return trimmed.split(/ +/);
}

export function retrieveMinimistOptions(commandName, subCommandName) {
  let id = '';
  if (typeof commandName === 'string') {
    id += commandName;
    if (typeof subCommandName === 'string') {
      id += '-' + subCommandName;
    }
  }
  return MINIMIST_OPTIONS_FOR_COMMAND[id] || {};
}

export function parse(shellInput) {
  const argv_ = shellInputToArgv(shellInput);
  const { commands, argv } = parseCommands(COMMAND_DEFINITION, argv_);
  const [ commandName, subCommandName ] = commands;
  const minimistOptions = retrieveMinimistOptions(commandName, subCommandName);
  return {
    commandName: commandName || null,
    subCommandName: subCommandName || null,
    commandOptions: parseArgs(argv, minimistOptions),
  };
}
