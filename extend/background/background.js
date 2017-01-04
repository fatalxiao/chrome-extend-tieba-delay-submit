function openOptionPage() {
	chrome.tabs.query({
		currentWindow: true
	}, tabs => {

		const optionUrl = chrome.extension.getURL('option/option.html');
		const optionTab = tabs.filter(tab => {
			return tab.url.includes(optionUrl);
		});

		if (optionTab.length > 0) { // active tab if option page has been opened in this window
			chrome.tabs.update(optionTab[0].id, {
				selected: true
			});
		} else { // else open new tab of option page
			chrome.tabs.create({
				url: optionUrl,
				selected: true
			});
		}

	});
}

/**
 * block submit request
 */
chrome.webRequest.onBeforeRequest.addListener(details => {
	if (
		isDelaySubmit.get() == 'true'
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
 * onMessage handler
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

	switch (request.type) {
		case 'setSubmitForbidden':
			sendForbidden.set(request.value);
			sendResponse({});
			return;
		case 'isDelaySubmit':
			sendResponse({
				isDelaySubmit: isDelaySubmit.get()
			});
			return;
		case 'delaySubmitSecond':
			sendResponse({
				delaySubmitSecond: delaySubmitSecond.get()
			});
			return;
	}

});

// first run
if (isFirstRun.get() != "false") {

	// init
	isFirstRun.set("false");
	isDelaySubmit.set("false");
	delaySubmitSecond.set("5");
	sendForbidden.set("false");

}