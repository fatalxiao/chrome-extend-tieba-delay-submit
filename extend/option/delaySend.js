/**
 * Tieba Delay Submit
 */
var DelaySend = {
	bindEvent: function () {

		var BG = chrome.extension.getBackgroundPage();

		$('#switchDelaySend').click(function () {
			if ($(this).hasClass('switchEnable')) {
				switchBtn.disable($(this));
				BG.isDelaySubmit.set('false');
			} else if ($(this).hasClass('switchDisable')) {
				switchBtn.enable($(this));
				BG.isDelaySubmit.set('true');
			}
		});

		$('.numberFieldBtnUp').click(function () {
			numberField.add($(this).parent(), function (second) {
				BG.delaySubmitSecond.set(second);
			});
		});

		$('.numberFieldBtnDown').click(function () {
			numberField.minus($(this).parent(), function (second) {
				BG.delaySubmitSecond.set(second);
			});
		});

		$('.numberFieldText').bind('input', function () {
			BG.delaySubmitSecond.set($(this).val());
		});

	},
	init: function (callback) {

		var BG = chrome.extension.getBackgroundPage();

		if (BG.isDelaySubmit.get() == 'true') {
			switchBtn.enable($('#switchDelaySend'));
		} else {
			switchBtn.disable($('#switchDelaySend'));
		}

		var delaySubmitSecond = BG.delaySubmitSecond.get();
		if (delaySubmitSecond && !isNaN(delaySubmitSecond)) {
			$('#delaySubmitSecond .numberFieldText').val(delaySubmitSecond);
		}

		this.bindEvent();

		callback && callback();

	}
};