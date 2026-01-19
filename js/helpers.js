export const apiCallSuccess = (response) => {
  return response && response.code === 200;
};

export const findCapabilityByType = ({ capabilities, type }) => {
  return capabilities.find(({ instance }) => instance === type);
};

export const findFieldByName = ({ fields, name }) => {
  return fields.find(({ fieldName }) => name === fieldName);
};

export const showApiResponeToaster = (response) => {
  const toaster = document.querySelector('.api-response-toast');
  const toasterBody = document.querySelector('.api-response-toast-body');
  toaster.classList.remove('hide');
  toaster.classList.add('show');
  toasterBody.textContent = `${response.code}: ${response.msg}`;

  setTimeout(() => {
    toaster.classList.remove('show');
    toaster.classList.add('hide');
  }, 3000);
};

document
  .querySelector('.api-response-toast-close')
  .addEventListener('click', () => {
    const toaster = document.querySelector('.api-response-toast');
    toaster.classList.remove('show');
    toaster.classList.add('hide');
  });
