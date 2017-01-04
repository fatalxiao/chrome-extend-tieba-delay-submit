var BG = chrome.extension.getBackgroundPage();

/**
 * 绑定设置按钮事件
 */
function bindSettingButtonEvent() {

	const button = $('.btnSetting');

	// 悬浮动画
	button.hover(() => {
		button.addClass('fa-spin');
	}, () => {
		button.removeClass('fa-spin');
	});

	// 点击显示选项页
	button.click(() => {
		BG.openOptionPage();
	});

}

/**
 * 绑定switcher事件
 */
function bindSwitchEvents() {

	$('.switch').click(function () {

		let value = '';

		if ($(this).hasClass('switchEnable')) {
			switchBtn.disable($(this));
			value = 'false';
		} else if ($(this).hasClass('switchDisable')) {
			switchBtn.enable($(this));
			value = 'true';
		}

		switch ($(this).attr('id')) {
			case 'delaySendSwitcher':
				BG.isDelaySend.set(value);
				return;
			case 'autoOpenUrlSwitcher':
				BG.isAutoOpenUrl.set(value);
				return;
		}

	});

}

$(() => {

	// 初始化switcher的值
	switchBtn[BG.isDelaySend.get() == 'true' ? 'enable' : 'disable']($('#delaySendSwitcher'));
	switchBtn[BG.isAutoOpenUrl.get() == 'true' ? 'enable' : 'disable']($('#autoOpenUrlSwitcher'));

	bindSettingButtonEvent();
	bindSwitchEvents();

});