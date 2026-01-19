import { API_KEY_ID, INSTANCE_IDS } from './constants.js';
import {
  apiCallSuccess,
  findCapabilityByType,
  findFieldByName
} from './helpers.js';
import { getDevices as getDevicesController } from './apiConnector.js';

const devicesContainer = document.querySelector('.devices-detail');
const apiKeyInput = document.getElementById('apiKeyInput');
const persistAPIKeyCheck = document.getElementById('persistApiKeyCheck');
const submitApiKeyButton = document.getElementById('submitApiKey');

const displaySku = (sku) => {
  document.getElementById('deviceSku').value = sku;
};

const displayDevice = (device) => {
  document.getElementById('deviceMac').value = device;
};

const displayDeviceName = (deviceName) => {
  document.getElementById('deviceName').value = deviceName;
};

const displayDeviceMusicModes = (musicModesFields) => {
  const musicModesContainer = document.querySelector('.music-modes-container');

  const musicModes = findFieldByName({
    fields: musicModesFields,
    name: INSTANCE_IDS.MUSIC_MODE
  }).options;
  musicModes.forEach((musicMode) => {
    const musicModeDiv = document.createElement('div');
    musicModeDiv.classList.add(
      'm-1',
      'ps-2',
      'border',
      'rounded',
      'mx-auto',
      'mb-1'
    );
    musicModeDiv.dataset.id = musicMode.value;
    musicModeDiv.innerHTML = `
		<div class="w-30 d-flex justify-content-between align-items-center music-mode-item">
			<span class="me-2">${musicMode.name}</span>
			<div class="w-100 align-items-center d-flex">
				<input type="range" class="form-range me-2 music-mode-sensitivity" min="0" max="100" step="5" id="range3" value="100"/>
			</div>
				<button type="button" class="btn btn-primary confirm-music-mode" data-mode-id="${musicMode.value} data-mode-name="${musicMode.name}"><span class="material-symbols-outlined">check_small</span></button>
		</div>`;
    musicModesContainer.appendChild(musicModeDiv);
  });
};

const displayDeviceSnapshots = (snapshotFields) => {
  const snapshotsContainer = document.querySelector('.snapshots-container');
  snapshotFields.forEach((snapshot) => {
    const snapshotDiv = document.createElement('div');
    snapshotDiv.classList.add('snapshot-item', 'bordered', 'rounded');
    snapshotDiv.dataset.id = snapshot.value;
    snapshotDiv.innerHTML = `
		<button class="btn btn-outline-primary set-snapshot-button" type="button" style="width: 100px; height: 100px;"data-snapshotId="${snapshot.value}">${snapshot.name}</button>
		`;
    snapshotsContainer.appendChild(snapshotDiv);
  });
};

const displayDeviceData = ({ sku, device, deviceName, capabilities }) => {
  devicesContainer.classList.remove('d-none');
  displayDeviceName(deviceName);
  displaySku(sku);
  displayDevice(device);
  displayDeviceMusicModes(
    findCapabilityByType({ capabilities, type: INSTANCE_IDS.MUSIC_MODE })
      .parameters.fields
  );
  displayDeviceSnapshots(
    findCapabilityByType({ capabilities, type: INSTANCE_IDS.SNAPSHOT })
      .parameters.options
  );
};

const getDevices = async ({ apiKey, persistApiKey }) => {
  const goveeDevicesApiResponse = await getDevicesController(apiKey);

  if (apiCallSuccess(goveeDevicesApiResponse)) {
    apiKeyInput.value = apiKey;
    apiKeyInput.disabled = true;
    persistAPIKeyCheck.checked = true;
    persistAPIKeyCheck.disabled = true;
    submitApiKeyButton.disabled = true;

    devicesContainer.dataset.mac = goveeDevicesApiResponse.data[0].device;
    devicesContainer.dataset.sku = goveeDevicesApiResponse.data[0].sku;

    if (persistApiKey) {
      localStorage.setItem(API_KEY_ID, JSON.stringify(apiKey));
    }

    displayDeviceData(goveeDevicesApiResponse.data[0]);

    return goveeDevicesApiResponse.data;
  }
};

export default getDevices;
