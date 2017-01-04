/**
 * first run or not
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
 * delay submit on / off
 */
var isDelaySubmit = {
	get() {
		return localStorage.getItem('isDelaySubmit');
	},
	set(isDelaySubmit) {
		localStorage.setItem('isDelaySubmit', isDelaySubmit);
		setDelaySubmit(isDelaySubmit);
	}
};

/**
 * delay time
 */
var delaySubmitSecond = {
	get() {
		return localStorage.getItem('delaySubmitSecond');
	},
	set(delaySubmitSecond) {
		localStorage.setItem('delaySubmitSecond', delaySubmitSecond);
		setDelaySubmitSecond(delaySubmitSecond);
	}
};

/**
 * control submit or not
 */
var sendForbidden = {
	get() {
		return sessionStorage.getItem("TIEBA_SUBMIT_FORBIDDEN");
	},
	set(value) {
		sessionStorage.setItem("TIEBA_SUBMIT_FORBIDDEN", value);
	}
};