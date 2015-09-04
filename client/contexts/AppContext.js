import App from 'components/App';


export default class AppContext extends Arda.Context {
  get component() {
    return App;
  }

  expandComponentProps(props, state) {
    return {};
  }

  delegate(subscribe) {
    super.delegate();
  }
};
