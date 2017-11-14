$(function() {
	$('#uc_page_content .page_main,#uc_page_content .current_loc').click(function(e){
		$('.popover').popover('hide');//隐藏其他
	});

	/* 组件初始化 */
	loadswitch();

	// 初始化加载
	loadData(1);

	pullDownAdvertisers();

	// 加载创意分组
	//pullDownCreativeGroup();


 	// 新增
	$("#addCreative").click(function() {
		var planId = $("#planId").val();
		var url = "sspCreative/getAdd?planId="+planId;
		page.loadPage(url);
	});

	$("#search").click(function() {
		loadData(1);
	});

	function loadswitch() {
		 
		$("input[name='switch']").bootstrapSwitch({
			onText : "开",
			offText : "关",
			size : "mini",
			onSwitchChange : function(event, state) {
				if (state == true) {
					updateState($(this), 1);
					$(this).val("1");
				} else {
					updateState($(this), 2);
					$(this).val("2");
				}
			}
		});
	}
	
	//更改开关状态
    function updateState(_this,val) {
        var id =  _this.attr("id");
        var url = "sspCreative/updateState";
        page.ajax({
            url:url,
            data:{id:id,creativeState:val},
            type:'post',
            success:function (data) {
//                 if (data.status == 200){
//                    var url = "sspCreative/main";
//					page.loadPage(url);
//                 }
            },
            error : function (){
            	alert("请求失败");
            }
        });
        
    }

	// 加载数据
	function loadData(currentPageNo) {
		$('.popover').popover('destroy');
		var planId = $("#planId").val();
		page.ajax({
			url : 'sspCreative/page',
			data : {
				currentPageNo : currentPageNo,
				planId : planId,
				name : $("[name=creativeName]").val(),
				advertiserId : $("[name=advertiser]").val(),
				state : $("[name=state]").val(),
				creativeType : $("[name=creativeType]").val(),
				creativeGroup : $("[name=creativeGroup]").val()
			},
			success : function(data) {
				if (data.result.dataArray.length != null) {
					$("#creativeList").html("");
					$("#page").empty();
					loadPage(data);
				} else {
					$("#creativeList").html("");
					$("#page").empty();
					alert("没有查询到数据！")
				}
			},
			error : function(err) {

			}
		});
	}

	function loadPage(data) {
		console.info(data);
		var datas = data.result.dataArray;
		$("#creativeList").empty();
		if(datas.length != 0) {
			$.each(datas, function(index, creative) {
				
				var alignMcCss = {
						verticalAlign:'middle',
						textAlign:'center'
					};
				var imgUrl = globalVar.imgPrefix+creative.creativeUrl;
				var creativeType =  creative.creativeType;
				
				var $tr = $(HT.tr);
				
				var $td0 = $(HT.td);
				var $input0 = $(HT.input).attr({
					type:'checkbox',
					name:'switch',
					value:creative.creativeState,
					id:creative.id
				});
				if(creative.creativeState==1)
					$input0.attr('checked','checked');
				$td0.append($input0);
				var $td1 = $(HT.td);
				switch(creativeType*1){
					case 1://图片预览
						var clickAddress = creative.creativeClickAddress;
						if(isEmpty(clickAddress)){
							clickAddress = 'javascript:void(0);';
						}else if(!/^(http|https)/.test(clickAddress)){
							clickAddress = 'http://'+clickAddress;
						}
						var $a0 = $(HT.a).attr({
							'href':clickAddress,
							'target':'_blank'
						});
						var $img0 = $(HT.img).attr({
							class:'echo-lazy',
							src:imgUrl,
							dataEcho:imgUrl,
							width:57,
							height:32
						}).mouseover(function(){
							$(this).popover('show');
						}).popover({
							placement:'right',//显示在右侧
							html:true,//解析内容为html
							trigger:'click',//点击触发
							title:'创意预览',
//							content:popover_loading_content,//弹出默认内容
							template:popover_template_html,//弹出模版
							container:'#'+page.attr.page_attr.uc_page_content_id//追加元素至body
						}).on('show.bs.popover', function (){//弹出前
							$('.popover').popover('hide');//隐藏其他
						}).on('shown.bs.popover', function () {//弹出后
							var popoverId = $(this).attr('aria-describedby');
							var $popover = $(String.format('#%s',popoverId)).css({'max-width':'none'});
							$popover.mouseleave(function(){
								$(this).popover('hide');
							});
							var old_arrow_top_px = $popover.find('.arrow').eq(0).css('top');
//							var old_arow_style_type = old_arrow_style.split(':')[0];
//							var old_arrow_style_type_px = $popover.find('.arrow').eq(0).css(old_arow_style_type);
							var $container = $popover.find('.popover-content');
							//TODO 
							//创意预览
							var $img_div = $(HT.div).css({});
							var $img = $(HT.img).attr('src',globalVar.imgPrefix+creative.creativeUrl);
							//图片等比缩放
							var iw = creative.width;
							var ih = creative.height;
							var sw = window.screen.width;
							var sh = window.screen.height;
							
							var iswp = iw<sw?iw/sw:sw/iw;
							var ishp = ih<sh?ih/sh:sh/ih;
							
							if(iswp>0.5||ishp>0.5){
								if(iswp>=1&&ishp<=1){
									$img.css('width','40%');
								}
								if(iswp<=1&&ishp>=1){
									$img.css('height','40%');
								}
								if(iswp>0.5&&iswp<1){
									$img.css('width',(1.1-iswp)*100+'%');
								}
								if(ishp>0.5&&ishp<1){
									$img.css('height',(1.1-ishp)*100+'%');
								}
							}
							$container.html('').append($img_div.append($img));
//							$img.parent().zoom();
							$popover.find('.arrow').css('top',old_arrow_top_px);
						});
						
						$td1.append($a0.append($img0));
						break;
					case 2:
						var $iconI = $(HT.i).addClass('glyphicon glyphicon-facetime-video').css({
							fontSize:"x-large",
							width:57,
							height:32
						});
//						$a = $(HT.a);
//						$a.append($(HT.i).addClass('glyphicon glyphicon-facetime-video').css({
//							fontSize:"x-large",
//							width:57,
//							height:32
//						}));
//						var movPath = globalVar.imgPrefix+creative.creativeUrl;
//						var movType = creative.creativeFormat.replace('.','');
//						var $movObject = newVideoObject(movPath,movType,57,32);
						$iconI.mouseover(function(){
							$(this).popover('show');
						}).popover({
							placement:'right',//显示在右侧
							html:true,//解析内容为html
							trigger:'click',//点击触发
							title:'创意预览',
//							content:popover_loading_content,//弹出默认内容
							template:popover_template_html,//弹出模版
							container:'#'+page.attr.page_attr.uc_page_content_id//追加元素至body
						}).on('show.bs.popover', function (){//弹出前
							$('.popover').popover('hide');//隐藏其他
						}).on('shown.bs.popover', function () {//弹出后
							var popoverId = $(this).attr('aria-describedby');
							var $popover = $(String.format('#%s',popoverId)).css({'max-width':'none'});
							$popover.mouseleave(function(){
								$(this).popover('hide');
							});
							var old_arrow_top_px = $popover.find('.arrow').eq(0).css('top');
							var $container = $popover.find('.popover-content');
							//创意预览
							var movPath = globalVar.imgPrefix+creative.creativeUrl;
							var movType = creative.creativeFormat.replace('.','');
							
//							var $img_div = $(HT.div).css({});
//							var $img = $(HT.img).attr('src',globalVar.imgPrefix+creative.creativeUrl);
							//图片等比缩放
							var iw = creative.width;
							var ih = creative.height;
							var sw = window.screen.width;
							var sh = window.screen.height;
							
							var iswp = iw<sw?iw/sw:sw/iw;
							var ishp = ih<sh?ih/sh:sh/ih;
							
							var fw = iw,fh=ih;
							
							if(iswp>0.5||ishp>0.5){
								if(iswp>=1&&ishp<=1){
//									$img.css('width','40%');
									fw = iw*0.4;
								}
								if(iswp<=1&&ishp>=1){
//									$img.css('height','40%');
									fh = ih*0.4;
								}
								if(iswp>0.5&&iswp<1){
//									$img.css('width',(1.1-iswp)*100+'%');
									fw = iw*(1.1-iswp);
								}
								if(ishp>0.5&&ishp<1){
//									$img.css('height',(1.1-ishp)*100+'%');
									fh = ih*(1.1-ishp);
								}
							}
							var $tempMovObject = newVideoObject(movPath,movType,fw,fh);
							$container.html('').append($tempMovObject);
//							$img.parent().zoom();
							$popover.find('.arrow').css('top',old_arrow_top_px);
						});
						$td1.append($iconI);
						break;
					case 4:
						var swfPath = globalVar.imgPrefix+creative.creativeUrl;
						var $flashObject = newFlashObject(swfPath,57,32);
						$flashObject.mouseover(function(){
							$(this).popover('show');
						}).popover({
							placement:'right',//显示在右侧
							html:true,//解析内容为html
							trigger:'click',//点击触发
							title:'创意预览',
//							content:popover_loading_content,//弹出默认内容
							template:popover_template_html,//弹出模版
							container:'#'+page.attr.page_attr.uc_page_content_id//追加元素至body
						}).on('show.bs.popover', function (){//弹出前
							$('.popover').popover('hide');//隐藏其他
						}).on('shown.bs.popover', function () {//弹出后
							var popoverId = $(this).attr('aria-describedby');
							var $popover = $(String.format('#%s',popoverId)).css({'max-width':'none'});
							$popover.mouseleave(function(){
								$(this).popover('hide');
							});
							var old_arrow_top_px = $popover.find('.arrow').eq(0).css('top');
							var $container = $popover.find('.popover-content');
							//创意预览
							var swfPath = globalVar.imgPrefix+creative.creativeUrl;
							
							
//							var $img_div = $(HT.div).css({});
//							var $img = $(HT.img).attr('src',globalVar.imgPrefix+creative.creativeUrl);
							//图片等比缩放
							var iw = creative.width;
							var ih = creative.height;
							var sw = window.screen.width;
							var sh = window.screen.height;
							
							var iswp = iw<sw?iw/sw:sw/iw;
							var ishp = ih<sh?ih/sh:sh/ih;
							
							var fw = iw,fh=ih;
							
							if(iswp>0.5||ishp>0.5){
								if(iswp>=1&&ishp<=1){
//									$img.css('width','40%');
									fw = iw*0.4;
								}
								if(iswp<=1&&ishp>=1){
//									$img.css('height','40%');
									fh = ih*0.4;
								}
								if(iswp>0.5&&iswp<1){
//									$img.css('width',(1.1-iswp)*100+'%');
									fw = iw*(1.1-iswp);
								}
								if(ishp>0.5&&ishp<1){
//									$img.css('height',(1.1-ishp)*100+'%');
									fh = ih*(1.1-ishp);
								}
							}
							var $tempFlashObject = newFlashObject(swfPath,fw,fh);
							$container.html('').append($tempFlashObject);
//							$img.parent().zoom();
							$popover.find('.arrow').css('top',old_arrow_top_px);
						});
						$td1.append($flashObject);
						break;
					default:
						$td1.html('&nbsp;')
						break;
				}
				
				
				var $td2 = $(HT.td).css(alignMcCss).html(creative.creativeName);
				
				var creativeStr = (1==creative.creativeType?'图片':(2==creative.creativeType?'视频':(3==creative.creativeType?'信息流':(4==creative.creativeType?'Flash':''))))
				
				var $td3 = $(HT.td).css(alignMcCss).html(creativeStr);
				
				var $td4 = $(HT.td).css(alignMcCss).html(String.format('%s-%sK',creative.creativeFormat,creative.picSize));
				
				var $td5 = $(HT.td).css(alignMcCss).append($(HT.a).html(getDay(creative.updateTime)));
				
				var $td6 = $(HT.td);
				if(isNotEmpty(creative.platformAudit)){
					var auditStatus = [];
					auditStatus['pendding'] = '待审核';
					auditStatus['submitted'] = '已提交，审核中';
					auditStatus['approved'] = '通过';
					auditStatus['disapporoved'] = '不通过';
					var pa = creative.platformAudit;
					if(pa.status){
						$td6.append('内审:').append(auditStatus[pa.status]);
					}
					if(pa.pltStatuses&&!$.isEmptyObject(pa.pltStatuses)){
						var $tab = $(HT.tab);
						for(var k in pa.pltStatuses){
							var v = pa.pltStatuses[k];
							$tab.append(newFormGroup(k,auditStatus[v]))
						}
						$td6.css({color:'#3daded',cursor:'pointer'}).popover({
							placement:'left',// 显示在右侧
							html:true,// 解析内容为html
							trigger:'hover focus',// 点击触发
							title:'外审信息',
							content:$tab[0].outerHTML,// 弹出默认内容
							container:'#uc_page_content'// 追加元素至body
						});
					}
				}
				
				var $td7 = $(HT.td);
				var $update_a = $(HT.a).attr({
					'data-toggle':'tooltip',
					'data-placement':'top',
					title:'修改'
				}).click(function(){
					updateCreative(creative.id);
				});
				var $update_i = $(HT.i).addClass('iconfont icon-xiugai');
				var $delete_a = $(HT.a).attr({
					'data-toggle':'tooltip',
					'data-placement':'top',
					title:'删除'
				}).click(function(){
					deleteCreative(creative.id);
				});
				var $delete_i = $(HT.i).addClass('iconfont icon-shanchu');
				$td7.append($update_a.append($update_i)).append($delete_a.append($delete_i));
				
				
				$tr.append($td0).append($td1).append($td2)
					.append($td3).append($td4).append($td5)
					.append($td6).append($td7);

				
				$("#creativeList").append($tr);
				loadswitch();
			});
		} else {
			$("#creativeList").append("<tr><td style='vertical-align: middle;text-align:center;' colspan='7'>暂未查到数据</td></tr>");
		}

		var totalPage = data.result.totalPage;
		var totalCount = data.result.totalCount;
		var startPage = data.result.currentPageNo;
		$('#page').html('');
		$('#page').html('<ul id="pageUserListUl" class="bs-component pull-right"></ul>');
		page.ajaxPage({
			pcont : 'pageUserListUl',// 分页容器，ID
			totalPages : totalPage, // 总页数
			count : totalCount, // 总记录数
			startPage : startPage,
			onPageClick : function(env, thisPage) {
				// CurrentPageNo = thisPage;
				loadData(thisPage);
			}
		});
		Echo.init({
            offset: 0,
            throttle: 0
        });
		$('img').unbind('error').bind('error', function() {
        	var $this = $(this);
            var retry= $this.attr("re");
            retry = isNaN(retry)?1:retry;
            if(retry > 5){
            	$(this).unbind('error');
            	$this.css('background','none');
            }else {
            	setTimeout(function(){
            		$this.attr('src',$this.attr('src'));
            	},1000);
            }
            $this.attr("re",++retry);
        });
	}
	
	

	function pullDownAdvertisers() {
		page.ajax({
			url : 'sspAdvertiser/find',
			cache : false,
			success : function(res) {
				var data = res.result;
				if (data != null && data.length != 0) {
					$.each(data, function(index, advertiser) {
						$("[name=advertiser]").append(
								'<option value=' + advertiser.id + '>'
										+ advertiser.name + '</option>');
					});
					$("[name=advertiser]").selectpicker('refresh');
				} else {
					$("[name=advertiser]").append(
							'<option value="">暂无广告主</option>');
					$("[name=advertiser]").selectpicker('refresh');
				}
			},
			error : function(err) {

			}
		});
	}
	

	/** 日期转换工具 */
	function getMoth(str) {
		var oDate = new Date(str).format("yyyy-MM-dd");
		return oDate;
	}
	;

	// 处理默认时间工具
	function addDate(dd, dadd) {
		var a = new Date(dd)
		a = a.valueOf()
		a = a + dadd * 24 * 60 * 60 * 1000
		a = new Date(a)
		return a;
	}
	function getMapDate(dayss) {
		var now = new Date();
		var NextNow = addDate(now, -dayss);
		var years = NextNow.getFullYear();
		var months = NextNow.getMonth() + 1;
		var days = NextNow.getDate();
		var beginTime = years + "-" + months + "-" + days;
		return beginTime;
	};
	
	
	function getDay(str) {
		var oDate = new Date(str).format("yyyy-MM-dd hh:mm:ss");
		return oDate;
	};
})