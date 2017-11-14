package com.unioncast.ssp.front.controller.ssp;

import java.io.IOException;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.Pagination;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.report.SspAdDayReport;
import com.unioncast.common.ssp.model.report.SspAdHourReport;
import com.unioncast.common.ssp.model.report.SspAdRegionDayReport;
import com.unioncast.common.ssp.model.report.SspAdRegionHourReport;
import com.unioncast.common.ssp.model.report.SspMediaDayReport;
import com.unioncast.common.ssp.model.report.SspMediaHourReport;
import com.unioncast.common.ssp.model.report.SspMediaRegionDayReport;
import com.unioncast.common.ssp.model.report.SspMediaRegionHourReport;
import com.unioncast.common.util.JsonUtil;
import com.unioncast.ssp.front.model.SecurityUser;
import com.unioncast.ssp.front.service.ssp.MCSMtReportService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api("MCS媒体报表")
@Controller
@RequestMapping("rest/mcs/mtReport")
public class MCSMtReportController {
	private static final Logger LOG = LogManager.getLogger(MCSAdReportController.class);

	@Resource
	private MCSMtReportService mCSMtReportService;

	@ApiOperation(value = "条件分页查询", httpMethod = "POST", response = RestResponse.class)
	@ResponseBody
	@RequestMapping(value = "/mtPage", method = RequestMethod.POST)
	public RestResponse mtPage(@RequestParam(value = "byHour", required = false) Boolean byHour,
			@RequestParam(value = "regionState", required = false) Boolean regionState,
			@RequestParam(value = "jsonData", required = false) String jsonData)
			throws JsonParseException, JsonMappingException, IOException {

		PageCriteria params = JsonUtil.json2Object(jsonData, PageCriteria.class);

		RestResponse restResponse = new RestResponse();
		restResponse.setStatus(RestResponse.OK);
		try {
			SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Long accountId = user.getId();

			if (byHour && !regionState) {// 按小时 查询
				Pagination<SspMediaHourReport> res = mCSMtReportService.mtPageByHour(params);
				restResponse.setResult(res);

			}else if(byHour && regionState){//小时 地域
				Pagination<SspMediaRegionHourReport> res = mCSMtReportService.mtPageByHourAndRegion(params);
				restResponse.setResult(res);
			}else if(!byHour && regionState){//天 地域
				Pagination<SspMediaRegionDayReport> res = mCSMtReportService.mtPageByDayAndRegion(params);
				restResponse.setResult(res);
			
			} else if (!byHour && !regionState) {// 按天 查询
				Pagination<SspMediaDayReport> res = mCSMtReportService.mtPageByDay(params);
				restResponse.setResult(res);
			}
		
			// if(regionState){//按地域查询
			//
			// }else if(!regionState){//不按地域查询
			//
			// }
		} catch (Exception e) {
			LOG.error("广告报表分页出错: " + e.getMessage(), e);
		}
		return restResponse;
	}







}
