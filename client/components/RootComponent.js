import {pages} from './pages';
//import shared from './shared';
import AppStore from 'containers/AppStore';


class RootComponent extends React.Component {

  constructor(props, context) {
    super(props, context);

    const {store} = AppStore.getInstance();

    this.state = store.getState();  // Can't use setState

    this._preAppTime = null;
    store.subscribe(() => {
      const state = store.getState();
      const appTime = state.time.appTime;
      if (appTime !== this._preAppTime) {
        this.setState(state);
        this._preAppTime = appTime;
      }
    });
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
      content: this.constructor.name,
    };

    const ActivePageComponent = pages[this.state.screen.activePageId];

    return (
      <box {...props}>
        <ActivePageComponent />
      </box>
    );
  }
}

// Doesn't work, ref #1
//Object.assign(RootComponent, {
//  childContextTypes: {
//    shared: React.PropTypes.object.isRequired
//  }
//});

export default RootComponent;
