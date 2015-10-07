import _ from 'lodash';
import _s from 'underscore.string';

import shared from './shared';


class DungeonCardComponent extends React.Component {

  render() {
    const props = {
    };
  }
}

export default class AdventureWindowContentComponent extends React.Component {

  render() {

    const props = Object.assign(_.cloneDeep(shared.props), {
      top: this.props.top,
      width: this.props.width,
      height: this.props.height,
    });

    const dungeonCardPropsTemplate = {
      top: undefined,
      left: 0,
      width: props.width,
      height: 1,
      tags: true,
      style: {
        fg: 'white',
        bg: 'black',
      },
    };

    return (
      <box { ...props } >
        AdventureWindowContentComponent!
      </box>
    );
  }
}

Object.assign(AdventureWindowContentComponent, {
  propTypes: shared.propTypes,
});
