import {API_BASE_URL, API_KEY_ID} from './constants.js';

export const getDevices = async (apiKey)  => {
	const devices = await fetch(`${API_BASE_URL}/user/devices`, {
		method: 'GET',
		headers: {
				'Content-Type': 'application/json',
				[API_KEY_ID]: apiKey
		}
	});

	return await devices.json();
};

export const getStateByDevice = async ({sku, device}, apiKey) => {
	const deviceState = await fetch(`${API_BASE_URL}/device/state`, {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json',
				[API_KEY_ID]: apiKey
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

export const togglePower = async ({apiKey, devicePowerSwitch, deviceSku, deviceMac}) => {
	const togglePower = await fetch(`${API_BASE_URL}/device/control`, {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json',
				[API_KEY_ID]: apiKey
		},
		body: JSON.stringify({
			"requestId": "uuid",
			"payload": {
					"sku": deviceSku,
					"device": deviceMac,
					"capability": {
						"type": "devices.capabilities.on_off",
						"instance": "powerSwitch",
						"value": devicePowerSwitch ? 1 : 0
					}
			}
		})
	});

	return await togglePower.json();
};

export const controlBrightness = async ({apiKey, brightness, deviceSku, deviceMac}) => {
	const controlBrightness = await fetch(`${API_BASE_URL}/device/control`, {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json',
				[API_KEY_ID]: apiKey
		},
		body: JSON.stringify({
			"requestId": "uuid",
			"payload": {
					"sku": deviceSku,
					"device": deviceMac,
					"capability": {
						"type": "devices.capabilities.range",
						"instance": "brightness",
						"value": Number(brightness)
					}
			}
		})
	});

	return await controlBrightness.json();
};

export const getDeviceScenes = async ({apiKey, deviceSku, deviceMac}) => {
	const getDeviceScenes = await fetch(`${API_BASE_URL}/device/scenes`, {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json',
				[API_KEY_ID]: apiKey
		},
		body: JSON.stringify({
			"requestId": "uuid",
			"payload": {
					"sku": deviceSku,
					"device": deviceMac,
			}
		})
	});

	return await getDeviceScenes.json();
};