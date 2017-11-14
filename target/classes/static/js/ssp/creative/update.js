;
$(function() {
	$("[name=creativeType]").change(function() {
		var iv = $(this).val()*1;
		$('#myTabContent .tab-pane').removeClass('fade in active');
		$('#myTabContent #tab%s'.format(iv)).toggleClass('fade in active');
	}).change();

	$('#editForm').eq(0).bootstrapValidator({
		excluded : [ ":disabled" ],
		fields : {
			advertiserSubmit : {
				validators : {
					notEmpty : {
						message : "请选择所属广告主"
					}
				}
			},
//			creativeName : {
//				validators : {
//					notEmpty : {},
//					stringLength : {
//						min : 2,
//						max : 10,
//						message : "创意名称长度在2到10位之间"
//					}
//				}
//			},
			creativeName:{
				validators:{
					callback:{
						callback:function(val,validator,$input){
							if(isEmpty(val))return {valid:false,message:'创意名称不能为空!'};
							if(val.length<2||val.length>20)return {valid:false,message:'创意名称限制2-20个字符!'};
							return true;
						}
					}
				}
			},
			creativeClickAddress : {
				validators : {
					callback:{
						callback:function(val,$fm,$input){
							if(isEmpty(val))return {faild:false,message:'点击地址不能为空!'};
							if(!UC.isUrl(val))return {faild:false,message:'请填写有效的网址'};
							return true;
						}
					}
//					notEmpty : {},
//					regexp : {
//						regexp : /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/g,
//						message : "请填写有效的网址"
//					}
				}
			},

			creativeMonitorAddress : {
				validators : {
					callback:{
						callback:function(val,$fm,$input){
							if(isEmpty(val))return {faild:false,message:'检测地址不能为空!'};
							if(!UC.isUrl(val))return {faild:false,message:'请填写有效的网址'};
							return true;
						}
					}
//					notEmpty : {},
//					regexp : {
//						regexp : /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/g,
//						message : "请填写有效的网址"
//					}
				}
			},
//			creativeUrl0 : {
//				validators : {
//					notEmpty : {
//						message : "请上传素材"
//					}
//				}
//			}

		}
	}).on('success.form.bv', function(e) {
	// 防止表单提交
	e.preventDefault();
	
	if(validatorOther()) {
		page.ajaxSubmit(this,function(result) {
			var planId = $("[name=planId]").val();
			var url = "sspCreative/main?planId=" + planId;
			console.info(result);
			if (result.status == 200) {
				alert("更新数据成功").ok(function(){
					page.loadPage(url);
				});
			} else {
				alert("更新数据失败").ok(function(){
					page.loadPage(url);
				});
			}
		},function(data) {
			alert("更新数据失败").ok(function(){
				page.loadPage(url);
			});
		});
		/*$("#editForm").ajaxSubmit({
			success : function(result) {
				var planId = $("[name=planId]").val();
				var url = "sspCreative/main?planId=" + planId;
				console.info(result);
				if (result.status == 200) {
					alert("更新数据成功").ok(function(){
						page.loadPage(url);
					});
				} else {
					alert("更新数据失败").ok(function(){
						page.loadPage(url);
					});
				}
			},
			error : function(data) {
				alert("更新数据失败").ok(function(){
					page.loadPage(url);
				});
			}
		});*/
	}
	
});
	

	//1.如果为图片，判断创意名称
	//2.如果为视频，判断预算
	//3.如果为信息流，判断预算和广告标题
	//所有的都要判断素材是否上传
	function validatorOther(bv) {
		
		//添加标签表单值
		var labelValues = "";
		$("#dictLabels a").each(function(){
			labelValues += "," + $(this).attr("id");
		});
		$("[name=dictLabel]").val(labelValues);
		
		if($("[name=dictLabel]").val() == ""){
			alert("请选择创意标签");
			return false;
		}
		
		/*if($("[name=creativeType]").val() == 1){
			
			
			
			if($("[name=dictLabel]").val() == ""){
				alert("请选择创意标签");
				return false;
			}
		} else if($("[name=creativeType]").val() == 2){
			
			$("#dictLabels2 a").each(function(){
				labelValues += "," + $(this).attr("id");
			});
			$("[name=dictLabel]").val(labelValues);
			
			if($("[name=dictLabel]").val() == ""){
				alert("请选择创意标签");
				return false;
			}
		} else if($("[name=creativeType]").val() == 3){
			
			$("#dictLabels3 a").each(function(){
				labelValues += "," + $(this).attr("id");
			});
			$("[name=dictLabel]").val(labelValues);
			
			if($("[name=dictLabel]").val() == ""){
				alert("请选择创意标签");
				return false;
			}
		}
		console.log($("[name=fileUrl0]"));*/
		
		if($("[name=fileUrl0]").length < 1) {
			alert("请选择素材并上传");
			return false;
		} else if($("[name=fileUrl0]").val() == "") {
			alert("请上传您选择的创意！");
			return false;
		}
		
		return true;
	}
	

	/* 搜索按钮提交 */
	$("#searchAdvertiser").click(function() {
		var state = $("#advertiserState").val();
		page.ajaxSubmit($("#advertiserForm").eq(0)[0], function(
				resultJson, resultMsg, xmlHttpResponse) {

			if (resultJson.result.dataArray.length != 0) {
				$("#advertiserList").html("");
				$("#advertiserPage").empty();
				loadAdvertiserData(resultJson);

			} else {
				$("#advertiserList").html("");
				$("#advertiserPage").empty();
				alert("没有查询到数据！")
			}
		}, function(xmlHttpRequest, errorMsg, errorObj) {

		});
	});

	$("table input[name='checkboxall']").on('click', function(event) {
		$(this).parent().parent().parent().next('tbody').find("input")
				.prop('checked', $(this).prop('checked'));
		event.stopPropagation();
	});
	$('table input[name="checkboxed"]').on('click', function(event) {
		$(this).parent().parent().parent().prev('thead').find(
				"input[name='checkboxall']").prop(
				'checked',
				$(this).parent().parent().parent().find('tr').find(
						'input:checked').length == $(this).parent()
						.parent().parent().find('tr').length ? true
						: false);
		event.stopPropagation();
	});
	$('#tabbtn').click(function() {
		$(this).parent().parent().next('.form-group').toggleClass('hidden');
	});

	loadAdvertiserData(1);

	// 加载数据
	function loadAdvertiserData(currentPageNo) {
		var startTime = $('input[name="startTime"]').val();
		var endTime = $('input[name="endTime"]').val();
		var advertiserName = $("#advertiserName").val();
		var state = $("#advertiserState").val();
		page.ajax({
			url : 'sspAdvertiser/page',
			data : {
				name : advertiserName,
				state : state,
				startTime : startTime,
				endTime : endTime,
				currentPageNo : currentPageNo
			},
			success : function(data) {

				if (data.result.dataArray.length != null) {
					$("#advertiserList").html("");
					$("#advertiserPage").empty();
					loadAdvertisersPage(data);
				} else {
					$("#advertiserList").html("");
					$("#advertiserPage").empty();
					alert("没有查询到数据！")
				}
			},
			error : function(err) {

			}
		});
	}

	function loadAdvertisersPage(data) {
		var datas = data.result.dataArray;
		var count = 0;
		$.each(datas, function(index, advertiser) {
			var id = advertiser.id;
			var url = "sspCreative/findByAdvertiserId";
			page.ajax({
				url : url,
				data : {
					id : id,
				},
				type : 'post',
				success : function(result) {
					count = result.result.length;
					console.info(count);
					var html = "<tr>";
					html += "<td><input type='radio' name='advertiserId'/></td>";
					html += "<td style='vertical-align: middle;text-align:center;' name='advertiserName'>"
						+ advertiser.name + "</td>";
					html += "<td style='vertical-align: middle;text-align:center;' class='advertiserId'>"
						+ advertiser.id + "</td>";
					if (advertiser.putAllowedState == 1) {
						html += "<td style='vertical-align: middle;text-align:center;'>开</td>";
					}
					if (advertiser.putAllowedState == 2) {
						html += "<td style='vertical-align: middle;text-align:center;'>关</td>";
					}
					html += "<td style='vertical-align: middle;text-align:center;'>"
						+ count + "</td>";
					html += "</tr>";
					$("#advertiserList").append(html);
					loadswitch();
				}
			});
		});

		var totalPage = data.result.totalPage;
		var totalCount = data.result.totalCount;
		var startPage = data.result.currentPageNo;
		$('#advertiserPage').html('');
		$('#advertiserPage').html(
				'<ul id="pageUserListUl" class="bs-component pull-right"></ul>');

		page.ajaxPage({
			pcont : 'pageUserListUl',// 分页容器，ID
			totalPages : totalPage, // 总页数
			count : totalCount, // 总记录数
			startPage : startPage,
			onPageClick : function(env, thisPage) {
				loadAdvertiserData(thisPage);
			}
		});

	}

	$("#imageinput").on('filebatchselected', function(event, data, id, index) {
		if($(this).parents('.file-input').find('img').length > 1){
			$(this).parents('.file-input').find('.kv-file-remove:eq(0)').trigger('click');
		}
		$(this).fileinput("upload");
	}).on("fileuploaded", function(event, data, previewId, index) {
		var response = data.response;
		if(response.error) {
			alert(response.error);
			return;
		}
		if (response.imageUrl) {
			var url = response.imageUrl;
			$("[name=telecomOperLicensePic]").val(url);
		}
	}).on('filecleared', function(event) {
		$("[name=fileUrl0]").val('');
	});
	
	
	
	//视频创意初始化
//	$("#videoinput").fileinput({
//		language : 'zh', // 设置语言
//		uploadUrl : "rest/sspCreative/videoUpload", // 上传的地址
//		allowedFileExtensions : [ 'avi', 'flv', 'mp4', 'swf' ],// 接收的文件后缀
//		uploadAsync : true, // 默认异步上传
//		showUpload : true, // 是否显示上传按钮
//		showRemove : true, // 显示移除按钮
//		showPreview : true, // 是否显示预览
//		showCaption : false,// 是否显示标题
//		browseClass : "btn btn-primary", // 按钮样式
//		dropZoneEnabled : true,// 是否显示拖拽区域
//		maxFileCount : 1, // 表示允许同时上传的最大文件个数
//		enctype : 'multipart/form-data',
//		allowedPreviewTypes : ['image', 'html', 'text', 'video', 'audio', 'flash', 'object'],
//		validateInitialCount : true,
//		//maxFileSize : 2*1024,
//		msgSizeTooLarge : '文件 "{name}" ({size} KB) 超过最大限制 {maxSize} KB. 请上传{maxSize} KB一下的视频!',
//		fileSizeGetter : true
//	});
	
	//信息流创意初始化
	$("#flowinput").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspCreative/flowUpload", // 上传的地址
		allowedFileExtensions : [ 'jpg', 'png', 'bmp', 'jpeg' , 'gif' ],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : true, // 是否显示上传按钮
		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 10, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		validateInitialCount : true
	});
	$("#flashinput").on('filebatchselected', function(event, data, id, index) {
		if($(this).parents('.file-input').find('object').length > 1){
			$(this).parents('.file-input').find('.kv-file-remove:eq(0)').trigger('click');
		}
		$(this).fileinput("upload");
	}).on("fileuploaded", function(event, data, previewId, index) {
		var response = data.response;
		if(response.error) {
			alert(response.error);
			return;
		}
		if (response.imageUrl) {
			var url = response.imageUrl;
			$("[name=telecomOperLicensePic]").val(url);
		}
	}).on('filecleared', function(event) {
		$("[name=fileUrl0]").val('');
	});
	

	
	/*var imageCount = $('#imageinput').fileinput('getFilesCount');
	$("[name=picNum]").val(imageCount);*/
	// 异步上传返回结果处理
	$("#imageinput").on("fileuploaded",function(event, data, previewId, index) {
		console.info(data);
		var response = data.response;
		//alert(index);
		// 创建图片信息隐藏域并赋值
		if (response.width) {
			$("[name=fileWidth"+index+"]").val(response.width);
		}
		if (response.height) {
			$("[name=fileHeight"+index+"]").val(response.height);
		}
		if (response.picName) {
			$("[name=fileName"+index+"]").val(response.picName);
		}
		if(response.picSize) {
			$("[name=fileSize"+index+"]").val(response.picSize);
		}
		if (response.creativeFormat) {
			$("[name=fileFormat"+index+"]").val(
					response.creativeFormat);
		}
		if (response.imageUrl) {
			$("[name=fileUrl"+index+"]").val(response.imageUrl);
		}
		
		$("#savebtns").attr("disabled", false);
		$("#savebtns").next().attr("disabled", false);
	});
	
	$('#imageinput').on('fileselect',function(event, numFiles, label) {
		console.log(event.currentTarget.files);
		var file, image;
		var _URL = window.URL || window.webkitURL;
		for (var i = 0; i < numFiles; i++) {
			if ((file = this.files[i])) {
				image = new Image();
				image.src = _URL.createObjectURL(file);
				image.onload = function() {
					console.log(this.width + "," + this.height);
//					if (!((this.width == 120
//							|| this.width == 320 || this.width == 600) && this.height == 100)) {
//						alert("图片大小不合法！");
//					}
//					$(".kv-file-upload").attr({"disabled":"disabled"});
					
				}

			}

		}
		if($("[name=creativeUrl0]").length > 0){
			$("[name=creativeUrl0]").val("");
		}
	});
	$('#imageinput').on('filebatchselected' , function(event, data, previewId,index) {
	});
	// 上传前
	$('#imageinput').on('filepreupload',function(event, data, previewId, index) {
		var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
	});

	
	/*var videoCount = $('#videoinput').fileinput('getFilesCount');
	$("[name=videoNum]").val(videoCount);*/
	// 异步上传返回结果处理
	$("#videoinput").on("fileuploaded",function(event, data, previewId, index) {
		console.info(data);
		var response = data.response;
		//alert(index);
		// 创建图片信息隐藏域并赋值
		if (response.width) {
			$("[name=fileWidth"+index+"]").val(response.width);
		}
		if (response.height) {
			$("[name=fileHeight"+index+"]").val(response.height);
		}
		if (response.picName) {
			$("[name=fileName"+index+"]").val(response.picName);
		}
		if(response.picSize) {
			$("[name=fileSize"+index+"]").val(response.picSize);
		}
		if (response.creativeFormat) {
			$("[name=fileFormat"+index+"]").val(
					response.creativeFormat);
		}
		if (response.imageUrl) {
			$("[name=fileUrl"+index+"]").val(response.imageUrl);
		}
		if (response.videoDuration) {
			$("[name=fileDuration"+index+"]").val(response.videoDuration);
		}
		
		$("#savebtns").attr("disabled", false);
		$("#savebtns").next().attr("disabled", false);
	});
	
	$('#videoinput').on('fileselect',function(event, numFiles, label) {
//		console.log(event.currentTarget.files);
//		var file, image;
//		var _URL = window.URL || window.webkitURL;
		/*for (var i = 0; i < numFiles; i++) {
			if ((file = this.files[i])) {
				image = new Image();
				image.src = _URL.createObjectURL(file);
				image.onload = function() {
					console.log(this.width + "," + this.height);
//					if (!((this.width == 120
//							|| this.width == 320 || this.width == 600) && this.height == 100)) {
//						alert("图片大小不合法！");
//					}
//					$(".kv-file-upload").attr({"disabled":"disabled"});
					
				}

			}

		}*/
//		if($("[name=fileUrl0]").length > 0){
//			$("[name=cfileUrl0]").val("");
//		}
		$(this).fileinput("upload");
	});
	$('#videoinput').on('filebatchselected' , function(event, data, previewId,index) {
		$(this).fileinput("upload");
	});
	// 上传前
	$('#videoinput').on('filepreupload',function(event, data, previewId, index) {
		var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
	});
	
	
	/*var flowCount = $('#flowinput').fileinput('getFilesCount');
	$("[name=flowNum]").val(flowCount);*/
	// 异步上传返回结果处理
	$("#flowinput").on("fileuploaded",function(event, data, previewId, index) {
		console.info(data);
		var response = data.response;
		/*alert(index);
		// 创建图片信息隐藏域并赋值
		$("#editForm").append(
			'<input type="hidden" name="width'
					+ index
					+ '" value=""/><input type="hidden" name="height'
					+ index
					+ '" value=""/><input type="hidden" name="picName'
					+ index
					+ '" value=""/><input type="hidden" name="picSize'
					+ index
					+ '" value=""/><input type="hidden" name="creativeFormat'
					+ index
					+ '" value=""/><input type="hidden" name="creativeUrl'
					+ index + '" value=""/>');*/
		if (response.width) {
			$("[name=fileWidth"+index+"]").val(response.width);
		}
		if (response.height) {
			$("[name=fileHeight"+index+"]").val(response.height);
		}
		if (response.picName) {
			$("[name=fileName"+index+"]").val(response.picName);
		}
		if(response.picSize) {
			$("[name=fileSize"+index+"]").val(response.picSize);
		}
		if (response.creativeFormat) {
			$("[name=fileFormat"+index+"]").val(
					response.creativeFormat);
		}
		if (response.imageUrl) {
			$("[name=fileUrl"+index+"]").val(response.imageUrl);
		}
	});
	$('#flowinput').on('fileselect',function(event, numFiles, label) {
	});
	$('#flowinput').on('filebatchselected' , function(event, data, previewId,index) {
	});
	// 上传前
	$('#flowinput').on('filepreupload',function(event, data, previewId, index) {
		var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
	});
	// 异步上传返回结果处理
	$("#flashinput").on("fileuploaded",function(event, data, previewId, index) {
		console.info(data);
		var response = data.response;
		//alert(index);
		// 创建图片信息隐藏域并赋值
		if (response.width) {
			$("[name=fileWidth"+index+"]").val(response.width);
		}
		if (response.height) {
			$("[name=fileHeight"+index+"]").val(response.height);
		}
		if (response.picName) {
			$("[name=fileName"+index+"]").val(response.picName);
		}
		if(response.picSize) {
			$("[name=fileSize"+index+"]").val(response.picSize);
		}
		if (response.creativeFormat) {
			$("[name=fileFormat"+index+"]").val(
					response.creativeFormat);
		}
		if (response.imageUrl) {
			$("[name=fileUrl"+index+"]").val(response.imageUrl);
		}
		
		$("#savebtns").attr("disabled", false);
		$("#savebtns").next().attr("disabled", false);
	});
	
	$('#flashinput').on('fileselect',function(event, numFiles, label) {
//		console.log(event.currentTarget.files);
//		var file, image;
//		var _URL = window.URL || window.webkitURL;
		/*for (var i = 0; i < numFiles; i++) {
			if ((file = this.files[i])) {
				image = new Image();
				image.src = _URL.createObjectURL(file);
				image.onload = function() {
					console.log(this.width + "," + this.height);
//					if (!((this.width == 120
//							|| this.width == 320 || this.width == 600) && this.height == 100)) {
//						alert("图片大小不合法！");
//					}
//					$(".kv-file-upload").attr({"disabled":"disabled"});
					
				}

			}

		}*/
//		if($("[name=fileUrl0]").length > 0){
//			$("[name=cfileUrl0]").val("");
//		}
		$(this).fileinput("upload");
	});
	$('#flashinput').on('filebatchselected' , function(event, data, previewId,index) {
		$(this).fileinput("upload");
	});
	// 上传前
	$('#flashinput').on('filepreupload',function(event, data, previewId, index) {
		var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
	});
	
	$('.label-show-box').on('click','.label-show',function(e){
		var a = e.target;
		if($(a).closest('.label-show').length == "1"){
			$(a).closest('.label-show').remove();
		}
		var id = $(a).closest('.label-show').attr('id');
		$("[name=otherDictLabels]").find("#"+id).removeClass("label-add-ok").attr('disable',true);
	});
	
	$('.label-show-box').on('click','.label-add',function(e){
		if($(this).attr('disable') == 'disable') return false;
		$(this).parent().parent().prev().find('.label-show-box').append('<a href="#" class="label-show" id="' + $(this).attr("id") + '">'+ $(this).text()+'<i class="iconfont icon-shanchu"></i></a>')
		$(this).addClass('label-add-ok').attr('disable','disable');
	});
	
	$('.label-save').click(function (){
		
		var n = "";
		var labelSelected = $(this).parent().prev().prev();
		var labelShowBox = labelSelected.find('.label-show-box');
		var labelShow = labelShowBox.find('.label-show');
		var input = labelSelected.find('.label-input');
		var text = $.trim(input.val());
		
		var arr =[];
		$(labelShow).each(function (i,n) {
			arr.push($(this).text())
		});
		$.each(arr,function (i){
			if(arr.indexOf(text)>-1){
				n = true; //存在
			}else{
				n = false;//不存在
			}
		});
		if(text != "") {
			if(n){ 
				alert("标签已选");
				$(this).parent().prev().prev().find('.label-input').val("");
				return;
			}
			//保存时插入一条标签记录
			page.ajax({
				url : "sspDictLabel/add",
				data : { name : text },
				success : function(response) {
					if(response.status == 0){
						if(response.result.error){
							$('.label-save').parent().prev().prev().find('.label-input').val("");
							labelShowBox.append('<a href="#" class="label-show" id="' + response.result.id + '">'+text+'<i class="iconfont icon-shanchu"></i></a>');
							$("[name=otherDictLabels]").find("#"+response.result.id).addClass('label-add-ok').attr('disable','disable');
						} else {
							$('.label-save').parent().prev().prev().find('.label-input').val("");
							labelShowBox.append('<a href="#" class="label-show" id="' + response.result + '">'+text+'<i class="iconfont icon-shanchu"></i></a>');
						}
					}
				},
				error : function() {
					alert("保存失败");
				}
			});
		}
	});
	
	$('.label-save').next().click(function (){
		$(this).parent().prev().prev().find('.label-input').val("");
		return;
	});
	
	$("#savebtns").next().click(function() {
		$.confirm({
		    title: '确认退出',
		    content: '确定退出吗？退出后，修改的内容将不保存!',
		    buttons: {
		        okay: {
	                text: '确定',
	                btnClass: 'btn green',
	                action: function () {
	                	var url = "sspCreative/main";
	            		page.loadPage(url);
                    }
	            },
	            no: {
	                text: '取消',
	                btnClass: 'btn ',
	            }
		    }
		});
	});
	
})