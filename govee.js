import {STORED_KEY_NAME} from './constants.js';
import getDevices, {displayDeviceData} from './getDevices.js';

const apiKeyForm = document.getElementById('apiKeyForm');
const apiKeyInput = document.getElementById('apiKeyInput');
const persistAPIKeyCheck = document.getElementById('persistApiKeyCheck');
const submitApiKeyButton = document.getElementById('submitApiKey');
const devicesContainer = document.querySelector('.devices-detail');

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

	devicesContainer.innerHTML = `<div class="spinner-border" role="status"></div>`

	useApiKey(apiKey);
});