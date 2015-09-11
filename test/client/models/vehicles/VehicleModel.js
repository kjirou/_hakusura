import assert from 'power-assert';

import { EngineModel } from 'models/engines';
import { VehicleFrameModel } from 'models/vehicleFrames';
import VehicleModel from 'models/vehicles/VehicleModel';
import { heading } from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should create a instance', function() {
    let model = new VehicleModel();
  });


  describe('parameters', function() {

    it('weight', function() {
      let engine = new EngineModel();
      engine.setWeight(100);
      let model = new VehicleModel();
      model.engine = engine;
      assert.strictEqual(model.weight, 100);
    });

    it('maxWeight', function() {
      let engine = new EngineModel();
      engine.setMaxWeight(100);
      let model = new VehicleModel();
      model.engine = engine;
      assert.strictEqual(model.maxWeight, 100);
    });

    it('maxArmorPower', function() {
      let vehicleFrame = new VehicleFrameModel();
      vehicleFrame.setMaxArmorPower(100);
      let model = new VehicleModel();
      model.vehicleFrame = vehicleFrame;
      assert.strictEqual(model.maxArmorPower, 100);
    });

    it('maxShieldEnergy', function() {
      let vehicleFrame = new VehicleFrameModel();
      vehicleFrame.setMaxShieldEnergy(100);
      let model = new VehicleModel();
      model.vehicleFrame = vehicleFrame;
      assert.strictEqual(model.maxShieldEnergy, 100);
    });

    it('maxFuel', function() {
      let vehicleFrame = new VehicleFrameModel();
      vehicleFrame.setMaxFuel(100);
      let model = new VehicleModel();
      model.vehicleFrame = vehicleFrame;
      assert.strictEqual(model.maxFuel, 100);
    });

    it('maxAmmo', function() {
      let vehicleFrame = new VehicleFrameModel();
      vehicleFrame.setMaxAmmo(100);
      let model = new VehicleModel();
      model.vehicleFrame = vehicleFrame;
      assert.strictEqual(model.maxAmmo, 100);
    });

    it('fuelEfficiencyRate', function() {
      let vehicleFrame = new VehicleFrameModel();
      vehicleFrame.setFuelEfficiencyRate(2.5);
      let model = new VehicleModel();
      model.vehicleFrame = vehicleFrame;
      assert.strictEqual(model.fuelEfficiencyRate, 2.5);
    });

    it('shieldHardness', function() {
      let vehicleFrame = new VehicleFrameModel();
      vehicleFrame.setShieldHardness(100);
      let model = new VehicleModel();
      model.vehicleFrame = vehicleFrame;
      assert.strictEqual(model.shieldHardness, 100);
    });

    it('operability', function() {
      let vehicleFrame = new VehicleFrameModel();
      vehicleFrame.setOperability(100);
      let model = new VehicleModel();
      model.vehicleFrame = vehicleFrame;
      assert.strictEqual(model.operability, 100);
    });

    it('speed', function() {
      let vehicleFrame = new VehicleFrameModel();
      vehicleFrame.setSpeed(100);
      let model = new VehicleModel();
      model.vehicleFrame = vehicleFrame;
      assert.strictEqual(model.speed, 100);
    });

    it('maxMainGunCount', function() {
      let vehicleFrame = new VehicleFrameModel();
      vehicleFrame.setMaxMainGunCount(100);
      let model = new VehicleModel();
      model.vehicleFrame = vehicleFrame;
      assert.strictEqual(model.maxMainGunCount, 100);
    });

    it('maxSubGunCount', function() {
      let vehicleFrame = new VehicleFrameModel();
      vehicleFrame.setMaxSubGunCount(100);
      let model = new VehicleModel();
      model.vehicleFrame = vehicleFrame;
      assert.strictEqual(model.maxSubGunCount, 100);
    });

    it('maxStaffCount', function() {
      let vehicleFrame = new VehicleFrameModel();
      vehicleFrame.setMaxStaffCount(100);
      let model = new VehicleModel();
      model.vehicleFrame = vehicleFrame;
      assert.strictEqual(model.maxStaffCount, 100);
    });
  });
});
