import assert from 'power-assert';

import {
  generateCommandId,
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

  it('generateCommandId', function() {
    assert.deepEqual(generateCommandId(null, null), '');
    assert.deepEqual(generateCommandId('foo', null), 'foo');
    assert.deepEqual(generateCommandId('foo', 'bar'), 'foo-bar');
  });

  it('retrieveMinimistOptions', function() {
    assert.deepEqual(retrieveMinimistOptions('_not_exists'), {});
    assert.deepEqual(retrieveMinimistOptions('_test'), { default: { a: true } });
  });

  context('parse', function() {

    it('should be', function() {
      assert.deepEqual(parse(''), {
        commandId: '',
        commandName: null,
        subCommandName: null,
        commandOptions: {
          _: []
        }
      });

      assert.deepEqual(parse('help arg -a -b val'), {
        commandId: 'help-welcome',
        commandName: 'help',
        subCommandName: 'welcome',
        commandOptions: {
          _: ['arg'],
          a: true,
          b: 'val',
        }
      });
    });
  });
});
