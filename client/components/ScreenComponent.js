import _ from 'lodash';
import _s from 'underscore.string';


const SCREEN_WIDTH = 80;
const SCREEN_HEIGHT = 32;

export default class ScreenComponent extends React.Component {

  static mergeLines(shellLines, outputLines) {
    const borderLine = _s.repeat('\u2500', SCREEN_WIDTH);
    const lines = [
      borderLine,
    ];

    shellLines = shellLines.slice();
    if (shellLines.length > 0) {
      shellLines[0] = '> ' + shellLines[0];
    }

    shellLines.forEach(line => lines.unshift(line));
    outputLines.forEach(line => lines.push(line));

    return lines;
  }

  static linesToContent(lines) {
    lines = lines.slice();
    _.range(SCREEN_HEIGHT).forEach(() => lines.push(''));

    return lines
      // TODO: consider multilined-line
      .slice(0, SCREEN_HEIGHT)
      .reverse()
      .map((line) => {
        // TODO: consider blessed tags
        return line.slice(0, SCREEN_WIDTH);
      })
      .join('\n')
    ;
  }

  render() {

    const outputLines = [
      'HAKUSURA - A text-based hack & slash RPG',
    ];
    const lines = this.constructor.mergeLines(
      this.props.shell.shellLines,
      outputLines
      //this.props.shell.outputLines
    );

    const props = {
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      style: {
        fg: 'white',
        bg: 'black',
      },
      content: this.constructor.linesToContent(lines),
    };

    return (
      <box { ...props } />
    );
  }
}
