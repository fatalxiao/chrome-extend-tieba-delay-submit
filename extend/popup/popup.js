var BG = chrome.extension.getBackgroundPage();

function bindSettingButtonEvent() {

	const button = $('.btnSetting');

	// hover animation
	button.hover(() => {
		button.addClass('fa-spin');
	}, () => {
		button.removeClass('fa-spin');
	});

	// show option page
	button.click(() => {
		BG.openOptionPage();
	});

}

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
				BG.isDelaySubmit.set(value);
				return;
		}

	});

}

$(() => {

	// init switcher value
	switchBtn[BG.isDelaySubmit.get() == 'true' ? 'enable' : 'disable']($('#delaySendSwitcher'));

	bindSettingButtonEvent();
	bindSwitchEvents();

});