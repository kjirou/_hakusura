import _ from 'lodash';
import _s from 'underscore.string';

import HorizontalLineComponent from './HorizontalLineComponent';
import { SCREEN_WIDTH } from 'consts/ViewProps';


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
        //bg: 'black',
        bg: 'magenta',
      },
    };

    return (
      <box { ...props } />
    );
  }
}


export default class WindowComponent extends React.Component {

  render() {
    const height = 22;

    const props = {
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: height,
      tags: true,
      style: {
        fg: 'white',
        //bg: 'black',
        bg: 'blue',
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
        <HorizontalLineComponent { ...horizontalLineProps } />
      </box>
    );
  }
}
