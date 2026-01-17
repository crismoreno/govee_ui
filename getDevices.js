import {API_BASE_URL, API_KEY_ID} from './constants.js';
import {createInfoRow, createInfoCol, apiCallSuccess} from './helpers.js'
import {getDevices as getDevicesController} from './apiConnector.js';

const devicesContainer = document.querySelector('.devices-detail');
const apiKeyInput = document.getElementById('apiKeyInput');
const persistAPIKeyCheck = document.getElementById('persistApiKeyCheck');
const submitApiKeyButton = document.getElementById('submitApiKey');

const  displaySku = (sku, deviceInfoRow) => {
	const skuCol = createInfoCol({width: 12 , lgWidth: 3});
	skuCol.innerHTML = `<div class="input-group">
	<span class="input-group-text" id="inputGroup-sizing-sm">SKU</span>
	<input type="text" class="form-control device-sku" value="${sku}" readonly disabled>
	</div>`;

	deviceInfoRow.appendChild(skuCol);
};

const  displayDevice = (device, deviceInfoRow) => {
	const deviceCol = createInfoCol({width: 12 , lgWidth: 3});
	deviceCol.innerHTML = `<div class="input-group">
	<span class="input-group-text" id="inputGroup-sizing-sm">Device</span>
	<input type="text" class="form-control device-mac" value="${device}" readonly disabled>
	</div>`;
	deviceInfoRow.appendChild(deviceCol);
};

const  displayDeviceName = (deviceName, deviceInfoRow) => {
	const deviceNameCol = createInfoCol({width: 12, lgWidth: 6});
	deviceNameCol.innerHTML = `<div class="input-group">
	<span class="input-group-text" id="inputGroup-sizing-sm">Device Name</span>
	<input type="text" class="form-control" value="${deviceName}" readonly disabled>
	</div>`;
	deviceInfoRow.appendChild(deviceNameCol);
};

export const displayDeviceData = ({sku, device, deviceName}) => {
	devicesContainer.innerHTML = '';
	const deviceInfoRow1 = createInfoRow();
	devicesContainer.appendChild(deviceInfoRow1);

	displayDeviceName(deviceName, deviceInfoRow1)
	const deviceInfoRow2 = createInfoRow();
	devicesContainer.appendChild(deviceInfoRow2);
	displaySku(sku, deviceInfoRow2)
	displayDevice(device, deviceInfoRow2)
}

const getDevices = async ({apiKey, persistApiKey}) => {
	const goveeDevicesApiResponse = await getDevicesController(apiKey);

	if(apiCallSuccess(goveeDevicesApiResponse)){
		apiKeyInput.value = apiKey;
		apiKeyInput.disabled = true;
		persistAPIKeyCheck.checked = true;
		persistAPIKeyCheck.disabled = true;
		submitApiKeyButton.disabled = true;

		devicesContainer.dataset.mac = goveeDevicesApiResponse.data[0].device;
		devicesContainer.dataset.sku = goveeDevicesApiResponse.data[0].sku;

		if(persistApiKey){
			localStorage.setItem(API_KEY_ID, JSON.stringify(apiKey));
		}

		displayDeviceData(goveeDevicesApiResponse.data[0])

		return goveeDevicesApiResponse.data;
	}
}

export default getDevices;