import { getDeviceScenes } from './apiConnector.js';
import { apiCallSuccess } from './helpers.js';

const deviceScenesContainer = document.querySelector(
  '.device-scenes-container'
);

const displayDeviceScenes = (scenes) => {
  scenes.forEach((scene) => {
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
    sceneDiv.innerHTML = `
			<span>${scene.name}</span>
		`;
    deviceScenesContainer.appendChild(sceneDiv);
  });
};

const getDevicesScenes = async ({ apiKey, device: { sku, device } }) => {
  const devicesScenesResponse = await getDeviceScenes({
    apiKey,
    deviceMac: device,
    deviceSku: sku
  });
  if (apiCallSuccess(devicesScenesResponse)) {
    const [capabilities] = devicesScenesResponse.payload.capabilities;
    displayDeviceScenes(capabilities.parameters.options);
    return capabilities.parameters.options;
  }
};

export default getDevicesScenes;
