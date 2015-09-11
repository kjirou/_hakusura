import assert from 'power-assert';


describe('power-assert module', function() {

  it('should be', function() {
    const zero = 0;
    const two = 2;
    const ary = [1, 2, 3];
    assert(ary.indexOf(zero) === two);
  });
});
