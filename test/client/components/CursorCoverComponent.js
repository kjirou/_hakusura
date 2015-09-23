import assert from 'power-assert';
import { renderToStaticMarkup } from 'react-dom/server';

import CursorCoverComponent from 'components/CursorCoverComponent';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be', function() {
    let actual;

    actual = renderToStaticMarkup(<CursorCoverComponent { ...{
      top: 0,
      width: 1,
      blinkingPosition: -1,
    } } />);
    assert(/<\/box><\/box>$/.test(actual));
    assert(/bg:white;/.test(actual));
  });
});
