$(function() {
	$('.nav-tabs a').click(function(){
		$('.popover').popover('hide');
		currReportTabIndex = $('.nav-tabs a').index(this);
		switch(currReportTabIndex){
			case 0:
				showCreativeReport();
				break;
			case 1:
				showMTReport();
				break;
			case 2:
					
				break;
		}
	});
	/* 组件初始化 */
	// 下拉菜单
	
	var defDateFormat = "YYYY-MM-DD";
	var defStartDate = moment().subtract('days', 7).format(defDateFormat);
	var defEndDate = moment().format(defDateFormat);
	/* 双日历组件 */
	$('div[id="reportrange2"] span').html(defStartDate + ' - ' + defEndDate);

	// 默认为时间空间赋值
	$('input[name="startTimeTem"]').val(getMapDate(7));
	$('input[name="endTimeTem"]').val(getMapDate(0));

	$('div[id="reportrange2"]').daterangepicker(
			{
				locale: page.attr.drDefaultLocal,
				startDate : defStartDate
			},
			function(start, end) {
				var choStart = start.format(defDateFormat);
				var choEnd = end.format(defDateFormat);
				$('div[id="reportrange2"] span').html(choStart + ' - ' + choEnd);
				$('input[name="startTimeTem"]').val(choStart);
				$('input[name="endTimeTem"]').val(choEnd);
				$('div[id="reportrange2"] span').html(
						start.format(defDateFormat) + ' - '
								+ end.format(defDateFormat));
			});

	showCreativeReport();
});
function showCreativeReport(){
	// 初始化广告报表数据
	pullDownAdvertiserId();
	loadData(1);
}

$("a[id='exportExcel']").click(function() {
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

function adConfirmMeth(o) {
	var index = currReportTabIndex;
	var $popover = $(o).parent().parent().parent();
	if ($popover.find('div[id="%s"] :checkbox:checked'.format('checkboxNoZero')).size() == 0) {
		alert("请至少选择一项");
		return;
	}
	reportSelectColumnArr[index].each(function(k,v){
		var flag = $popover.find(String.format(':checkbox[id="%s"]',v.id)).prop('checked');
		var tmapval = reportSelectColumnArr[index].get(k);
		tmapval.checked = flag;
		reportSelectColumnArr[index].put(k,tmapval);
	});
	hideShowColumns();
	$popover.popover('toggle');
// $("div[id='selectColumn']").eq(index).css('display', 'none');
	flushColResize();
}

// 广告主
function pullDownAdvertiserId() {
	page.ajax({
		url : 'sspAdvertiser/find',
		cache : false,
		// data: {startTime: startTime, endTime: endTime, currentPageNo:
		// currentPageNo},
		success : function(res) {
			var data = res.result;

			if (data != null && data.length != 0) {
				$.each(data, function(index, report) {
					$("[name=advertiserId]").append(
							'<option value=' + report.id + '>' + report.name
									+ '</option>');
				});
				$("[name=advertiserId]").selectpicker('refresh');
			} else {
				$("[name=advertiserId]").append(
						'<option value="">暂无广告主</option>');
				$("[name=advertiserId]").selectpicker('refresh');
			}
		},
		error : function(err) {

		}
	});
}

// 订单
function pullDownOrderId() {

	if ($("[name=advertiserId]").val() != undefined
			&& $("[name=advertiserId]").val() != null
			&& $("[name=advertiserId]").val() != '') {
		var id = $("[name=advertiserId]").val();
		$.ajax({
			url : 'rest/sspOrder/findByAdverId',
			cache : false,
			type : 'post',
			datatype : 'json',
			data : {
				id : id
			},
			success : function(res) {

				$("[name=orderId]").empty();
				var data = res.result;
				if (data != null && data.length != 0) {
					$("[name=orderId]").append('<option value="">全部</option>');
					$.each(data, function(index, report) {
						$("[name=orderId]").append(
								'<option value=' + report.id + '>'
										+ report.name + '</option>');
					});
					$("[name=orderId]").selectpicker('refresh');
				} else {
					$("[name=orderId]")
							.append('<option value="">暂无订单</option>');
					$("[name=orderId]").selectpicker('refresh');
				}
			},
			error : function(err) {

			}
		});
	}
	/* $("[name=orderId]").empty(); */
	$("[name=planId]").empty();
	$("[name=creativeId]").empty();
	/* $("[name=orderId]").append('<option value="">全部</option>'); */
	$("[name=planId]").append('<option value="">全部</option>');
	$("[name=creativeId]").append('<option value="">全部</option>');
	/* $("[name=orderId]").selectpicker('refresh'); */
	$("[name=planId]").selectpicker('refresh');
	$("[name=creativeId]").selectpicker('refresh');
}

// 策略
function pullDownPlanId() {
	if ($("[name=orderId]").val() != undefined
			&& $("[name=orderId]").val() != null
			&& $("[name=orderId]").val() != '') {
		var id = $("[name=orderId]").val();
		page.ajax({
					url : 'ssp/plan/findByOrderId',
					cache : false,
					// async: false,
					data : {
						id : id
					},
					success : function(res) {
						$("[name=planId]").empty();
						var data = res.result;
						if (data != null && data.length != 0) {
							$("[name=planId]").append(
									'<option value="">全部</option>');
							$.each(data, function(index, report) {
								$("[name=planId]").append(
										'<option value=' + report.id + '>'
												+ report.name + '</option>');
							});
							$("[name=planId]").selectpicker('refresh');
						} else {
							$("[name=planId]").append(
									'<option value="">暂无策略</option>');
							$("[name=planId]").selectpicker('refresh');
						}
					},
					error : function(err) {

					}
				});
	}
	/* $("[name=planId]").empty(); */
	$("[name=creativeId]").empty();
	/* $("[name=planId]").append('<option value="">全部</option>'); */
	$("[name=creativeId]").append('<option value="">全部</option>');
	/* $("[name=planId]").selectpicker('refresh'); */
	$("[name=creativeId]").selectpicker('refresh');
	/* }) */
}

// 创意
/* $("[name=planId]").change(function () { */
function pullDownCreativeId() {

	if ($("[name=planId]").val() != undefined
			&& $("[name=planId]").val() != null
			&& $("[name=planId]").val() != '') {
		var id = $("[name=advertiserId]").val();
		page.ajax({
			url : 'sspOrder/findCreativeByAdverId',
			cache : false,
			data : {
				id : id
			},
			success : function(res) {

				$("[name=creativeId]").empty();
				var data = res.result;
				if (data != null && data.length != 0) {
					$("[name=creativeId]").append(
							'<option value="">全部</option>');
					$.each(data, function(index, report) {

						$("[name=creativeId]").append(
								'<option value=' + report.id + '>'
										+ report.creativeName + '</option>');
					});
					$("[name=creativeId]").selectpicker('refresh');
				} else {
					$("[name=creativeId]").append(
							'<option value="">暂无创意</option>');
					$("[name=creativeId]").selectpicker('refresh');
				}
			},
			error : function(err) {

			}
		});
	}
}


/* 搜索按钮提交 */
$("#searchAD")
		.click(
				function() {
					$('input[name="startTime"]').val(
							$('input[name="startTimeTem"]').val());
					$('input[name="endTime"]').val(
							$('input[name="endTimeTem"]').val());

					page.ajaxSubmit($("#adReportForm").eq(0)[0], function(
							resultJson, resultMsg, xmlHttpResponse) {

						if (resultJson.result.dataArray.length != 0) {
							$("#adReportList").html("");
							loadPage(resultJson);
						} else {
							// alert("没有查询到数据！")
							// loadData(1);
							noData();
						}
					}, function(xmlHttpRequest, errorMsg, errorObj) {

					});
				});
function popoverCloseCustomBtn(o){
	$(o).parent().parent().parent().popover('toggle');
}
function popoverClose(o){
	$(o).parent().popover('toggle');
}
function newFormGroup(title,content){
	if(isEmpty(title)||isEmpty(content))return '';
	return '<tr  style="border-bottom: 1px dotted #ccc;"><td style="text-align: right;padding-right: 5px;font-weight: bold;">'+title+'：</td><td>'+content+'</td></tr>';
}
// 加载数据
function loadData(currentPageNo) {
	$('.popover').popover('hide');
	var startTime = $('input[name="startTime"]').val();
	var endTime = $('input[name="endTime"]').val();
	var advertiserId = $('select[name="advertiserId"]').val();
	var orderId = $('select[name="orderId"]').val();
	var planId = $('select[name="planId"]').val();
	var creativeId = $('select[name="creativeId"]').val();
	page.ajax({
		url : 'ssp/report/adPage',
		data : {
			startTime : startTime,
			endTime : endTime,
			advertiserId : advertiserId,
			orderId : orderId,
			planId : planId,
			creativeId : creativeId,
			currentPageNo : currentPageNo
		},
		success : function(data) {

			if (data.result != null && data.result.dataArray.length != null) {
				$("#adReportList").html("");
				/* $("#adReportPage").empty(); */
				loadPage(data);
				/* $("#adTable").tablesorter(); */
			} else {
				// alert("没有查询到数据！")
				noData();
				return false;
			}
		},
		error : function(err) {
			noData();
		}
	});

}
function noData() {
	var index = currReportTabIndex;
	$("tbody[id='adReportList']:eq("+index+")").html("");
	$("tbody[id='adReportList']:eq("+index+")")
			.append(
					"<tr class=\"sldataBodyRow\"><td style=\"text-align: center\" colspan=\"19\">暂时没有数据</td></tr>");
	var totalPage = 1;
	var totalCount = 0;
	var startPage = 1;
	$('div[id="adReportPage"]:eq('+index+')').html('');
	$('div[id="adReportPage"]:eq('+index+')').html(
			'<ul id="adPage" class="bs-component pull-right"></ul>');

	page.ajaxPage({
		pcont : 'div[id="adPage"]:eq('+index+')',// 分页容器，ID
		totalPages : totalPage, // 总页数
		startPage : startPage,
		count : totalCount, // 总记录数
		onPageClick : function(env, thisPage) {
//			if ($(":input[id='checkboxNoZero']:eq("+index+") :checkbox:checked").size() == 0) {
//				alert("请至少选择一项");
//				return;
//			}
			// CurrentPageNo = thisPage;
			// loadData(thisPage);
		}
	});
}
// 加载数据
function loadPage(data) {
	var datas = data.result.dataArray;

	$.each(datas,
			function(index, report) {
				/* var html = "<tr>"; */
				/*
				 * html += "<td>"+report.sspAdvertiser.name+"</td>"; html += "<td>"+report.sspOrder.name+"</td>";
				 * html += "<td>"+report.sspPlan.name+"</td>";
				 */

				var advertiser = (report.advertiserName) == null ? '(空)'
						: report.advertiserName;
				var advertiserStr = subStr(advertiser);

				var order = (report.orderName) == null ? '(空)'
						: report.orderName;
				var orderStr = subStr(order);

				var plan = (report.planName) == null ? '(空)' : report.planName;
				var planStr = subStr(plan);

				var creative = (report.creativeName) == null ? '(空)'
						: report.creativeName;
				var creativeStr = subStr(creative);

				var consumption = (report.consumption) == null ? '0'
						: (report.consumption);
				var consumptionStr = consumption.toFixed(2);

				var cpm = (report.cpm) == null ? '0' : (report.cpm);
				cpm = cpm.toFixed(2);
				var cpmStr = cpm;

				var clickRatio = (report.clickRatio) == null ? '0'
						: (report.clickRatio);
				clickRatio = clickRatio.toFixed(2);
				var clickRatioStr = clickRatio;

				var cpc = (report.cpc) == null ? '0' : (report.cpc);
				var cpcStr = cpc.toFixed(2);

				var cpa = (report.cpa) == null ? '0' : (report.cpa);
				var cpaStr = cpa.toFixed(2);
				
				var $td1 = $(HT.td).addClass('el1').attr('title',report.updateTimeStr).html(report.updateTimeStr);
				var $td2 = $(HT.td).addClass('el2').html(advertiserStr).css({color:'#3daded',cursor:'pointer'}).popover({
					placement:'right',// 显示在右侧
					html:true,// 解析内容为html
					trigger:'click',// 点击触发
					title:'广告主信息',
					content:popover_loading_content,// 弹出默认内容
					template:popover_template_html,// 弹出模版
					container:'#ggbb'// 追加元素至body
					
				}).on('show.bs.popover', function (){// 弹出前
					$('.popover').popover('hide');// 隐藏其他
				}).on('shown.bs.popover', function () {// 弹出后
					var popoverId = $(this).attr('aria-describedby');
					var $popover = $(String.format('#%s',popoverId));
					page.ajax({
						url:'ssp/report/detail',
						data:{
							infoType:1,
							id:report.advertiserId
						},
						success:function(result){
							var old_arrow_style = $popover.find('.arrow').eq(0).attr('style');
							var old_arow_style_type = old_arrow_style.split(':')[0];
							var old_arrow_style_type_px = $popover.find('.arrow').eq(0).css(old_arow_style_type);
							var $container = $popover.find('.popover-content');
							var $tab = $(HT.tab);
							$.each(result.result,function(i,o){
								$tab.append(newFormGroup('名称',o.name))
												.append(newFormGroup('注册名称',o.companyRegName))
												.append(newFormGroup('是否开启创意角标',o.cornerMarkState==1?'是':(o.cornerMarkState==2?'否':'')))
												.append(newFormGroup('联系人',o.contacts))
												.append(newFormGroup('手机',o.phone))
												.append(newFormGroup('Email',o.email))
												.append(newFormGroup('关键词',o.keywords));
							});
							$container.html('').append($tab);
							$popover.find('.arrow').css(old_arow_style_type,old_arrow_style_type_px);
						},
						error:function(e){console.log(e);}
					},true);
				});
				// 订单
				var $td3 = $(HT.td).addClass('el3').html(orderStr).css({color:'#3daded',cursor:'pointer'}).popover({
					placement:'right',// 显示在右侧
					html:true,// 解析内容为html
					trigger:'click',// 点击触发
					title:'订单信息',
					content:popover_loading_content,// 弹出默认内容
					template:popover_template_html,// 弹出模版
					container:'#ggbb'// 追加元素至body
					
				}).on('show.bs.popover', function (){// 弹出前
					$('.popover').popover('hide');// 隐藏其他
				}).on('shown.bs.popover', function () {// 弹出后
					var popoverId = $(this).attr('aria-describedby');
					var $popover = $(String.format('#%s',popoverId));
					page.ajax({
						url:'ssp/report/detail',
						data:{
							infoType:2,
							id:report.orderId
						},
						success:function(result){
							var old_arrow_style = $popover.find('.arrow').eq(0).attr('style');
							var old_arow_style_type = old_arrow_style.split(':')[0];
							var old_arrow_style_type_px = $popover.find('.arrow').eq(0).css(old_arow_style_type);
							var $container = $popover.find('.popover-content');
							var $tab = $(HT.tab);
							$.each(result.result,function(i,o){
								
								var putTimeStartTemp = (new Date(o.putStartTime)).format('yyyy-MM-dd');
								var putTimeEndTemp = (new Date(o.putEndTime)).format('yyyy-MM-dd');
								
								var settlementTypeTemp = (o.settlementType==1?'CPM':(o.settlementType==3?'CPC':(o.settlementType==2?'CPA':(o.settlementType==4?'CPT':(o.settlementType==5?'CPD':'')))));
								var frequencyTemp = String.format('投放周期内<br/>单人曝光不超过%s次<br/>每人每%s曝光不超过%s次<br/>每人每%s点击不超过%s次',
										o.singlePeriodShowTimes,
										o.showCalculationType==1?'天':'小时',
										o.singleShowTimes,
										o.clickCalculationType==1?'天':'小时',
										o.singleClickTimes);
								var kpiTemp = (o.kpi==3?'CPM':(o.kpi==2?'CPC':(o.kpi==1?'CPA':'')));
								$tab.append(newFormGroup('名称',o.name))
												.append(newFormGroup('预算',o.budget))
												.append(newFormGroup('投放周期',String.format('%s 至 %s',putTimeStartTemp,putTimeEndTemp)))
												.append(newFormGroup('结算方式',settlementTypeTemp))
												.append(newFormGroup('单价',o.settlementFee))
												.append(newFormGroup('费用',String.format('服务费%s%&nbsp;代理费%s%',o.serviceFeeRatio,o.agentFeeRatio)))
												.append(newFormGroup('频次设置',frequencyTemp))
												.append(newFormGroup('每日预算上限',o.dailyBudgetCap))
												.append(newFormGroup('每日曝光上限',o.dailyShowCap))
												.append(newFormGroup('每日点击上限',o.dailyClickCap))
												.append(newFormGroup('KPI',kpiTemp))
												.append(newFormGroup('KPI金额',o.kpiFee));
							});
							$container.html('').append($tab);
							$popover.find('.arrow').css(old_arow_style_type,old_arrow_style_type_px);
						},
						error:function(e){console.log(e);}
					},true);
				});
				// 策略
				var $td4 = $(HT.td).addClass('el4').html(planStr).css({color:'#3daded',cursor:'pointer'}).popover({
					placement:'right',// 显示在右侧
					html:true,// 解析内容为html
					trigger:'click',// 点击触发
					title:'策略信息',
					content:popover_loading_content,// 弹出默认内容
					template:popover_template_html,// 弹出模版
					container:'#ggbb'// 追加元素至body
					
				}).on('show.bs.popover', function (){// 弹出前
					$('.popover').popover('hide');// 隐藏其他
				}).on('shown.bs.popover', function () {// 弹出后
					var popoverId = $(this).attr('aria-describedby');
					var $popover = $(String.format('#%s',popoverId));
					page.ajax({
						url:'ssp/report/detail',
						data:{
							infoType:3,
							id:report.planId
						},
						success:function(result){
							var old_arrow_style = $popover.find('.arrow').eq(0).attr('style');
							var old_arow_style_type = old_arrow_style.split(':')[0];
							var old_arrow_style_type_px = $popover.find('.arrow').eq(0).css(old_arow_style_type);
							var $container = $popover.find('.popover-content');
							
							// tab切换
							var currLongTime = (new Date()).getTime();
							var tab_pane0_id = String.format('pane0%s',currLongTime);
							var tab_pane1_id = String.format('pane1%s',currLongTime);
							var $nav_ul = $(HT.ul).addClass('nav nav-tabs');
							var $li0 = $(HT.li).addClass('active');
							var $a0 = $(HT.a).attr('data-toggle','tab').attr('href',String.format('#%s',tab_pane0_id)).html('基本信息');
							var $li1 = $(HT.li);
							var $a1 = $(HT.a).attr('data-toggle','tab').attr('href',String.format('#%s',tab_pane1_id)).html('定向信息');
							
							$nav_ul.append($li0.append($a0)).append($li1.append($a1));
							
							var $tab_content_div = $(HT.div).addClass('tab-content');
							var $tab_pane0 = $(HT.div).addClass('tab-pane fade in active').attr('id',tab_pane0_id);
							var $tab_pane1 = $(HT.div).addClass('tab-pane fade').attr('id',tab_pane1_id);
							
							var o = result.result;
							/** 基本信息 * */
							var $table0 = $(HT.tab);
							
							var frequencyTemp = String.format('投放周期内<br/>单人曝光不超过%s次<br/>每人每%s曝光不超过%s次<br/>每人每%s点击不超过%s次',
									o.singlePeriodShowTimes,
									o.showCalculationType==1?'天':'小时',
									o.singleShowTimes,
									o.clickCalculationType==1?'天':'小时',
									o.singleClickTimes);
							var kpiTemp = (o.kpi==3?'CPM':(o.kpi==2?'CPC':(o.kpi==1?'CPA':'')));
							var putTimeTemp = (1==o.putTimeState?String.format('%s-%s',o.putStartTime,o.putEndTime):(2==o.putTimeState?'不限':''));
							var budgetStateTemp = (1==o.putTimeState?o.budget:(2==o.putTimeState?'不限':''));
							var putRhythmTemp = (o.kpi==1?'不限':(o.kpi==2?'曝光':(o.kpi==3?'预算':'')));
							
							$table0.append(newFormGroup('名称',o.name))
											.append(newFormGroup('投放周期',putTimeTemp))
											.append(newFormGroup('预算控制',budgetStateTemp))
											.append(newFormGroup('频次设置',frequencyTemp))
											.append(newFormGroup('每日预算上限',o.dailyBudgetCap))
											.append(newFormGroup('每日曝光上限',o.dailyShowCap))
											.append(newFormGroup('每日点击上限',o.dailyClickCap))
											.append(newFormGroup('投放节奏',putRhythmTemp))
											.append(newFormGroup('KPI',kpiTemp))
											.append(newFormGroup('最高出价',o.highestCpm));
							$tab_pane0.append($table0);
							/** 定向信息* */
							if(isNotEmpty(o.sspPlanTargetCondition)){
								var sspPlanTargetCondition = o.sspPlanTargetCondition;
								var $table1 = $(HT.tab);
								// 时间定向
								var ConditionTimeTargetTemp = '不限';
								if(isNotEmpty(sspPlanTargetCondition.timeTarget)){
									var txt = '允许';
									var weekArr = ['','一','二','三','四','五','六','日'];
									$.each(JSON.parse(sspPlanTargetCondition.timeTarget),function(i,o){
										if(62==o.length){
											txt+= String.format('</br>&nbsp;&nbsp;&nbsp;&nbsp;周%s(全天)',weekArr[i*1]);
										}else{
											txt+= String.format('</br>&nbsp;&nbsp;&nbsp;&nbsp;周%s(',weekArr[i*1]);
											var tstart=-1,tend = -1;
											var hArr = o.split(',');
											$.each(hArr,function(j,h){
												var hn = h*1;
												if(hn!=tend){
													if(tend>0){
														txt += tstart+'~'+tend+'、';
														tend=-1;
													}
													tstart = hn;
												}
												if(j+1>=hArr.length)
													txt += tend>0?(tstart+'~'+tend+'、'):tstart;
												tend = hn+1;
											});
											txt = txt.replace(/、$/,'');
											txt+='点)';
										}
									});
									txt = txt.replace(/、$/,'');
									txt+='</br>进行投放';
									ConditionTimeTargetTemp = txt;
								}
								// 广告类型
								var ConditionAdTypeTemp = '不限';
								ConditionAdTypeTemp = isEmpty(sspPlanTargetCondition.sspDictAdType)?'不限':isEmpty(sspPlanTargetCondition.sspDictAdType.name)?'不限':sspPlanTargetCondition.sspDictAdType.name;
								// 投放节奏
								var ConditionPutRhythmTemp = '不限';
								ConditionPutRhythmTemp=(1==sspPlanTargetCondition.putRhythm?'均匀投放':(2==sspPlanTargetCondition.putRhythm?'加速投放':(3==sspPlanTargetCondition.putRhythm?'集中投放':(4==sspPlanTargetCondition.putRhythm?'效果最有投放':(5==sspPlanTargetCondition.putRhythm?'低CPC投放':'不限')))))
								// 地域定向
								var ConditionCityInfoTemp ='不限';
								if(isNotEmpty(sspPlanTargetCondition.cityInfoArr)&&sspPlanTargetCondition.cityInfoArr.length>0)
									ConditionCityInfoTemp = ladderDictAnalysis(sspPlanTargetCondition.cityInfoArr);
								// 操作系统
								var ConditionSysOperationTemp = '不限';
								if(2==sspPlanTargetCondition.dictSysOperationState&&isNotEmpty(sspPlanTargetCondition.dictSysOperationTypeArr)&&sspPlanTargetCondition.dictSysOperationTypeArr.length>0)
									ConditionSysOperationTemp = ladderDictAnalysis(sspPlanTargetCondition.dictSysOperationTypeArr);
								// 网络类型
								var ConditionNetWorkTypeTemp = '不限';
								if(isNotEmpty(sspPlanTargetCondition.networkType)){
									txt = '允许在 ';
									var f = false;
									var nwtArr = sspPlanTargetCondition.networkType.split(',');
									for(var i =0;i<nwtArr.length;i++){
										var o = nwtArr[i]*1;
										if(1==o){
											f = true;
											break;
										}
										var tn =(1==o?'全选':(2==o?'2G':(3==o?'3G':(4==o?'4G':(5==o?'WIFI':'不限')))));
										txt+=tn+'、';
									}
									txt = txt.replace(/、$/,'');
									txt+=' 网络进行投放';
									if(f)txt = '不限';
									ConditionSysOperationTemp = txt;
								}
								
								// 设备ID
								var ConditionDeviceIdTemp = '不限';
								// 1不限，2有，3指定
								if(isNotEmpty(sspPlanTargetCondition.deviceTypeState)&&1!=sspPlanTargetCondition.deviceTypeState){
									if(isNotEmpty(sspPlanTargetCondition.deviceTypeIdfa)||isNotEmpty(sspPlanTargetCondition.deviceTypeMac)||isNotEmpty(sspPlanTargetCondition.deviceTypeImei)){
										var txt = '允许在</br>';
										if(isNotEmpty(sspPlanTargetCondition.deviceTypeIdfa)){
											txt += '&nbsp;&nbsp;&nbsp;&nbsp;IDFA=>';
											$.each(sspPlanTargetCondition.deviceTypeIdfa.split(','),function(i,o){
												if(i>0&&i%2==0){
													txt+='</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
												}
												txt+=o+'、';
											});
											txt = txt.replace(/、$/,'');
											txt += '</br>';
										}
										if(isNotEmpty(sspPlanTargetCondition.deviceTypeMac)){
											txt += '&nbsp;&nbsp;&nbsp;&nbsp;MAC=>';
											$.each(sspPlanTargetCondition.deviceTypeIdfa.split(','),function(i,o){
												if(i>0&&i%2==0){
													txt+='</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
												}
												txt+=o+'、';
											});
											txt = txt.replace(/、$/,'');
											txt += '</br>';					
										}
										if(isNotEmpty(sspPlanTargetCondition.deviceTypeImei)){
											txt += '&nbsp;&nbsp;&nbsp;&nbsp;IMEI=>';
											$.each(sspPlanTargetCondition.deviceTypeIdfa.split(','),function(i,o){
												if(i>0&&i%2==0){
													txt+='</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
												}
												txt+=o+'、';
											});
											txt = txt.replace(/、$/,'');
											txt += '</br>';
										}
										txt = txt.replace(/、$/,'');
										txt+=' 进行投放';
										ConditionDeviceIdTemp = txt;
									}
								}
								// 媒体类型
								var ConditionMediaTypeTemp = '不限';
								if(2==sspPlanTargetCondition.mediaState&&isNotEmpty(sspPlanTargetCondition.dictMediaTypeArr)&&sspPlanTargetCondition.dictMediaTypeArr.length>0)
									ConditionMediaTypeTemp = ladderDictAnalysis(sspPlanTargetCondition.dictMediaTypeArr);
								// 媒体ID
								var ConditionMediaIdTemp = '不限';
								if(isNotEmpty(sspPlanTargetCondition.mediaIds)){
									txt = '允许在 ';
									var midArr = sspPlanTargetCondition.mediaIds.split(',');
									for(var i =0;i<midArr.length;i++){
										txt+=midArr[i]+'、';
									}
									txt = txt.replace(/、$/,'');
									txt+=' 进行投放';
									ConditionMediaIdTemp = txt;
								}
								// 性别
								var ConditionSexTempTemp = '不限';
								ConditionSexTempTemp = (isEmpty(sspPlanTargetCondition.sex)?'不限':(1==sspPlanTargetCondition.sex?'男':'女'))
								
								$table1.append(newFormGroup('时间定向',ConditionTimeTargetTemp))
											.append(newFormGroup('广告类型',ConditionAdTypeTemp))
											.append(newFormGroup('投放节奏',ConditionPutRhythmTemp))
											.append(newFormGroup('地域定向',ConditionCityInfoTemp))
											.append(newFormGroup('操作系统',ConditionSysOperationTemp))
											.append(newFormGroup('网络类型',ConditionNetWorkTypeTemp))
											.append(newFormGroup('设备ID',ConditionDeviceIdTemp))
											.append(newFormGroup('媒体类型',ConditionMediaTypeTemp))
											.append(newFormGroup('媒体ID',ConditionMediaIdTemp))
											.append(newFormGroup('性别',ConditionSexTempTemp));
								
								
								$tab_pane1.append($table1);
							}else{
								$tab_pane1.append('<p>暂无定向信息</p>');
							}
							
							$tab_content_div.append($tab_pane0).append($tab_pane1);
							$container.html('').append($nav_ul).append($tab_content_div);
							$popover.find('.arrow').css(old_arow_style_type,old_arrow_style_type_px);
						},
						error:function(e){console.log(e);}
					},true);
				});
				var $td5 = $(HT.td).addClass('el5').html(creativeStr).css({color:'#3daded',cursor:'pointer'}).popover({
					placement:'right',// 显示在右侧
					html:true,// 解析内容为html
					trigger:'click',// 点击触发
					title:'创意信息',
					content:popover_loading_content,// 弹出默认内容
					template:popover_template_html,// 弹出模版
					container:'#ggbb'// 追加元素至body
					
				}).on('show.bs.popover', function (){// 弹出前
					$('.popover').popover('hide');// 隐藏其他
				}).on('shown.bs.popover', function () {// 弹出后
					var popoverId = $(this).attr('aria-describedby');
					var $popover = $(String.format('#%s',popoverId));
					page.ajax({
						url:'ssp/report/detail',
						data:{
							infoType:4,
							id:report.creativeId
						},
						success:function(result){
							var old_arrow_style = $popover.find('.arrow').eq(0).attr('style');
							var old_arow_style_type = old_arrow_style.split(':')[0];
							var old_arrow_style_type_px = $popover.find('.arrow').eq(0).css(old_arow_style_type);
							var $container = $popover.find('.popover-content');
							
							// tab切换
							var currLongTime = (new Date()).getTime();
							var tab_pane0_id = String.format('pane0%s',currLongTime);
							var tab_pane1_id = String.format('pane1%s',currLongTime);
							var $nav_ul = $(HT.ul).addClass('nav nav-tabs');
							var $li0 = $(HT.li).addClass('active');
							var $a0 = $(HT.a).attr('data-toggle','tab').attr('href',String.format('#%s',tab_pane0_id)).html('基本信息');
							var $li1 = $(HT.li);
							var $a1 = $(HT.a).attr('data-toggle','tab').attr('href',String.format('#%s',tab_pane1_id)).html('创意预览');
							
							$nav_ul.append($li0.append($a0)).append($li1.append($a1));
							
							var $tab_content_div = $(HT.div).addClass('tab-content');
							var $tab_pane0 = $(HT.div).addClass('tab-pane fade in active').attr('id',tab_pane0_id);
							var $tab_pane1 = $(HT.div).addClass('tab-pane fade').attr('id',tab_pane1_id);
							
							
							var $table0 = $(HT.tab);
							if(isEmpty(result)||isEmpty(result.result)||isEmpty(result.result.length==0))return;
							var creativeInfo = result.result[0];
							// 基本信息
							var creativeTypeTemp = (1==creativeInfo.creativeType?'图片':(2==creativeInfo.creativeType?'视频':3==creativeInfo.creativeType?'信息流':''))
							var sspDictLabelTemp = '';
							if(isNotEmpty(creativeInfo.sspDictLabelArr)&&creativeInfo.sspDictLabelArr.length>0){
								var txt = '';
								$.each(creativeInfo.sspDictLabelArr,function(i,o){
									if(i%5==0&&i>0){
										txt+='</br>';
									}
									txt+=o.name+'、';
								});
								txt = txt.replace(/、$/,'');
								sspDictLabelTemp = txt;
							}
							var creativeClickAddressTemp = creativeInfo.creativeClickAddress;
							if(isNotEmpty(creativeClickAddressTemp)&&creativeClickAddressTemp.length>100){
								var txt = '';
								for(var i =0;i<creativeClickAddressTemp.length;i++){
									if(i>0&&i%100==0)
										txt+='</br>';
									txt+=creativeClickAddressTemp[i];
								}
								creativeClickAddressTemp = txt;
							}
							var creativeMonitorAddressTemp = creativeInfo.creativeMonitorAddress;
							if(isNotEmpty(creativeMonitorAddressTemp)&&creativeMonitorAddressTemp.length>100){
								var txt = '';
								for(var i =0;i<creativeMonitorAddressTemp.length;i++){
									if(i>0&&i%100==0)
										txt+='</br>';
									txt+=creativeMonitorAddressTemp[i];
								}
								creativeMonitorAddressTemp = txt;
							}
							$table0.append(newFormGroup('名称',creativeInfo.creativeName))
											.append(newFormGroup('创意类型',creativeTypeTemp))
											.append(newFormGroup('标签',sspDictLabelTemp))
											.append(newFormGroup('尺寸',creativeInfo.creativeSize))
											.append(newFormGroup('大小',creativeInfo.picSize+'k'))
											.append(newFormGroup('格式',creativeInfo.creativeFormat))
											.append(newFormGroup('创意地址',globalVar.imgPrefix+creativeInfo.creativeUrl))
											.append(newFormGroup('点击地址',creativeClickAddressTemp))
											.append(newFormGroup('监测地址',creativeMonitorAddressTemp));
							$tab_pane0.append($table0);
							// 创意预览
							var $img_div = $(HT.div).css({
							    display:'table',
							    margin: 8,
							    border: '1px solid #ddd',
							    boxShadow: '1px 1px 5px 0 #a2958a',
							    padding: 6,
							    float: 'left',
							    textAlign: 'center',
							    verticalAlign: 'middle'
							});
							var $img = $(HT.img).attr('src',globalVar.imgPrefix+creativeInfo.creativeUrl);
							// 图片等比缩放
							var iw = creativeInfo.width;
							var ih = creativeInfo.height;
							var sw = window.screen.width;
							var sh = window.screen.height;
							
							var iswp = iw<sw?iw/sw:sw/iw;
							var ishp = ih<sh?ih/sh:sh/ih;
							
							if(iswp>0.5||ishp>0.5){
								if(iswp>0.5&&iswp<1){
									$img.css('width',(1.1-iswp)*100+'%');
								}
								if(ishp>0.5&&ishp<1){
									$img.css('width',(1.1-ishp)*100+'%');
								}
							}
							$tab_pane1.append($img_div.append($img))
							
							$tab_content_div.append($tab_pane0).append($tab_pane1);
							$container.html('').append($nav_ul).append($tab_content_div);
							$img.parent().zoom();
							$popover.find('.arrow').css(old_arow_style_type,old_arrow_style_type_px);
						},
						error:function(e){console.log(e);}
					},true);
				});
				var rshow_time = ((report.showTimes) == null ? '0' : (report.showTimes));
				var $td6 = $(HT.td).addClass('el6').attr('title',rshow_time).html(rshow_time);
				var $td7 = $(HT.td).addClass('el7').attr('title',consumption).html(consumptionStr);
				var $td8 = $(HT.td).addClass('el8').attr('title',cpm).html(cpmStr);
				var rclick_time = ((report.clickTimes) == null ? '0' : (report.clickTimes));
				var $td9 = $(HT.td).addClass('el9').attr('title',rclick_time).html(rclick_time);
				var $td10 = $(HT.td).addClass('el10').attr('title',clickRatio).html(clickRatioStr);
				var $td11 = $(HT.td).addClass('el11').attr('title',cpc).html(cpcStr);
				var r_arrival = ((report.arrival) == null ? '0' : (report.arrival));
				var $td12 = $(HT.td).addClass('el12').attr('title',r_arrival).html(r_arrival);
				var r_transform = ((report.transform) == null ? '0' : (report.transform))
				var $td13 = $(HT.td).addClass('el13').attr('title',r_transform).html(r_transform);
				var $td14 = $(HT.td).addClass('el14').attr('title',cpa).html(cpaStr);
				var r_secondJump = ((report.secondJump) == null ? '0' : (report.secondJump));
				var $td15 = $(HT.td).addClass('el15').attr('title',r_secondJump).html(r_secondJump);
				var r_secondJumpRatio = ((report.secondJumpRatio) == null ? '0' : (report.secondJumpRatio));
				var $td16 = $(HT.td).addClass('el16').attr('title',r_secondJumpRatio).html(r_secondJumpRatio);
				var r_arrivalRatio = ((report.arrivalRatio) == null ? '0' : (report.arrivalRatio));
				var $td17 = $(HT.td).addClass('el17').attr('title',r_arrivalRatio).html(r_arrivalRatio);
				var r_clickTransform = ((report.clickTransform) == null ? '0' : (report.clickTransform));
				var $td18 = $(HT.td).addClass('el18').attr('title',r_clickTransform).html(r_clickTransform);
				var r_clickTransformRatio = ((report.clickTransformRatio) == null ? '0' : (report.clickTransformRatio));
				var $td19 = $(HT.td).addClass('el19').attr('title',r_clickTransformRatio).html(r_clickTransformRatio);
				
				var $tr = $(HT.tr).append($td1).append($td2).append($td3).append($td4).append($td5).append($td6).append($td7)
				.append($td8).append($td9).append($td10).append($td11).append($td12).append($td13).append($td14)
				.append($td15).append($td16).append($td17).append($td18).append($td19);
				$("#adReportList").append($tr);
			});
	if (data.result.dataArray.length == 0) {
		noData();
	}


	var totalPage = data.result.totalPage;
	var totalCount = data.result.totalCount;
	var startPage = data.result.currentPageNo;
	$('#adReportPage').html('');
	$('#adReportPage').html(
			'<ul id="adPage" class="bs-component pull-right"></ul>');

	page.ajaxPage({
		pcont : 'adPage',// 分页容器，ID
		totalPages : totalPage, // 总页数
		startPage : startPage,
		count : totalCount, // 总记录数
		onPageClick : function(env, thisPage) {
//			if ($("#checkboxNoZero :checkbox:checked").size() == 0) {
//				alert("请至少选择一项");
//				return;
//			}
			CurrentPageNo = thisPage;
			loadData(thisPage);
		}
	});
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
	/*
	 * if (data.length > 5) { dataStr = data.substring(0, 5) + "..."; }
	 */
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
var adSelectColumeMap = new Map();
var mtSelectColumeMap = new Map();
// 初始化已选择显示列
$('#selectColumn :input[type="checkbox"]').each(function(i,o){
	adSelectColumeMap.put(i,{id:this.id,checked:this.checked});
});
$('#mtSelectColumn :input[type="checkbox"]').each(function(i,o){
	mtSelectColumeMap.put(i,{id:this.id,checked:this.checked});
});
var reportSelectColumnArr = [];
reportSelectColumnArr[0] = adSelectColumeMap;
reportSelectColumnArr[1] = mtSelectColumeMap;
var adSelectColumeHtml = $('#selectColumn').html();
var mtSelectColumeHtml = $('#mtSelectColumn').html();
// 清理中间数据
$('#selectColumn').remove();
$('#mtSelectColumn').remove();
//初始化选择列弹出框
$('#element').popover({
	placement:'left',// 显示在右侧
	html:true,// 解析内容为html
	trigger:'click',// 点击触发
	title:'至少选择一项',
	content:adSelectColumeHtml,// 弹出默认内容
	container:'#ggbb'// 追加元素至body
}).on('shown.bs.popover',function(){//弹出后
	var popoverId = $(this).attr('aria-describedby');
	var $popover = $(String.format('#%s',popoverId));
	//弹出后加载已选择的列
	reportSelectColumnArr[0].each(function(k,v){
		$popover.find(String.format(':checkbox[id="%s"]',v.id)).prop('checked',v.checked);
	});
});
$('#mtElement').popover({
	placement:'left',// 显示在右侧
	html:true,// 解析内容为html
	trigger:'click',// 点击触发
	title:'至少选择一项',
	content:mtSelectColumeHtml,// 弹出默认内容
	container:'#mtbb'// 追加元素至body
}).on('shown.bs.popover',function(){//弹出后
	var popoverId = $(this).attr('aria-describedby');
	var $popover = $(String.format('#%s',popoverId));
	//弹出后加载已选择的列
	reportSelectColumnArr[1].each(function(k,v){
		$popover.find(String.format(':checkbox[id="%s"]',v.id)).prop('checked',v.checked);
	});
});
//联动列单元格显示与隐藏
function hideShowColumns() {
	var tb_index  = currReportTabIndex;
	var currReportSelectColumnMap = reportSelectColumnArr[tb_index];
	var $theadTr = $('table:eq('+tb_index+') tr:first');
	var $thArr = $theadTr.find('th');
	currReportSelectColumnMap.each(function(k,v){
		var $this_th = $theadTr.find('th[thid="'+v.id+'"]');
		var index = $this_th.index();
		if(v.checked){
			$this_th.show();
			$('table:eq('+tb_index+') tr').each(function(){
				$(this).find('td').eq(index).show();
			});
		}else{
			$this_th.hide();
			$('table:eq('+tb_index+') tr').each(function(){
				$(this).find('td').eq(index).hide();
			});
		}
	});
}