import blessed from 'blessed';
import { render } from 'react-blessed';

import RootComponent from 'components/RootComponent';
import EventTypes from 'consts/EventTypes';
import AppEvent from 'containers/AppEvent';
import AppInput from 'input/AppInput';


export default class CliApp {

  constructor() {
    this._screen = null;

    // Start input subscriptions
    AppInput.getInstance();
  }

  _createScreen() {
    const options = {
      debug: true,
      title: 'HAKUSURA',
      smartCSR: true,
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
    const { emitter } = AppEvent.getInstance();
    const screen = this._createScreen();

    screen.debugLog.unkey(['q', 'escape']);

    emitter.on(EventTypes.PRINT_SCREEN_DEBUG_LOG, this._onPrintScreenDebugLog.bind(this));
    emitter.on(EventTypes.DEBUG, this._onPrintScreenDebugLog.bind(this));  // short hand
    emitter.on(EventTypes.EXIT_SCREEN, this._onExitScreen.bind(this));

    render(<RootComponent />, screen);

    this._screen = screen;
  }
}
