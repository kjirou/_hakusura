import blessed from 'blessed';
import {render} from 'react-blessed';
import {Provider} from 'react-redux';

// TODO: Temp
import RootComponent from 'components/RootComponent';


export default class CliApp {

  _createScreen() {
    let options = {
      debug: true,
      title: 'Fury Road'
    };

    //if (conf.ignoreScreenOutput) {
    //  options.output = devnull();
    //}

    return blessed.screen(options);
  }

  start() {
    const screen = this._createScreen();
    // TODO: Temp
    screen.key(['escape', 'C-c'], function(ch, key) {
      return process.exit(0);
    });
    screen.debugLog.unkey(['q', 'escape']);
    render(<RootComponent />, screen);
  }
}
