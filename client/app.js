import blessed from 'blessed';
import {Component} from 'react';
import {render} from 'react-blessed';

import Layout from 'Layout';
import AppContext from 'contexts/AppContext';


export function createScreen() {
  const screen = blessed.screen({
    debug: true,
    title: 'Project & Progress'
  });
  // TODO: Temp
  screen.key(['escape', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  return screen;
}

export function createRouter() {
  const screen = createScreen();
  return new Arda.Router(Layout, (el) => {
    return render(el, screen);
  });
}

export function start() {
  return createRouter()
    .pushContext(AppContext, {})
    .catch(err => {
      console.error(err.stack || err);
    })
  ;
}
