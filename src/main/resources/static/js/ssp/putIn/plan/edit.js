/**
 * 验证其他表单项
 *
 * @param bv
 * @returns {Boolean}
 */
function validatorOther(bv) {
	//投放周期检验
	if($("#dateStateFlag1").hasClass("active") || $("#dateStateFlag2").hasClass("active")) {
		$("#putTimeState").val(1);
	} else {
		$("#putTimeState").val(2);
	}
	
	var budgetState = $('input[name="budgetState"]:checked').val();//预算控制
	var budget = $('input[name="budget"]').val();//预算
	
	var singlePeriodShowTimes = $('input[name="singlePeriodShowTimes"]').val();//投放周期内单人曝光次数
	
	var showCalculationType = $('select[name="showCalculationType"]').val();//展示频次类型
	var singleShowTimes = $('input[name="singleShowTimes"]').val();//频次内展示次数
	var clickCalculationType = $('select[name="clickCalculationType"]').val();//点击频次类型
	var singleClickTimes = $('input[name="singleClickTimes"]').val();//频次内点击次数
	
	var highestCpm = $('input[name="highestCpm"]').val();//最高出价
	
	var dailyBudgetCap = $('input[name="dailyBudgetCap"]').val();//每日预算上限
	var dailyShowCap = $('input[name="dailyShowCap"]').val();//每日展示上限
	var dailyClickCap = $('input[name="dailyClickCap"]').val();//每日点击上限
	
	if(budgetState&&budgetState*1==1){//校验预算、每日预算上限、最高出价
		if(isEmpty(budget)){
			alert('预算控制不能为空!');
			return false;
		}else if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(budget)){
			alert('预算控制请输入数字格式保留两位小数!');
			return false;
		}else if(sspOrderBudget&&budget*1>=sspOrderBudget*1){
			alert('预算控制不能大于订单预算!');
			return false;
		}else if(budget*1>100000){
			alert('预算控制不能大于10w!');
			return false;
		}else if(dailyBudgetCap*1>=budget){
			alert('每日预算上限不能大于预算控制(%s)!'.format(budget));
			return false;
		}
		if(budget&&highestCpm*1>budget*1){
			alert('最高出价不能高于预算控制');
			return false;
		}
	}
	//订单信息校验
	if(!isEmpty(sspOrderSinglePeriodShowTimes)&&singlePeriodShowTimes*1>sspOrderSinglePeriodShowTimes*1){
		alert('投放周期内单人曝光次数不能大于订单设置或者大于10w!');
		return false;
	}
	if(!isEmpty(sspOrderSingleShowTimes)){//频次内展示次数
		var currShowTimes = 1==showCalculationType?singleShowTimes*24:singleShowTimes*1;
		var maxShowTimes = 1==sspOrderShowCalculationType?sspOrderSingleShowTimes*24:sspOrderSingleShowTimes*1;
		if(currShowTimes>maxShowTimes){
			alert('频次展示次数不能高于订单频次展示设置!');
			return false;
		}
	}
	if(!isEmpty(sspOrderSingleClickTimes)){//频次内点击次数
		var currClickTimes = 1==clickCalculationType?singleClickTimes*24:singleClickTimes*1;
		var maxClickTimes = 1==sspOrderClickCalculationType?sspOrderSingleClickTimes*24:sspOrderSingleClickTimes*1;
		if(currClickTimes>maxClickTimes){
			alert('频次点击次数不能高于订单频次点击设置!');
			return false;
		}
	}
	if(!isEmpty(sspOrderDailyBudgetCap)&&dailyBudgetCap*1>sspOrderDailyBudgetCap){//每日展示上限
		alert('每日预算上限不能大于订单设置或者大于10w!');
		return false;
	}
	if(!isEmpty(sspOrderDailyShowCap)&&dailyShowCap*1>sspOrderDailyShowCap){//每日展示上限
		alert('每日曝光上限不能大于订单设置或者大于100w!');
		return false;
	}
	if(!isEmpty(sspOrderDailyShowCap)&&dailyClickCap*1>sspOrderDailyClickCap){//每日点击上限
		alert('每日点击上限不能大于订单设置或者大于10w!');
		return false;
	}
	
	//定向校验
	if(isNotEmpty(planGroupFlag)&&2==planGroupFlag*1){
		//校验设备ID定向
		var deviceType = $(':input[name="deviceType"]:checked').val();
		if(isNotEmpty(deviceType)&&3==deviceType*1){
			var device = $('#device').val();
			if(isEmpty(device)){
				alert("请填写指定设备ID!");
				return false;
			}
		}
		//校验媒体ID定向
		var mediaConnition = $(':input[name="mediaConnition"]:checked').val();
		if(isNotEmpty(mediaConnition)&&2==mediaConnition*1){
			var mediaVal = $('#mediaVal').val();
			if(isEmpty(mediaVal)){
				alert("请填写媒体定向ID!");
				return false;
			}
		}
		//Other
		
	}
	return true;
}
$(function() {
	/*
	var defDateFormat = "YYYY-MM-DD";
    var defStartDate =moment().format(defDateFormat); 
    var defEndDate = moment().add('days', 7).format(defDateFormat);
     投放周期初始化 
    var putTimeState = $(':input[name="putTimeState"]:checked').val();
    var putStartTimeStr = $("#putStartTimeStr1").val();
    var putEndTimeStr = $("#putEndTimeStr1").val();
    if(isNotEmpty(putTimeState)&&1==putTimeState*1&&isNotEmpty(putStartTimeStr)&&isNotEmpty(putEndTimeStr)){
    	defStartDate = putStartTimeStr;
    	defEndDate = putEndTimeStr;
    }
    $('input[name="putStartTimeStr1"]').val(defStartDate);
    $('input[name="putEndTimeStr1"]').val(defEndDate);
    $('#reportrange1 span').html(defStartDate + ' - ' + defEndDate);
    $('#reportrange1').daterangepicker({
 	   startDate : defStartDate,
 	   endDate : defEndDate,
     }, function(start, end, label) {
         var choStart = start.format(defDateFormat);
         var choEnd = end.format(defDateFormat);
         $('#reportrange1 span').html(choStart + ' - ' + choEnd);
         $('input[name="putStartTimeStr1"]').val(choStart);
         $('input[name="putEndTimeStr1"]').val(choEnd);
     }).on('apply.daterangepicker',function(ev,picker){
    	 	var pstartDate = picker.startDate.format('YYYY-MM-DD');
    	 	var pendDate = picker.endDate.format('YYYY-MM-DD');
			$('input[name="putStartTimeStr1"]').val(pstartDate);
			$('input[name="putEndTimeStr1"]').val(pendDate);
			$('#reportrange1 span').html(String.format("%s-%s",pstartDate,pendDate));
	}).on('cancel.daterangepicker',function(ev, picker) {
			$('input[name="putStartTimeStr1"]').val('');
			$('input[name="putEndTimeStr1"]').val('');
			$('#reportrange1 span').html('&nbsp;');
	});
    */
    
    /*双日历组件*/
//    $('#reportrange1').daterangepicker({
//            startDate: defStartDate
//        },
//        function (start, end, label) {
//            var choStart = start.format(defDateFormat);
//            var choEnd = end.format(defDateFormat);
//            $('#reportrange1 span').html(choStart + ' - ' + choEnd);
//            $('input[name="putStartTimeStr"]').val(choStart);
//            $('input[name="putEndTimeStr"]').val(choEnd);
//        });

    //初始化控制选项组
    //disp();
    budgetState();
    network();
    areaTargetState();

    // 广告定向显示隐藏
    $('#criteriaHead').css("cursor", "pointer").click(function() {
        var $criteriaCont = $('#criteria');
        if ($criteriaCont.is(':hidden')) {
            $criteriaCont.slideDown();
        } else {
            $criteriaCont.slideUp();
        }
    });
    
    /*function btn(){
    	var btn1=document.getElementById('btn');
    	var box1=document.getElementById('planShowSpen');
    	if(btn1.value=="展开"){
    		box1.style.display='block';btn1.value="收起";
         }else{
        	 box1.style.display='block';btn1.value="展开";
         }
    }*/
    //非必填项展示与隐藏
    $('[name="js-switchWrap"]').hide();
    $('.js-switchBtn').click(function() {
    	$('[name="js-switchWrap"]').slideToggle();
    	var txt = $(this).find('span').text() == "展开" ? '收起' : '展开';
    	$(this).find('span').text(txt);
    	$(this).find('i').toggleClass('icon-triangle-top');
    });
    	// 投放日期限制显示隐藏
     $('input[name="putTimeState"]').change(function(e) {
	     if (this.value == 1) {
	    	 $("#reportrange1").show();
	     } else {
	    	 $("#reportrange1").hide();
	    	 /*$('input[name="pushStartTime"]').val('');
			$('input[name="pushEndTime"]').val('');*/
			/*$('#reportrange1 span').html('&nbsp;');*/
	     }
     });
    // 预算控制显示隐藏
    $('input[name="budgetState"]').change(function(e) {
	     if (this.value == 1) {
	    	 $("#reportrange3").show();
	    	 $('input[name="dailyBudgetCapShow"]').prop('disabled',false);
	     } else {
	    	 $("#reportrange3").hide();
	    	 $('input[name="budget"]').val('').attr('value','');
	    	 $('input[name="dailyBudgetCapShow"]').val('').prop('disabled',true);
	    	 $('input[name="dailyBudgetCap"]').val('0');
	     }
     });
    $(':input[name="dailyBudgetCapShow"]').keyup(function(){$(':input[name="dailyBudgetCap"]').val(this.value);});
    $('form').eq(0).bootstrapValidator({
        fields : data.vFields
    }).on('success.form.bv', function(e,v,c) {
        // 防止表单提交
        e.preventDefault();
        // 获取表单
        var $form = $(e.target);
        // 获取验证器实例
        var bv = $form.data('bootstrapValidator');

        if (!validatorOther(bv)){
        	$form.find('#savebtns').enable();
        	  return;
        }


        var putHourStr = "";
        $.each($(".tabletime td"), function() {
            if ($(this).hasClass("tdclick")) {
                var values = $(this).attr('value');
                putHourStr += values + ",";
            }
        });
        //给隐藏input赋值
        if(putHourStr != ""){
            $("#timeTarget").val(putHourStr);
        }else{
            $("#timeTarget").val('');
        }


        // 使用Ajax异步提交数据
        page.ajaxSubmit(e.target, function(result) {
        	var tipMsg = (isEditPage?'更新':'新增')+'数据成功!';
            alert(tipMsg).ok(function(){
//            	var advertiserId = $('#advertiserId').val();
//                var sspOrderId = $('#sspOrderId').val();
                var url = "rest/ssp/plan/goPlanListByOrderId";
                var parentPlanId = $("#parentPlanId").val();
                if(isEmpty(parentPlanId)){
                	 page.history.go(url,'parentPlanId');
                }else{
                	page.history.go(url);
                }
//                page.loadPage(url,{orderId:sspOrderId,advertiserId:advertiserId});
            });
        });

    });

    //取消按钮
    $("#cancel").click(function () {
        confirm('确定退出吗？退出后，填写的内容将不保存!',"确认退出","确定","取消").ok(function () {
//        	 var advertiserId = $('#advertiserId').val();
//             var sspOrderId = $('#sspOrderId').val();
             var url = "rest/ssp/plan/goPlanListByOrderId";
//             page.loadPage(url,{orderId:sspOrderId,advertiserId:advertiserId});
             var parentPlanId = $("#parentPlanId").val();
             if(isEmpty(parentPlanId)){
            	 page.history.go(url,'parentPlanId');
             }else{
            	 page.history.go(url);
             }
        });
    });

    //获取日期
    function getMapDate(dayss) {
        var now = new Date();
        var NextNow = addDate(now, -dayss);
        var years = NextNow.getFullYear();
        var months = NextNow.getMonth() + 1;
        var days = NextNow.getDate();
        var beginTime = years + "-" + months + "-" + days;
        return beginTime;
    }
/*
    //投放周期控制
    function disp() {
        if ($("#putTimeStates").is(":checked") == true) {
            $("#reportrange1").hide();
        }
    }
*/
    //预算控制限制
    function budgetState() {
        if ($("#budgetStates").is(":checked") == true) {
            $("#reportrange3").hide();
        }
    }
    //网络类型控制
    function network() {
        if($("#networkcheck").is(":checked") == true){
            $("[name = networkType]:checkbox").prop("checked", true);
        }
    }
    //地域定向控制
    function areaTargetState() {
        if($("#areaTargetState1").is(":checked") == true){
            $("#areaTargetStateRadio").addClass("display","none");
        }
        if ($("#areaTargetState3").is(":checked") == true){
            $("#areaTargetStateRadio").addClass("display","none");
        }
    }
});

