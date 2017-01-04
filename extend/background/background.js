/**
 * 打开选项页面
 */
function openOptionPage() {
	chrome.tabs.query({
		currentWindow: true
	}, tabs => {

		const optionUrl = chrome.extension.getURL('option/option.html');
		const optionTab = tabs.filter(tab => {
			return tab.url.includes(optionUrl);
		});

		if (optionTab.length > 0) { // 如果当前窗口中有已经打开的窗口，切换到此窗口
			chrome.tabs.update(optionTab[0].id, {
				selected: true
			});
		} else { // 不然打开新窗口
			chrome.tabs.create({
				url: optionUrl,
				selected: true
			});
		}

	});
}

/**
 * 拦截发送的请求
 */
chrome.webRequest.onBeforeRequest.addListener(details => {
	if (
		isDelaySend.get() == 'true'
		&& details.url == 'http://tieba.baidu.com/f/commit/post/add'
		&& sendForbidden.get() != 'false'
	) {
		return {
			cancel: true
		};
	}
}, {
	urls: ['*://tieba.baidu.com/*']
}, ['blocking']);

/**
 * onMessage 处理
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

	switch (request.type) {
		case 'setSendForbidden':
			sendForbidden.set(request.value);
			sendResponse({});
			return;
		case 'isDelaySend':
			sendResponse({
				isDelaySend: isDelaySend.get()
			});
			return;
		case 'delaySendSecond':
			sendResponse({
				delaySendSecond: delaySendSecond.get()
			});
			return;
	}

});

// 第一次运行
if (isFirstRun.get() != "false") {

	// 初始化
	isFirstRun.set("false");
	isDelaySend.set("false");
	delaySendSecond.set("5");
	isAutoOpenUrl.set("false");
	autoOpenUrl.set("");
	sendForbidden.set("false");

	openOptionPage();

}

// 启动自动打开网页
if (isAutoOpenUrl.get() == 'true') {
	const urls = autoOpenUrl.get();
	urls && urls.split(AUTO_OPEN_URL_SEPARATOR).forEach(url => chrome.tabs.create({url}));
}