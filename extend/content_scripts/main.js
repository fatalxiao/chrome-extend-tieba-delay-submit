let delaySecond = 5;

function validDelaySecond(value) {
	return value && !isNaN(value) ? parseInt(value) : 5;
}

function replaceAll() {
	replaceSubmit();
	// replaceReply();
	// replaceReplyReply();
	// replaceReplySay();
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
		case 'setDelaySend':
			if (request.isDelaySend == 'true') {
				setSendForbidden('true');
				bindAll();
				replaceAll();
			} else {
				setSendForbidden('false');
				unbindAll();
				resetAll();
			}
			return;
		case 'setDelaySendSecond':
			delaySecond = validDelaySecond(request.delaySendSecond);
			return;
	}

	sendResponse({});

});

$(function () {

	/**
	 * 获取延迟秒数
	 */
	chrome.runtime.sendMessage({
		type: 'delaySendSecond'
	}, response => delaySecond = validDelaySecond(response.delaySendSecond));

	/**
	 * 获取是否延迟发送
	 */
	chrome.runtime.sendMessage({
		type: 'isDelaySend'
	}, response => {
		if (response.isDelaySend == 'true') {
			setSendForbidden('true');
			bindAll();
			replaceAll();
		}
	});

});