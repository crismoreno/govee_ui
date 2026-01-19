import { getDeviceScenes } from './apiConnector.js';
import { apiCallSuccess } from './helpers.js';

const deviceScenesContainer = document.querySelector(
  '.dynamic-scenes-container'
);

const displayDeviceScenes = (scenes) => {
  scenes
    .sort(({ name: previousName }, { name: nextName }) =>
      previousName.localeCompare(nextName)
    )
    .forEach((scene) => {
      const sceneDiv = document.createElement('div');
      sceneDiv.classList.add('scene-item', 'text-center', 'col-4', 'p-1');
      sceneDiv.dataset.paramId = scene.value.paramId;
      sceneDiv.dataset.id = scene.value.id;
      sceneDiv.innerHTML = `
			<button class="btn btn-outline-primary w-100" type="button" data-id="${scene.value.id}" data-test-paramid="${scene.value.paramId}">${scene.name}</button>
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
