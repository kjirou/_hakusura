import {pages} from './pages';
import shared from './shared';


class RootComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  // Doesn't work, ref #1
  //getChildContext() {
  //  return {
  //    shared: shared
  //  };
  //}

  render() {

    let props = {
      top: 'center',
      left: 'center',
      width: 82,
      height: 34,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        bg: 'blue',
        border: {
          fg: 'white'
        }
      },
      content: 'RootComponent!'
    };

    const ActivePageComponent = pages['welcome'];

    return (
      <box {...props}>
        <ActivePageComponent />
      </box>
    );
  }
}

Object.assign(RootComponent, {
  childContextTypes: {
    shared: React.PropTypes.object.isRequired
  }
});


export default RootComponent;
