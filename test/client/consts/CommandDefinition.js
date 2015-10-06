import assert from 'power-assert';

import {
  _generateCommandComplementions,
} from 'client/consts/CommandDefinition';

import { heading } from 'test/support/helpers';


describe(heading(__filename), () => {

  it('_generateCommandComplementions', () => {
    assert.deepEqual(_generateCommandComplementions(
      {
        commands: {
          foo: null,
          bar: null,
          baz: null,
        }
      }
    ), [
      'bar',
      'baz',
      'foo',
    ]);

    assert.deepEqual(_generateCommandComplementions(
      {
        commands: {
          foo: null,
          bar: {
            commands: {
              z: null,
              y: null,
              x: null,
            }
          },
          baz: null,
        }
      }
    ), [
      'bar',
      'bar x',
      'bar y',
      'bar z',
      'baz',
      'foo',
    ]);
  });
});
