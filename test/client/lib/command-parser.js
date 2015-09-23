import assert from 'power-assert';

import {
  retrieveMinimistOptions,
  shellInputToArgv,
  parse,
} from 'lib/command-parser';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('shellInputToArgv', function() {
    assert.deepEqual(shellInputToArgv('a   b --c  d  e'), ['a', 'b', '--c', 'd', 'e']);
    assert.deepEqual(shellInputToArgv('  a b   '), ['a', 'b']);
    assert.deepEqual(shellInputToArgv(''), []);
  });

  it('retrieveMinimistOptions', function() {
    assert.deepEqual(retrieveMinimistOptions(null, null), {});
    assert.deepEqual(retrieveMinimistOptions('_test', null), { default: { a: true } });
    assert.deepEqual(retrieveMinimistOptions('_test2', 'foo'), { default: { b: true } });
    assert.deepEqual(retrieveMinimistOptions('_not_exists', null), {});
    assert.deepEqual(retrieveMinimistOptions('_test2', '_not_exists'), {});
  });

  context('parse', function() {

    it('should be', function() {
      assert.deepEqual(parse(''), {
        commandName: null,
        subCommandName: null,
        commandOptions: {
          _: []
        }
      });

      assert.deepEqual(parse('help arg -a -b val'), {
        commandName: 'help',
        subCommandName: 'index',
        commandOptions: {
          _: ['arg'],
          a: true,
          b: 'val',
        }
      });
    });
  });
});
