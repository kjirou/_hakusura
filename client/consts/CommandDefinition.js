export const COMMAND_TREE = {
  commands: {
    adventure: {
      default: 'start',
      commands: {
        proceed: null,
        start: null,
      },
    },
    alias: null,
    character: {
      default: 'index',
      commands: {
        index: null,
        list: null,
        show: null,
      },
    },
    config: null,
    dictionary: null,
    guild: null,
    help: {
      default: 'welcome',
      commands: {
        welcome: null,
      },
    },
    item: {
      default: 'index',
      commands: {
        index: null,
        list: null,
        show: null,
      },
    },
    recruit: null,
    window: {
      default: 'toggle',
      commands: {
        close: null,
        purge: null,
        toggle: null,
      },
    },
    wizard: {
      default: 'on',
      commands: {
        getstate: null,
        off: null,
        on: null,
        sandbox: null,
        setstate: null,
      },
    },
  },
};

export const MINIMIST_OPTIONS = {
  'character-index': {
    default: {
      page: 1,
    },
    alias: {
      page: ['p'],
    },
  },
  'character-list': {
    default: {
      from: 1,
      to: 9999,
    },
    alias: {
      from: ['f'],
      to: ['t'],
    },
  },
};

export const _generateCommandComplementions = (commandTree) => {
  const uniqued = new Set();
  const addCommandIdRecursively = (tree, currentCommands) => {
    Object.keys(tree.commands).sort().forEach((command) => {
      const nextCommands = [...currentCommands, command];
      const commandId = nextCommands.join(' ');
      uniqued.add(commandId);
      const children = tree.commands[command];
      if (children) {
        addCommandIdRecursively(children, nextCommands);
      }
    });
  }
  addCommandIdRecursively(commandTree, []);
  return Array.from(uniqued).sort();
};
export const COMMAND_COMPLEMENTIONS = _generateCommandComplementions(COMMAND_TREE);
