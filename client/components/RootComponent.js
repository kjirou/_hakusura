import ScreenComponent from './ScreenComponent';
import AppStore from 'containers/AppStore';


export default class RootComponent extends React.Component {

  constructor(props, context) {
    super(props, context);

    const { store } = AppStore.getInstance();

    this.state = store.getState();

    // render each frame
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

    const props = {
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

    const screenProps = Object.assign({}, this.state);

    return (
      <box { ...props } >
        <ScreenComponent { ...screenProps } />
      </box>
    );
  }
}
