;
$(function() {
	
	$("select[name=creativeType]").change(function() {
		var iv = $(this).val()*1;
		$('#myTabContent .tab-pane').removeClass('fade in active');
		$('#myTabContent #tab%s'.format(iv)).toggleClass('fade in active');
		switch(iv){
			case 1:
				//清除之前选择的创意
				$("#videoDiv,#flowDiv,#flashDiv").remove();
				$("#imageinput").fileinput("clear");
				//创建保存图片属性的div
				if($("#editForm").find("#imageDiv").length < 1) {
					$("#editForm").append('<div id="imageDiv"></div>')
				}
				break;
			case 2:
				//清除之前选择的创意
				$("#imageDiv,#flowDiv,#flashDiv").remove();
				$("#videoinput").fileinput("clear");
				//创建保存视频属性的div
				if($("#editForm").find("#videoDiv").length < 1) {
					$("#editForm").append('<div id="videoDiv"></div>')
				}
				break;
			case 3:
				//清除之前选择的创意
				$("#imageDiv,#videoDiv,#flashDiv").remove();
				$("#flowinput").fileinput("clear");
				//创建保存信息流属性的div
				if($("#editForm").find("#flowDiv").length < 1) {
					$("#editForm").append('<div id="flowDiv"></div>')
				}
				break;
			case 4:
				//清除之前选择的创意
				$("#imageDiv,#videoDiv,#flowDiv").remove();
				$("#flashinput").fileinput("clear");
				//创建保存信息流属性的div
				if($("#editForm").find("#flashDiv").length < 1) {
					$("#editForm").append('<div id="flashDiv"></div>')
				}
				break;
		}
		/*if (1==iv) {
			$("#tab1").addClass(" in active");
			$("#tab2").removeClass(" in active");
			$("#tab3").removeClass(" in active");
			
			//清除之前选择的创意
			$("#videoDiv").remove();
			$("#flowDiv").remove();
			$("#imageinput").fileinput("clear");
			//创建保存图片属性的div
			if($("#editForm").find("#imageDiv").length < 1) {
				$("#editForm").append('<div id="imageDiv"></div>')
			}
			
		} else if (2==iv) {
			$("#tab1").removeClass(" in active");
			$("#tab2").addClass(" in active");
			$("#tab3").removeClass(" in active");
			
			//清除之前选择的创意
			$("#imageDiv").remove();
			$("#flowDiv").remove();
			$("#videoinput").fileinput("clear");
			//创建保存视频属性的div
			if($("#editForm").find("#videoDiv").length < 1) {
				$("#editForm").append('<div id="videoDiv"></div>')
			}
		} else if (3==iv) {
			$("#tab1").removeClass(" in active");
			$("#tab2").removeClass(" in active");
			$("#tab3").addClass(" in active");
			
			//清除之前选择的创意
			$("#imageDiv").remove();
			$("#videoDiv").remove();
			$("#flowinput").fileinput("clear");
			//创建保存信息流属性的div
			if($("#editForm").find("#flowDiv").length < 1) {
				$("#editForm").append('<div id="flowDiv"></div>')
			}
		}else if ($(this).val() == 4) {
			$('#myTabContent .tab-pane').removeClass('active');
 			$('#myTabContent #tab%s'.format(iv)).toggleClass('active');
			
			//清除之前选择的创意
			$("#imageDiv").remove();
			$("#videoDiv").remove();
			$("#flowinput").fileinput("clear");
			//创建保存信息流属性的div
			if($("#editForm").find("#flowDiv").length < 1) {
				$("#editForm").append('<div id="flowDiv"></div>')
			}
		}*/
		
	});

	$('#editForm').eq(0).bootstrapValidator({
		excluded : [ ":disabled"],
//		submitButtons: 'button[type="submit"]',
		fields : {
//			advertiserSubmit : {
//				validators : {
//					notEmpty : {
//						message : "请选择所属广告主"
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
						callback:function(val,$form,$input){
							if(isEmpty(val))return {faild:false,message:'点击地址不能为空!'};
							if(!UC.isUrl(val))return {faild:false,message:'请填写有效的网址'};
							return true;
						}
					}
				}
			},
			creativeMonitorAddress : {
				validators : {
					callback:{
						callback:function(val,$form,$input){
							if(isEmpty(val))return {faild:false,message:'检测地址不能为空!'};
							if(!UC.isUrl(val))return {faild:false,message:'请填写有效的网址'};
							return true;
						}
					}
				}
			},
//			imageUrl0 : {
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
			if (result.status == 200) {
				alert("新增数据成功").ok(function(){
					page.loadPage(url);
				});
			} else {
				console.log(result);
				alert("新增数据失败");
			}
		},function(data) {
			console.log(data);
			alert("创建失败");
		});
		/*$("#editForm").ajaxSubmit({
			success : function(result) {
				var planId = $("[name=planId]").val();
				var url = "sspCreative/main?planId=" + planId;
				if (result.status == 200) {
					alert("新增数据成功").ok(function(){
						page.loadPage(url);
					});
				} else {
					console.log(result);
					alert("新增数据失败");
				}
			},
			error : function(data) {
				console.log(data);
				alert("创建失败");
			}
		});*/
	}
	
});
	
	
	//1.如果为图片，判断创意名称
	//2.如果为视频，判断预算
	//3.如果为信息流，判断预算和广告标题
	//所有的都要判断素材是否上传
	function validatorOther(bv) {
		if(!$('#myModal2').is(':hidden'))return false;
		
		if($("[name=advertiserSubmit]").val() == ""){
			alert("请选择所属广告主！");
			return false;
		}
		//添加标签表单值
		var labelValues = "";
		if($("[name=creativeType]").val() == 1){
			if($("[name=creativeName]").val() == ""){
				alert("请填写创意名称！");
				return false;
			}
			
			
			if($("[name=fileUrl0]").length < 1 || $("[name=fileUrl0]").val() == "") {
				alert("请选择素材并上传");
				return false;
			}
		} else if($("[name=creativeType]").val() == 2){
			/*
			//判断预算
			if($("#budget2").val() == "") {
				alert("请输入预算值");
				return false;
			}
			*/
		} else if($("[name=creativeType]").val() == 3){
			/*
			//判断预算和广告标题
			if($("#budget3").val() == "") {
				alert("请输入预算值");
				return false;
			}
			*/
			if($("[name=advTitle]").val() == "") {
				alert("请输入广告标题");
				return false;
			}
			
		}

		$("#dictLabels a").each(function(){
			labelValues += "," + $(this).attr("id");
		});
		$("[name=dictLabelArr]").val(labelValues);
		
		if($("[name=dictLabelArr]").val() == ""){
			alert("请选择创意标签");
			return false;
		}
		
		$("#savebtns").attr("disabled", false);
		$("#savebtns").next().attr("disabled", false);
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
				$("#advertiserList").html("<tr><td colspan='4' style='vertical-align: middle;text-align:center;'>暂时没有查到数据</td></tr>");
				$("#advertiserPage").empty();
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
		$('#myModal2').toggleClass('hidden');
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
				
				if (data.result.dataArray.length != 0) {
					$("#advertiserList").html("");
					$("#advertiserPage").empty();
					loadAdvertisersPage(data);
				} else {
					$("#advertiserList").html("<tr><td colspan='4' style='vertical-align: middle;text-align:center;'>暂时没有查到数据</td></tr>");
					$("#advertiserPage").empty();
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
					var html = "<tr>";
					html += "<td><input type='radio' name='advertiserId' advid='"+advertiser.id+"'/></td>";
					html += "<td style='vertical-align: middle;text-align:center;' name='advertiserName'>"
						+ advertiser.name + "</td>";
//					html += "<td style='vertical-align: middle;text-align:center;' class='advertiserId'>"
//						+ advertiser.advertiserIdentifying + "</td>";
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
	var fileNum = $("[name=fileNum]");
	fileNum.val(0);
	var maxFileNum = 0;
	var hid_fm_input_arr = [];
	//图片创意初始化
	$("#imageinput").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspCreative/imageUpload", // 上传的地址
		allowedFileExtensions : [ 'jpg', 'png', 'jpeg' , 'gif' ],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : false, // 是否显示上传按钮
		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 10, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		validateInitialCount : true,
		fileSizeGetter : true,
		layoutTemplates : {
			main2: '{preview}\n{remove}\n{cancel}\n{browse}\n'
		}
	}).on('filebatchselected', function(event, data, id, index) {
		$(this).fileinput("upload");
	}).on('filesuccessremove', function(event, id) {
		var pn = $('#'+id).attr('pn');
		$("#editForm .hid_fm_input[pn='%s']".format(pn)).remove();
		fileNum.val(parseInt(fileNum.val()) - 1);
		//重新排序
		var index = 0;
		for(var i=0;i<=maxFileNum;i++){
			var hidFmInput = $("#editForm .hid_fm_input[pn='%s']".format(i));
			if(hidFmInput.length>0){
				var next = index++;
				$('.file-preview-thumbnails .file-preview-frame[pn="%s"]'.format(i)).attr('pn',next);
				hidFmInput.each(function(j,o){
					var $this = $(this);
					$this.attr('pn',next).attr('name',$this.attr('name').replace(/\d+$/,next));
				});
			}
		}
	}).on("fileuploaded",function(event, data, previewId, index) {
		var response = data.response;
		var $currImg = $('#'+previewId+' img');
		//图片等比缩放
		var iw = response.width;
		var ih = response.height;
		var sw = window.screen.width;
		var sh = window.screen.height;
		
		var iswp = iw<sw?iw/sw:sw/iw;
		var ishp = ih<sh?ih/sh:sh/ih;
		if(iswp>0.5&&ishp>0.5){
			if(ishp>=0.5||ishp>=0.5){
				$currImg.css({
					width:iw*0.3,
					height:ih*0.3
				});
			}else	if(iswp>0.5&&iswp<1){
				$currImg.css('width',(1.1-iswp)*100+'%');
			}else	if(ishp>0.5&&ishp<1){
				$currImg.css('width',(1.1-ishp)*100+'%');
			}
		}
		var $newImg = $currImg.clone();
		$newImg.attr('src',globalVar.imgPrefix+data.response.imageUrl);
		var $tempDiv = $(HT.div).append($newImg);
		$currImg.parent().prepend($tempDiv);
		$currImg.remove();
		$tempDiv.zoom({
			url:globalVar.imgPrefix+data.response.imageUrl,
			target:$tempDiv
		});
		
		
		if(data.response.error){
			alert(data.response.error);
			return;
		}
		
		// 创建图片信息隐藏域并赋值
		var fileNv = fileNum.val();
		$('#'+previewId).attr('pn',fileNv);
		$("#imageDiv")
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileWidth'+fileNv,
			value:response.width?response.width:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileHeight'+fileNv,
			value:response.height?response.height:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileName'+fileNv,
			value:response.picName?response.picName:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileSize'+fileNv,
			value:response.picSize?response.picSize:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileFormat'+fileNv,
			value:response.creativeFormat?response.creativeFormat:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileUrl'+fileNv,
			value:response.imageUrl?response.imageUrl:''
		}));
		
		/*.append('<input type="hidden" class="hid_fm_input" pn="%s" name="width%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="height%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="picName%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="picSize%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="creativeFormat%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="imageUrl%s"/>'.format(picNv,picNv));

		if (response.width) {
			$("[name=width"+picNum.val()+"]").val(response.width);
		}
		if (response.height) {
			$("[name=height"+picNum.val()+"]").val(response.height);
		}
		if (response.picName) {
			$("[name=picName"+picNum.val()+"]").val(response.picName);
		}
		if(response.picSize) {
			$("[name=picSize"+picNum.val()+"]").val(response.picSize);
		}
		if (response.creativeFormat) {
			$("[name=creativeFormat"+picNum.val()+"]").val(
					response.creativeFormat);
		}
		if (response.imageUrl) {
			$("[name=imageUrl"+picNum.val()+"]").val(response.imageUrl);
		}*/
		fileNum.val(parseInt(fileNum.val()) + 1);
		maxFileNum = parseInt(fileNum.val());
		
		$("#savebtns").attr("disabled", false);
		$("#savebtns").next().attr("disabled", false);
	}).on('filecleared', function(event) {
		$("#editForm .hid_fm_input").remove();
		fileNum.val(0);
		maxFileNum = 0;
	});
	
	//视频创意初始化
	$("#videoinput").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspCreative/imageUpload", // 上传的地址
		allowedFileExtensions : [ 'avi', 'flv', 'mp4'],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : true, // 是否显示上传按钮
		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 10, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		allowedPreviewTypes : ['image', 'html', 'text', 'video', 'audio', 'flash', 'object'],
		validateInitialCount : true,
		maxFileSize : 10*1024,
		msgSizeTooLarge : '文件 "{name}" ({size} KB) 超过最大限制 {maxSize} KB!',
		fileSizeGetter : function(bytes) {
			var i = Math
					.floor(Math.log(bytes) / Math.log(1024)), sizes = [
					'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB',
					'ZB', 'YB' ];
			return (bytes / Math.pow(1024, i)).toFixed(2) * 1
					+ ' ' + sizes[i];
		}
	}).on('filebatchselected', function(event, data, id, index) {
		$(this).fileinput("upload");
	}).on('filesuccessremove', function(event, id) {
		var pn = $('#'+id).attr('pn');
		$("#editForm .hid_fm_input[pn='%s']".format(pn)).remove();
		fileNum.val(parseInt(fileNum.val()) - 1);
		//重新排序
		var index = 0;
		for(var i=0;i<=maxFileNum;i++){
			var hidFmInput = $("#editForm .hid_fm_input[pn='%s']".format(i));
			if(hidFmInput.length>0){
				var next = index++;
				$('.file-preview-thumbnails .file-preview-frame[pn="%s"]'.format(i)).attr('pn',next);
				hidFmInput.each(function(j,o){
					var $this = $(this);
					$this.attr('pn',next).attr('name',$this.attr('name').replace(/\d+$/,next));
				});
			}
		}
	}).on("fileuploaded",function(event, data, previewId, index) {
		var response = data.response;
		$('.kv-upload-progress').hide();
		var $currImg = $('#'+previewId);
		if(data.response.error){
			alert(data.response.error);
			return;
		}
		// 创建图片信息隐藏域并赋值
		var fileNv = fileNum.val();
		$('#'+previewId).attr('pn',fileNv);
		$("#videoDiv")
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileWidth'+fileNv,
			value:response.width?response.width:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileHeight'+fileNv,
			value:response.height?response.height:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileName'+fileNv,
			value:response.picName?response.picName:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileSize'+fileNv,
			value:response.picSize?response.picSize:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileFormat'+fileNv,
			value:response.creativeFormat?response.creativeFormat:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileUrl'+fileNv,
			value:response.imageUrl?response.imageUrl:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileDuration'+fileNv,
			value:response.videoDuration?response.videoDuration:''
		}));
		fileNum.val(parseInt(fileNum.val()) + 1);
		maxFileNum = parseInt(fileNum.val());
		
		$("#savebtns").attr("disabled", false);
		$("#savebtns").next().attr("disabled", false);
	}).on('filecleared', function(event) {
		$("#editForm .hid_fm_input").remove();
		fileNum.val(0);
		maxFileNum = 0;
	});
	/*$("#videoinput").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspCreative/videoUpload", // 上传的地址
		allowedFileExtensions : [ 'avi', 'flv', 'mp4', 'swf' ],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : true, // 是否显示上传按钮
		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 10, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		allowedPreviewTypes : ['image', 'html', 'text', 'video', 'audio', 'flash', 'object'],
		validateInitialCount : true,
		maxFileSize : 2*1024,
		msgSizeTooLarge : '文件 "{name}" ({size} KB) 超过最大限制 {maxSize} KB. 请上传{maxSize} KB一下的视频!',
		fileSizeGetter : function(bytes) {
			var i = Math
					.floor(Math.log(bytes) / Math.log(1024)), sizes = [
					'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB',
					'ZB', 'YB' ];
			return (bytes / Math.pow(1024, i)).toFixed(2) * 1
					+ ' ' + sizes[i];
		}
	}).on('filebatchselected', function(event, data, id, index) {
		$(this).fileinput("upload");
	})
	.on('filesuccessremove', function(event, id) {
		var pn = $('#'+id).attr('pn');
		$("#editForm .hid_fm_input[pn='%s']".format(pn)).remove();
		picNum.val(parseInt(picNum.val()) - 1);
		//重新排序
		var index = 0;
		for(var i=0;i<=maxPicNum;i++){
			var hidFmInput = $("#editForm .hid_fm_input[pn='%s']".format(i));
			if(hidFmInput.length>0){
				var next = index++;
				$('.file-preview-thumbnails .file-preview-frame[pn="%s"]'.format(i)).attr('pn',next);
				hidFmInput.each(function(j,o){
					var $this = $(this);
					$this.attr('pn',next).attr('name',$this.attr('name').replace(/\d+$/,next));
				});
			}
		}
	}).on("fileuploaded",function(event, data, previewId, index) {
		if(data.response.error){
			alert(data.response.error);
			return;
		}
		
		var response = data.response;
		// 创建图片信息隐藏域并赋值
		var picNv = picNum.val();
		$('#'+previewId).attr('pn',picNv);
		$("#videoDiv")
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="width%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="height%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="picName%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="picSize%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="creativeFormat%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="imageUrl%s"/>'.format(picNv,picNv));

		if (response.width) {
			$("[name=width"+picNum.val()+"]").val(response.width);
		}
		if (response.height) {
			$("[name=height"+picNum.val()+"]").val(response.height);
		}
		if (response.picName) {
			$("[name=picName"+picNum.val()+"]").val(response.picName);
		}
		if(response.picSize) {
			$("[name=picSize"+picNum.val()+"]").val(response.picSize);
		}
		if (response.creativeFormat) {
			$("[name=creativeFormat"+picNum.val()+"]").val(
					response.creativeFormat);
		}
		if (response.imageUrl) {
			$("[name=imageUrl"+picNum.val()+"]").val(response.imageUrl);
		}
		picNum.val(parseInt(picNum.val()) + 1);
		maxPicNum = parseInt(picNum.val());
		
		$("#savebtns").attr("disabled", false);
		$("#savebtns").next().attr("disabled", false);
	}).on('filecleared', function(event) {
		$("#editForm .hid_fm_input").remove();
		picNum.val(0);
		maxPicNum = 0;
	});*/
	
	//信息流创意初始化
	$("#flowinput").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspCreative/imageUpload", // 上传的地址
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
	}).on('filebatchselected', function(event, data, id, index) {
		$(this).fileinput("upload");
	})
	.on('filesuccessremove', function(event, id) {
		var pn = $('#'+id).attr('pn');
		$("#editForm .hid_fm_input[pn='%s']".format(pn)).remove();
		picNum.val(parseInt(picNum.val()) - 1);
		//重新排序
		var index = 0;
		for(var i=0;i<=maxPicNum;i++){
			var hidFmInput = $("#editForm .hid_fm_input[pn='%s']".format(i));
			if(hidFmInput.length>0){
				var next = index++;
				$('.file-preview-thumbnails .file-preview-frame[pn="%s"]'.format(i)).attr('pn',next);
				hidFmInput.each(function(j,o){
					var $this = $(this);
					$this.attr('pn',next).attr('name',$this.attr('name').replace(/\d+$/,next));
				});
			}
		}
	}).on("fileuploaded",function(event, data, previewId, index) {
		if(data.response.error){
			alert(data.response.error);
			return;
		}
		
		var response = data.response;
		// 创建图片信息隐藏域并赋值
		var picNv = picNum.val();
		$('#'+previewId).attr('pn',picNv);
		
		$("#flowDiv")
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="width%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="height%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="picName%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="picSize%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="creativeFormat%s"/>'.format(picNv,picNv))
		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="imageUrl%s"/>'.format(picNv,picNv));

		if (response.width) {
			$("[name=width"+picNum.val()+"]").val(response.width);
		}
		if (response.height) {
			$("[name=height"+picNum.val()+"]").val(response.height);
		}
		if (response.picName) {
			$("[name=picName"+picNum.val()+"]").val(response.picName);
		}
		if(response.picSize) {
			$("[name=picSize"+picNum.val()+"]").val(response.picSize);
		}
		if (response.creativeFormat) {
			$("[name=creativeFormat"+picNum.val()+"]").val(
					response.creativeFormat);
		}
		if (response.imageUrl) {
			$("[name=imageUrl"+picNum.val()+"]").val(response.imageUrl);
		}
		picNum.val(parseInt(picNum.val()) + 1);
		maxPicNum = parseInt(picNum.val());
		
		$("#savebtns").attr("disabled", false);
		$("#savebtns").next().attr("disabled", false);
	}).on('filecleared', function(event) {
		$("#editForm .hid_fm_input").remove();
		picNum.val(0);
		maxPicNum = 0;
	});
	//Flash创意初始化
	$("#flashinput").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspCreative/imageUpload", // 上传的地址
		allowedFileExtensions : [ 'swf' ],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : false, // 是否显示上传按钮
		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 10, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		validateInitialCount : true,
		fileSizeGetter : true,
		layoutTemplates : {
			main2: '{preview}\n{remove}\n{cancel}\n{browse}\n'
		}
	}).on('filebatchselected', function(event, data, id, index) {
		$(this).fileinput("upload");
	}).on('filesuccessremove', function(event, id) {
		var pn = $('#'+id).attr('pn');
		$("#editForm .hid_fm_input[pn='%s']".format(pn)).remove();
		fileNum.val(parseInt(fileNum.val()) - 1);
		//重新排序
		var index = 0;
		for(var i=0;i<=maxFileNum;i++){
			var hidFmInput = $("#editForm .hid_fm_input[pn='%s']".format(i));
			if(hidFmInput.length>0){
				var next = index++;
				$('.file-preview-thumbnails .file-preview-frame[pn="%s"]'.format(i)).attr('pn',next);
				hidFmInput.each(function(j,o){
					var $this = $(this);
					$this.attr('pn',next).attr('name',$this.attr('name').replace(/\d+$/,next));
				});
			}
		}
	}).on("fileuploaded",function(event, data, previewId, index) {
		var response = data.response;
		var $currImg = $('#'+previewId);
		if(data.response.error){
			alert(data.response.error);
			return;
		}
		// 创建图片信息隐藏域并赋值
		var fileNv = fileNum.val();
		$('#'+previewId).attr('pn',fileNv);
		$("#flashDiv")
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileWidth'+fileNv,
			value:response.width?response.width:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileHeight'+fileNv,
			value:response.height?response.height:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileName'+fileNv,
			value:response.picName?response.picName:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileSize'+fileNv,
			value:response.picSize?response.picSize:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileFormat'+fileNv,
			value:response.creativeFormat?response.creativeFormat:''
		}))
		.append($(HT.input).attr({
			type:'hidden',
			class:'hid_fm_input',
			pn:fileNv,
			name:'fileUrl'+fileNv,
			value:response.imageUrl?response.imageUrl:''
		}));
		
		
//		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="flashWidth%s"/>'.format(flashNv,flashNv))
//		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="flashHeight%s"/>'.format(flashNv,flashNv))
//		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="flashName%s"/>'.format(flashNv,flashNv))
//		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="flashSize%s"/>'.format(flashNv,flashNv))
//		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="flashCreativeFormat%s"/>'.format(flashNv,flashNv))
//		.append('<input type="hidden" class="hid_fm_input" pn="%s" name="flashUrl%s"/>'.format(flashNv,flashNv));

		/*if (response.width) {
			$("[name=width"+flashNum.val()+"]").val(response.width);
		}
		if (response.height) {
			$("[name=height"+flashNum.val()+"]").val(response.height);
		}
		if (response.picName) {
			$("[name=picName"+flashNum.val()+"]").val(response.picName);
		}
		if(response.picSize) {
			$("[name=picSize"+flashNum.val()+"]").val(response.picSize);
		}
		if (response.creativeFormat) {
			$("[name=creativeFormat"+flashNum.val()+"]").val(
					response.creativeFormat);
		}
		if (response.imageUrl) {
			$("[name=imageUrl"+flashNum.val()+"]").val(response.imageUrl);
		}*/
		fileNum.val(parseInt(fileNum.val()) + 1);
		maxFileNum = parseInt(fileNum.val());
		
		$("#savebtns").attr("disabled", false);
		$("#savebtns").next().attr("disabled", false);
	}).on('filecleared', function(event) {
		$("#editForm .hid_fm_input").remove();
		fileNum.val(0);
		maxFileNum = 0;
	});
	
	/*
	// 上传前
	$('#imageinput').on('filepreupload',function(event, data, previewId, index) {
		var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
	});

	
	var videoCount = $('#videoinput').fileinput('getFilesCount');
	$("[name=videoNum]").val(videoCount);
	// 异步上传返回结果处理
	$("#videoinput").on("fileuploaded",function(event, data, previewId, index) {
		var response = data.response;
		
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
					+ '" value=""/><input type="hidden" name="imageUrl'
					+ index + '" value=""/>');
		if (response.width) {
			$("[name=width"+index+"]").val(response.width);
		}
		if (response.height) {
			$("[name=height"+index+"]").val(response.height);
		}
		if (response.picName) {
			$("[name=picName"+index+"]").val(response.picName);
		}
		if(response.picSize) {
			$("[name=picSize"+index+"]").val(response.picSize);
		}
		if (response.creativeFormat) {
			$("[name=creativeFormat"+index+"]").val(
					response.creativeFormat);
		}
		if (response.imageUrl) {
			$("[name=imageUrl"+index+"]").val(response.imageUrl);
		}
	});
	$('#videoinput').on('fileselect',function(event, numFiles, label) {
	});
	$('#videoinput').on('filebatchselected' , function(event, data, previewId,index) {
	});
	// 上传前
	$('#videoinput').on('filepreupload',function(event, data, previewId, index) {
		var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
	});
	
	
	var flowCount = $('#flowinput').fileinput('getFilesCount');
	$("[name=flowNum]").val(flowCount);
	// 异步上传返回结果处理
	$("#flowinput").on("fileuploaded",function(event, data, previewId, index) {
		console.info(data);
		var response = data.response;
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
					+ '" value=""/><input type="hidden" name="imageUrl'
					+ index + '" value=""/>');
		if (response.width) {
			$("[name=width"+index+"]").val(response.width);
		}
		if (response.height) {
			$("[name=height"+index+"]").val(response.height);
		}
		if (response.picName) {
			$("[name=picName"+index+"]").val(response.picName);
		}
		if(response.picSize) {
			$("[name=picSize"+index+"]").val(response.picSize);
		}
		if (response.creativeFormat) {
			$("[name=creativeFormat"+index+"]").val(
					response.creativeFormat);
		}
		if (response.imageUrl) {
			$("[name=imageUrl"+index+"]").val(response.imageUrl);
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
	*/

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
		$("#savebtns").attr("disabled", false);
		$("#savebtns").next().attr("disabled", false);
	});
	
	$('.label-save').click(function (){
		
		var n = "";
//		var labelSelected = $(this).parent().prev().prev();
		var labelSelected = $(this).parent();
		
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
				n = true;
			}else{
				n = false;
			}
		});
		if(text != "") {
			if(n){ 
				alert("标签已选");
				input.val("");
				return;
			}
			//保存时插入一条标签记录
			page.ajax({
				url : "sspDictLabel/add",
				data : { name : text },
				success : function(response) {
					if(response.status == 0){
						if(response.result.error){
							input.val("");
							labelShowBox.append('<a href="#" class="label-show" id="'+ response.result.id +'">'+text+'<i class="iconfont icon-shanchu"></i></a>');
							$("[name=otherDictLabels]").find("#"+response.result.id).addClass('label-add-ok').attr('disable','disable');
						} else {
							input.val("");
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
		$(this).parent().find('.label-input').val("");
		return;
	});
	
	$("#savebtns").next().click(function() {
		$.confirm({
		    title: '确认退出',
		    content: '确定退出吗？退出后，填写的内容将不保存!',
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