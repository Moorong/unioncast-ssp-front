$(function() {
	
	var adSelectColumeMap = new Map();
	var mtSelectColumeMap = new Map();
	// 初始化已选择显示列
	$('#selectColumn :input[type="checkbox"]').each(function(i,o){
		adSelectColumeMap.put(i,{id:this.id,checked:this.checked});
	});
	$('#mtSelectColumn :input[type="checkbox"]').each(function(i,o){
		mtSelectColumeMap.put(i,{id:this.id,checked:this.checked});
	});
	 reportSelectColumnArr = [];
	reportSelectColumnArr[0] = adSelectColumeMap;
	reportSelectColumnArr[1] = mtSelectColumeMap;
	 adSelectColumeHtml = $('#selectColumn').html();
	 mtSelectColumeHtml = $('#mtSelectColumn').html();
	// 清理中间数据
	$('#selectColumn').remove();
	$('#mtSelectColumn').remove();
	
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
	
	// 获取参数
	$('input[name="startTime"]').val($('input[name="startTimeTem"]').val());
	$('input[name="endTime"]').val($('input[name="endTimeTem"]').val());
	getParams(1);
	hideShowColumns();
	$popover.popover('toggle');
// $("div[id='selectColumn']").eq(index).css('display', 'none');
	flushColResize();
}
function adCreativeNotSelect(o){
	var id = $(o).attr("id");
	var flag = $(o).is(':checked');
	if("advertiser" == id ||"creative" == id ){
		if(!flag){
			$(".adNotSelect").each(function(){
				 if ($(this).is(':checked')) {
		             $(this).attr('checked',false);
		             $(this).prop('disabled',true);
		             
		          }else{
		        	  $(this).prop('disabled',true);
		          }
			});
		}else{
			$(".adNotSelect").each(function(){
				
				$(this).prop('disabled',false);
			});
		}
	}
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

// 加载参数
function getParams(currentPageNo){
	
	// debugger;
	// 按小时
	
	var byHour = $('input:radio[name="byHour"]').is(':checked');
	  // 地域
	var regionState = $('input:checkbox[name="regionState"]').is(':checked'); 
	
	var jsonData = {
   		 "currentPageNo" : currentPageNo,
			"pageSize" : 10,
			"predicate" : "AND",
			"searchExpressionList" : [],
			"orderExpressionList" : [{
				"propertyName" : "adDay",
				"op" : "DESC"
			}] 
	};
	
	var startTime = $('input[name="startTime"]').val();
	var endTime = $('input[name="endTime"]').val();
	
	var adDayState = $('input:checkbox[name="adDayState"]').is(':checked');
	var adDay = "";
	if( adDayState){
		if(!isEmpty(startTime) && !isEmpty(endTime)){
			adDay = startTime + " 00:00:00" + "/" + endTime + " 59:59:59"; 
		}
		jsonData.searchExpressionList.push({
			'value' : adDay,
	     	'propertyName' : 'adDay',
	     	'operation' : 'EQ'
			});
	}
	// 广告主
	var advertiserId = $('select[name="advertiserId"]').val();
	var advertiserState = $('input:checkbox[name="advertiserState"]').is(':checked');
	if( advertiserState){
		if(isEmpty(advertiserId)){
			advertiserId = "";
		}
		jsonData.searchExpressionList.push({
 			'value' : advertiserId,
         	'propertyName' : 'advertiserId',
         	'operation' : 'EQ'
 		});
	}
	// 订单
	var orderId = $('select[name="orderId"]').val();
	var orderState = $('input:checkbox[name="orderState"]').is(':checked');
	if(orderState) {
		if(isEmpty(orderId)){
			orderId = "";
		}
 		jsonData.searchExpressionList.push({
 			'value' : orderId,
         	'propertyName' : 'orderId',
         	'operation' : 'EQ'
 		});
 	}
	// 其他标签
	var tags = $(".inputCheckbox");
	  $(".inputCheckbox").each(function () {
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
		url: "mcs/report/adPage",
		type : "POST",
		data : {
			byHour:byHour,
			regionState:regionState,
			jsonData:JSON.stringify(jsonData)
		},
      
		success : function(data) {
			if (data.result != null && data.result.dataArray!= null && data.result.dataArray.length != null) {
				$("#adReportList").html("");
				loadPage(data);
			} else {
				noData();
				return false;
			}
		},
		error : function(err) {
			noData();
		}
	});
	
}

function loadData(currentPageNo) {
	$('.popover').popover('hide');
// if(currentPageNo == 1){//第一页的数据
// getParams(currentPageNo);
// }else {//不是第一页的数据
// }
	getParams2(currentPageNo);
}

function getParams2(currentPageNo){
	// debugger;
	var jsonData = {
	   		 "currentPageNo" : currentPageNo,
				"pageSize" : 10,
				"predicate" : "AND",
				"searchExpressionList" : [],
				"orderExpressionList" : [{
					"propertyName" : "adDay",
					"op" : "DESC"
				}] 
		};
	     // 按小时
		var byHour = $('input:radio[name="byHour"]').is(':checked');
		  // 地域
		var regionState = false ; 
		var startTime = $('input[name="startTime"]').val();
		var endTime = $('input[name="endTime"]').val();
		// 广告主
		var advertiserId = $('select[name="advertiserId"]').val();
		// 订单
		var orderId = $('select[name="orderId"]').val();
		var value= "";
		var adDay = "";
		var tb_index  = currReportTabIndex;
		var currReportSelectColumnMap = reportSelectColumnArr[tb_index];
		currReportSelectColumnMap.each(function(k,v){
			if(v.checked){
				if("upti" == v.id){
					if(!isEmpty(startTime) && !isEmpty(endTime)){
						adDay = startTime + " 00:00:00" + "/" + endTime + " 59:59:59"; 
					}
					jsonData.searchExpressionList.push({
						'value' : adDay,
				     	'propertyName' : 'adDay',
				     	'operation' : 'EQ'
						});
				}else if("advertiser" == v.id){
					if(isEmpty(advertiserId)){
						advertiserId = "";
					}
					jsonData.searchExpressionList.push({
			 			'value' : advertiserId,
			         	'propertyName' : 'advertiserId',
			         	'operation' : 'EQ'
			 		});
					
				}else if("order" == v.id){
					if(isEmpty(orderId)){
						orderId = "";
					}
			 		jsonData.searchExpressionList.push({
			 			'value' : orderId,
			         	'propertyName' : 'orderId',
			         	'operation' : 'EQ'
			 		});
				}else if("plan"==v.id){
					jsonData.searchExpressionList.push({
			 			'value' : value,
			         	'propertyName' : 'strategyId',
			         	'operation' : 'EQ'
			 		});
				}else if("creative" == v.id){
					jsonData.searchExpressionList.push({
			 			'value' : value,
			         	'propertyName' : 'creativeId',
			         	'operation' : 'EQ'
			 		});
				}else if("region" == v.id){
					regionState = true;
				}
			}
		});
	console.info(JSON.stringify(jsonData));
		page.ajax({
			url: "mcs/report/adPage",
			type : "POST",
			data : {
				byHour:byHour,
				regionState:regionState,
				jsonData:JSON.stringify(jsonData)
			},
	      
			success : function(data) {
				if (data.result != null && data.result.dataArray!= null && data.result.dataArray.length != null) {
					$("#adReportList").html("");
					loadPage(data);
				} else {
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
// if ($(":input[id='checkboxNoZero']:eq("+index+") :checkbox:checked").size()
// == 0) {
// alert("请至少选择一项");
// return;
// }
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

				var advertiser = (report.advertiserName) == null ? '(空)'
						: report.advertiserName;
				var advertiserStr = subStr(advertiser);

				var order = (report.orderName) == null ? '(空)'
						: report.orderName;
				var orderStr = subStr(order);

				var plan = (report.strategyName) == null ? '(空)' : report.strategyName;
				var planStr = subStr(plan);

				var creative = (report.creativeName) == null ? '(空)'
						: report.creativeName;
				var creativeStr = subStr(creative);
				
				var consumption = (report.cost) == null ? '0'
						: (report.cost);
				var consumptionStr = consumption.toFixed(2);

				var cpm = (report.cpm) == null ? '0' : (report.cpm);
				cpm = cpm.toFixed(2);
				var cpmStr = cpm;

				

				var cpc = (report.cpc) == null ? '0' : (report.cpc);
				var cpcStr = cpc.toFixed(2);

				var cpa = (report.cpa) == null ? '0' : (report.cpa);
				var cpaStr = cpa.toFixed(2);
				
				var adDay = (report.adDay) == null ? '0' : (report.adDay);
				var byHour = $('input:radio[name="byHour"]').is(':checked');
				if(byHour){
					var adHour =  (report.adHour) == null ? '' : (report.adHour);
					adDay = adDay + " "+adHour+ "时" ;
				}
				var adDatStr = subStr(adDay);
					var $td1  = $(HT.td).addClass('el1').attr('title',adDatStr).html(adDatStr);
				
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
						url:'mcs/report/detail',
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
						url:'mcs/report/detail',
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
						url:'mcs/report/detail',
						data:{
							infoType:3,
							id:report.strategyId
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
						url:'mcs/report/detail',
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
				
				var rshow_time = ((report.impression) == null ? '0' : (report.impression));
				var $td6 = $(HT.td).addClass('el6').attr('title',rshow_time).html(rshow_time);
				var $td7 = $(HT.td).addClass('el7').attr('title',consumption).html(consumptionStr);
				var $td8 = $(HT.td).addClass('el8').attr('title',cpm).html(cpmStr);
				var rclick_time = ((report.click) == null ? '0' : (report.click));
				var $td9 = $(HT.td).addClass('el9').attr('title',rclick_time).html(rclick_time);
				//点击率=点击数/曝光数*100%
				var clickRatio = (rshow_time) == '0' ? '0': (rclick_time/rshow_time)*100;
				clickRatio = clickRatio.toFixed(0);
				var clickRatioStr = clickRatio+"%";
//				var clickRatio = (report.clickRatio) == null ? '0': (report.clickRatio);
//				clickRatio = clickRatio.toFixed(2);
//				var clickRatioStr = clickRatio;
				var $td10 = $(HT.td).addClass('el10').attr('title',clickRatio).html(clickRatioStr);
				var $td11 = $(HT.td).addClass('el11').attr('title',cpc).html(cpcStr);
				var r_arrival = ((report.arrival) == null ? '0' : (report.arrival));
				var $td12 = $(HT.td).addClass('el12').attr('title',r_arrival).html(r_arrival);
				var r_transform = ((report.impressionTransform) == null ? '0' : (report.impressionTransform))
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

				var region = ((report.region) == null ? '0' : (report.region));
				var $td20 = $(HT.td).addClass('el20').attr('title',region).html(region);
				$tr = $(HT.tr).append($td1).append($td2).append($td3).append($td4).append($td5).append($td20).append($td6).append($td7)
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
// if ($("#checkboxNoZero :checkbox:checked").size() == 0) {
// alert("请至少选择一项");
// return;
// }
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

// 初始化选择列弹出框
$('#element').popover({
	placement:'left',// 显示在右侧
	html:true,// 解析内容为html
	trigger:'click',// 点击触发
	title:'至少选择一项',
	content:adSelectColumeHtml,// 弹出默认内容
	container:'#ggbb'// 追加元素至body
}).on('shown.bs.popover',function(){// 弹出后
	var popoverId = $(this).attr('aria-describedby');
	var $popover = $(String.format('#%s',popoverId));
	// 弹出后加载已选择的列
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
}).on('shown.bs.popover',function(){// 弹出后
	var popoverId = $(this).attr('aria-describedby');
	var $popover = $(String.format('#%s',popoverId));
	// 弹出后加载已选择的列
	reportSelectColumnArr[1].each(function(k,v){
		$popover.find(String.format(':checkbox[id="%s"]',v.id)).prop('checked',v.checked);
	});
});
// 联动列单元格显示与隐藏
function hideShowColumns() {
	// debugger;
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




//echarts相关


$(function(){
	//左侧单选框内容
	var object = {
			'list1':{
				'name':'列表维度',
				'data':['日期','广告主','订单','策略','创意','地域','媒体指定','ADX指定']
			},
			'list2':{
				'name':"数据指数",
				'data':['曝光','消耗','CPM','点击','点击率','CPC','到达','到达率','二跳','二跳率','转化','转化率','点击转化','点击转化率','曝光转化','曝光转化率','CPD']
			}
			
		}
	$.fn.extend({
		popoverNew: function (object) {
			var sets =  $.extend({},object),
			htmls='',
			lists = '';
			for(var i in sets){
				lists='<p style="padding:6px 0;margin:0;">'+ sets[i]['name'] +'</p>';
				htmls+=lists;
				lis = '';
				var datas = sets[i]['data'],
				datasLenght = datas.length;
				for(var j=0;j<datasLenght;j++){
					lis+='<label class="checkbox-inline"><input type="checkbox">'+datas[j]+'</label>';
				}
				htmls+=lis
			}
			$(this).popover({
				placement:"left",
				html:true,
				content:'<div style="width:360px;">'+htmls+'<div class="text-center" style="margin-top:10px;">'+
				'<a href="#" id="tbnok" class="btn btn2 green" style="padding:5px;">确定</a>'+
				'<a href="#" class="btn btn2" style="padding:5px;">取消</a>'+
				'</div>'+
				'</div>'
			});
		},
		btnRadio:function (arr) {
			var thisO = this;
			if($.type(arr) != 'array') return false;
			var arrs = arr,
			arrsLength = arrs.length, //总个数
			size = 6, //每页显示个数
			startpage  = 1, //当前页数
			totalPage = 0, //总页数
			pageO = parseInt(arrsLength/size),
			pageS = parseInt(arrsLength%size);
			/*总页数*/
			if(pageS > 0){
				totalPage = pageO+1;
			}else{
				totalPage = pageO;
			}
			var b = initPage(startpage,totalPage,arrsLength,size)
			$(thisO).html(b);
			/*下一页*/
			$(thisO).on('click','.btn-radio-down',function () {
				startpage++;
				var a = initPage(startpage,totalPage,arrsLength,size);
				$(thisO).html(a);
			});
			/*上一页*/
			$(thisO).on('click','.btn-radio-up',function () {
				startpage--;
				var a = initPage(startpage,totalPage,arrsLength,size);
				$(thisO).html(a);
			});
			function initPage(page,totalPage,listLength,psize) {
				var lis = '',
				lisUp = '<li class="list-radio"><a href="javascript:;" class="btn-radio btn-radio-up"></a></li>',
				lisDown = '<li class="list-radio"><a href="javascript:;" class="btn-radio btn-radio-down"></a></li>';
				if(page == totalPage){
					lis += lisUp;
					for(var i= ((page-1)*size);i<listLength;i++){
						lis += '<li class="list-radio"><a href="javascript:;" class="btn-radio " name="'+arrs[i]+'">'+arrs[i]+'</a></li>';
					}
					page = totalPage;
				}else if(page==1){
					for(var i= 0 ;i<psize;i++){
						lis += '<li class="list-radio"><a href="javascript:;" class="btn-radio " name="'+arrs[i]+'">'+arrs[i]+'</a></li>';
					}
					lis += lisDown;
					page =1;
				}else{
					lis += lisUp;
					for(var i= ((startpage-1)*size);i<startpage*size;i++){
						lis += '<li class="list-radio"><a href="javascript:;" class="btn-radio " name="'+arrs[i]+'">'+arrs[i]+'</a></li>';
					}
					lis += lisDown;
				}
				return lis
			}
		}
	});	
	var xAxisArr = [];
	var legendArr = []; 
	var seriesArr = [];
	var seriesO = {};
	var userName = '';
	$('.js-radio-box').btnRadio(object['list2']['data']);
	$('#element').popoverNew(object);
	$('.btn-radio').on('click',function(){
		$(this).parent().parent().find('.btn-radio').removeClass('active');
		$(this).addClass('active');
		
	})
	$(document).on('click','#tbnok',function (e){
		$('#element,#element2,#element3').popover('hide');
	});
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		fn(id1);

	});
	
	 var myChart = echarts.init(document.getElementById('option1'));
	    var option={
	       
	        tooltip : {
	            trigger: 'axis'
	        },
	        legend: {
	            data:['广点通-安卓-开屏','广点通-安卓-插屏']//存放所有策略名称
	        },
	        xAxis:  {
	 			type: 'category',
	 			boundaryGap: false,
	 			data: ['2017.06.29','2017.06.28','2017.06.27','2017.06.26','2017.06.25']
	 		},
	 		yAxis: {
	 			type: 'value',
	 		},
	 		grid: {
	 			left: '3%',
	 			right: '4%',
	 			bottom: '3%',
	 			containLabel: true
	 		},
	        series : [
	        	{
	     			name:'广点通-安卓-开屏',
	     			type:'line',
	     			smooth:true,
	     			lineStyle: {
	     				normal:{
	     					type: 'solid',
	     					color:'red'
	     				}

	     			},
	     			data:[10, 20, 30, 25, 15],
	     			
	     		},
	     		{
	     			name:'广点通-安卓-插屏',
	     			type:'line',
	     			smooth:true,
	     			lineStyle: {
	     				normal:{
	     					type: 'solid',
	     					color:'yellow'
	     				}

	     			},
	     			data:[9, 19, 29, 24, 14],
	     		},
	     		
	     		
	        ]
	    };
	    myChart.setOption(option);
	    //采用ajax异步请求数据
//	    $.ajax({
//	        type:'post',
//	        url:'${urls}',
//	            dataType:'json',
//	            success:function(result){
//	                if(result){
//	                    //将返回的category和series对象赋值给options对象内的category和series
//	                    option.xAxis[0].data = result.axis;
//	                    option.legend.data = result.legend;
//	                    var series_arr=result.series;
//	                    for(var i=0;i<series_arr.length;i++){
//	                        option.series[i] = result.series[i];
//	                    }
//	                    myChart.hideLoading();
//	                    myChart.setOption(option);
//	                }
//	             },
//	            error:function(errMsg){
//	                console.error("加载数据失败")
//	            }
//	    });
	    // 为echarts对象加载数据
	   
	    
});
