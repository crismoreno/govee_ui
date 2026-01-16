import {API_KEY_ID} from './constants.js';
import getDevices from './getDevices.js';
import getDeviceState from './getDeviceState.js';
import {togglePower, controlBrightness} from './apiConnector.js';

const apiKeyForm = document.getElementById('apiKeyForm');
const apiKeyInput = document.getElementById('apiKeyInput');
const devicesContainer = document.querySelector('.devices-detail');
const devicePowerSwitch = document.querySelector('.device-power');
const deviceBrightnessSlider = document.querySelector('.device-brightness');

const persistedAPIKey = localStorage.getItem(API_KEY_ID);

if(persistedAPIKey){
	const [device] = await getDevices({apiKey:JSON.parse(persistedAPIKey), persistApiKey:true});
	getDeviceState({device, apiKey: JSON.parse(persistedAPIKey)});
}

apiKeyForm.addEventListener('submit', async (event) => {
	event.preventDefault();

	const fields = new FormData(event.target);

	const apiKey = fields.get('apiKeyInput');
	const persistApiKey = fields.get('persistApiKeyCheck') === 'on';

	const [device] = await getDevices({apiKey, persistApiKey});
	getDeviceState({device, apiKey});
});

devicePowerSwitch.addEventListener('click', async () => {
	await togglePower({apiKey: apiKeyInput.value, devicePowerSwitch: devicePowerSwitch.checked, deviceMac: devicesContainer.dataset.mac, deviceSku: devicesContainer.dataset.sku, apiKey: apiKeyInput.value, devicePowerSwitch: devicePowerSwitch.checked, deviceMac: devicesContainer.dataset.mac, deviceSku: devicesContainer.dataset.sku});
});

deviceBrightnessSlider.addEventListener('input', async (event) => {
	document.querySelector('.brightness-output-value').textContent = event.target.value;
	await controlBrightness({apiKey: apiKeyInput.value, brightness: event.target.value, deviceMac: devicesContainer.dataset.mac, deviceSku: devicesContainer.dataset.sku, apiKey: apiKeyInput.value, devicePowerSwitch: devicePowerSwitch.checked, deviceMac: devicesContainer.dataset.mac, deviceSku: devicesContainer.dataset.sku})
});

