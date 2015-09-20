//import {pages} from './pages';
//import shared from './shared';
import ScreenComponent from './ScreenComponent';
import AppStore from 'containers/AppStore';


export default class RootComponent extends React.Component {

  constructor(props, context) {
    super(props, context);

    const { store } = AppStore.getInstance();

    this.state = store.getState();

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
          fg: 'white',
        }
      },
      content: this.constructor.name,
    };

    //const ActivePageComponent = pages[this.state.screen.activePageId];

    return (
      <box { ...props } >
        <ScreenComponent />
      </box>
    );
  }
}
