import _ from 'lodash';
import _s from 'underscore.string';

import shared from './shared';


class DungeonCardComponent extends React.Component {

  render() {
    const props = {
      top: this.props.top,
      left: this.props.left,
      width: 16,
      height: 12,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        bg: 'green',
        border: {
          fg: 'white',
        }
      },
    };

    return (
      <box { ...props } >
      </box>
    );
  }
}

Object.assign(DungeonCardComponent, {
  propTypes: {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
  },
});


export default class AdventureWindowContentComponent extends React.Component {

  render() {

    const props = Object.assign(_.cloneDeep(shared.props), {
      top: this.props.top,
      width: this.props.width,
      height: this.props.height,
    });

    return (
      <box { ...props } >
      {
        Array.from({ length: 5 }).map((v, idx) => {
          return React.createElement(DungeonCardComponent, {
            key: 'dungeon_card_' + idx,
            top: 0,
            left: idx * 16,
          });
        })
      }
      </box>
    );
  }
}

Object.assign(AdventureWindowContentComponent, {
  propTypes: shared.propTypes,
});
