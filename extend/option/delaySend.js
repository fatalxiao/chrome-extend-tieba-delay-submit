/**
 * 延迟发送
 */
var DelaySend = {
	show: function () {
		$('#optionContentHeader').html('贴吧延迟发送');
		Option.switchItem($('#optionListItemDelaySend'), $('#optionContentDelaySend'));
	},
	bindEvent: function () {

		var BG = chrome.extension.getBackgroundPage();

		$('#switchDelaySend').click(function () {
			if ($(this).hasClass('switchEnable')) {
				switchBtn.disable($(this));
				BG.isDelaySend.set('false');
			} else if ($(this).hasClass('switchDisable')) {
				switchBtn.enable($(this));
				BG.isDelaySend.set('true');
			}
		});

		$('.numberFieldBtnUp').click(function () {
			numberField.add($(this).parent(), function (second) {
				BG.delaySendSecond.set(second);
			});
		});

		$('.numberFieldBtnDown').click(function () {
			numberField.minus($(this).parent(), function (second) {
				BG.delaySendSecond.set(second);
			});
		});

		$('.numberFieldText').bind('input', function () {
			BG.delaySendSecond.set($(this).val());
		});

	},
	init: function (callback) {

		var BG = chrome.extension.getBackgroundPage();

		if (BG.isDelaySend.get() == 'true') {
			switchBtn.enable($('#switchDelaySend'));
		} else {
			switchBtn.disable($('#switchDelaySend'));
		}

		var delaySendSecond = BG.delaySendSecond.get();
		if (delaySendSecond && !isNaN(delaySendSecond)) {
			$('#delaySendSecond .numberFieldText').val(delaySendSecond);
		}

		this.bindEvent();

		callback && callback();

	}
};