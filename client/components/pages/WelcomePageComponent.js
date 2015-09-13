import _s from 'underscore.string';

import shared from '../shared';
import { STAGE_SELECTION } from 'consts/keys';
import { stages } from 'models/static/stages';


export default class WelcomePageComponent extends React.Component {

  render() {

    let lines = [];

    lines.push('{magenta-fg}Fury Road{/} - A simple Roguelike game');
    lines.push('');
    lines.push('Select your car!');
    lines.push('');

    // Choices
    Object.keys(STAGE_SELECTION).sort().forEach((keySequence) => {
      const AStage = stages[STAGE_SELECTION[keySequence]];
      let line = `[{magenta-fg}${keySequence}{/}] `;
      line += AStage.getName();
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
