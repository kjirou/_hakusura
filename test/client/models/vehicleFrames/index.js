import assert from 'power-assert';

import {
  CoupeVehicleFrameModel,
  VehicleFrameModel,
  vehicleFrameList,
  vehicleFrames,
} from 'models/vehicleFrames';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be defined', function() {
    assert.strictEqual(typeof VehicleFrameModel, 'function');
    assert(Array.isArray(vehicleFrameList));
    assert(vehicleFrameList.length > 0);
    assert.strictEqual(typeof vehicleFrames, 'object');
    assert(Object.keys(vehicleFrames).length > 0);
  });

  it('should create a instance by sub class', function() {
    const model = new CoupeVehicleFrameModel();
  });
});
