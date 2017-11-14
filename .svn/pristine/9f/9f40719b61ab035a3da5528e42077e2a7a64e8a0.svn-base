package com.unioncast.ssp.front.controller.ssp;

import javax.annotation.Resource;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.restClient.RestResponseFactory;
import com.unioncast.ssp.front.controller.common.BaseController;
import com.unioncast.ssp.front.service.ssp.SspAdPositionReportService;

@Api("媒体端报表")
@RestController
@RequestMapping("/rest/sspAdPositionReport")
public class SspAdPositionReportController extends BaseController {
	
private static final Logger LOG = LogManager.getLogger(SspAdPositionReportController.class);
	
	@Resource
	private SspAdPositionReportService sspAdPositionReportService;
	
	@ApiOperation(value = "条件分页查询", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "pageCriteria", value = "分页查询条件", required = true, dataType = "PageCriteria", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/page", method = RequestMethod.POST)
	public RestResponse page(PageCriteria pageCriteria) {
		LOG.info("page sspAdPositionReport pageCriteria:{}", pageCriteria);
		try {
			return sspAdPositionReportService.page(pageCriteria);
		} catch (Exception e) {
			LOG.error("查询广告位报表出错");
			return RestResponseFactory.exception(e);
		}
	}

}
