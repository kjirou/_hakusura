import {
  defineIntegerParameter,
  defineRateParameter,
} from 'rpgparameter';


const ParametersMixin = {};

defineIntegerParameter(ParametersMixin, 'weight');
defineIntegerParameter(ParametersMixin, 'maxWeight');
defineIntegerParameter(ParametersMixin, 'maxFuel');
defineRateParameter(ParametersMixin, 'fuelEfficiencyRate');
defineIntegerParameter(ParametersMixin, 'maxAmmo');
defineIntegerParameter(ParametersMixin, 'maxArmorPower');
defineIntegerParameter(ParametersMixin, 'shieldHardness');
defineIntegerParameter(ParametersMixin, 'maxShieldEnergy');
defineIntegerParameter(ParametersMixin, 'operability');
defineIntegerParameter(ParametersMixin, 'speed');
defineIntegerParameter(ParametersMixin, 'maxMainGunCount');
defineIntegerParameter(ParametersMixin, 'maxSubGunCount');
defineIntegerParameter(ParametersMixin, 'maxStaffCount');

export default ParametersMixin;
