import { API_KEY_ID } from './constants.js';
import getDevices from './getDevices.js';
import getStateByDevice from './getStateByDevice.js';
import {
  togglePower,
  setBrightness,
  setDynamicScene,
  setMusicMode,
  setSnapshot
} from './apiConnector.js';
import getDevicesScenes from './getDeviceScenes.js';
import { showApiResponeToaster } from './helpers.js';

const apiKeyForm = document.getElementById('apiKeyForm');
const apiKeyInput = document.getElementById('apiKeyInput');
const devicesContainer = document.querySelector('.devices-detail');

const persistedAPIKey = localStorage.getItem(API_KEY_ID);

const onApiKeyProvided = async (apiKey, persistApiKey) => {
  const [device] = await getDevices({ apiKey, persistApiKey });
  getStateByDevice({ device, apiKey });
  getDevicesScenes({ device, apiKey });
};

if (persistedAPIKey) {
  onApiKeyProvided(JSON.parse(persistedAPIKey), true);
}

apiKeyForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fields = new FormData(event.target);

  const apiKey = fields.get('apiKeyInput');
  const persistApiKey = fields.get('persistApiKeyCheck') === 'on';

  onApiKeyProvided(apiKey, persistApiKey);
});

document.querySelector('.device-power').addEventListener('click', async () => {
  const response = await togglePower({
    apiKey: apiKeyInput.value,
    devicePowerSwitch: document.querySelector('.device-power').checked,
    deviceMac: devicesContainer.dataset.mac,
    deviceSku: devicesContainer.dataset.sku
  });

  showApiResponeToaster(response);
});

document
  .querySelector('.device-brightness')
  .addEventListener('input', async (event) => {
    document.querySelector('.brightness-output-value').textContent =
      event.target.value;
    const response = await setBrightness({
      apiKey: apiKeyInput.value,
      brightness: event.target.value,
      deviceMac: devicesContainer.dataset.mac,
      deviceSku: devicesContainer.dataset.sku
    });

    showApiResponeToaster(response);
  });

document
  .querySelector('.dynamic-scenes-container')
  .addEventListener('click', async (event) => {
    const sceneItem = event.target.closest('.scene-item');
    const response = await setDynamicScene({
      apiKey: apiKeyInput.value,
      deviceSku: devicesContainer.dataset.sku,
      deviceMac: devicesContainer.dataset.mac,
      paramId: sceneItem.dataset.paramId,
      id: sceneItem.dataset.id
    });

    showApiResponeToaster(response);
  });

document
  .querySelector('.music-modes-container')
  .addEventListener('click', async (event) => {
    const musicModeItem = event.target.closest('.music-mode-item');
    const sensitivityInput = musicModeItem.querySelector(
      '.music-mode-sensitivity'
    );

    const response = await setMusicMode({
      apiKey: apiKeyInput.value,
      deviceSku: devicesContainer.dataset.sku,
      deviceMac: devicesContainer.dataset.mac,
      id: musicModeItem.dataset.modeId,
      name: musicModeItem.dataset.modeName,
      sensitivity: sensitivityInput.value
    });

    showApiResponeToaster(response);
  });

document
  .querySelector('.device-snapshots-container')
  .addEventListener('click', async (event) => {
    const musicModeItem = event.target.closest('.set-snapshot-button');
    const response = await setSnapshot({
      apiKey: apiKeyInput.value,
      deviceSku: devicesContainer.dataset.sku,
      deviceMac: devicesContainer.dataset.mac,
      id: musicModeItem.dataset.snapshotid
    });

    showApiResponeToaster(response);
  });
