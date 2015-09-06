import shared from '../shared';


export default class GamePageComponent extends React.Component {

  render() {

    const props = Object.assign({}, shared.pageProps, {
      content: this.constructor.name,
    });

    return (
      <box {...props} />
    );
  }
}
