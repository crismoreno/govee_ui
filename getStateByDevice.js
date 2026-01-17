import {INSTANCE_IDS} from './constants.js';
import {getStateByDevice as getStateByDeviceController} from './apiConnector.js';
import {apiCallSuccess} from './helpers.js';

const devicesControlsContainer = document.querySelector('.devices-controls');
const devicePowerSwitch = document.querySelector('.device-power');
const deviceBrightnessSlider = document.querySelector('.device-brightness');
const deviceBrightnessOutputValue = document.querySelector('.brightness-output-value');

const displayDevicePowerSwitchStatus = (state) => {
	devicePowerSwitch.checked = state;
}

const displayDeviceBrightnessStatus = (brightness) => {
	deviceBrightnessSlider.value = brightness;
	deviceBrightnessOutputValue.textContent = brightness;
}

const displayDeviceState = (capabilities) => {
	displayDevicePowerSwitchStatus(capabilities.find(({instance}) => instance === INSTANCE_IDS.POWERSWITCH)?.state?.value);
	displayDeviceBrightnessStatus(capabilities.find(({instance}) => instance === INSTANCE_IDS.BRIGHTNESS)?.state?.value);
};

const getStateByDevice = async ({device, apiKey}) => {
	const deviceStateResponse = await getStateByDeviceController(device, apiKey);

	if(apiCallSuccess(deviceStateResponse)){
		devicesControlsContainer.classList.remove('d-none');
		displayDeviceState(deviceStateResponse.payload.capabilities);
		return deviceStateResponse.payload.capabilities;
	}
}

export default getStateByDevice;