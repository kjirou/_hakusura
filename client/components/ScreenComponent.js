import _s from 'underscore.string';


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
      content: '> Push [{green-fg}enter{/}] key to start',
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

class OutputterComponent extends React.Component {

  render() {

    let props = {
      top: 0,
      left: 0,
      width: '100%',
      //height: SCREEN_HEIGHT - 2,
      height: 11,
      tags: true,
      style: {
        fg: 'white',
        bg: 'blue',
      },
      context: '1111',
    };

    return (
      <box { ...props } />
    );
  }
}

export default class ScreenComponent extends React.Component {

  render() {

    const props = Object.assign({
      top: 0,
      left: 0,
      width: 80,
      height: SCREEN_HEIGHT,
      style: {
        fg: 'white',
        bg: 'black',
      },
    }, {
    });

    const outputterProps = {
      key: 'outputter',
    };

    const consoleProps = {
      key: 'console',
    };
        //<OutputterComponent { ...outputterProps } />

    return (
      <box { ...props } >
        <ConsoleComponent { ...consoleProps } />
      </box>
    );
  }
}
