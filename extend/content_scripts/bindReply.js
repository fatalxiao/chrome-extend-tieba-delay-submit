/**
 * @property {Object} 暂存的setTimeout函数
 */
var timeoutDelayReply = null;

/**
 * @property {Object} 暂存的setTimeout函数
 */
var hasAttachedDelay = true;

/**
 * 延迟发送
 */
var delaySendReply = function(type) {

	setSendForbidden("true");

	var processBarWrapReply = $(".processBarWrapReplyCurrent");
	if (processBarWrapReply.length == 1) {

		var btnSubmit = processBarWrapReply.parent().next();

		var processBar = processBarWrapReply.find(".processBarReply");
		var processBarText = processBarWrapReply.find(".processBarTextReply");

		processBarWrapReply.removeClass("processBarWrapNormalReply").addClass("processBarWrapRunReply");

		timeoutDelayReply = setTimeout(function() {

			cancelSendReply();

			setSendForbidden("false", function() {
				if (type == "keyup") {
				
					var wrapper = processBarWrapReply.parents(".j_lzl_wrapper");
					if (wrapper.length == 1) {
						var unfold = wrapper.find(".lzl_link_unfold");
						var fold = unfold.next(".lzl_link_fold");
						if (fold.length == 1 && unfold.length == 1) {
							fold[0].click();
							var intervalFold = setInterval(function() {
								if (fold.css("display") == "none") {
									clearInterval(intervalFold);
									unfold[0].click();
									var intervalUnfold = setInterval(function() {
										var btnSubmitNew = wrapper.find(".lzl_panel_submit");
										if (btnSubmitNew.length == 1) {
											clearInterval(intervalUnfold);
											btnSubmitNew[0].click();
											setSendForbidden("true");
										}
									}, INTERVAL_TIME);
								}
							}, INTERVAL_TIME);
						}
					}
				} else {
					btnSubmit[0].click();
					setSendForbidden("true");
				}
			});

		}, 1000 * delaySecond);

		//processBarText.css("color", "#FF3636");
		processBarText.html("取消发表");

		processBar.css({
			"width" : "4px",
			"display" : "block"
		});
		processBar.stop().animate({
			"width" : "100px"
		}, 1000 * delaySecond);
	}
};

/**
 * 取消延迟发送
 */
var cancelSendReply = function() {

	setSendForbidden("true");
	if (timeoutDelayReply) {
		clearTimeout(timeoutDelayReply);
		timeoutDelayReply = null;
	}

	var processBarWrapReply = $(".processBarWrapReplyCurrent");
	processBarWrapReply.each(function() {
		var processBar = $(this).find(".processBarReply");
		var processBarText = $(this).find(".processBarTextReply");

		$(this).removeClass("processBarWrapRunReply").addClass("processBarWrapNormalReply");

		//processBarText.css("color", "#fff");
		processBarText.html("发 表");

		processBar.stop();
		processBar.css("display", "none");
	});
	hasAttachedDelay = false;
};

/**
 * 直接回复
 */
var directSendReply = function(type) {
	var processBarWrapReply = $(".processBarWrapReplyCurrent");
	if (processBarWrapReply.length == 1) {

		var btnSubmit = processBarWrapReply.parent().next(".lzl_panel_submit");
		if (btnSubmit.length == 0) {
			btnSubmit = processBarWrapReply.parent().next(".lzl_panel_submit_disabled");
		}
		if (btnSubmit.length == 1) {
			setSendForbidden("false", function() {
				if (type == "keyup") {
					var wrapper = processBarWrapReply.parents(".j_lzl_wrapper");
					if (wrapper.length == 1) {
						var unfold = wrapper.find(".lzl_link_unfold");
						var fold = unfold.next(".lzl_link_fold");
						if (fold.length == 1 && unfold.length == 1) {
							fold[0].click();
							var intervalFold = setInterval(function() {
								if (fold.css("display") == "none") {
									clearInterval(intervalFold);
									unfold[0].click();
									var intervalUnfold = setInterval(function() {
										var btnSubmitNew = wrapper.find(".lzl_panel_submit");
										if (btnSubmitNew.length == 1) {
											clearInterval(intervalUnfold);
											btnSubmitNew[0].click();
											setSendForbidden("true");
										}
									}, INTERVAL_TIME);
								}
							}, INTERVAL_TIME);
						}
					}
				} else {
					btnSubmit[0].click();
					setSendForbidden("true");
					//cancelSendReply();
				}
			});
		}
	}
};

/**
 * 绑定全局的取消发送
 */
/*var bindCancelSendAll = function() {
	$("body").keyup(function(event) {
		myEvent.stopPropagation(event);
		if (event.which == 27) {
			$(".processBarWrapReply").each(function() {
				cancelSendReply();
			});
		}
	});
};*/

/**
 * 调整发送区域
 */
var resetBtnSubmitWrapper = function(btnSubmit) {
	var td = btnSubmit.parent().parent();
	if (td.length == 1) {
		td.prev("td").remove();
		td.css({
			"width" : "100%",
			"float" : "right"
		});
	}
};

/**
 * 插入新按钮并隐去旧按钮
 */
var replaceSendDelayReply = function(btnSubmit) {

	hasAttachedDelay = false;
	$(".processBarWrapReply").removeClass("processBarWrapReplyCurrent");

	if (btnSubmit.attr("delay") != "true") {
		btnSubmit.css("display", "none");
		btnSubmit.attr("delay", "true");

		var html = '<div class="sendDelayReply" >'
				 +     '<div class="processBarWrapReply processBarWrapReplyCurrent processBarWrapNormalReply" >'
				 +         '<div class="processBarReply" ></div>'
				 +         '<div class="processBarTextReply" >发 表</div>'
				 +     '</div>'
				 +     '<div class="directSubmitReply" >直接发表</div>'
				 + '</div>';

		btnSubmit.before(html);

		$(".processBarWrapReply").click(function() {			
			if ($(this).hasClass("processBarWrapNormalReply")) {
				delaySendReply();
			} else {
				cancelSendReply();
			}
		});

		$(".directSubmitReply").click(function() {
			directSendReply();
		});
	} else {
		btnSubmit.prev(".sendDelayReply").children(".processBarWrapReply").addClass("processBarWrapReplyCurrent");
	}
};

var bindReplyEvent = function() {

	$("body").keyup(function(event) {
		myEvent.stopPropagation(event);
		if (event.ctrlKey == true && event.shiftKey == true && event.which == 13) {
			directSendReply("keyup");
		} else if (hasAttachedDelay == false && event.ctrlKey == true && event.which == 13) {
			hasAttachedDelay = true;
			delaySendReply("keyup");
		} else if (event.which == 27) {
			cancelSendReply();
		}
	});
	
	/*var processBarWrapReply = $(".processBarWrapReplyCurrent");
	var editarea = processBarWrapReply.parents(".lzl_editor_container").find(".tb-editor-editarea");
	editarea[0].addEventListener("keyup", function (event) {
		myEvent.stopPropagation(event);
		editarea.attr("ctrlKey", "0");
		editarea.attr("shiftKey", "0");
	}, true);

	editarea[0].addEventListener("keydown", function (event) {
		myEvent.stopPropagation(event);
		if (event.ctrlKey == true) {
			editarea.attr("ctrlKey", "1");
		} else if (event.shiftKey == true) {
			editarea.attr("shiftKey", "1");
		} else {
			if (editarea.attr("ctrlKey") == "1" && editarea.attr("shiftKey") == "1" && event.which == 13) {
				directSendReply();
			} else if (editarea.attr("ctrlKey") == "1" && event.which == 13) {
				delaySendReply();
			} else if (event.which == 27) {
				cancelSendReply();
			}
		}
	}, true);*/

	/*editarea.attr("ctrlKey", "1");

	editarea.keyup(function(event) {
		event.stopImmediatePropagation();
		editarea.attr("ctrlKey", "0");
		editarea.attr("shiftKey", "0");
	});

	editarea.keydown(function(event) {
		event.stopImmediatePropagation();
		if (event.ctrlKey == true) {
			editarea.attr("ctrlKey", "1");
		} else if (event.shiftKey == true) {
			editarea.attr("shiftKey", "1");
		} else {
			if (editarea.attr("ctrlKey") == "1" && editarea.attr("shiftKey") == "1" && event.keyCode == 13) {
				var processBarWrapReply = btnSubmit.prev(".sendDelayReply").children(".processBarWrapReply");
				directSendReply(processBarWrapReply, btnSubmit);
			} else if (editarea.attr("ctrlKey") == "1" && event.keyCode == 13) {
				delaySendReply();
			} else if (event.keyCode == 27) {
				cancelSendReply();
			}
		}
	});*/

	/*
	var editareaNew = editarea.clone(true, true);
	//editareaNew.unbind("keyup");
	//editareaNew.unbind("keydown");
	editarea.css({
		"position" : "absolute",
		"opacity" : 0
	});
	editareaNew.insertBefore(editarea);

	$(".insertsmiley_holder").click(function() {
		var insertsmiley_holder = $(this);
		var tempInterval = setInterval(function() {
			var tb_layer_wrapper = insertsmiley_holder.find(".tb_layer_wrapper");
			var layer_content = insertsmiley_holder.find(".layer_content");
			if (tb_layer_wrapper.css("display") != "none" && layer_content.html() != "") {
				clearInterval(tempInterval);

				layer_content.find(".s_face a").click(function() {
					var tempInterval2 = setInterval(function() {
						if (editarea.html() != "") {
							clearInterval(tempInterval2);

							editareaNew.append(editarea.html());
							editarea.html("");
						}
					}, INTERVAL_TIME);
				});
			}
		}, INTERVAL_TIME);
	});

	editareaNew.keyup(function(event) {
		if (event.ctrlKey == true && event.which == 13) {
			delaySendReply();
		} else if (event.which == 27) {
			cancelSendReply();
		}
	});
	*/

};

var replaceReply = function() {
	try {
		var btns = $(".lzl_link_unfold");
		btns.each(function() {
			var btn = $(this);
			btn.click(function() {
				var b = $(this);
				var tempInterval = setInterval(function() {
					var btnSubmit = b.parents(".j_lzl_wrapper").find(".lzl_panel_submit");
					if (btnSubmit.length > 0) {
						clearInterval(tempInterval);

						resetBtnSubmitWrapper(btnSubmit);
						replaceSendDelayReply(btnSubmit);
						bindReplyEvent();
					}
				}, INTERVAL_TIME);
			});
		});
	} catch(e) {}
};

var replaceReplyReply = function() {
	try {
		var btns = $("a.lzl_s_r");
		btns.each(function() {
			var btn = $(this);
			btn.click(function() {
				var b = $(this);
				var tempInterval = setInterval(function() {
					var btnSubmit = b.parents(".core_reply_content").find(".lzl_panel_submit");
					if (btnSubmit.length > 0) {
						clearInterval(tempInterval);

						resetBtnSubmitWrapper(btnSubmit);
						replaceSendDelayReply(btnSubmit);
						bindReplyEvent();
					}
				}, INTERVAL_TIME);
			});
		});
	} catch(e) {}
};

var replaceReplySay = function() {
	try {
		var btns = $("p.j_lzl_p");
		btns.each(function() {
			var btn = $(this);
			btn.click(function() {
				var b = $(this);
				var tempInterval = setInterval(function() {
					var btnSubmit = b.parents(".core_reply_content").find(".lzl_panel_submit");
					if (btnSubmit.length > 0) {
						clearInterval(tempInterval);

						resetBtnSubmitWrapper(btnSubmit);
						replaceSendDelayReply(btnSubmit);
						bindReplyEvent();
					}
				}, INTERVAL_TIME);
			});
		});
	} catch(e) {}
};