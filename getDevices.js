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
	deviceInfoRow.classList.add('justify-content-center');
	return deviceInfoRow;
}
const createInfoCol = (width) => {
	const deviceInfoCol = document.createElement('div')
	deviceInfoCol.classList.add(`col-${width}`);
	return deviceInfoCol;
}

const  displaySku = (sku, deviceInfoRow) => {
	const skuCol = createInfoCol(3);
	skuCol.innerHTML = `<div class="input-group">
	<span class="input-group-text" id="inputGroup-sizing-sm">SKU</span>
	<input type="text" class="form-control device-sku" value="${sku}" readonly disabled>
	</div>`;

	deviceInfoRow.appendChild(skuCol);
};

const  displayDevice = (device, deviceInfoRow) => {
	const deviceCol = createInfoCol(3);
	deviceCol.innerHTML = `<div class="input-group">
	<span class="input-group-text" id="inputGroup-sizing-sm">Device</span>
	<input type="text" class="form-control device-mac" value="${device}" readonly disabled>
	</div>`;
	deviceInfoRow.appendChild(deviceCol);
};

const  displayDeviceName = (deviceName, deviceInfoRow) => {
	const deviceNameCol = createInfoCol(6);
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


export default getDevices;