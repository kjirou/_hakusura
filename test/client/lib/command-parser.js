import assert from 'power-assert';

import {
  _generateCommandId,
  _shellInputToArgv,
  complementCommand,
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

  it('complementCommand', function() {
    const patterns = [
      'bar',
      'bar list',
      'bar show',
      'baz',
      'foo',
      'foo list',
      'foo show',
    ];

    assert.strictEqual(complementCommand(patterns, 'fo'), 'foo');
    assert.strictEqual(complementCommand(patterns, 'foo'), 'foo');
    assert.strictEqual(complementCommand(patterns, 'foz'), 'foz');
    assert.strictEqual(complementCommand(patterns, ''), 'bar');

    // Nest
    assert.strictEqual(complementCommand(patterns, 'foo l'), 'foo list');
    assert.strictEqual(complementCommand(patterns, 'foo '), 'foo list');
    assert.strictEqual(complementCommand(patterns, 'foo  '), 'foo  ');

    // Rotation
    assert.strictEqual(complementCommand(patterns, 'ba'), 'bar');
    assert.strictEqual(complementCommand(patterns, 'ba', 'bar'), 'baz');
    assert.strictEqual(complementCommand(patterns, 'ba', 'baz'), 'bar');

    // Nest & Rotation
    assert.strictEqual(complementCommand(patterns, 'bar '), 'bar list');
    assert.strictEqual(complementCommand(patterns, 'bar ', 'bar list'), 'bar show');
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
