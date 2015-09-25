import _ from 'lodash';
import _s from 'underscore.string';

import shared from './shared';


export default class IndexWindowContentComponent extends React.Component {

  render() {

    const props = Object.assign(_.cloneDeep(shared.props), {
      top: this.props.top,
      width: this.props.width,
      height: this.props.height,
    });

    props.style.bg = 'green';

    return (
      <box { ...props } >
      </box>
    );
  }
}

Object.assign(IndexWindowContentComponent, {
  propTypes: shared.propTypes,
});
