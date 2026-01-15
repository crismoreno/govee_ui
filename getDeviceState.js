import {API_BASE_URL} from './constants.js';

const POWERSWITCH_INSTANCE_ID = 'powerSwitch';

const devicePowerSwitch = document.querySelector('.device-power');

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

export const displayDeviceState = (capabilities) => {
	displayDevicePowerSwitchStatus(capabilities.find(({instance}) => instance === POWERSWITCH_INSTANCE_ID)?.state?.value);

};

export default getDeviceState;