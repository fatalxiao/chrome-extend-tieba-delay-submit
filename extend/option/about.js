var About = {
	show : function() {
		$("#optionContentHeader").html("关于");
		Option.switchItem($("#optionListItemAbout"), $("#optionContentAbout"));
	},
	init : function(callback) {
		callback = typeof callback == "function" ? callback : function(){};
		callback();
	}
};