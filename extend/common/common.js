/**
 * 循环查找元素间隔时间
 * @type {number}
 */
const INTERVAL_TIME = 1000 / 60;

/**
 *
 * @type {string}
 */
const AUTO_OPEN_URL_SEPARATOR = '||';

/**
 *
 * @param value
 * @param callback
 */
function setSendForbidden(value, callback) {
	chrome.runtime.sendMessage({
		type: 'setSendForbidden',
		value
	}, callback);
}

/**
 *
 * @param value
 * @param callback
 */
function setDelaySend(isDelaySend, callback) {
	chrome.tabs.query({}, tabs => {

		tabs.filter(tab => {
			return tab.url.includes('tieba.baidu.com');
		}).forEach(tab => {
			chrome.tabs.sendMessage(tab.id, {
				type: 'setDelaySend',
				isDelaySend
			}, callback);
		});

	});
}

/**
 *
 * @param value
 * @param callback
 */
function setDelaySendSecond(delaySendSecond, callback) {
	chrome.tabs.query({}, tabs => {

		tabs.filter(tab => {
			return tab.url.includes('tieba.baidu.com');
		}).forEach(tab => {
			chrome.tabs.sendMessage(tab.id, {
				type: 'setDelaySendSecond',
				delaySendSecond
			}, callback);
		});

	});
}

/**
 * 是否是URL
 * @param url
 * @returns {boolean}
 */
function isUrl(url) {
	var reg = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/;
	return reg.test(url);
};

/**
 * replaceAll
 * @param s1
 * @param s2
 * @returns {string}
 */
String.prototype.replaceAll = function (s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}   