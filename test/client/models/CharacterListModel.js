import assert from 'power-assert';

import CharacterListModel from 'models/CharacterListModel';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should create a instance', function() {
    let model = new CharacterListModel();
    //model._listObjects.forEach(c => {
    //  console.log(c.getName.toString())
    //  console.log(c.getName())
    //});
  });
});
