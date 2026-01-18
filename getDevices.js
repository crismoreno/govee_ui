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
  musicModes.forEach((scene) => {
    const sceneDiv = document.createElement('div');
    sceneDiv.classList.add(
      'scene-item',
      'm-1',
      'p-2',
      'border',
      'rounded',
      'col-auto',
      'text-center'
    );
    sceneDiv.dataset.paramId = scene.value.paramId;
    sceneDiv.dataset.id = scene.value.id;
    sceneDiv.innerHTML = `<span>${scene.name}</span>`;
    musicModesContainer.appendChild(sceneDiv);
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
