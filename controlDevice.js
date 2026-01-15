import {API_BASE_URL} from './constants.js';

export const togglePower = async ({apiKey, devicePowerSwitch, deviceSku, deviceMac}) => {
	const togglePower = await fetch(`${API_BASE_URL}/device/control`, {
		method: 'POST',
		headers: {
				'Content-Type': 'application/json',
				'Govee-API-Key': apiKey
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