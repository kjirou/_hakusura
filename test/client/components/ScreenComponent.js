import assert from 'power-assert';
import _s from 'underscore.string';

import {
  linesToContent,
} from 'components/ScreenComponent';
import { SCREEN_HEIGHT } from 'consts/ViewProps';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  context('linesToContent', function() {

    it('should be', function() {
      assert.strictEqual(linesToContent([]), _s.repeat('\n', SCREEN_HEIGHT - 1));
    });

    it('should be reversed lines', function() {
      assert.strictEqual(linesToContent(['first']), _s.repeat('\n', SCREEN_HEIGHT - 1) + 'first');
    });

    it('should be expanded multilined-lines', function() {
      assert.strictEqual(linesToContent(['a\nb', 'c']), _s.repeat('\n', SCREEN_HEIGHT - 3) + 'c\na\nb');
    });

    it('should be normalized CRLF and CR', function() {
      assert.strictEqual(linesToContent(['a\r\nb\rc']), _s.repeat('\n', SCREEN_HEIGHT - 3) + 'a\nb\nc');
    });
  });
});
