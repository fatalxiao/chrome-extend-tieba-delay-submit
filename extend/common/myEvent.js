var myEvent = {
	
	/**
	 * 添加事件
	 * @param {Object} obj 需要移除的对象
	 * @param {Object} type 需要移除的事件类型
	 * @param {Object} fun 回调函数
	 */
	addEvent : function (obj, type, fn) {
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
	 * 移除事件
	 * @param {Object} obj 需要移除的对象
	 * @param {Object} type 需要移除的事件类型
	 * @param {Object} fun 回调函数
	 */
	removeEvent : function (obj, type, fun) {
		if (obj.removeEventListener) {
			obj.removeEventListener(type, fun, false);
		} else if (obj.detachEvent) {
			obj.detachEvent('on' + type, fun);
		} else {
			obj['on' + type] = null;
		}
	},
	
	/**
	 * 阻止事件(包括冒泡和默认行为)
	 * @param {Object} event对象
	 */
	stopEvent : function (e) {
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
	 * 仅阻止事件冒泡
	 * @param {Object} event对象
	 */
	stopPropagation : function (e) {
		e = e || window.event;
		if (! + "\v1") {
			e.cancelBubble = true;
		} else {
			e.stopPropagation();
		}
	},
	
	/**
	 * 仅阻止浏览器默认行为
	 * @param {Object} event对象
	 */
	preventDefault : function (e) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},
	
	/**
	 * 取得事件源对象
	 * @param {Object} event源对象
	 */
	getEventTarget : function (e) {
		e = e || window.event;
		var target = event.srcElement ? event.srcElement : event.target;
		return target;
	}
};