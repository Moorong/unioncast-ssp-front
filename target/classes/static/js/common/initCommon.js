(function(){
	
})();
//日期格式化
Date.prototype.format = function(format){
	 var o = {
	             "M+" : this.getMonth()+1, //month
	             "d+" : this.getDate(), //day
	             "h+" : this.getHours(), //hour
	             "m+" : this.getMinutes(), //minute
	             "s+" : this.getSeconds(), //second
	             "q+" : Math.floor((this.getMonth()+3)/3), //quarter
	             "S" : this.getMilliseconds()//millisecond
	         };
    if(/(y+)/.test(format))
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
};
//字符串占位符
String.prototype.format=function() {
  if(arguments.length==0) return this;  
  if(/%s/.test(this))//Java占位符
	  for(var s=this, i=0; i<arguments.length; i++)
		    s=s.replace(new RegExp("%s"), arguments[i]);
  else if(/{\d+}/.test(this))//C#占位符
	  for(var s=this, i=0; i<arguments.length; i++)
		  s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
  return s;  
};
String.format = function(){
	 if(arguments.length==0) return this;
	 if(arguments.length==1) return arguments[0];
	 var source = arguments[0];
	  if(/%s/.test(source))//Java占位符
		  for(var s=source, i=1; i<arguments.length; i++)
			    s=s.replace(new RegExp("%s"), arguments[i]);
	  else if(/{\d+}/.test(source))//C#占位符
		  for(var s=source, i=1; i<arguments.length; i++)
			  s=s.replace(new RegExp("\\{"+(i-1)+"\\}","g"), arguments[i]);
	  return s;
}
String.prototype.toFixed = function(){
	try{
		return isFinite(this)?(this*1).toFixed(arguments.length>0?arguments[0]:arguments):'0.00';
	}catch(e){
		return '0.00';
	}
}
window.isEmpty=function (str) {
    return str == undefined || str == null || $.trim(str) == '';
}
window.isNotEmpty = function(str){
	return !this.isEmpty(str);
}
window.isEmptyObject=function(e){
	var t;for(t in e)return!1;return!0;
}
function _confirm(message,title,okText,noText,noBtn){
	var self = this;
	var buttons = {
            okay: {
                text: isEmpty(okText)?'是':okText,
                btnClass: 'btn green',
                action: function () {if(self.okFn)self.okFn.call(this);}
            }
        };
        if(noBtn){
			buttons.no = {
	            text: isEmpty(noText)?'否':noText,
	                    btnClass: 'btn ',
	                    action:function(){if(self.noFn)self.noFn.call(this);}
			};
        }
	
	$.alert({
        title: isEmpty(title)?'提示！':title,
        content: '<p class="text-center" style="font-size:14px;font-weight:bold;word-break: break-all;">'+(isEmpty(message)?'是否确认':message)+'</p>',
        icon: 'fa fa-rocket',
        animation: 'zoom',
        closeAnimation: 'zoom',
        buttons: buttons
    });
	return this;
}
_confirm.prototype = {
		okFn:false,
		noFn:false,
		ok:function(fn){
			this.okFn = fn;
			return this;
		},
		no:function(fn){
			this.noFn = fn;
			return this;
		}
};
/**
 * 确认框
 * message 消息
 * title 标题
 * okText 确认文本,默认 是
 * noText 取消文本,默认 否
 * 使用:
 * 1. confirm('内容');
 * 2. confirm('内容','标题','确认','取消');
 * 3.回调 confirm('内容','标题','确认','取消').ok(function(){ do... }).no(function(){ do... });
 */
window.confirm = function(message,title,okText,noText) {
    return new _confirm(message,title,okText,noText,true);
}
/**
 * 弹出框
 */
window.alert=function(message,title,okText){
	return new _confirm(message,title?title:'提示',okText?okText:'确定','',false);
};
//常用html
var HT = {
		i:'<i></i>',
		tab:'<table></table>',
		tr:'<tr></tr>',
		th:'<th></th>',
		td:'<td></td>',
		tbody:'<tbody></tbody>',
		li:'<li></li>',
		ul:'<ul></ul>',
		span:'<span></span>',
		a:'<a href="javascript:void(0);"/></a>',
		div:'<div></div>',
		btn:'<button></button>',
		input:'<input/>',
		label:'<label></label>',
		img:'<img/>',
		obj:'<object></object>',
		video:'<video></video>',
		source:'<source></source>'
};
/**
 * http://www.wangshizhao.cn/textareaef6ncg0x.html
 */
$.fn.autoHeight = function(){
	
	function autoHeight(elem){
		elem.style.height = 'auto';
		elem.scrollTop = 0; //防抖动
		if(elem.scrollHeight>0)
			elem.style.height = elem.scrollHeight + 'px';
	}
	
	this.each(function(){
		autoHeight(this);
		$(this).on('keyup', function(){
			autoHeight(this);
		});
	});
}
//input宽度自适应
$.fn.autoWidth = function(){
	function autoWidth(text){
		var sensor = $('<pre>'+ text +'</pre>').css({display: 'none'}); 
	    $('body').append(sensor); 
	    var width = sensor.width()+20;
	    sensor.remove(); 
	    return width;
	}
	this.each(function(){
		 $(this).width(autoWidth($(this).val()));
		$(this).on('keydown', function(){
			 $(this).width(autoWidth($(this).val()));
		});
	});
	return this;
}
/**
 * 自定义Map对象
 */
function Map() {
 
    var mapObj = {};
 
    this.put = function (key, value) {
        mapObj[key] = value;
    };
 
    this.remove = function (key) {
        if (mapObj.hasOwnProperty(key)) {
            delete mapObj[key];
        }
    };
 
    this.get = function (key) {
        if (mapObj.hasOwnProperty(key)) {
            return mapObj[key];
        }
        return null;
    };
 
    this.keySet = function () {
        var keys = [];
        for(var k in mapObj){
            keys.push(k);
        }
        return keys;
    };
    this.valueSet = function () {
        var vals = [];
        for(var k in mapObj){
        	vals.push(mapObj[k]);
        }
        return vals;
    };
 
    // 遍历map
    this.each = function(fn){
        for(var key in mapObj){
            fn(key, mapObj[key]);
        }
    };
 
    this.toString = function () {
        var str = "{";
        for(var k in mapObj){
            str += "\""+ k+"\" : \""+mapObj[k]+"\",";
        }
        str = str.substring(0,str.length - 1) ;
        str += "}";
        return str;
    }
}
function newFlashObject(swfPath,width,height){
	var $obj0 = $(HT.obj).attr({
		classid:'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
		width:width,
		height:height,
		movie:swfPath
	});
	var $obj1 = $(HT.obj).attr({
		type:'application/x-shockwave-flash',
		width:width,
		height:height,
		data:swfPath
	});
	return $obj0.append($obj1);
}
function newVideoObject(movPath,movType,width,height){
	var $video = $(HT.video).attr({
		controls:true,
		width:width,
		height:height,
	});
	var $source = $(HT.source).attr({
		type:'video/'+movType,
		src:movPath
	});
	return $video.append($source);
}