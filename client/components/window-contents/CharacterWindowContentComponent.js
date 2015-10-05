import _ from 'lodash';
import _s from 'underscore.string';

import shared from './shared';


export default class CharacterWindowContentComponent extends React.Component {

  render() {

    const props = Object.assign(_.cloneDeep(shared.props), {
      top: this.props.top,
      width: this.props.width,
      height: this.props.height,
    });

    return (
      <box { ...props } >
        CharacterWindowContentComponent!
      </box>
    );
  }
}

Object.assign(CharacterWindowContentComponent, {
  propTypes: shared.propTypes,
});
