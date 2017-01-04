let delaySecond = 5;

function validDelaySecond(value) {
	return value && !isNaN(value) ? parseInt(value) : 5;
}

function replaceAll() {
	replaceSubmit();
}

function resetAll() {
	resetSubmit();
}

function bindAll() {
	bindCancelSend();
	bindSubmitEvent();
}

function unbindAll() {
	unbindCancelSend();
	unbindSubmitEvent();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

	switch (request.type) {
		case 'setDelaySubmit':
			if (request.isDelaySubmit == 'true') {
				setSubmitForbidden('true');
				bindAll();
				replaceAll();
			} else {
				setSubmitForbidden('false');
				unbindAll();
				resetAll();
			}
			return;
		case 'setDelaySubmitSecond':
			delaySecond = validDelaySecond(request.delaySubmitSecond);
			return;
	}

	sendResponse({});

});

$(function () {

	/**
	 * get delay time
	 */
	chrome.runtime.sendMessage({
		type: 'delaySubmitSecond'
	}, response => delaySecond = validDelaySecond(response.delaySubmitSecond));

	/**
	 * get is delay submit
	 */
	chrome.runtime.sendMessage({
		type: 'isDelaySubmit'
	}, response => {
		if (response.isDelaySubmit == 'true') {
			setSubmitForbidden('true');
			bindAll();
			replaceAll();
		}
	});

});