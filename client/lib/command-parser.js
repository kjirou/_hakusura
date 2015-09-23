import parseArgs from 'minimist';
import parseCommands from 'minimist-subcommand';
import _s from 'underscore.string';


export var COMMAND_DEFINITION = {
  commands: {
    _wizard: {
      default: 'on',
      commands: {
        adventuring: null,
        battling: null,
        off: null,
        on: null,
      },
    },
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
      default: 'welcome',
      commands: {
        welcome: null,
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

export function generateCommandId(commandName, subCommandName) {
  let id = '';
  if (typeof commandName === 'string') {
    id += commandName;
    if (typeof subCommandName === 'string') {
      id += '-' + subCommandName;
    }
  }
  return id;
}

export function retrieveMinimistOptions(commandId) {
  return MINIMIST_OPTIONS_FOR_COMMAND[commandId] || {};
}

export function parse(shellInput) {
  const argv_ = shellInputToArgv(shellInput);
  const { commands, argv } = parseCommands(COMMAND_DEFINITION, argv_);
  const [ commandName, subCommandName ] = commands;
  const commandId = generateCommandId(commandName, subCommandName);
  const minimistOptions = retrieveMinimistOptions(commandId);
  return {
    commandId,
    commandName: commandName || null,
    subCommandName: subCommandName || null,
    commandOptions: parseArgs(argv, minimistOptions),
  };
}
