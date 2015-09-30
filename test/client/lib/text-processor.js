import chalk from 'chalk';
import assert from 'power-assert';

import {
  applyAutomaticCarrierReturns,
  linesToBlessedContent,
} from 'lib/text-processor';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('applyAutomaticCarrierReturns', function() {

    assert.strictEqual(
      applyAutomaticCarrierReturns('abcde', 2),
      'ab\ncd\ne'
    );

    assert.strictEqual(
      applyAutomaticCarrierReturns('abcde', 5),
      'abcde'
    );

    assert.strictEqual(
      applyAutomaticCarrierReturns('abcd', 2),
      'ab\ncd'
    );

    // TODO:
    //
    // Actually I want to such results:
    //
    //   'ab\n{red-fg}cd{/}\ne'
    //   ("\n" is placed after close tag)
    //
    // But, it is so difficult..
    //
    assert.strictEqual(
      applyAutomaticCarrierReturns('ab{red-fg}cd{/}e', 2),
      'ab\n{red-fg}cd\n{/}e'
    );

    assert.strictEqual(
      applyAutomaticCarrierReturns('ab{red-fg}cd{/}', 2),
      'ab\n{red-fg}cd{/}'
    );

    assert.strictEqual(
      applyAutomaticCarrierReturns('{red-fg}abcde{/}', 2),
      '{red-fg}ab\ncd\ne{/}'
    );

    // Strip ansi-colors
    assert.strictEqual(
      applyAutomaticCarrierReturns('ab{red-fg}' + chalk.blue('cd') + '{/}e', 2),
      'ab\n{red-fg}cd\n{/}e'
    );
  });


  context('linesToBlessedContent', function() {

    it('should be', function() {
      assert.strictEqual(linesToBlessedContent([], 99, 3), '\n\n');
    });

    it('should be reversed lines', function() {
      assert.strictEqual(linesToBlessedContent(['first'], 99, 3), '\n\nfirst');
    });

    it('should cut by row length', function() {
      assert.strictEqual(linesToBlessedContent(['a', 'b', 'c', 'd', 'e'], 99, 3), 'c\nb\na');
    });

    it('should be expanded multilined-lines', function() {
      assert.strictEqual(linesToBlessedContent(['a\nb', 'c'], 99, 3), 'c\na\nb');
    });

    it('should be normalized CRLF and CR', function() {
      assert.strictEqual(linesToBlessedContent(['a\r\nb\rc'], 99, 5), '\n\na\nb\nc');
    });

    it('should be applied automatic carrier returns', function() {
      assert.strictEqual(linesToBlessedContent(['12\nabcde\n34'], 3, 5), '\n12\nabc\nde\n34');
      assert.strictEqual(linesToBlessedContent(['12\nab{red-fg}cd{/}e\n34'], 3, 5), '\n12\nab{red-fg}c\nd{/}e\n34');
    });
  });
});
