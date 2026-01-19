export const apiCallSuccess = (response) => {
  return response && response.code === 200;
};

export const findCapabilityByType = ({ capabilities, type }) => {
  return capabilities.find(({ instance }) => instance === type);
};

export const findFieldByName = ({ fields, name }) => {
  return fields.find(({ fieldName }) => name === fieldName);
};
