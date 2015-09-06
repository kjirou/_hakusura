import shared from '../shared';


export default class WelcomePageComponent extends React.Component {

  render() {

    let content = '';

    // Title
    content += '{magenta-fg}Fury Road{/}';

    let props = Object.assign({}, shared.pageProps);

    return (
      <box {...props} >
        {content}
      </box>
    );
  }
}
