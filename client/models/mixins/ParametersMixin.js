import {
  defineIntegerParameter,
  defineRateParameter,
} from 'rpgparameter';


const ParametersMixin = {};

defineIntegerParameter(ParametersMixin, 'weight');
defineIntegerParameter(ParametersMixin, 'maxWeight');
defineIntegerParameter(ParametersMixin, 'maxArmorPower');
defineIntegerParameter(ParametersMixin, 'maxShieldEnergy');
defineIntegerParameter(ParametersMixin, 'maxFuel');
defineIntegerParameter(ParametersMixin, 'maxAmmo');
defineIntegerParameter(ParametersMixin, 'shieldHardness');
defineRateParameter(ParametersMixin, 'fuelEfficiencyRate');
defineIntegerParameter(ParametersMixin, 'operability');
defineIntegerParameter(ParametersMixin, 'speed');
defineIntegerParameter(ParametersMixin, 'maxMainGunCount');
defineIntegerParameter(ParametersMixin, 'maxSubGunCount');
defineIntegerParameter(ParametersMixin, 'maxStaffCount');

export default ParametersMixin;
