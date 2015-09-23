import assert from 'power-assert';

import {
  _generateCommandId,
  _shellInputToArgv,
  retrieveMinimistOptions,
  parse,
} from 'lib/command-parser';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('_shellInputToArgv', function() {
    assert.deepEqual(_shellInputToArgv('a   b --c  d  e'), ['a', 'b', '--c', 'd', 'e']);
    assert.deepEqual(_shellInputToArgv('  a b   '), ['a', 'b']);
    assert.deepEqual(_shellInputToArgv(''), []);
  });

  it('_generateCommandId', function() {
    assert.deepEqual(_generateCommandId(null, null), '');
    assert.deepEqual(_generateCommandId('foo', null), 'foo');
    assert.deepEqual(_generateCommandId('foo', 'bar'), 'foo-bar');
  });

  context('parse', function() {

    it('should be', function() {
      const commandDefinition = {
        commands: {
          foo: {
            default: 'hige',
            commands: {
              hoge: null,
              hige: null,
            },
          },
          bar: null,
        },
      };

      const minimistOptionsForCommand = {
        'foo-hoge': {
          default: {
            x: true,
          },
        },
      };

      assert.deepEqual(parse(commandDefinition, minimistOptionsForCommand, ''), {
        commandId: '',
        commandName: null,
        subCommandName: null,
        commandOptions: {
          _: []
        }
      });

      assert.deepEqual(parse(commandDefinition, minimistOptionsForCommand, 'foo hoge arg -a -b val'), {
        commandId: 'foo-hoge',
        commandName: 'foo',
        subCommandName: 'hoge',
        commandOptions: {
          _: ['arg'],
          a: true,
          b: 'val',
          x: true,
        }
      });
    });
  });
});
