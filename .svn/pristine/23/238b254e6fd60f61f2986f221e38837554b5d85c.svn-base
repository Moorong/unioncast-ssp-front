$(function() {

	$("select[name=license1]").change(function(){
		
		var hiddenInput = $(this).parent().parent().parent().find("input[type=hidden]");
		if($(this).val() == 2){
			hiddenInput.attr("name", "businessRegCertificatePic");
		} else if($(this).val() == 3){
			hiddenInput.attr("name", "legalPersonCertificatePic");
		} else if($(this).val() == 1) {
			hiddenInput.attr("name", "businessLicensePic");
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

	// 上传前
	$('.fileinput').on('filepreupload',
		function(event, data, previewId, index) {
			var form = data.form,
			files = data.files,
			extra = data.extra,
			response = data.response,
			reader = data.reader;
		});

	//	

	// ;
	$('form').eq(0).bootstrapValidator({
		excluded : [":disabled"],
		fields : {
			contacts : {
				validators : {
					notEmpty : {}
				}
			},
			phone : {
				validators : {
					notEmpty : {},
					regexp : {
						regexp : /^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}$/g,
						message : "请填写正确的手机号"
					}
				}
			},
			email : {
				validators : {
					notEmpty : {},
					regexp : {
						regexp : /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
						message : "请填写有效的邮箱"
					}
				}
			},
			
			keywords : {
				validators : {
					notEmpty : {}
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
						alert("更新数据成功").ok(function(){
							var url = "sspAdvertiser/getPages";
							page.loadPage(url);
						});
					} else {
						alert("更新数据失败").ok(function(){
							var url = "sspAdvertiser/getPages";
							page.loadPage(url);
						});
					}
				},
				error : function(data) {
					alert("更新数据失败").ok(function(){
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

	$('a[class$="savebtn"]').click(function() {
		$('form').eq(0).submit();
	})

	$("#savebtns").next().click(function() { 
		$.confirm({
		    title: '确认退出',
		    content: '确定退出吗？退出后，修改的内容将不保存!',
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
	
	
	var license1 = $("[name=license1]").val();
	var license2 = $("[name=license2]").val();
	$("#fileinput1").on('filebatchselected', function(event, data, id, index) {
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
	}).on('filecleared', function(event) {
		if (license1 == 1) {
			$("input[name=businessLicensePic]").val('');
		} else if (license1 == 2) {
			$("input[name=businessRegCertificatePic]").val('');
		} else if (license1 == 3) {
			$("input[name=legalPersonCertificatePic]").val('');
		}
	});
	
	$("#fileinput2").on('filebatchselected', function(event, data, id, index) {
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
	}).on('filecleared', function(event) {
		if (license2 == 1) {
			$("input[name=businessLicensePic]").val('');
		} else if (license2 == 2) {
			$("input[name=businessRegCertificatePic]").val('');
		} else if (license2 == 3) {
			$("input[name=legalPersonCertificatePic]").val('');
		}
	});
	
	$("#fileinput3").on('filebatchselected', function(event, data, id, index) {
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
	
	$("#fileinput4").on('filebatchselected', function(event, data, id, index) {
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
	
	$("#fileinput5").on('filebatchselected', function(event, data, id, index) {
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
	
	$("#fileinput6").on('filebatchselected', function(event, data, id, index) {
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
	
	$("#fileinput7").on('filebatchselected', function(event, data, id, index) {
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

});