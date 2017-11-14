$(function(){
	/* 组件初始化 */
	// 下拉菜单
	
	var defDateFormat = "YYYY-MM-DD";
	var defStartDate = moment().subtract('days', 7).format(defDateFormat);
	var defEndDate = moment().format(defDateFormat);
	/* 双日历组件 */
	$('div[id="mtReportrange"] span').html(defStartDate + ' - ' + defEndDate);
	// 默认为时间空间赋值
	$('input[name="mtStartTimeTem"]').val(getMapDate(7));
	$('input[name="mtEndTimeTem"]').val(getMapDate(0));

	$('div[id="mtReportrange"]').daterangepicker(
			{
				locale: page.attr.drDefaultLocal,
				startDate : defStartDate
			},
			function(start, end) {
				var choStart = start.format(defDateFormat);
				var choEnd = end.format(defDateFormat);
				$('div[id="mtReportrange"] span').html(choStart + ' - ' + choEnd);
				$('input[name="mtStartTimeTem"]').val(choStart);
				$('input[name="mtEndTimeTem"]').val(choEnd);
				$('div[id="mtReportrange"] span').html(
						start.format(defDateFormat) + ' - '
								+ end.format(defDateFormat));
			});
	
});

function showMTReport(){
	

	// 初始化媒体报表数据
	pullDownUserId();
	loadMTData(1);
	flushColResize();
}

 

$("a[id='mtExportExcel']").click(function() {
	var $this = $(this);
	var defDateFormat = "yyyyMMdd";
	var defDate = new Date().format(defDateFormat);
	var filename = defDate + $this.attr('ecfn');
	$this.parent().parent().find('table').table2excel({
		// exclude CSS class
		/* exclude: ".noExl", */
		name : "Worksheet Name",
		filename : filename
	// do not include extension
	});
	
})

function mtConfirmMeth(o) {
	
	var index = currReportTabIndex;
	var $popover = $(o).parent().parent().parent();
	if ($popover.find('div[id="%s"] :checkbox:checked'.format('checkboxNoZero')).size() == 0) {
		alert("请至少选择一项");
		return;
	}
	$('input[name="mtStartTime"]').val($('input[name="mtStartTimeTem"]').val());
	$('input[name="mtEndTime"]').val($('input[name="mtEndTimeTem"]').val());
	
	getMTParams(1);
	
	
	reportSelectColumnArr[index].each(function(k,v){
		var flag = $popover.find(String.format(':checkbox[id="%s"]',v.id)).prop('checked');
		var tmapval = reportSelectColumnArr[index].get(k);
		tmapval.checked = flag;
		reportSelectColumnArr[index].put(k,tmapval);
	});
	checkAdSlot();
	hideShowColumns();
	$popover.popover('toggle');
	flushColResize();
}
function mtAdslotNotSelect(o){
	var id = $(o).attr("id");
	var flag = $(o).is(':checked');
	if("position" == id ){
		if(!flag){
			$(".adSlotNotSelect").each(function(){
				 if ($(this).is(':checked')) {
		             $(this).attr('checked',false);
		             $(this).prop('disabled',true);
		             
		          }else{
		        	  $(this).prop('disabled',true);
		          }
			});
		}else{
			$(".adSlotNotSelect").each(function(){
			 $(this).prop('disabled',false);
			});
		}
	}
}
// 开发者
function pullDownUserId() {
	page.ajax({
		url : 'ssp/user/findAll',
		cache : false,
		// data: {startTime: startTime, endTime: endTime, currentPageNo:
		// currentPageNo},
		success : function(res) {
			var data = res.result;

			if (data != null && data.length != 0) {
				$.each(data, function(index, report) {
					$("[name=userId]").append(
							'<option value=' + report.id + '>' + report.username
									+ '</option>');
				});
				$("[name=userId]").selectpicker('refresh');
			} else {
				$("[name=userId]").append(
						'<option value="">暂无开发者</option>');
				$("[name=userId]").selectpicker('refresh');
			}
		},
		error : function(err) {

		}
	});
}

// 应用
function pullDownAppInfoId() {
	if ($("[name=userId]").val() != undefined&& $("[name=userId]").val() != null&& $("[name=userId]").val() != '') {
		var id = $("[name=userId]").val();
		page.ajax({
			url : 'sspAppInfo/findByUserId',
			cache : false,
			type : "POST",
			datatype : 'json',
			data : {
				id : id
			},
			success : function(res) {
				$("[name=appInfoId]").empty();
				var data = res.result;
				if (data != null && data.length != 0) {
					$("[name=appInfoId]").append('<option value="">全部</option>');
					$.each(data, function(index, report) {
						$("[name=appInfoId]").append('<option value=' + report.id + '>'+ report.name + '</option>');
					});
					$("[name=appInfoId]").selectpicker('refresh');
				} else {
					$("[name=appInfoId]").append('<option value="">暂无应用</option>');
					$("[name=appInfoId]").selectpicker('refresh');
				}
			},
			error : function(err) {
			}
		});
	}
	/* $("[name=orderId]").empty(); */
	$("[name=adPositionInfoId]").empty();
	/* $("[name=orderId]").append('<option value="">全部</option>'); */
	$("[name=adPositionInfoId]").append('<option value="">全部</option>');
	/* $("[name=orderId]").selectpicker('refresh'); */
	$("[name=adPositionInfoId]").selectpicker('refresh');
}

// 广告位
function pullDownAdPositionInfoId() {
	if ($("[name=appInfoId]").val() != undefined && $("[name=appInfoId]").val() != null && $("[name=appInfoId]").val() != '') {
		var id = $("[name=appInfoId]").val();
		page.ajax({
					url : 'sspAdPositionInfo/findByAppInfoId',
					cache : false,
					// async: false,
					data : {
						id : id
					},
					success : function(res) {
						$("[name=adPositionInfoId]").empty();
						var data = res.result;
						if (data != null && data.length != 0) {
							$("[name=adPositionInfoId]").append(
									'<option value="">全部</option>');
							$.each(data, function(index, report) {
								$("[name=adPositionInfoId]").append(
										'<option value=' + report.id + '>'+ report.name + '</option>');
							});
							$("[name=adPositionInfoId]").selectpicker('refresh');
						} else {
							$("[name=adPositionInfoId]").append(
									'<option value="">暂无广告位</option>');
							$("[name=adPositionInfoId]").selectpicker('refresh');
						}
					},
					error : function(err) {

					}
				});
	}
}
function getMTParams2(currentPageNo){
	
	//按小时
	//debugger;
	var byHour = $('input:radio[name="byHourMT"]').is(':checked');
	  //地域
	var regionState = false; 
	var jsonData = {
   		 "currentPageNo" : currentPageNo,
			"pageSize" : 10,
			"predicate" : "AND",
			"searchExpressionList" : [],
			"orderExpressionList" : [{
				"propertyName" : "mediaDay",
				"op" : "DESC"
			}] 
	};
	//时间
	var startTime = $('input[name="mtStartTime"]').val();
	var endTime = $('input[name="mtEndTime"]').val();
	var mtDay = "";
	//开发者
	var accountId = $('select[name="userId"]').val();
	//应用
	var appInfoId = $('select[name="appInfoId"]').val();
	var value ="";
	//debugger;
	var tb_index  = currReportTabIndex;  
	var currReportSelectColumnMap = reportSelectColumnArr[tb_index];
		currReportSelectColumnMap.each(function(k,v){
			if(v.checked){
				console.info(v.id,v.checked);
				if("upti" == v.id){
					if(!isEmpty(startTime) && !isEmpty(endTime)){
						mtDay = startTime + " 00:00:00" + "/" + endTime + " 59:59:59"; 
					}
					jsonData.searchExpressionList.push({
						'value' : mtDay,
				     	'propertyName' : 'mediaDay',
				     	'operation' : 'EQ'
						});
				}else if("user"== v.id){
					if(isEmpty(accountId)){
						accountId = "";
					}
					jsonData.searchExpressionList.push({
			 			'value' : accountId,
			         	'propertyName' : 'accountId',
			         	'operation' : 'EQ'
			 		});
				}else if("appInfo" == v.id){
					if(isEmpty(appInfoId)){
						appInfoId = "";
					}
			 		jsonData.searchExpressionList.push({
			 			'value' : appInfoId,
			         	'propertyName' : 'appId',
			         	'operation' : 'EQ'
			 		});
				}else if("position" == v.id){
					 jsonData.searchExpressionList.push({
		                  'value' : value,
		                  'propertyName' : "adslotId",
		                  'operation' : 'EQ'
		              });
				}else if("adslotSize" == v.id){
					 jsonData.searchExpressionList.push({
		                  'value' : value,
		                  'propertyName' : "adslotSize",
		                  'operation' : 'EQ'
		              });
				}else if("region" == v.id){
					regionState =true;
				}
			}
		});
console.info(JSON.stringify(jsonData));
	page.ajax({
		url: "mcs/mtReport/mtPage",
		type : "POST",
		data : {
			byHour:byHour,
			regionState:regionState,
			jsonData:JSON.stringify(jsonData)
		},
      
		success : function(data) {
			if (data.result != null && data.result.dataArray!= null && data.result.dataArray.length != null) {
				$("#mtReportList").html("");
				loadMTPage(data);
			} else {
				mtnoData();
				return false;
			}
		},
		error : function(err) {
			mtnoData();
		}
	});
	
}
//加载媒体参数
function getMTParams(currentPageNo){
	
	//按小时
	var byHour = $('input:radio[name="byHourMT"]').is(':checked');
	  //地域
	var regionState = $('input:checkbox[name="regionStateMT"]').is(':checked'); 
	
	var jsonData = {
   		 "currentPageNo" : currentPageNo,
			"pageSize" : 10,
			"predicate" : "AND",
			"searchExpressionList" : [],
			"orderExpressionList" : [{
				"propertyName" : "mediaDay",
				"op" : "DESC"
			}] 
	};
	//时间
	
	var startTime = $('input[name="mtStartTime"]').val();
	var endTime = $('input[name="mtEndTime"]').val();
	
	var mtDayState = $('input:checkbox[name="mediaDay"]').is(':checked');
	var mtDay = "";
	if( mtDayState){
		if(!isEmpty(startTime) && !isEmpty(endTime)){
			mtDay = startTime + " 00:00:00" + "/" + endTime + " 59:59:59"; 
		}
		jsonData.searchExpressionList.push({
			'value' : mtDay,
	     	'propertyName' : 'mediaDay',
	     	'operation' : 'EQ'
			});
	}
	//开发者
	var accountId = $('select[name="userId"]').val();
	var accountState = $('input:checkbox[name="accountId"]').is(':checked');
	if( accountState){
		if(isEmpty(accountId)){
			accountId = "";
		}
		jsonData.searchExpressionList.push({
 			'value' : accountId,
         	'propertyName' : 'accountId',
         	'operation' : 'EQ'
 		});
	}
	//应用
	var appInfoId = $('select[name="appInfoId"]').val();
	var appState = $('input:checkbox[name="appId"]').is(':checked');
	if(appState) {
		if(isEmpty(appInfoId)){
			appInfoId = "";
		}
 		jsonData.searchExpressionList.push({
 			'value' : appInfoId,
         	'propertyName' : 'appId',
         	'operation' : 'EQ'
 		});
 	}
	//其他标签
	var tags = $(".inputCheckboxMT");
	  $(".inputCheckboxMT").each(function () {
          if ($(this).is(':checked')) {
              var str=$(this).attr('name');
              var value="";
              
              jsonData.searchExpressionList.push({
                  'value' : value,
                  'propertyName' : str,
                  'operation' : 'EQ'
              });

          }
      });
console.info(JSON.stringify(jsonData));
	page.ajax({
		url: "mcs/mtReport/mtPage",
		type : "POST",
		data : {
			byHour:byHour,
			regionState:regionState,
			jsonData:JSON.stringify(jsonData)
		},
      
		success : function(data) {
			if (data.result != null && data.result.dataArray!= null && data.result.dataArray.length != null) {
				$("#mtReportList").html("");
				loadMTPage(data);
			} else {
				mtnoData();
				return false;
			}
		},
		error : function(err) {
			mtnoData();
		}
	});
	
}
/* 搜索按钮提交 */
$("#searchMTPostion").click(function() {
	//debugger;
	
					$('input[name="mtStartTime"]').val($('input[name="mtStartTimeTem"]').val());
					$('input[name="mtEndTime"]').val($('input[name="mtEndTimeTem"]').val());
					page.ajaxSubmit($("#mtReportForm").eq(0)[0], function(
							resultJson, resultMsg, xmlHttpResponse) {

						if (resultJson.result.dataArray.length != 0) {
							$("#mtReportList").html("");
							loadMTPage(resultJson);
						} else {
							// alert("没有查询到数据！")
							// loadData(1);
							mtnoData();
						}
					}, function(xmlHttpRequest, errorMsg, errorObj) {

					});
});

// 加载数据
function loadMTData(currentPageNo) {
	$('.popover').popover('destroy');
	//getMTParams(currentPageNo);
	getMTParams2(currentPageNo);
}
function mtnoData() {
	var index = currReportTabIndex;
	$("tbody[id='mtReportList']").html("");
	$("tbody[id='mtReportList']")
			.append(
					"<tr class=\"sldataBodyRow\"><td style=\"text-align: center\" colspan=\"19\">暂时没有数据</td></tr>");
	var totalPage = 1;
	var totalCount = 0;
	var startPage = 1;
	$('div[id="mtReportPage"]').html('');
	$('div[id="mtReportPage"]').html(
			'<ul id="mtPage" class="bs-component pull-right"></ul>');

	page.ajaxPage({
		pcont : 'div[id="mtPage"]',// 分页容器，ID
		totalPages : totalPage, // 总页数
		startPage : startPage,
		count : totalCount, // 总记录数
		onPageClick : function(env, thisPage) {
//			if (!checkSelectColumn()) {
//				alert("请至少选择一项");
//				return;
//			}
			// CurrentPageNo = thisPage;
			// loadData(thisPage);
		}
	});
}

// 加载数据
function loadMTPage(data) {
	//debugger;
	var datas = data.result.dataArray;

	$.each(datas,
			function(index, report) {
				var html = "<tr>";

				var advertiser = (report.userName) == null ? '(空)' : report.userName;
				var advertiserStr = subStr(advertiser);

				var order = (report.appInfoName) == null ? '(空)' : report.appInfoName;
				var orderStr = subStr(order);

				var plan = (report.positionName) == null ? '(空)' : report.positionName;
				var planStr = subStr(plan);

				/*var creative = (report.creativeName) == null ? '(空)'
						: report.creativeName;
				var creativeStr = subStr(creative);*/
                  //收益
				var consumption = (report.profit) == null ? '0'
						: (report.profit);
				var consumptionStr = consumption.toFixed(2);

				var cpm = (report.cpm) == null ? '0' : (report.cpm);
				var cpmStr = cpm.toFixed(2);

				

				var cpc = (report.cpc) == null ? '0' : (report.cpc);
				var cpcStr = cpc.toFixed(2);

				var cpa = (report.cpa) == null ? '0' : (report.cpa);
				var cpaStr = cpa.toFixed(2);
				
				var mediaDay = (report.mediaDay) == null ? '0' : (report.mediaDay);
				var byHour = $('input:radio[name="byHourMT"]').is(':checked');
				if(byHour){
					var mediaHour =  (report.mediaHour) == null ? '' : (report.mediaHour);
					mediaDay = mediaDay + " "+mediaHour+ "时" ;
				}
				var mediaDatStr = subStr(mediaDay);
					
				var $td1 = $(HT.td).addClass('el1111').attr('title',mediaDatStr).html(mediaDatStr);
				//开发者
				var $td2 = $(HT.td).addClass('el2111').html(advertiserStr).css({color:'#3daded',cursor:'pointer'}).popover({
					placement:'right',
					html:true,
					trigger:'click',
					title:'开发者信息',
					content:popover_loading_content,
					template:popover_template_html,
					container:'#mtbb'
					
				}).on('show.bs.popover', function (){
					$('.popover').popover('hide');//隐藏其他
				}).on('shown.bs.popover', function () {
					var popoverId = $(this).attr('aria-describedby');
					var $popover = $(String.format('#%s',popoverId));
					page.ajax({
						url:'mcs/report/detail',
						data:{
							infoType:5,
							id:report.accountId
						},
						success:function(result){
							var old_arrow_style = $popover.find('.arrow').eq(0).attr('style');
							var old_arow_style_type = old_arrow_style.split(':')[0];
							var old_arrow_style_type_px = $popover.find('.arrow').eq(0).css(old_arow_style_type);
							var $container = $popover.find('.popover-content');
							
							var $tab = $(HT.tab);
							$.each(result,function(i,o){
								$tab.append(newFormGroup('名称',o.username))
												.append(newFormGroup('手机号码',o.phone))
												.append(newFormGroup('邮箱',o.email));
							});
							$container.html('').append($tab);
							$popover.find('.arrow').css(old_arow_style_type,old_arrow_style_type_px);
						},
						error:function(e){
							console.log(e);
						}
					},true);
				});
				//应用
				var $td3 = $(HT.td).addClass('el3111').html(orderStr).css({color:'#3daded',cursor:'pointer'}).popover({
					placement:'right',
					html:true,
					trigger:'click',
					title:'应用信息',
					content:popover_loading_content,
					template:popover_template_html,
					container:'#mtbb'
					
				}).on('show.bs.popover', function (){
					$('.popover').popover('hide');//隐藏其他
				}).on('shown.bs.popover', function () {
					var popoverId = $(this).attr('aria-describedby');
					var $popover = $(String.format('#%s',popoverId));
					page.ajax({
						url:'mcs/report/detail',
						data:{
							infoType:6,
							id:report.appInfoId
						},
						success:function(result){
							var old_arrow_style = $popover.find('.arrow').eq(0).attr('style');
							var old_arow_style_type = old_arrow_style.split(':')[0];
							var old_arrow_style_type_px = $popover.find('.arrow').eq(0).css(old_arow_style_type);
							var $container = $popover.find('.popover-content');
							var $tab = $(HT.tab);
							$.each(result.result,function(i,o){
								var downloadUrlTemp = o.downloadUrl;
								if(isNotEmpty(downloadUrlTemp)&&downloadUrlTemp.length>100){
									var txt = '';
									for(var i =0;i<downloadUrlTemp.length;i++){
										if(i>0&&i%100==0)
											txt+='</br>';
										txt+=downloadUrlTemp[i];
									}
									downloadUrlTemp = txt;
								}
								var appDescTemp = o.appDesc;
								if(isNotEmpty(appDescTemp)&&appDescTemp.length>100){
									var txt = '';
									for(var i =0;i<appDescTemp.length;i++){
										if(i>0&&i%100==0)
											txt+='</br>';
										txt+=appDescTemp[i];
									}
									appDescTemp = txt;
								}
								
								$tab.append(newFormGroup('应用名称',o.name))
												.append(newFormGroup('所属行业',(isEmpty(o.sspDictIndustry)?'':o.sspDictIndustry.name)))
												.append(newFormGroup('适用终端',(isEmpty(o.sspDictPlatform)?'':o.sspDictPlatform.name)))
												.append(newFormGroup('接入方式',(isEmpty(o.sspDictAccessWay)?'':o.sspDictAccessWay.name)))
												.append(newFormGroup('下载地址',downloadUrlTemp))
												.append(newFormGroup('包名',o.packageName))
												.append(newFormGroup('关键字',o.appKeywords))
												.append(newFormGroup('简介',appDescTemp))
												.append(newFormGroup('分成比例',o.ratio))
												.append(newFormGroup('创建者',(isEmpty(o.user)?'':o.user.username)));
							});
							$container.html('').append($tab);
							$popover.find('.arrow').css(old_arow_style_type,old_arrow_style_type_px);
						},
						error:function(e){
							console.log(e);
						}
					},true);
				});
				//广告位
				var $td4 = $(HT.td).addClass('el4111').html(planStr).css({color:'#3daded',cursor:'pointer'}).popover({
					placement:'right',
					html:true,
					trigger:'click',
					title:'广告位信息',
					content:popover_loading_content,
					template:popover_template_html,
					container:'#mtbb'
					
				}).on('show.bs.popover', function (){
					$('.popover').popover('hide');//隐藏其他
				}).on('shown.bs.popover', function () {
					var popoverId = $(this).attr('aria-describedby');
					var $popover = $(String.format('#%s',popoverId));
					page.ajax({
						url:'mcs/report/detail',
						data:{
							infoType:6,
							id:report.adSlotInfoId
						},
						success:function(result){
							var old_arrow_style = $popover.find('.arrow').eq(0).attr('style');
							var old_arow_style_type = old_arrow_style.split(':')[0];
							var old_arrow_style_type_px = $popover.find('.arrow').eq(0).css(old_arow_style_type);
							var $container = $popover.find('.popover-content');
							var $tab = $(HT.tab);
							$.each(result.result,function(i,o){
								$tab.append(newFormGroup('广告位名称',o.name))
												.append(newFormGroup('所属应用',(isEmpty(o.sspAppInfo)?'':o.sspAppInfo.username)))
												.append(newFormGroup('广告位类型',(isEmpty(o.sspDictAdPositionTypeList)?'':o.sspDictAdPositionTypeList.name)))
												.append(newFormGroup('作弊等级',(isEmpty(o.cheatLevel)?'':o.cheatLevel)))
												.append(newFormGroup('创建者',(isEmpty(o.user)?'':o.user.username)));
							});
							$container.html('').append($tab);
							$popover.find('.arrow').css(old_arow_style_type,old_arrow_style_type_px);
						},
						error:function(e){
							console.log(e);
						}
					},true);
				});
//				var $td5 = $(HT.td).addClass('el5111').attr('title',creative).html(creativeStr).css({color:'#3daded',cursor:'pointer'});
				
				var rshow_time = ((report.impression) == null ? '0' : (report.impression));
				var $td5 = $(HT.td).addClass('el5111').attr('title',rshow_time).html(rshow_time);
				var $td6 = $(HT.td).addClass('el6111').attr('title',consumption).html(consumptionStr);
				var $td7 = $(HT.td).addClass('el7111').attr('title',cpm).html(cpmStr);
				var rclick_time = ((report.click) == null ? '0' : (report.click));
				var $td8 = $(HT.td).addClass('el8111').attr('title',rclick_time).html(rclick_time);
				var clickRatio = (rshow_time) == '0' ? '0': (rclick_time/rshow_time)*100;
				var clickRatioStr = clickRatio.toFixed(0)+"%";
				var $td9 = $(HT.td).addClass('el9111').attr('title',clickRatio).html(clickRatioStr);
				var $td10 = $(HT.td).addClass('el10111').attr('title',cpc).html(cpcStr);
				var r_arrival = ((report.arrival) == null ? '0' : (report.arrival));
				var $td11 = $(HT.td).addClass('el11111').attr('title',r_arrival).html(r_arrival);
				var r_transform = ((report.impressionTransform) == null ? '0' : (report.impressionTransform))
				var $td12 = $(HT.td).addClass('el12111').attr('title',r_transform).html(r_transform);
				var $td13 = $(HT.td).addClass('el13111').attr('title',cpa).html(cpaStr);
				var r_secondJump = ((report.secondJump) == null ? '0' : (report.secondJump));
				var $td14 = $(HT.td).addClass('el14111').attr('title',r_secondJump).html(r_secondJump);
				var r_secondJumpRatio = ((report.secondJumpRatio) == null ? '0' : (report.secondJumpRatio));
				var $td15 = $(HT.td).addClass('el15111').attr('title',r_secondJumpRatio).html(r_secondJumpRatio);
				var r_arrivalRatio = ((report.arrivalRatio) == null ? '0' : (report.arrivalRatio));
				var $td16 = $(HT.td).addClass('el16111').attr('title',r_arrivalRatio).html(r_arrivalRatio);
				var r_clickTransform = ((report.clickTransform) == null ? '0' : (report.clickTransform));
				var $td17 = $(HT.td).addClass('el17111').attr('title',r_clickTransform).html(r_clickTransform);
				var r_clickTransformRatio = ((report.clickTransformRatio) == null ? '0' : (report.clickTransformRatio));
				var $td18 = $(HT.td).addClass('el18111').attr('title',r_clickTransformRatio).html(r_clickTransformRatio);
				
				var adslotSize = ((report.adslotSize) == null ? '' : (report.adslotSize));
				var adslotSizeStr = subStr(adslotSize);
				var $td19 = $(HT.td).addClass('el19111').attr('title',adslotSizeStr).html(adslotSizeStr);
				
				var adslotType = ((report.adslotType) == null ? '' : (report.adslotType));
				var adslotTypeStr = subStr(adslotType);
				var $td20 = $(HT.td).addClass('el20111').attr('title',adslotTypeStr).html(adslotTypeStr);
				
				var platform = ((report.platform) == null ? '' : (report.platform));
				var platformStr = subStr(platform);
				var $td21 = $(HT.td).addClass('el21111').attr('title',platformStr).html(platformStr);
				
				var region = ((report.region) == null ? '0' : (report.region));
				var $td22 = $(HT.td).addClass('el22111').attr('title',region).html(region);
				
			
				var $tr = $(HT.tr).append($td1).append($td2).append($td3).append($td4).append($td19).append($td20).append($td21).append($td22).append($td5).append($td6).append($td7)
				.append($td8).append($td9).append($td10).append($td11).append($td12).append($td13).append($td14)
				.append($td15).append($td16).append($td17).append($td18);
				$("#mtReportList").append($tr);

			});

	if (data.result.dataArray.length == 0) {
		mtnoData();
	}

	var totalPage = data.result.totalPage;
	var totalCount = data.result.totalCount;
	var startPage = data.result.currentPageNo;
	$('#mtReportPage').html('');
	$('#mtReportPage').html(
			'<ul id="mtPage" class="bs-component pull-right"></ul>');

	page.ajaxPage({
		pcont : 'mtPage',// 分页容器，ID
		totalPages : totalPage, // 总页数
		startPage : startPage,
		count : totalCount, // 总记录数
		onPageClick : function(env, thisPage) {
//			if (!checkSelectColumn()) {
//				alert("请至少选择一项");
//				return;
//			}
			CurrentPageNo = thisPage;
			loadMTData(thisPage);
		}
	});
	checkAdSlot();
	hideShowColumns();
	flushColResize();
}

/** 日期转换工具 */
function getMoth(str) {
	var oDate = new Date(str).format("yyyy-MM-dd");
	return oDate;
}

// 处理默认时间工具
function addDate(dd, dadd) {
	var a = new Date(dd)
	a = a.valueOf()
	a = a + dadd * 24 * 60 * 60 * 1000
	a = new Date(a)
	return a;
}

function subStr(data) {
	var dataStr = data;
//	if (data.length > 5) {
//		dataStr = data.substring(0, 5) + "...";
//	}
	return dataStr;
}

function getMapDate(dayss) {
	var now = new Date();
	var NextNow = addDate(now, -dayss);
	var years = NextNow.getFullYear();
	var months = NextNow.getMonth() + 1;
	var days = NextNow.getDate();
	return years + "-" + months + "-" + days;
}
function checkAdSlot(){
	
	var tb_index  = currReportTabIndex;
	var currReportSelectColumnMap = reportSelectColumnArr[tb_index];
	
	currReportSelectColumnMap.each(function(k,v){
		
		if("position" == v.id || "adslotSize" == v.id){
			//debugger;
			var state = v.checked;
			if(!v.checked){
				$('.sameToAdslot').each(function(){
					$(this).prop("checked",false);
				});
			}
		}
		
	});
//	var adslotIdstate = $('input:checkbox[name="adslotId"]').is(':checked'); 
//	var adslotSizestate = $('input[name="adslotSize"]').is(':checked');
//	if(!adslotIdstate || !adslotSizestate){
//		$('.sameToAdslot').each(function(){
//			$(this).prop("checked",false);
//		});
//		
//	}
	 
}