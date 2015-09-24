import _ from 'lodash';
import _s from 'underscore.string';

import CursorCoverComponent from './CursorCoverComponent';
import WindowComponent from './WindowComponent';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'consts/ViewProps';
import { generatePrompt } from 'lib/text-processor';


export default class ScreenComponent extends React.Component {

  static mergeLines(promptString, shellLines, outputLines) {
    const borderLine = _s.repeat('\u2500', SCREEN_WIDTH);
    const lines = [
      borderLine,
    ];

    shellLines = shellLines.slice();
    if (shellLines.length > 0) {
      shellLines[0] = promptString + shellLines[0];
    }

    shellLines.forEach(line => lines.unshift(line));
    outputLines.forEach(line => lines.push(line));

    return lines;
  }

  static linesToContent(lines) {
    lines = lines.slice();

    // pad lines for a case of not enough
    _.range(SCREEN_HEIGHT).forEach(() => lines.push(''));

    return lines
      // cut the apparently extra lines for speed
      .slice(0, SCREEN_HEIGHT)
      // ensure that the beginning of lines is displayed to the top
      .reverse()
      .map((line) => {

        // normalize CRLF and CR to LF
        line = line.replace(/(\r\n|\r)/g, '\n');

        // TODO: consider to both blessed tags, ansi-colors and multibyte
        //line = line.slice(0, SCREEN_WIDTH);

        return line;
      })
      // expand multilined-line
      // e.g. ['a\nb', 'c'] -> ['a', 'b', 'c']
      .join('\n').split('\n')
      // adjust lines into display
      .slice(-SCREEN_HEIGHT)
      // to string
      .join('\n')
    ;
  }

  render() {
    const promptString = generatePrompt(this.props.terminal.shellInputMode);

    const lines = this.constructor.mergeLines(
      promptString,
      this.props.terminal.shellLines,
      this.props.terminal.outputLines
    );

    const props = {
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      tags: true,
      style: {
        fg: 'white',
        bg: 'black',
      },
      content: this.constructor.linesToContent(lines),
    };

    let windowComponent = null;
    if (this.props.window.isOpen) {
      windowComponent = <WindowComponent { ...this.props } />;
    }

    const cursorCoverProps = {
      key: 'cursor_cover',
      top: SCREEN_HEIGHT - 1,
      width: SCREEN_WIDTH,
      blinkingPosition: promptString.length + this.props.terminal.cursorPosition,
    };

    return (
      <box { ...props } >
        {windowComponent}
        <CursorCoverComponent { ...cursorCoverProps } />
      </box>
    );
  }
}
