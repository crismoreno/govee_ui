import { API_KEY_ID } from './constants.js';
import getDevices from './getDevices.js';
import getStateByDevice from './getStateByDevice.js';
import { togglePower, setBrightness, setDynamicScene } from './apiConnector.js';
import getDevicesScenes from './getDeviceScenes.js';

const apiKeyForm = document.getElementById('apiKeyForm');
const apiKeyInput = document.getElementById('apiKeyInput');
const devicesContainer = document.querySelector('.devices-detail');
const devicePowerSwitch = document.querySelector('.device-power');
const deviceBrightnessSlider = document.querySelector('.device-brightness');
const sceneItems = document.querySelector('.device-dynamic-scenes');

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

devicePowerSwitch.addEventListener('click', async () => {
  await togglePower({
    apiKey: apiKeyInput.value,
    devicePowerSwitch: devicePowerSwitch.checked,
    deviceMac: devicesContainer.dataset.mac,
    deviceSku: devicesContainer.dataset.sku
  });
});

deviceBrightnessSlider.addEventListener('input', async (event) => {
  document.querySelector('.brightness-output-value').textContent =
    event.target.value;
  await setBrightness({
    apiKey: apiKeyInput.value,
    brightness: event.target.value,
    deviceMac: devicesContainer.dataset.mac,
    deviceSku: devicesContainer.dataset.sku
  });
});

sceneItems.addEventListener('click', async (event) => {
  const sceneItem = event.target.closest('.scene-item');
  if (sceneItem) {
    await setDynamicScene({
      apiKey: apiKeyInput.value,
      deviceSku: devicesContainer.dataset.sku,
      deviceMac: devicesContainer.dataset.mac,
      paramId: sceneItem.dataset.paramId,
      id: sceneItem.dataset.id
    });
  }
});
