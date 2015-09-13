import _s from 'underscore.string';

import shared from '../shared';
import { STAGE_SELECTION } from 'consts/keys';


export default class WelcomePageComponent extends React.Component {

  render() {

    let lines = [];

    // Title
    lines.push('{magenta-fg}Fury Road{/} - A simple Roguelike game');
    lines.push('');

    // Choices
    Object.keys(STAGE_SELECTION).sort().forEach((keySequence) => {
      let line = `[{magenta-fg}${keySequence}{/}] `;
      line += _s.titleize(_s.humanize(STAGE_SELECTION[keySequence]));
      lines.push(line);
    });

    let props = Object.assign({}, shared.pageProps);

    return (
      <box {...props} >
        {lines.join('\n')}
      </box>
    );
  }
}
