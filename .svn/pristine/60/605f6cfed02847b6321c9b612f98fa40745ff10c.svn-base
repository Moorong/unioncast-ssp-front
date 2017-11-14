var data = {
		vFields: {
			name : {
				validators : {
                    callback: {
                        message: '策略名称已存在',
                        callback: function (value, validator) {
                        	if(isEmpty(value))return {valid:false,message:'策略名称不能为空!'};
                        	if(value.length<2||value.length>20)return {valid:false,message:'策略名称应为2-20个字符之间!'};
                            var res = true;
                            var advertiserId = $('#advertiserId').val();
                            var oldPlanName = $('#oldPlanName').val();
                            if(value!=oldPlanName)
                            page.ajax({
                                url: 'ssp/plan/validatorName',
                                data:{name:value,advertiserId:advertiserId},
                                async: false,
                                success: function (data) {
                                    if (!data)
                                        res = false;
                                }, error: function (data) {
                                }
                            });
                            if(!res)return {valid:false,message:'策略名称已存在!'};
                            return res;
                        }
                    }
				}
			},
			singlePeriodShowTimes : {
				validators : {
					notEmpty : {},
                    integer : {
						message : '请输入数字格式'
					},
					between : {
						min : 1,
						max : 100,
						message : '投放周期内单人曝光不超过100次'
					}
				}
			},
			singleShowTimes : {
				validators : {
					notEmpty : {},
                    integer : {
						message : '请输入数字格式'
					},
					between : {
						min : 1,
						max : 100,
						message : '每人每天（选择包括天、小时），曝光不超过100次'
					}
				}
			},
			singleClickTimes : {
				validators : {
					notEmpty : {},
                    integer : {
						message : '请输入数字格式'
					},
					between : {
						min : 1,
						max : 100,
						message : '每人每天（选择包括天、小时），点击不超过100次'
					}
				}
			},
			dailyBudgetCap : {
				validators : {
					notEmpty : {},
					numeric : {
						message : '请输入数字格式'
					},regexp:{
                        regexp:/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message:'每日预算上限10000元'
                    },between:{
						max : 100000,
						min : -100000,
						message:"每日预算上限10000元"
					}
				}
			},
			dailyShowCap : {
				validators : {
					notEmpty : {},
                    integer : {
						message : '请输入数字格式'
					},
					between : {
						min : 1,
						max : 1000000,
						message : '每日曝光上限100w次'
					}
				}
			},
			dailyClickCap : {
				validators : {
					notEmpty : {},
                    integer : {
						message : '请输入数字格式'
					},
					between : {
						min : 1,
						max : 100000,
						message : '每日点击上限10w次'
					}
				}
			},
			highestCpm : {
				validators : {
					callback: {
                        callback: function (value, validator) {
                        	if(!value)return {valid:false,message:'请填写必填项目'};
                        	if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value))return {valid:false,message:'格式不正确!'};
                        	if(value*1>999999)return {valid:false,message:'数值太大!'};
//                        	var budgetState = $('input[name="budgetState"]:checked').val();
//                        	var budget = $('input[name="budget"]').val();
//                        	if(budgetState&&budgetState*1==1){
//                        		if(budget&&value*1>budget*1){
//                        			return {valid:false,message:'最高出价不能高于预算控制'};
//                        		}else{
//                        			return true;
//                        		}
//                        	}else{
//                        		return true;
//                        	}
                        	return true;
                        }
                    }
				}
			},
			putStartTime : {
				validators : {
					date : {
						enable : false,
						format : 'YYYY-MM-DD',
						message : '日期格式异常'
					}
				}
			},
			putEndTime : {
				validators : {
					date : {
						enable : false,
						format : 'YYYY-MM-DD',
						message : '日期格式异常'
					}
				}
			}
		}
};