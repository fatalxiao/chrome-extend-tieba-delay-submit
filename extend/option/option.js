var Option = {
	switchItem : function(listItem, contentItem) {
		$(".optionListItemActive").removeClass("optionListItemActive").addClass("optionListItem");
		listItem.removeClass("optionListItem").addClass("optionListItemActive");
		
		$(".optionContent").css("display", "none");
		contentItem.css("display", "block");
	},
	init : function(callback) {
	
		callback = typeof callback == "function" ? callback : function(){};
	
		$("#optionListItemDelaySend").click(function() {
			if ($(this).hasClass("optionListItem")) {
				DelaySend.show();
			}
		});
		$("#optionListItemAutoOpenUrl").click(function() {
			if ($(this).hasClass("optionListItem")) {
				AutoOpenUrl.show();
			}
		});
		$("#optionListItemAbout").click(function() {
			if ($(this).hasClass("optionListItem")) {
				About.show();
			}
		});
		
		DelaySend.init();
		AutoOpenUrl.init();
		About.init();
		
		callback();
		
	}
};

$(function() {
	Option.init(function() {
		About.show();
	});
});