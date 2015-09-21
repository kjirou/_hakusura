import _ from 'lodash';
import _s from 'underscore.string';


const SCREEN_WIDTH = 80;
const SCREEN_HEIGHT = 32;

class ConsoleComponent extends React.Component {

  render() {

    let props = {
      top: SCREEN_HEIGHT - 2,
      left: 0,
      width: '100%',
      height: SCREEN_HEIGHT,
      style: {
        fg: 'white',
        transparent: true,
      },
    };

    let lineProps = {
      key: 'line',
      top: 0,
      left: 0,
      width: '100%',
      height: 1,
      style: {
        fg: 'white',
      },
      content: _s.repeat('\u2500', 100),
    };

    let shellProps = {
      key: 'inputter',
      top: 1,
      left: 0,
      width: '100%',
      height: SCREEN_HEIGHT - 1,
      tags: true,
      style: {
        fg: 'white',
        transparent: true,
      },
      content: '> Push [{green-fg}enter{/}] key to startkkkka',
    };

    //let content = '';
    //// Mileage
    //content += () => {
    //  return ` ${_s.pad(this.props.mileage, 4)}/${_s.pad(this.props.maxMileage, 4)} km \u2502 `;
    //}();
    //// Others
    //content += [
    //  `Fuel:${_s.pad(this.props.fuel, 2)}`,
    //  `Ammo:${_s.pad(this.props.ammo, 2)}`,
    //].join(', ');
    //props.content = content;

    return (
      <box { ...props } >
        <box { ...lineProps } />
        <box { ...shellProps } />
      </box>
    );
  }
}

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

    const shellLines = [
      'Push [enter] key to start',
    ];
    const outputLines = [
      'HAKUSURA - A text-based hack & slash RPG',
    ];
    const lines = this.constructor.mergeLines(shellLines, outputLines);

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
