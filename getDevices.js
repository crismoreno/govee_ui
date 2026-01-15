import {API_BASE_URL} from './constants.js';

const devicesContainer = document.querySelector('.devices-detail');

const getDevices = async (apiKey)  => {
	const devices = await fetch(`${API_BASE_URL}/user/devices`, {
		method: 'GET',
		headers: {
				'Content-Type': 'application/json',
				'Govee-API-Key': apiKey
		}
	});

	return await devices.json();
};

const createInfoRow = () => {
	const deviceInfoRow = document.createElement('div')
	deviceInfoRow.classList.add('row');
	deviceInfoRow.classList.add('mt-3');
	return deviceInfoRow;
}
const createInfoCol = () => {
	const deviceInfoCol = document.createElement('div')
	deviceInfoCol.classList.add('col-4');
	return deviceInfoCol;
}

const  displaySku = (sku, deviceInfoRow) => {
	const skuCol = createInfoCol();
	skuCol.innerHTML = `<div class="input-group">
	<span class="input-group-text" id="inputGroup-sizing-sm">SKU</span>
	<input type="text" class="form-control" value="${sku}" readonly disabled>
	</div>`;

	deviceInfoRow.appendChild(skuCol);
};

const  displayDevice = (device, deviceInfoRow) => {
	const deviceCol = createInfoCol();
	deviceCol.innerHTML = `<div class="input-group">
	<span class="input-group-text" id="inputGroup-sizing-sm">Device</span>
	<input type="text" class="form-control" value="${device}" readonly disabled>
	</div>`;
	deviceInfoRow.appendChild(deviceCol);
};

const  displayDeviceName = (deviceName, deviceInfoRow) => {
	const deviceNameCol = createInfoCol();
	deviceNameCol.innerHTML = `<div class="input-group">
	<span class="input-group-text" id="inputGroup-sizing-sm">Device Name</span>
	<input type="text" class="form-control" value="${deviceName}" readonly disabled>
	</div>`;
	deviceInfoRow.appendChild(deviceNameCol);
};

export const displayDeviceData = ({sku, device, deviceName}) => {
	devicesContainer.innerHTML = '';
	const deviceInfoRow = createInfoRow();
	devicesContainer.appendChild(deviceInfoRow);

	displaySku(sku, deviceInfoRow)
	displayDevice(device, deviceInfoRow)
	displayDeviceName(deviceName, deviceInfoRow)
}


export default getDevices;