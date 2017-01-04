/**
 * @property {Object} 暂存的setTimeout函数
 */
let timeoutDelay = null;

/**
 * 侦测编辑框的 interval id
 */
let tempIntervalEditor;

/**
 * 延迟发送
 */
function delaySend() {

	setSendForbidden('true');

	$('.processBarWrap').removeClass('processBarWrapNormal').addClass('processBarWrapRun');

	timeoutDelay = setTimeout(function () {

		cancelSend();

		setSendForbidden('false', function () {
			$('a.j_submit')[0].click();
			setSendForbidden('true');
		});

	}, 1000 * delaySecond);

	$('.processBarText').html('取消发表');

	// $('.processBar').css('left', '-100%').show().stop().animate({
	// 	left: 0
	// }, 1000 * delaySecond);

	$('.processBar').css({
		width: 0
	}).show().stop().animate({
		width: 100
	}, {
		duration: 1000 * delaySecond,
		step: function (now, tween) {

			const width = tween.now;
			const height = width <= 12 ? width * 2 : 24;

			$('.processBar').css({
				top: (24 - height) / 2,
				height: height,
				'border-radius': width <= 24 ? '50%' : 12
			});

		}
	});

}

/**
 * 取消延迟发送
 */
function cancelSend() {

	setSendForbidden('true');

	$('.processBarWrap').removeClass('processBarWrapRun').addClass('processBarWrapNormal');
	$('.processBarText').html('发 表');
	$('.processBar').hide().stop();

	if (timeoutDelay) {
		clearTimeout(timeoutDelay);
	}

}

/**
 * 直接发送
 */
function directSend() {

	cancelSend();

	setSendForbidden('false', function () {
		$('a.j_submit')[0].click();
		setSendForbidden.set('true');
	});

}

/**
 * 全局的取消发送处理
 * @param e
 * @constructor
 */
function CancelSendHandle(e) {
	myEvent.stopPropagation(e);
	if (e.keyCode == 27) { // ESC
		cancelSend();
	}
}

/**
 * 绑定全局的取消发送
 */
function bindCancelSend() {
	$('body').bind('keydown', CancelSendHandle);
}

/**
 * 替换回帖发送键
 */
function replaceSubmit() {

	const btn = $("a.j_submit");

	if (btn.length > 0 && $(".processBarWrap").length == 0) {

		btn.hide();

		var html = `<div class="sendDelay">
						<div class="processBarWrap processBarWrapNormal">
							<div class="processBar"></div>
							<div class="processBarText">发 表</div>
						</div>
						<div class="directSubmit">直接发表</div>
					</div>`;

		btn.before(html);

		$(".processBarWrap").click(function () {
			if ($(this).hasClass('processBarWrapNormal')) {
				delaySend();
			} else {
				cancelSend();
			}
		});

		$('.directSubmit').click(function () {
			directSend();
		});

	}

}

/**
 * 回帖发送事件处理
 * @param e
 */
function submitEventHandle(e) {

	myEvent.stopPropagation(e);

	// ctrl + shift + enter : 直接发送
	if (e.ctrlKey == true && e.shiftKey == true && e.keyCode == 13) {
		directSend();
	}

	// ctrl + enter : 延迟发送
	else if (e.ctrlKey == true && e.which == 13) {
		delaySend();
	}

	// esc : 取消发送
	else if (e.which == 27) {
		cancelSend();
	}

}

/**
 * 更改回帖发送事件
 * 默认 ctrl + enter : 发送
 */
function bindSubmitEvent() {

	tempIntervalEditor = setInterval(() => {

		const editor = $("div#ueditor_replace");

		if (editor.length > 0 && $(".processBarWrap").length == 1) {
			clearInterval(tempIntervalEditor);
			editor.bind('keydown', submitEventHandle);
		}

	}, INTERVAL_TIME);

}

/**
 * 还原回帖发送键
 */
function resetSubmit() {

	const btn = $("a.j_submit");

	btn.show();
	btn.prev('.sendDelay').remove();

}

/**
 * 解绑发送事件
 */
function unbindSubmitEvent() {
	tempIntervalEditor && clearInterval(tempIntervalEditor);
	$("div#ueditor_replace").unbind('keydown', submitEventHandle);
}

/**
 * 解绑取消发送事件
 */
function unbindCancelSend() {
	$('body').unbind('keydown', CancelSendHandle);
}