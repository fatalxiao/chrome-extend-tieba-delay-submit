var GridUrl = {

	addRow(gridUrl, url, isFirstRow) {
		if (gridUrl.length > 0) {
			const html = $(`<div class="gridUrlRow ${(isFirstRow ? ' gridUrlRowFirst' : '')} gridUrlRowOdd" >
								<div class="gridUrlCell gridUrlCellUrl" title="${url}" >${url}</div>
								<div class="gridUrlCell gridUrlCellDel" >
									<i class="fa fa-times-circle gridUrlCellDelBtn" aria-hidden="true"></i>
								</div>
							</div>`)
			gridUrl.append(html);
			return html;
		}
	},

	loadRows(gridUrl, arrayUrls) {
		const self = this;
		if (gridUrl.length > 0 && arrayUrls.length > 0) {
			gridUrl.html('');
			for (var i = 0; i < arrayUrls.length; i++) {
				self.addRow(gridUrl, arrayUrls[i], i == 0);
			}
		}
	},

	deleteRow(delBtn) {
		if (delBtn.length == 1) {
			let gridUrl = delBtn.parents('.gridUrl');
			let gridUrlRow = delBtn.parents('.gridUrlRow');
			gridUrlRow.remove();
			gridUrl.children().eq(0).addClass('gridUrlRowFirst');
		}
	},

	clear(gridUrl) {
		if (gridUrl.length > 0) {
			gridUrl.html('');
		}
	},

	bindEvent(gridUrl, callback) {
		const self = this;
		if (gridUrl.length > 0) {
			gridUrl.find('.gridUrlCellDelBtn').click(function () {
				self.deleteRow($(this));
				callback && callback();
			});
		}
	},

	bindEvents(gridUrl, callback) {
		const self = this;
		if (gridUrl.length > 0) {
			gridUrl.find('.gridUrlCellDelBtn').click(function () {
				self.deleteRow($(this));
				callback && callback();
			});
		}
	}
};