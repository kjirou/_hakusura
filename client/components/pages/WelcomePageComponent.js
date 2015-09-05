import _ from 'lodash';

import shared from '../shared';


export default class WelcomePageComponent extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

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
