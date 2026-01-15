import {API_BASE_URL} from './constants.js';

const POWERSWITCH_INSTANCE_ID = 'powerSwitch';
const BRIGHTNESS_INSTANCE_ID = 'brightness';

const devicePowerSwitch = document.querySelector('.device-power');
const deviceBrightnessSlider = document.querySelector('.device-brightness');
const deviceBrightnessOutputValue = document.querySelector('.brightness-output-value');

const getDeviceState = async ({sku, device}, apiKey) => {
	const deviceState = await fetch(`${API_BASE_URL}/device/state`, {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json',
				'Govee-API-Key': apiKey
		},
		body: JSON.stringify({
			"requestId": "uuid",
			"payload": {
					"sku": sku,
					"device": device
			}
		})
	});

	return await deviceState.json();
};

const displayDevicePowerSwitchStatus = (isOn) => {
	devicePowerSwitch.checked = isOn;
}

const displayDeviceBrightnessStatus = (brightness) => {
	deviceBrightnessSlider.value = brightness;
	deviceBrightnessOutputValue.textContent = brightness;
}

export const displayDeviceState = (capabilities) => {
	displayDevicePowerSwitchStatus(capabilities.find(({instance}) => instance === POWERSWITCH_INSTANCE_ID)?.state?.value);
	displayDeviceBrightnessStatus(capabilities.find(({instance}) => instance === BRIGHTNESS_INSTANCE_ID)?.state?.value);
};

export default getDeviceState;