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

    const rowPropsTemplate = {
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
      {
        this.props.window.listPagination.indexedObjects.map(({ serialNumber, object }, idx) => {
          const isCursorOver = this.props.window.cursorIndex === idx;
          const rowProps = Object.assign({}, rowPropsTemplate, {
            key: 'object-' + idx,
            top: idx,
            content: `[{magenta-fg}${serialNumber}{/}] ${object.toBlessedContent()}`,
          });
          if (isCursorOver) {
            rowProps.style = {
              fg: 'black',
              bg: 'white',
            };
          }
          return <box { ...rowProps } />;
        })
      }
      </box>
    );
  }
}

Object.assign(IndexWindowContentComponent, {
  propTypes: shared.propTypes,
});
