import assert from 'power-assert';
import ReactDOMServer from 'react-dom/server';

import RootComponent from 'components/RootComponent';
import { heading, clearApp } from 'test/support/helpers';


describe(heading(__filename), function() {

  before(clearApp);

  it('should render', function() {
    ReactDOMServer.renderToString(<RootComponent />);
  });
});
