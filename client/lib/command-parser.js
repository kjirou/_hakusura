import parseArgs from 'minimist';
import parseCommands from 'minimist-subcommand';
import _s from 'underscore.string';

import { rotateIndex } from 'lib/util';


/*
 * @param {string} shellInput - Like linux/unix shell input.
 *                              e.g. 'cmd arg1 arg2 -x --foo bar'
 * @return {Array}
 */
export function _shellInputToArgv(shellInput) {
  const trimmed = _s.trim(shellInput);
  if (trimmed === '') {
    return [];
  }
  return trimmed.split(/ +/);
}

export function _generateCommandId(commandName, subCommandName) {
  let id = '';
  if (typeof commandName === 'string') {
    id += commandName;
    if (typeof subCommandName === 'string') {
      id += '-' + subCommandName;
    }
  }
  return id;
}

export function parse(commandDefinition, minimistOptionsForCommand, shellInput) {
  const argv_ = _shellInputToArgv(shellInput);
  const { commands, argv } = parseCommands(commandDefinition, argv_);
  const [ commandName, subCommandName ] = commands;
  const commandId = _generateCommandId(commandName, subCommandName);
  const minimistOptions = minimistOptionsForCommand[commandId] || {};
  return {
    commandId,
    commandName: commandName || null,
    subCommandName: subCommandName || null,
    commandOptions: parseArgs(argv, minimistOptions),
  };
}

export function complementCommand(patterns, suggestedInput, selectedInput = null) {
  const suggestedWordCount = suggestedInput.split(/ +/).length;
  const matched = patterns.filter(pattern => {
    const patternWordCount = pattern.split(/ +/).length;
    return patternWordCount === suggestedWordCount &&
      pattern.indexOf(suggestedInput) === 0;
  });
  if (matched.length === 0) {
    return suggestedInput;
  }
  const selectedIndex = matched.indexOf(selectedInput);
  if (selectedIndex === -1) {
    return matched[0];
  }
  return matched[rotateIndex(matched.length, selectedIndex, 1)];
}
