export const createInfoRow = () => {
  const deviceInfoRow = document.createElement('div');
  deviceInfoRow.classList.add('row');
  deviceInfoRow.classList.add('justify-content-center');
  deviceInfoRow.classList.add('m-auto');
  return deviceInfoRow;
};

export const createInfoCol = ({ width, lgWidth }) => {
  const deviceInfoCol = document.createElement('div');
  deviceInfoCol.classList.add(`col-${width}`);
  deviceInfoCol.classList.add(`col-lg-${lgWidth}`);
  deviceInfoCol.classList.add('mt-3');
  return deviceInfoCol;
};

export const apiCallSuccess = (response) => {
  return response && response.code === 200;
};
