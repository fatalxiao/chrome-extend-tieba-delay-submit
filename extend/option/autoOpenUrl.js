var AutoOpenUrl = {

	show() {
		$('#optionContentHeader').html('启动打开网页');
		Option.switchItem($('#optionListItemAutoOpenUrl'), $('#optionContentAutoOpenUrl'));
	},

	bindSwitcherEvents() {

		const BG = chrome.extension.getBackgroundPage();

		$('#switchAutoOpenUrl').click(function () {
			if ($(this).hasClass('switchEnable')) {
				switchBtn.disable($(this));
				BG.isAutoOpenUrl.set('false');
			} else if ($(this).hasClass('switchDisable')) {
				switchBtn.enable($(this));
				BG.isAutoOpenUrl.set('true');
			}
		});

	},

	bindUrlInputEvents(){

		$('#textAutoOpenUrl').bind('input', function () {

			const textAutoOpenUrl = $('#textAutoOpenUrl');
			const url = $(this).val();

			if (url && url.length > 0) {
				if (isUrl(url)) {
					textAutoOpenUrl.removeClass('urlFieldError');
				} else {
					textAutoOpenUrl.addClass('urlFieldError');
				}
			}

		});

	},

	checkUrls(urls, url) {
		if (urls && urls.length > 0) {
			if (!urls.split('||').includes(url)) {
				return true;
			}
		} else {
			return true;
		}
		return false;
	},

	bindAddButtonEvents() {

		const self = this;

		const BG = chrome.extension.getBackgroundPage();

		const btnAddAutoOpenUrl = $('#btnAddAutoOpenUrl');
		const gridUrl = $('#gridUrl');

		btnAddAutoOpenUrl.click(function () {

			const textAutoOpenUrl = $('#textAutoOpenUrl');

			if (textAutoOpenUrl.length == 1) {

				var url = textAutoOpenUrl.val();

				if (url && url.length > 0 && isUrl(url) && self.checkUrls(BG.autoOpenUrl.get(), url)) {

					BG.autoOpenUrl.append(url);

					const row = GridUrl.addRow(gridUrl, url, $('#gridUrl').html() == '');
					GridUrl.bindEvent(row, function () {
						let array = new Array();
						gridUrl.find('.gridUrlCellUrl').each(function () {
							array.push($(this).html());
						});
						BG.autoOpenUrl.set(array.join('||'));
					});

					textAutoOpenUrl.val('');

				}
			}

		});
	},

	init(callback) {

		const BG = chrome.extension.getBackgroundPage();

		if (BG.isAutoOpenUrl.get() == 'true') {
			switchBtn.enable($('#switchAutoOpenUrl'));
		} else {
			switchBtn.disable($('#switchAutoOpenUrl'));
		}

		const btnAddAutoOpenUrl = $('#btnAddAutoOpenUrl');
		const gridUrl = $('#gridUrl');

		if (btnAddAutoOpenUrl.length > 0 && gridUrl.length > 0) {
			gridUrl.html('');
			var urls = BG.autoOpenUrl.get();
			if (urls && urls.length > 0) {
				var arrayUrl = urls.split('||');
				GridUrl.loadRows(gridUrl, arrayUrl);
				GridUrl.bindEvents(gridUrl, function (url) {
					var array = new Array();
					gridUrl.find('.gridUrlCellUrl').each(function () {
						array.push($(this).html());
					});
					BG.autoOpenUrl.set(array.join('||'));
				});
			}
		}

		this.bindSwitcherEvents();
		this.bindUrlInputEvents();
		this.bindAddButtonEvents();

		callback && callback();

	}
};