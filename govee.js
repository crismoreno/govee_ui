import {STORED_KEY_NAME} from './constants.js';
import getDevices, {displayDeviceData} from './getDevices.js';
import getDeviceState, {displayDeviceState} from './getDeviceState.js';
import {togglePower, controlBrightness} from './controlDevice.js';

const apiKeyForm = document.getElementById('apiKeyForm');
const apiKeyInput = document.getElementById('apiKeyInput');
const persistAPIKeyCheck = document.getElementById('persistApiKeyCheck');
const submitApiKeyButton = document.getElementById('submitApiKey');
const devicesContainer = document.querySelector('.devices-detail');
const devicePowerSwitch = document.querySelector('.device-power');
const deviceBrightnessSlider = document.querySelector('.device-brightness');

const persistedAPIKey = localStorage.getItem(STORED_KEY_NAME);

const useApiKey = async (apiKey) => {
	if (apiKeyInput) {
		apiKeyInput.value = apiKey;
		apiKeyInput.disabled = true;
	}
	if(persistAPIKeyCheck){
		persistAPIKeyCheck.checked = true;
		persistAPIKeyCheck.disabled = true;
	}
	if(submitApiKeyButton){
		submitApiKeyButton.disabled = true;
	}

	const goveeDevices = await getDevices(apiKey)

	if(goveeDevices.code === 200){
		const {data: devices} = goveeDevices;
		const goveeDeviceState = await getDeviceState(devices[0], apiKey);
		devicesContainer.dataset.mac = devices[0].device;
		devicesContainer.dataset.sku = devices[0].sku;

		if(goveeDeviceState.code === 200){
			const {payload: {capabilities}} = goveeDeviceState;
			displayDeviceState(capabilities);
		}

		displayDeviceData(devices[0])
	}
}

if(persistedAPIKey){
	useApiKey(JSON.parse(persistedAPIKey));
}


apiKeyForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const fields = new FormData(event.target);

	const apiKey = fields.get('apiKeyInput');
	const persistApiKeyCheck = fields.get('persistApiKeyCheck') === 'on';

	if(persistApiKeyCheck){
		localStorage.setItem(STORED_KEY_NAME, JSON.stringify(apiKey));
	}

	useApiKey(apiKey);
});

devicePowerSwitch.addEventListener('click', async () => {
	await togglePower({apiKey: apiKeyInput.value, devicePowerSwitch: devicePowerSwitch.checked, deviceMac: devicesContainer.dataset.mac, deviceSku: devicesContainer.dataset.sku, apiKey: apiKeyInput.value, devicePowerSwitch: devicePowerSwitch.checked, deviceMac: devicesContainer.dataset.mac, deviceSku: devicesContainer.dataset.sku});
});

deviceBrightnessSlider.addEventListener('input', async (event) => {
	document.querySelector('.brightness-output-value').textContent = event.target.value;
	await controlBrightness({apiKey: apiKeyInput.value, brightness: event.target.value, deviceMac: devicesContainer.dataset.mac, deviceSku: devicesContainer.dataset.sku, apiKey: apiKeyInput.value, devicePowerSwitch: devicePowerSwitch.checked, deviceMac: devicesContainer.dataset.mac, deviceSku: devicesContainer.dataset.sku})
});

