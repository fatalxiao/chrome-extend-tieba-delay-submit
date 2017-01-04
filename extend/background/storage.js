/**
 * 是否是第一次运行
 */
var isFirstRun = {
	get() {
		return localStorage.getItem('isFirstRun');
	},
	set(isFirstRun) {
		localStorage.setItem('isFirstRun', isFirstRun);
	}
};

/**
 * 是否开启延迟发送功能
 */
var isDelaySend = {
	get() {
		return localStorage.getItem('isDelaySend');
	},
	set(isDelaySend) {
		localStorage.setItem('isDelaySend', isDelaySend);
		setDelaySend(isDelaySend);
	}
};

/**
 * 延迟发送等待时长
 */
var delaySendSecond = {
	get() {
		return localStorage.getItem('delaySendSecond');
	},
	set(delaySendSecond) {
		localStorage.setItem('delaySendSecond', delaySendSecond);
		setDelaySendSecond(delaySendSecond);
	}
};

/**
 * 是否开启自动打开页面功能
 */
var isAutoOpenUrl = {
	get() {
		return localStorage.getItem('isAutoOpenUrl');
	},
	set(isAutoOpenUrl) {
		localStorage.setItem('isAutoOpenUrl', isAutoOpenUrl);
	}
};

/**
 * 自动打开的页面（||分割）
 */
var autoOpenUrl = {
	get() {
		return localStorage.getItem('autoOpenUrl');
	},
	set(autoOpenUrl) {
		localStorage.setItem('autoOpenUrl', autoOpenUrl);
	},
	append(url) {

		let autoOpenUrl = this.get();

		if (autoOpenUrl) {
			autoOpenUrl = autoOpenUrl.split(AUTO_OPEN_URL_SEPARATOR)
				.push(url).join(AUTO_OPEN_URL_SEPARATOR);
		} else {
			autoOpenUrl = url;
		}

		this.set(autoOpenUrl);

	}
};

/**
 * 控制是否可发送
 */
var sendForbidden = {
	get() {
		return sessionStorage.getItem("Tieba_Send_Forbidden");
	},
	set(value) {
		sessionStorage.setItem("Tieba_Send_Forbidden", value);
	}
};