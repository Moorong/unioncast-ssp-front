var UC = {
	/**
	 * 判断空值
	 */
	loadingIndex:0,
	isEmpty : function(str) {
		return str == undefined || str == null || $.trim(str) == '';
	},
	setBusy : function(f) {
		if (false == f) {
			this.loadingIndex-=1;
			this.loadingIndex=this.loadingIndex<0?0:this.loadingIndex;
			if(this.loadingIndex<1)
			$('#loadingDiv').hide();
		} else {
			this.loadingIndex+=1;
			$('#loadingDiv').show();
		}
	},
	isUrl : function(url) {
		if(this.isEmpty(url))return false;
		if(/\s+/.test(url))return false;
		var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
	        + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@
	        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
	        + "|" // 允许IP和DOMAIN（域名）
	        + "([0-9a-zA-Z_!~*'()-]+\.)*" // 域名- www.
	        + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\." // 二级域名
	        + "[a-zA-Z]{2,6})" // first level domain- .com or .museum
	        + "(:[0-9]{1,4})?" // 端口- :80
	        + "((/?)|" // a slash isn't required if there is no file name
	        + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	        var re=new RegExp(strRegex);
	        //re.test()
	        if (re.test(url)){
	            return (true);
	        }else{
	            return (false);
	        }
	},
	/**
	 * 数组分页
	 */
	arrPage : function(pno, psize, arr) {
		var offset = (pno - 1) * psize;
		return (offset + psize >= arr.length) ? arr.slice(offset, arr.length)
				: arr.slice(offset, offset + psize);
	},
	ajaxPage : function(page, options) {
		var setting = {
			totalPages : 0, // 总页数
			startPage : 1, // 当前页
			count : 0, // 总记录数
			visiblePages : 5,
			prev : "上一页",
			next : "下一页",
			first : "首页",
			last : "尾页",
			skip : "跳转"
		// onPageClick: function(event, page){
		// }
		};
		$.extend(true, setting, options);
		if (typeof page == "string") {
			$("#" + page).twbsPagination(setting);
		} else {
			page.twbsPagination(setting);
		}
	},
	datepicker : function(options) {
		var d = $('.uc-date>input');
		if (d.size() == 0) {
			d = $('.uc-date');
		}
		var setting = {
			format : "yyyy-mm-dd",
			weekStart : 1,
			language : "zh-CN",
			todayHighlight : true
		}
		$.extend(true, setting, options);
		d.datepicker(setting);
	},
	/**
	 * 获取某个参数的值，如果url没传，取当前页面url的参数
	 * 
	 * @param name
	 * @returns
	 */
	getQueryString : function(name, url) {
		var temp = '';
		if (url) {
			temp = url.substr(url.indexOf('?') + 1);
		} else {
			temp = window.location.search.substr(1);
		}
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = temp.match(reg);
		if (r != null)
			return decodeURIComponent(r[2]);
		else
			return null;
	},
	/**
	 * 替换url中某个参数的值
	 * 
	 * @param url
	 * @param name
	 * @param value
	 * @returns
	 */
	replaceQueryFromUrl : function(url, name, value) {
		var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
		var tmp = name + "=" + value;
		if (url.match(reg) != null) {
			return url.replace(eval(reg), tmp);
		} else {
			if (url.match("[\?]")) {
				return url + "&" + tmp;
			} else {
				return url + "?" + tmp;
			}
		}
	},
	/**
	 * Ajax方式提交表单
	 */
	ajaxSubmit : function(frm, fn) {
		var dataPara = this.getFormJson(frm);
		var url = frm.action + (frm.action.indexOf("?") > 0 ? "&" : "?") + "t="
				+ Math.random();
		// $.setBusy(true);
		$.ajax({
			url : url,
			type : frm.method,
			data : dataPara,
			success : function(data) {
				// $.setBusy(false);
				fn(data);
			},
			error : function(err) {
				// $.setBusy(false);
			}
		});
	},
	/**
	 * 序列化表单数据
	 */
	getFormJson : function(frm) {
		var o = {};
		var a = $(frm).serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	},
	/**
	 * 获取项目路径
	 */
	getRootPath : function() {
		var curWwwPath = window.document.location.href;
		var pathName = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathName);
		var localhostPath = curWwwPath.substring(0, pos);
		var projectName = pathName.substring(0,
				pathName.substr(1).indexOf('/') + 1);
		return (localhostPath + projectName);
	},
	parseParam : function(param, key) {
		var paramStr = "";
		if (param instanceof String || param instanceof Number
				|| param instanceof Boolean) {
			paramStr += "&" + key + "=" + encodeURIComponent(param);
		} else {
			$.each(param, function(i) {
				var k = key == null ? i : key
						+ (param instanceof Array ? "[" + i + "]" : "." + i);
				paramStr += '&' + UC.parseParam(this, k);
			});
		}
		return paramStr.substr(1);
	},
	/**
	 * 错误状态统一处理(暂未启用)
	 */
	errmsg : {
		data : {
			100 : '操作失败',
			200 : '操作成功',
			500 : '系统繁忙,请稍后再试',
			1000 : '您需要重新登录',
			1001 : '必填项不能为空',
			1002 : '文件类型不合法',
			1005 : '文件不能大于20M'
		},
		query : function(json) {
			try {
				if (UC.isEmpty(json))
					return json;
				// if(!UC.isEmpty(json.status))return
				// UC.errmsg.data[json.status*1]
				if (typeof (json) != "object")
					json = JSON.parse(json);
				if (UC.isEmpty(json.status))
					return json;
				switch (json.status * 1) {
				case 0:
				case 200:
					return json;
					break;
				case 401:
					location.href = UC.getRootPath() + '/login';
					break;
				case 100:
				case 500:
					alert(UC.errmsg.data[json.status * 1]);
					break;
				default:
					return UC.errmsg.data[json.status * 1]
					break;
				}
			} catch (e) {
				return json;
			}
		}
	}
};
// 获得年月日 得到日期oTime
function getMyDate(str) {
	var oDate = new Date(str), oYear = oDate.getFullYear(), oMonth = oDate
			.getMonth() + 1, oDay = oDate.getDate(), oHour = oDate.getHours(), oMin = oDate
			.getMinutes(), oSen = oDate.getSeconds(), oTime = oYear + '-'
			+ getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':'
			+ getzf(oMin) + ':' + getzf(oSen);// 最后拼接时间
	return oTime;
};
// 补0操作
function getzf(num) {
	if (parseInt(num) < 10) {
		num = '0' + num;
	}
	return num;
};
// 处理默认时间工具
function addDate(dd, dadd) {
    var a = new Date(dd)
    a = a.valueOf()
    a = a + dadd * 24 * 60 * 60 * 1000
    a = new Date(a)
    return a;
}
function getMapDate(dayss) {
    var now = new Date();
    var NextNow = addDate(now, -dayss);
    var years = NextNow.getFullYear();
    var months = NextNow.getMonth() + 1;
    var days = NextNow.getDate();
    var beginTime = years + "-" + months + "-" + days;
    return beginTime;
};


function getDay(str) {
    var oDate = new Date(str).format("yyyy-MM-dd hh:mm:ss");
    return oDate;
};

