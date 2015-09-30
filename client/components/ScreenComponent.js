import _ from 'lodash';
import _s from 'underscore.string';

import CursorCoverComponent from './CursorCoverComponent';
import WindowComponent from './WindowComponent';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'consts/ViewProps';
import { generatePrompt, linesToBlessedContent } from 'lib/text-processor';


export default class ScreenComponent extends React.Component {

  static mergeLines(promptString, inputBuffer, outputLines) {
    const borderLine = _s.repeat('\u2500', SCREEN_WIDTH);
    const commandLine = promptString + inputBuffer;

    return [
      commandLine,
      borderLine,
      ...outputLines,
    ];
  }

  render() {
    const promptString = generatePrompt(this.props.terminal.shellInputMode);

    const lines = this.constructor.mergeLines(
      promptString,
      this.props.terminal.inputBuffer,
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
      content: linesToBlessedContent(lines, SCREEN_WIDTH, SCREEN_HEIGHT),
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
