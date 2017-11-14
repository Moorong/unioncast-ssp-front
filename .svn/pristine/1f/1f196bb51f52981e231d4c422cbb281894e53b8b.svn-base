package com.unioncast.ssp.front.controller.ssp;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.unioncast.ssp.front.controller.common.BaseController;

@Api("财务管理")
@Controller
@RequestMapping("/rest/ssp/finance")
public class FinanceController extends BaseController {
	
	private static final Logger LOG = LogManager.getLogger(FinanceController.class);
	
	@ApiOperation(value = "订单充值记录列表页", httpMethod = "GET")
	@RequestMapping(value = "orderRecharge",method=RequestMethod.GET)
	public String orderRecharge(){
		return "ssp/finance/orderRecharge";
	}
	
	
}
