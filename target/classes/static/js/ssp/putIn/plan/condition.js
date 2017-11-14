//处理时间范围选择
function changeTimeTarget(){
	var putStartTimeStr = $("#putStartTimeStr").val();
	var putEndTimeStr = $("#putEndTimeStr").val();
	var currWeek = moment().weekday();
	var a = moment(putStartTimeStr);
	var b = moment(putEndTimeStr);
	var c = b.diff(a, 'days');
//	for(var i=currWeek,count=0;i<=7,count<c;i++,count++){
//		$('#timeTargetTBody tr').eq(i).attr("disabled","disabled");
//	}
	
	genTimeTarget();
	//var $timeTargetTBody = $('#timeTargetTBody');
	//$('#timeTargetTBody tr').eq()
	
}
function genTimeTarget(){
	var $timeTargetTHead = $('#timeTargetTHead');
	var $timeTargetTBody = $('#timeTargetTBody').html('');
	var numArr = [ '一', '二', '三', '四', '五', '六', '日' ];
	var weekArr = [ 'monday', 'tuesda', 'wdnesday', 'thursday', 'friday','saturday', 'sunday' ];
	
	var putStartTimeStr = $("#putStartTimeStr").val();
	var putEndTimeStr = $("#putEndTimeStr").val();
	var currWeek = moment().weekday();
	var a = moment(putStartTimeStr);
	var b = moment(putEndTimeStr);
	var c = b.diff(a, 'days');
	
	//生成默认小时
	for (h = 0; h <= 23; h++)
		$timeTargetTHead.append($(HT.th).html(h));
	//根据日期范围生成星期
	if(c>7){//日期范围超过一周则生成多周
		for(var i=currWeek,count=0;i<=7,count<c;i++,count++){
			moment().add.format(defDateFormat);
			var $tr = $(HT.tr).attr('name', wk);
			$tr.append($(HT.td).append($(HT.label).append($(HT.input).attr('type', 'checkbox').attr('name','checked')).append('星期' + weekStr)));
			for (var h = 0; h <= 23; h++) {//小时
			// 		 var hour = h==24?0:h;
				var idstr = String.format('putHours%s%s', week, h == 0 ? 24 : h);
				var valstr = String.format('%s_%s', week, h == 0 ? 24 : h);
				// 	 	 var oldvalstr = String.format('%s_%s',week,h);
				var titlestr = String.format('星期%s %s:00~%s:59', weekStr, h, h);
				var $td = $(HT.td).attr('id', idstr).attr('value', valstr).attr('title', titlestr);
				$tr.append($td);
			}
			$timeTargetTBody.append($tr);
		}
	}else{
		$.each(weekArr, function(wi, wk) {//星期
			var week = wi + 1;
			var weekStr = numArr[wi];
			var $tr = $(HT.tr).attr('name', wk);
			$tr.append($(HT.td).append($(HT.label).append($(HT.input).attr('type', 'checkbox').attr('name','checked')).append('星期' + weekStr)));
			for (var h = 0; h <= 23; h++) {//小时
			// 		 var hour = h==24?0:h;
				var idstr = String.format('putHours%s%s', week, h == 0 ? 24 : h);
				var valstr = String.format('%s_%s', week, h == 0 ? 24 : h);
				// 	 	 var oldvalstr = String.format('%s_%s',week,h);
				var titlestr = String.format('星期%s %s:00~%s:59', weekStr, h, h);
				var $td = $(HT.td).attr('id', idstr).attr('value', valstr).attr('title', titlestr);
				$tr.append($td);
			}
			$timeTargetTBody.append($tr);
		});
	}
}
$(function() {
	//debugger;
	var defDateFormat = "YYYY-MM-DD";
	
	var defStartDate = moment().format(defDateFormat);
    var defEndDate = moment().add(30, 'days').format(defDateFormat);
	
	var putStartTimeStr = $("#putStartTimeStr").val();
	var putEndTimeStr = $("#putEndTimeStr").val();
	
	if(isEmpty(putStartTimeStr)){
		if(isEmpty(sspOrderPutStartTime)){
			putStartTimeStr = defStartDate;
		}else{
			putStartTimeStr = sspOrderPutStartTime;
		}
	}
    
    if(isEmpty(putEndTimeStr)){
    	if(isEmpty(sspOrderPutStartTime)){
    		putEndTimeStr = defEndDate;
		}else{
			putEndTimeStr = sspOrderPutEndTime;
		}
    }
    	
    	
    
    $('#reportrange2 span').html(putStartTimeStr + ' - ' + putEndTimeStr);
	var drp = $('#reportrange2').daterangepicker({
    	startDate : putStartTimeStr,
    	endDate : putEndTimeStr,
		locale: page.attr.drDefaultLocal,
    	minDate : sspOrderPutStartTime,
    	maxDate : sspOrderPutEndTime
	}, function(start, end, label) {
		var choStart = start.format(defDateFormat);
		var choEnd = end.format(defDateFormat);
		$('#reportrange2 span').html(String.format("%s-%s",choStart,choEnd));
		$('input[name="putStartTimeStr"]').val(choStart);
		$('input[name="putEndTimeStr"]').val(choEnd);
	}).on('show.daterangepicker',function(ev,picker){
		//时间控件随滚动条移动
		 $('.page_main').unbind('scroll').bind('scroll',function(e) {
			 picker.move(); 
	     });
	});
	
    //编辑渲染时间定向
   var timeTarget = $("#datetime").html();
   // $("#page3_2").addClass("tab-pane fade active in");
    if (timeTarget != ""){
        //选中全时段按钮
		$("#timeall").removeClass("active");
		 $("#custom").addClass("active");
        if (timeTarget != null&& timeTarget.length > 0) {
            var putHours = eval('(' + timeTarget + ')');
            $.each(putHours, function(i, node) {
                $.each(node.split(","), function(j, node1) {
                    $("#putHours" + i + node1).attr("class", "tdclick");
                });
            });
            $.each($('.tabletime').find('tbody tr'),function(i, n) {
                var a = $(this).find('td').length;
                var b = $(this).find('td.tdclick').length;
                if (b == (a - 1)) {
                    $(this).find('td:first').addClass('tdclick');
                    $(this).find('td:first').find('input').prop('checked',true);
                };
            });
        };
    }
  //处理时间范围选择
//	changeTimeTarget();
    //网络类型初始化

    // 广告类型初始化
    var defAdType = $('#adTypeInput').val();
    page.ajax({
        url : 'ssp/dict/adType',
        success : function(result) {
            var nodes = [];
            $.each(result, function(i, o) {
                var code = o.code;
                var f = o.level * 1 == 1000;
                nodes[i] = {
                    id : code,
                    cid : o.id,
                    name : o.name,
                    pId : o.level,
                    // open : f,
                    chkDisabled : f,
                    checked : defAdType == o.code
                };
            });
            $.fn.zTree.init($("#adTypeTree"), {
                check : {
                    enable : true,
                    chkStyle : "radio",
                    radioType : "all"
                },
                data : {
                    simpleData : {
                        enable : true
                    }
                },
                callback : {
                    beforeCheck:function (treeId, treeNode) {
                        return !treeNode.checked;
                    },
                    onClick : function(event, treeId, treeNode) {
                        $.fn.zTree.getZTreeObj(treeId).checkNode(treeNode,
                            !treeNode.checked, false, true);
                        $.fn.zTree.getZTreeObj(treeId).expandNode(treeNode,
                            !treeNode.open, false, true);
                    },
                    onCheck : function(event, treeId, treeNode) {
                        var adType = treeNode.id;
                        if (adType * 1 > 9999)
                            $('#adTypeInput').val(adType);
                    }
                }
            }, nodes);
            $.each($.fn.zTree.getZTreeObj("adTypeTree").getCheckedNodes(true),
                function(i, o) {
                    $.fn.zTree.getZTreeObj("adTypeTree").expandNode(
                        o.getParentNode(), true, false, true);
                });
        }
    });
    // 地域定向显示控制
    $("#areaTargetStateId").click(function() {
        if ($("input[name=areaTargetState]:checked").val() == 1) {
            $("#areaTargetStateRadio").slideUp();
            $('#areaTargetStateInput').val('');
            $('#areaTargetState').val('1');
            //清空回调地域表单
            $('#cityInfoArrInput').val('');
            $.fn.zTree.getZTreeObj("areaTargetStateTree").checkAllNodes(false);
            $.fn.zTree.getZTreeObj("areaTargetStateTree").expandAll(false);
        } else if ($("input[name=areaTargetState]:checked").val() == 2) {
            $("#areaTargetStateRadio").slideDown();
            $('#areaTargetState').val('2');
        } else if ($("input[name=areaTargetState]:checked").val() == 3) {
            $("#areaTargetStateRadio").slideUp();
            $('#areaTargetStateInput').val('');
            $('#areaTargetState').val('3');
            //清空回调地域表单
            $('#cityInfoArrInput').val('');
            $.fn.zTree.getZTreeObj("areaTargetStateTree").checkAllNodes(false);
            $.fn.zTree.getZTreeObj("areaTargetStateTree").expandAll(false);
        }
    });
    // 地域定向初始化
    var areaTarget = $('#cityInfoArrInput').val().split(',');
    if (areaTarget!="" && areaTarget.length > 0) {
		/*$('input[name="areaTargetState"][value="2"]').selected().change();*/
        //$("#areaTargetStateRadio").show();
    }
    if ($("#areaTargetState").val() == 2){
        $("#areaTargetStateRadio").show();
    }

    var areaTargetLeftSetting = {
        check : {
            enable : true
        },
        data : {
            simpleData : {
                enable : true
            }
        },
        callback : {
            onClick : function(event, treeId, treeNode) {
                $.fn.zTree.getZTreeObj(treeId).checkNode(treeNode,
                    !treeNode.checked, false, true);
                $.fn.zTree.getZTreeObj(treeId).expandNode(treeNode,
                    !treeNode.open, false, true);
            },
            onCheck : function(event, treeId, treeNode) {
                var nodeIds = [];
                $.each(this.getZTreeObj(treeId).getCheckedNodes(true),
                    function(i, o) {
                        nodeIds[i] = o.id;
                    });
				/* $('#cityInfoArrInput').val(
				 JSON.stringify(nodeIds).replace(/(\[|\])/g, ''));*/
                $('#cityInfoArrInput').val(nodeIds);
            }
        }
    };
    page.ajax({
        url : 'ssp/dict/areaTarget',
        success : function(result) {
            var nodes = [];
            $.each(result, function(i, o) {
                var code = o.code;
                if(o.code.toString().length <= 4 ) {
                    length = 0;
                }else {
                    length = o.code.toString().substr(0, 4);
                }
                nodes[i] = {
                    id : code,
                    cid : o.id,
                    name : o.name,
                    pId : length,
                    //checked : areaTarget.includes(code.toString())
                    checked : ($.inArray(code.toString(),areaTarget)>=0?true:false)
                };
            });
            $.fn.zTree.init($("#areaTargetStateTree"), areaTargetLeftSetting, nodes);
            $.each($.fn.zTree.getZTreeObj("areaTargetStateTree").getCheckedNodes(
                true), function(i, o) {
                $.fn.zTree.getZTreeObj("areaTargetStateTree").expandNode(
                    o.getParentNode(), true, false, true);
            });
        }
    });
    
    // 操作类型显示控制
    
    $("#operationSystemId").click(function() {
        if ($("input[name=operationSystem]:checked").val() == 2) {
            $("#operationSystemRadio").slideDown();
            $("#dictSysOperationTypeArr").val('2');
        } else {
            $("#operationSystemRadio").slideUp();
            $('#operationSystemInput').val('');
            $("#dictSysOperationTypeArr").val('1');
			$.fn.zTree.getZTreeObj("operationSystemTree").checkAllNodes(false);
			 $.fn.zTree.getZTreeObj("operationSystemTree").expandAll(false);
        }
    });
    // 操作类型初始化
    var operationSystem = $('#operationSystemInput').val().split(',');
    if (operationSystem!="" && operationSystem.length > 0) {
		/*$('input[name="operationSystem"][value="2"]').selected().change();
		 $("#operationSystemRadio").show();*/
    }
    if($("#dictSysOperationTypeArr").val() == 2)
    {
        $("#operationSystemRadio").show();
    }
    var operationSystemLeftSetting = {
        check : {
            enable : true
        },
        data : {
            simpleData : {
                enable : true
            }
        },
        callback : {
            onClick : function(event, treeId, treeNode) {
                $.fn.zTree.getZTreeObj(treeId).checkNode(treeNode,
                    !treeNode.checked, false, true);
                $.fn.zTree.getZTreeObj(treeId).expandNode(treeNode,
                    !treeNode.open, false, true);
            },
            onCheck : function(event, treeId, treeNode) {
                var nodeIds = [];
                $.each(this.getZTreeObj(treeId).getCheckedNodes(true),
                    function(i, o) {
                        nodeIds[i] = o.id;
                    });
				/*$('#operationSystemInput').val(
				 JSON.stringify(nodeIds).replace(/(\[|\])/g, ''));*/
                $('#operationSystemInput').val(nodeIds);
            }
        }
    };
    page.ajax({
        url : 'ssp/dict/sysOperationType',
        success : function(result) {
            var nodes = [];
            
            $.each(result, function(i, o) {
                var code = o.code;
                var f = o.level * 1 == 1000;
                nodes[i] = {
                    id : code,
                    cid : o.id,
                    name : o.name,
                    pId : o.level,
                    // open : f,
					/* chkDisabled : f,*/
                    //checked : operationSystem.includes(code.toString())
                    checked : ($.inArray(code.toString(),operationSystem)>=0 ? true : false)
                };
            });
           
            	$.fn.zTree.init($("#operationSystemTree"), operationSystemLeftSetting,
                        nodes);
           
            $.each($.fn.zTree.getZTreeObj("operationSystemTree").getCheckedNodes(
                true), function(i, o) {
                $.fn.zTree.getZTreeObj("operationSystemTree").expandNode(
                    o.getParentNode(), true, false, true);
            });
        }
    });
    // 设备ID显示控制

    if ($("input[name=deviceType]:checked").val() == 3) {
        $("#deviceTypeId").show();
    } else if ($("input[name=deviceType]:checked").val() == 2){
        $("#deviceTypeId").hide();
    }else if ($("input[name=deviceType]:checked").val() == 1){
        $("#deviceTypeStates").val(1);
        $("#deviceTypeId").hide();
    }
    $('input[name="deviceType"]').change(function(e) {
        if (this.value == 3) {
            $("#device").val("");
            $("#deviceTypeStates").val(3);
            $("#deviceTypeId").show();
        } else if ($("input[name=deviceType]:checked").val() == 2){
            $("#device").val("");
            $("#deviceTypeStates").val(2);
            $("#deviceTypeId").hide();
        }else if ($("input[name=deviceType]:checked").val() == 1){
            $("#deviceTypeId").hide();
            $("#deviceTypeStates").val(1);
        }
    });
    // 媒体id定向隐藏
    if ($("input[name=mediaConnition]:checked").val() == 2) {
        $("#mediaConditionVal").show();
    } else {
        $("#mediaConditionVal").hide();
    }
    $('input[name="mediaConnition"]').change(function(e) {
        if (this.value == 2) {
            $("#mediaVal").val("");
            $("#mediaConditionVal").show();
        } else {
            $("#mediaVal").val("");
            $("#mediaConditionVal").hide();
        }
    });



    // 媒体类型显示控制
    $('input[name="mediaTypeRadio"]').change(function(e) {
        if (this.value == 2) {
            $("#mediaTypeConditionCont").slideDown();
            $("#mediaSates").val('2');
        } else {
            $("#mediaTypeConditionCont").slideUp();
            $('#mediaTypeInput').val('');
            $("#mediaSates").val('1');
			$.fn.zTree.getZTreeObj("mediaTypeLeftTree").checkAllNodes(false);
			 $.fn.zTree.getZTreeObj("mediaTypeLeftTree").expandAll(false);
        }
    });

    // 媒体类型初始化
    var defMediaType = $('#mediaTypeInput').val().split(',');
    if (defMediaType!="" && defMediaType.length > 0) {
		/*$('input[name="mediaTypeRadio"][value="2"]').selected().change();*/
    }
    if ($("#mediaSates").val() == 2){
        $("#mediaTypeConditionCont").show();
    }
    var mediaTypeLeftSetting = {
        check : {
            enable : true
        },
        data : {
            simpleData : {
                enable : true
            }
        },
        callback : {
            onClick : function(event, treeId, treeNode) {
                $.fn.zTree.getZTreeObj(treeId).checkNode(treeNode,
                    !treeNode.checked, false, true);
                $.fn.zTree.getZTreeObj(treeId).expandNode(treeNode,
                    !treeNode.open, false, true);
            },
            onCheck : function(event, treeId, treeNode) {
                var nodeIds = [];
                $.each(this.getZTreeObj(treeId).getCheckedNodes(true),
                    function(i, o) {
                        nodeIds[i] = o.id;
                    });
				/*$('#mediaTypeInput').val(
				 JSON.stringify(nodeIds).replace(/(\[|\])/g, ''));*/
                $('#mediaTypeInput').val(nodeIds);
				/*
				 * var nodes = [];
				 * $.each(this.getZTreeObj(treeId).getCheckedNodes(true),
				 * function (i, o) { nodes[i] = { id: o.id, pId: o.pId, name:
				 * o.name, open: true, checked: true, level: o.level }; });
				 * $.fn.zTree.init($("#mediaTypeRightTree"),
				 * mediaTypeRightSetting, nodes);
				 */
            }
        }
    };
	/*
	 * var mediaTypeRightSetting = { check: { enable: true }, data: {
	 * simpleData: { enable: true } }, callback: { onClick: function (event,
	 * treeId, treeNode) { $.fn.zTree.getZTreeObj(treeId).checkNode(treeNode,
	 * !treeNode.checked, false, true);
	 * $.fn.zTree.getZTreeObj(treeId).expandNode(treeNode, !treeNode.open,
	 * false, true); //var adType = treeNode.id; //if(adType*1>9999) //
	 * $('#mediaTypeInput').val(treeNode.id); }, onCheck: function (event,
	 * treeId, treeNode) { var treeDemo = this.getZTreeObj('mediaTypeLeftTree');
	 * treeDemo.checkNode(treeDemo.getNodeByParam('id', treeNode.id, null),
	 * treeNode.chedked, true, true); } } };
	 */
    page.ajax({
        url : 'ssp/dict/mediaType',
        success : function(result) {
            var nodes = [];
            $.each(result, function(i, o) {
                var code = o.code;
                var f = o.level * 1 == 1000;
                nodes[i] = {
                    id : code,
                    cid : o.id,
                    name : o.name,
                    pId : o.level,
                    // open : f,
					/*chkDisabled : f,*/
                    //checked : defMediaType.includes(code.toString())
                    checked : ($.inArray(code.toString(),defMediaType)>=0 ? true:false)
                };
            });
            $.fn.zTree.init($("#mediaTypeLeftTree"), mediaTypeLeftSetting,
                nodes);
            $.each($.fn.zTree.getZTreeObj("mediaTypeLeftTree").getCheckedNodes(
                true), function(i, o) {
                $.fn.zTree.getZTreeObj("mediaTypeLeftTree").expandNode(
                    o.getParentNode(), true, false, true);
            });
        }
    });

    function getLocalTime(nS) {  
        var date = new Date(nS);
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        return year+"-"+month+"-"+day;
    }



    //编辑时控制网络类型
    var networkTypes = $('#networkType').val().split(",");
    if (networkTypes!="" && networkTypes.length > 0){
        $("#networkcheck").removeAttr("checked");
        var a = $(".checkval input:checkbox");
        $.each(a ,function (i , n) {
            if(networkTypes.indexOf($(n).val()) > -1){
                $(this).prop('checked',true);
            }
        })

    }

});