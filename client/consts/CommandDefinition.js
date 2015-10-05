export const COMMAND_TREE = {
  commands: {
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
