import chalk from 'chalk';
import devnull from 'dev-null';
import _ from 'lodash';
import {render} from 'react-blessed';
import {Provider} from 'react-redux';

import RootComponent from 'components/RootComponent';
//import conf from 'conf';
//import {EVENTS} from 'consts';
//import EventManager from 'lib/EventManager';
//import ScreenStore from 'stores/ScreenStore';


export default class Screen {

  constructor() {

    let screen = blessed.screen(this._createBlessedOptions());
    screen.debugLog.unkey(['q', 'escape']);
    render(<RootComponent />, screen);
    //this._screen = screen;

    //let {emitter} = EventManager.getInstance();
    //emitter.on(EVENTS.UPDATE_ERRORS, this._debug.bind(this));
    //emitter.on(EVENTS.EXIT, this._exit.bind(this));
  }

  _createBlessedOptions() {
    let options = {
      debug: true,
      title: 'Fury Road'
    };

    //if (conf.ignoreScreenOutput) {
    //  options.output = devnull();
    //}

    return options;
  }

  //_exit() {
  //  process.stdin.pause();
  //  process.exit(0);
  //}

  //_debug() {
  //  let screenStore = ScreenStore.getInstance();
  //  var err = screenStore.getLastRuntimeError();
  //  this._screen.debug(chalk.red(err));
  //}
}
