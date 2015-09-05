import assert from 'power-assert';
import ReactDOMServer from 'react-dom/server';

import RootComponent from 'components/RootComponent';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should render', function() {
    ReactDOMServer.renderToString(<RootComponent />);
  });
});
