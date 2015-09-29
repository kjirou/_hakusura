import _ from 'lodash';
import _s from 'underscore.string';

import HorizontalLineComponent from './HorizontalLineComponent';
import { SCREEN_WIDTH } from 'consts/ViewProps';

import IndexWindowContentComponent from './window-contents/IndexWindowContentComponent';


class StatusBarComponent extends React.Component {

  render() {

    const props = {
      top: 0,
      left: 0,
      width: '100%',
      height: 1,
      tags: true,
      style: {
        fg: 'white',
        bg: 'black',
      },
      content: '(index)',
    };

    return (
      <box { ...props } />
    );
  }
}


export default class WindowComponent extends React.Component {

  render() {

    let windowContentComponent = null;
    let contentHeight = 0;
    if (!this.props.window.isMinimized) {
      contentHeight = 20;
      const windowContentProps = Object.assign({}, this.props, {
        top: 1,
        width: SCREEN_WIDTH,
        height: contentHeight,
      });
      windowContentComponent = <IndexWindowContentComponent { ...windowContentProps } />
    }

    const height = contentHeight + 2;

    const props = {
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height,
      tags: true,
      style: {
        fg: 'white',
      },
    };

    const statusBarProps = {
      key: 'status_bar',
    };

    const horizontalLineProps = {
      key: 'horizontal_line',
      top: height - 1,
      width: SCREEN_WIDTH,
    };

    return (
      <box { ...props } >
        <StatusBarComponent { ...statusBarProps } />
        { windowContentComponent }
        <HorizontalLineComponent { ...horizontalLineProps } />
      </box>
    );
  }
}
