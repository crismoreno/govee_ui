import { API_BASE_URL, API_KEY_ID } from './constants.js';

export const getDevices = async (apiKey) => {
  const devices = await fetch(`${API_BASE_URL}/user/devices`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      [API_KEY_ID]: apiKey
    }
  });

  return await devices.json();
};

export const getStateByDevice = async ({ sku, device }, apiKey) => {
  const deviceState = await fetch(`${API_BASE_URL}/device/state`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [API_KEY_ID]: apiKey
    },
    body: JSON.stringify({
      requestId: crypto.randomUUID(),
      payload: {
        sku: sku,
        device: device
      }
    })
  });

  return await deviceState.json();
};

export const togglePower = async ({
  apiKey,
  devicePowerSwitch,
  deviceSku,
  deviceMac
}) => {
  const togglePower = await fetch(`${API_BASE_URL}/device/control`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [API_KEY_ID]: apiKey
    },
    body: JSON.stringify({
      requestId: crypto.randomUUID(),
      payload: {
        sku: deviceSku,
        device: deviceMac,
        capability: {
          type: 'devices.capabilities.on_off',
          instance: 'powerSwitch',
          value: devicePowerSwitch ? 1 : 0
        }
      }
    })
  });

  return await togglePower.json();
};

export const setBrightness = async ({
  apiKey,
  brightness,
  deviceSku,
  deviceMac
}) => {
  const setBrightness = await fetch(`${API_BASE_URL}/device/control`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [API_KEY_ID]: apiKey
    },
    body: JSON.stringify({
      requestId: crypto.randomUUID(),
      payload: {
        sku: deviceSku,
        device: deviceMac,
        capability: {
          type: 'devices.capabilities.range',
          instance: 'brightness',
          value: Number(brightness)
        }
      }
    })
  });

  return await setBrightness.json();
};

export const getDeviceScenes = async ({ apiKey, deviceSku, deviceMac }) => {
  const getDeviceScenes = await fetch(`${API_BASE_URL}/device/scenes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [API_KEY_ID]: apiKey
    },
    body: JSON.stringify({
      requestId: crypto.randomUUID(),
      payload: {
        sku: deviceSku,
        device: deviceMac
      }
    })
  });

  return await getDeviceScenes.json();
};

export const setDynamicScene = async ({
  apiKey,
  deviceSku,
  deviceMac,
  paramId,
  id
}) => {
  const setDynamicScene = await fetch(`${API_BASE_URL}/device/control`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [API_KEY_ID]: apiKey
    },
    body: JSON.stringify({
      requestId: crypto.randomUUID(),
      payload: {
        sku: deviceSku,
        device: deviceMac,
        capability: {
          type: 'devices.capabilities.dynamic_scene',
          instance: 'lightScene',
          value: {
            paramId: Number(paramId),
            id: Number(id)
          }
        }
      }
    })
  });

  return await setDynamicScene.json();
};

export const setMusicMode = async ({
  apiKey,
  deviceSku,
  deviceMac,
  id,
  sensitivity,
  name
}) => {
  console.log({
    apiKey,
    deviceSku,
    deviceMac,
    id,
    sensitivity,
    name
  });
  const setDynamicScene = await fetch(`${API_BASE_URL}/device/control`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [API_KEY_ID]: apiKey
    },
    body: JSON.stringify({
      requestId: crypto.randomUUID(),
      payload: {
        sku: deviceSku,
        device: deviceMac,
        capability: {
          type: 'devices.capabilities.music_setting',
          instance: 'musicMode',
          value: {
            musicMode: Number(id),
            sensitivity: Number(sensitivity)
          }
        }
      }
    })
  });

  return await setDynamicScene.json();
};
