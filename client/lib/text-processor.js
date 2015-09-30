import chalk from 'chalk';
import _ from 'lodash';
import _s from 'underscore.string';

import ShellInputModes from 'consts/ShellInputModes';


export function generatePrompt(shellInputMode) {
  return {
    [ShellInputModes.ADVENTURE]: 'adventure> ',
    [ShellInputModes.BATTLE]: 'battle> ',
    [ShellInputModes.INDEX]: 'index> ',
    [ShellInputModes.WIZARD]: 'wizard> ',
  }[shellInputMode] || '> ';
}

/*
 * Insert \n automatically to blessed-content
 *
 * @return {string}
 */
export function applyAutomaticCarrierReturns(blessedContent, columnLength) {

  // TODO: also consider ansi-colors
  //       Ref) https://github.com/chalk/wrap-ansi
  blessedContent = chalk.stripColor(blessedContent);

  let replaced = '';
  let currentColumnLength = 0;
  let insideEscape = false;
  let indexForInsert = null;
  blessedContent.split('').forEach((c) => {

    replaced += c;

    if (c === '{') {
      insideEscape = true;
    }

    // If next character exists ..
    if (!insideEscape) {
      // .. then, insert "\n" to kept index
      if (indexForInsert !== null) {
        replaced = _s.insert(replaced, indexForInsert, '\n');
        currentColumnLength = 0;
        indexForInsert = null;
      }
      currentColumnLength += 1;
      // keep index
      if (currentColumnLength === columnLength) {
        indexForInsert = replaced.length;
      }
    }

    if (c === '}') {
      insideEscape = false;
    }
  });

  return replaced;
}

export function linesToBlessedContent(lines, columnLength, rowLength) {
  lines = lines.slice();

  // pad lines for a case of not enough
  _.range(rowLength).forEach(() => lines.push(''));

  return lines
    // cut the apparently extra lines for speed
    .slice(0, rowLength)
    // ensure that the beginning of lines is displayed to the top
    .reverse()
    .map(line => {

      // normalize CRLF and CR to LF
      line = line.replace(/(\r\n|\r)/g, '\n');

      // 'long sentence' -> 'long sent\nence'
      line = line
        .split('\n')
        .map(linePart => {
          return applyAutomaticCarrierReturns(linePart, columnLength);
        })
        .join('\n')
      ;

      return line;
    })
    // expand multilined-line
    // e.g. ['a\nb', 'c'] -> ['a', 'b', 'c']
    .join('\n').split('\n')
    // adjust lines into display
    .slice(-rowLength)
    // to string
    .join('\n')
  ;
}
