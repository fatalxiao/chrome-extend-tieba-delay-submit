var myEvent = {

	/**
	 * add event
	 * @param {Object} obj target
	 * @param {Object} type event type
	 * @param {Object} fun callback
	 */
	addEvent: function (obj, type, fn) {
		if (obj.addEventListener)
			obj.addEventListener(type, fn, false);
		else if (obj.attachEvent) {
			obj["e" + type + fn] = fn;
			obj.attachEvent("on" + type, function () {
				obj["e" + type + fn].call(obj, window.event);
			});
		}
	},

	/**
	 * remove event
	 * @param {Object} obj target
	 * @param {Object} type event type
	 * @param {Object} fun callback
	 */
	removeEvent: function (obj, type, fun) {
		if (obj.removeEventListener) {
			obj.removeEventListener(type, fun, false);
		} else if (obj.detachEvent) {
			obj.detachEvent('on' + type, fun);
		} else {
			obj['on' + type] = null;
		}
	},

	/**
	 * stop event ( include preventDefault and stopPropagation)
	 * @param {Object} event object
	 */
	stopEvent: function (e) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			e.returnValue = false;
			e.cancelBubble = true;
		}
	},

	/**
	 * stop propagation
	 * @param {Object} event object
	 */
	stopPropagation: function (e) {
		e = e || window.event;
		if (!+"\v1") {
			e.cancelBubble = true;
		} else {
			e.stopPropagation();
		}
	},

	/**
	 * prevent default
	 * @param {Object} event object
	 */
	preventDefault: function (e) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},

	/**
	 * get event target
	 * @param {Object} event object
	 */
	getEventTarget: function (e) {
		e = e || window.event;
		var target = event.srcElement ? event.srcElement : event.target;
		return target;
	}
};