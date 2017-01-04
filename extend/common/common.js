/**
 * find el interval time
 * @type {number}
 */
const INTERVAL_TIME = 1000 / 60;

function setSubmitForbidden(value, callback) {
	chrome.runtime.sendMessage({
		type: 'setSubmitForbidden',
		value
	}, callback);
}

function setDelaySubmit(isDelaySubmit, callback) {
	chrome.tabs.query({}, tabs => {

		tabs.filter(tab => {
			return tab.url.includes('tieba.baidu.com');
		}).forEach(tab => {
			chrome.tabs.sendMessage(tab.id, {
				type: 'setDelaySubmit',
				isDelaySubmit
			}, callback);
		});

	});
}

function setDelaySubmitSecond(delaySubmitSecond, callback) {
	chrome.tabs.query({}, tabs => {

		tabs.filter(tab => {
			return tab.url.includes('tieba.baidu.com');
		}).forEach(tab => {
			chrome.tabs.sendMessage(tab.id, {
				type: 'setDelaySubmitSecond',
				delaySubmitSecond
			}, callback);
		});

	});
}

String.prototype.replaceAll = function (s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}   