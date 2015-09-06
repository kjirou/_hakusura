import blessed from 'blessed';
import {render} from 'react-blessed';

import RootComponent from 'components/RootComponent';
import EventTypes from 'consts/EventTypes';
import AppInput from 'input/AppInput';
import AppStore from 'store/AppStore';


export default class CliApp {

  constructor() {
    this._screen = null;

    // Initialize global instances
    AppStore.getInstance();
    AppInput.getInstance();
  }

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

  _onPrintScreenDebugLog(...args) {
    this._screen.debug(...args);
    console.log(...args);
  }

  _onExitScreen() {
    process.stdin.pause();
    this._screen.destroy();
    process.exit(0);
    return;
  }

  /*
   * Don't execute twice in a one process
   */
  start() {
    const screen = this._createScreen();

    screen.debugLog.unkey(['q', 'escape']);

    process.on(EventTypes.PRINT_SCREEN_DEBUG_LOG, this._onPrintScreenDebugLog.bind(this));
    process.on(EventTypes.DEBUG, this._onPrintScreenDebugLog.bind(this));  // short hand
    process.on(EventTypes.EXIT_SCREEN, this._onExitScreen.bind(this));

    render(<RootComponent />, screen);

    this._screen = screen;
  }
}
