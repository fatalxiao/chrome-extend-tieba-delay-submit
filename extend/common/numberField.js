var numberField = {
	add : function(numberField, callback) {
		if (numberField.length > 0) {
			var numberFieldText = numberField.children(".numberFieldText");
			if (numberFieldText.length == 1) {
				var value = numberFieldText.val();
				if (!isNaN(value)) {
					value = parseInt(value) + 1;
					numberFieldText.val(value);
					callback = typeof callback == "function" ? callback : function(){};
					callback(value);
				}
			}
		}
	},
	minus : function(numberField, callback) {
		if (numberField.length > 0) {
			var numberFieldText = numberField.children(".numberFieldText");
			if (numberFieldText.length == 1) {
				var value = numberFieldText.val();
				if (!isNaN(value)) {
					value = parseInt(value) - 1;
					value = value >= 0 ? value : 0;
					numberFieldText.val(value);
					callback = typeof callback == "function" ? callback : function(){};
					callback(value);
				}
			}
		}
	}
};