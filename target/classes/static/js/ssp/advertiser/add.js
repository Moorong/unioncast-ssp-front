;
$(function() {

	$("select[name=license1]").change(function(){
		var hiddenInput = $(this).parent().parent().parent().find("input[type=hidden]");
		if($(this).val() == 1){
			hiddenInput.attr("name", "businessLicensePic");
		} else if($(this).val() == 2){
			hiddenInput.attr("name", "businessRegCertificatePic");
		} else if($(this).val() == 3) {
			hiddenInput.attr("name", "legalPersonCertificatePic");
		}
	});
	
	$("select[name=license2]").change(function(){
		if($(this).val() == $("select[name=license1]").val()){
			alert("您已选择过该项，请选择其他项");
			$("select[name=license2] option:last").prop("selected", 'selected'); 
			return;
		}
		var hiddenInput = $(this).parent().parent().parent().find("input[type=hidden]");
		if($(this).val() == 1) {
			hiddenInput.attr("name", "businessLicensePic");
		} else if($(this).val() == 2) {
			hiddenInput.attr("name", "businessRegCertificatePic");
		} else if($(this).val() == 3) {
			hiddenInput.attr("name", "legalPersonCertificatePic");
		}
	});
	

	var license1 = $("[name=license1]").val();
	var license2 = $("[name=license2]").val();
	$("#fileinput1").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspAdvertiser/imageUpload", // 上传的地址
		allowedFileExtensions : [ 'jpg', 'png', 'bmp', 'jpeg' ],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : false, // 是否显示上传按钮
		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 1, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		layoutTemplates : {
			main2: '{preview}\n{remove}\n{cancel}\n{browse}\n'
		},
		validateInitialCount : true,
	}).on('filebatchselected', function(event, data, id, index) {
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
			if (license1 == 1) {
				$("input[name=businessLicensePic]").val(url);
			} else if (license1 == 2) {
				$("input[name=businessRegCertificatePic]").val(url);
			} else if (license1 == 3) {
				$("input[name=legalPersonCertificatePic]").val(url);
			}
			$("#savebtns").attr("disabled", false);
			$("#savebtns").next().attr("disabled", false);

		}
	}).on("filesuccessremove", function (event, data, previewId, index) { 
	    if (license1 == 1) {
			$("input[name=businessLicensePic]").val('');
		} else if (license1 == 2) {
			$("input[name=businessRegCertificatePic]").val('');
		} else if (license1 == 3) {
			$("input[name=legalPersonCertificatePic]").val('');
		}
	    $(this).removeAttr("disabled");
	}).on('filecleared', function(event) {
		if (license1 == 1) {
			$("input[name=businessLicensePic]").val('');
		} else if (license1 == 2) {
			$("input[name=businessRegCertificatePic]").val('');
		} else if (license1 == 3) {
			$("input[name=legalPersonCertificatePic]").val('');
		}
		$(this).removeAttr("disabled");
	});
	
	$("#fileinput2").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspAdvertiser/imageUpload", // 上传的地址
		allowedFileExtensions : [ 'jpg', 'png', 'bmp', 'jpeg' ],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : false, // 是否显示上传按钮
		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 1, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		layoutTemplates : {
			main2: '{preview}\n{remove}\n{cancel}\n{browse}\n'
		},
		validateInitialCount : true,
	}).on('filebatchselected', function(event, data, id, index) {
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
			if(license2 == 1){
				$("input[name=businessLicensePic]").val(url);
			} else if(license2 == 2){
				$("input[name=businessRegCertificatePic]").val(url);
			} else if(license2 == 3){
				$("input[name=legalPersonCertificatePic]").val(url);
			}
			$("#savebtns").attr("disabled", false);
			$("#savebtns").next("disabled", false);
		}
	}).on("filesuccessremove", function (event, data, previewId, index) { 
	    for (var i = 0; i < List.length; i++) { 
	        if (List[i].KeyID== data) { 
	          delete List[i]; 
	        } 
	    }
	}).on('filecleared', function(event) {
		if (license2 == 1) {
			$("input[name=businessLicensePic]").val('');
		} else if (license2 == 2) {
			$("input[name=businessRegCertificatePic]").val('');
		} else if (license2 == 3) {
			$("input[name=legalPersonCertificatePic]").val('');
		}
	});
	
	$("#fileinput3").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspAdvertiser/imageUpload", // 上传的地址
		allowedFileExtensions : [ 'jpg', 'png', 'bmp', 'jpeg' ],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : false, // 是否显示上传按钮

		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 1, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		validateInitialCount : true,
		layoutTemplates : {
			main2: '{preview}\n{remove}\n{cancel}\n{browse}\n'
		}
	}).on('filebatchselected', function(event, data, id, index) {
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
			$("[name=logoPic]").val(url);
		}
	}).on('filecleared', function(event) {
		$("[name=logoPic]").val('');
	});
	
	$("#fileinput4").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspAdvertiser/imageUpload", // 上传的地址
		allowedFileExtensions : [ 'jpg', 'png', 'bmp', 'jpeg' ],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : false, // 是否显示上传按钮
		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 1, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		validateInitialCount : true,
		layoutTemplates : {
			main2: '{preview}\n{remove}\n{cancel}\n{browse}\n'
		}
	}).on('filebatchselected', function(event, data, id, index) {
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
			$("[name=organizationPic]").val(url);
		}
	}).on('filecleared', function(event) {
		$("[name=organizationPic]").val('');
	});
	
	$("#fileinput5").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspAdvertiser/imageUpload", // 上传的地址
		allowedFileExtensions : [ 'jpg', 'png', 'bmp', 'jpeg' ],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : false, // 是否显示上传按钮

		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 1, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		validateInitialCount : true,
		layoutTemplates : {
			main2: '{preview}\n{remove}\n{cancel}\n{browse}\n'
		}
	}).on('filebatchselected', function(event, data, id, index) {
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
			$("[name=icpPic]").val(url);
		}
	}).on('filecleared', function(event) {
		$("[name=icpPic]").val('');
	});
	
	$("#fileinput6").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspAdvertiser/imageUpload", // 上传的地址
		allowedFileExtensions : [ 'jpg', 'png', 'bmp', 'jpeg' ],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : false, // 是否显示上传按钮

		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 1, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		validateInitialCount : true,
		layoutTemplates : {
			main2: '{preview}\n{remove}\n{cancel}\n{browse}\n'
		}
	}).on('filebatchselected', function(event, data, id, index) {
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
			$("[name=taxCertificatePic]").val(url);
		}
	}).on('filecleared', function(event) {
		$("[name=taxCertificatePic]").val('');
	});
	
	$("#fileinput7").fileinput({
		language : 'zh', // 设置语言
		uploadUrl : "rest/sspAdvertiser/imageUpload", // 上传的地址
		allowedFileExtensions : [ 'jpg', 'png', 'bmp', 'jpeg' ],// 接收的文件后缀
		uploadAsync : true, // 默认异步上传
		showUpload : false, // 是否显示上传按钮

		showRemove : true, // 显示移除按钮
		showPreview : true, // 是否显示预览
		showCaption : false,// 是否显示标题
		browseClass : "btn btn-primary", // 按钮样式
		dropZoneEnabled : true,// 是否显示拖拽区域
		maxFileCount : 1, // 表示允许同时上传的最大文件个数
		enctype : 'multipart/form-data',
		validateInitialCount : true,
		layoutTemplates : {
			main2: '{preview}\n{remove}\n{cancel}\n{browse}\n'
		},
	}).on('filebatchselected', function(event, data, id, index) {
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
		$("[name=telecomOperLicensePic]").val('');
	});

	// 上传前
	$('.fileinput').on('filepreupload',
		function(event, data, previewId, index) {
			var form = data.form,
			files = data.files,
			extra = data.extra,
			response = data.response,
			reader = data.reader;
		});
	$('form').eq(0).bootstrapValidator({
		excluded : [":disabled"],
		fields : {
			name : {
				validators : {
					notEmpty : {
						message:"广告主名称不能为空!"
					},
					stringLength : {
						min : 2,
						max : 20,
						message : "广告主名称长度在2到20位之间"
					},
					remote : {
						threshold : 2,
						type : 'POST',
						data : {
							"name" : $("#name").val(),
							"id" : $("[name=id]").val()
						},
						url : 'rest/sspAdvertiser/validateName',
						message : "广告主名称已被使用"
					}
				}
			},
			companyRegName : {
				validators : {
					notEmpty : {
						message:"公司注册名称不能为空!"
					},
					remote : {
						threshold : 2,
						type : 'POST',
						data : {
							"companyRegName" : $("#companyRegName").val(),
							"id" : $("[name=id]").val()
						},
						url : 'rest/sspAdvertiser/validateCompanyRegName',
						message : "公司注册名称已被使用"
					}
				},
			},
			contacts : {
				validators : {
					notEmpty : {
						message:"联系人不能为空!"
					}
				}
			},
			phone : {
				validators : {
					notEmpty : {
						message:"手机不能为空!"
					},
					regexp : {
						regexp : /^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}$/g,
						message : "请填写正确的手机号"
					}
				}
			},
			email : {
				validators : {
					notEmpty : {
						message:"邮箱不能为空!"
					},
					regexp : {
						regexp : /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
						message : "请填写有效的邮箱"
					}
				}
			},
			
			keywords : {
				validators : {
					notEmpty : {
						message:"关键字不能为空!"
					}
				}
			}
		}
	}).on('success.form.bv', function(e) {
	// 防止表单提交
	e.preventDefault();
	

	if(validatorOther()){
		$("form").ajaxSubmit({
			success : function(result) {
				
				console.info(result);
				if (result.status == 0) {
					alert("新增数据成功").ok(function(){
//						var advertiserId = result.result;
//						var url = "sspOrder/list?advertiserId="+advertiserId;
						var url = "sspAdvertiser/getPages";
						page.loadPage(url);
					});
				} else {
					alert("新增数据失败").ok(function(){
						var url = "sspAdvertiser/getPages";
						page.loadPage(url);
					});
				}
			},
			error : function(data) {
				alert("新增数据失败").ok(function(){
					var url = "sspAdvertiser/getPages";
					page.loadPage(url);
				});
			}
		});
	}
});

	function validatorOther(bv) {
		
		var license1 = $("[name=businessLicensePic");
		var license2 = $("[name=businessRegCertificatePic]");
		var license3 = $("[name=legalPersonCertificatePic]");
		
		var licenselen1 = license1.length;
		var licenselen2 = license2.length;
		var licenselen3 = license3.length;
		//有两个不为空，则验证通过
		if(licenselen1 > 0 && license1.val() != "" && licenselen2 > 0 && license2.val() != ""
				|| licenselen1 > 0 && license1.val() != "" && licenselen3 > 0 && license3.val() != ""
				|| licenselen2 > 0 && license2.val() != "" && licenselen3 > 0 && license3.val() != ""){
			return true;
		}
		alert("请先选择基本资质及其他资质并上传");
		return false;
	}

	$("#savebtns").next().click(function() { 
		$.confirm({
		    title: '确认退出',
		    content: '确定退出吗？退出后，填写的内容将不保存!',
		    buttons: {
		        okay: {
	                text: '确定',
	                btnClass: 'btn green',
	                action: function () {
	                	var url = "sspAdvertiser/getPages";
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

});