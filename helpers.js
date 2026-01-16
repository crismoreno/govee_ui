export const createInfoRow = () => {
	const deviceInfoRow = document.createElement('div')
	deviceInfoRow.classList.add('row');
	deviceInfoRow.classList.add('mt-3');
	deviceInfoRow.classList.add('justify-content-center');
	return deviceInfoRow;
}

export const createInfoCol = (width) => {
	const deviceInfoCol = document.createElement('div')
	deviceInfoCol.classList.add(`col-${width}`);
	return deviceInfoCol;
}

export const apiCallSuccess = (response) => {
	return response && response.code === 200;
}