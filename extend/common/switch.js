var switchBtn = {
	enable: function (switcher) {
		switcher.removeClass("switchDisable").addClass("switchEnable");
	},
	disable: function (switcher) {
		switcher.removeClass("switchEnable").addClass("switchDisable");
	}
};