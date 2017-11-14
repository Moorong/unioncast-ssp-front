package com.unioncast.ssp.front.controller.ssp;

import java.io.IOException;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.Pagination;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdPositionInfo;
import com.unioncast.common.ssp.model.SspAppInfo;
import com.unioncast.common.ssp.model.report.SspAdDayReport;
import com.unioncast.common.ssp.model.report.SspAdHourReport;
import com.unioncast.common.ssp.model.report.SspAdRegionDayReport;
import com.unioncast.common.ssp.model.report.SspAdRegionHourReport;
import com.unioncast.common.util.CommonUtil;
import com.unioncast.common.util.JsonUtil;
import com.unioncast.ssp.front.common.util.SpringUtils;
import com.unioncast.ssp.front.controller.common.BaseController;
import com.unioncast.ssp.front.model.SecurityUser;
import com.unioncast.ssp.front.service.ssp.MCSAdReportService;
import com.unioncast.ssp.front.service.ssp.SspAdPositionInfoService;
import com.unioncast.ssp.front.service.ssp.SspAdvertiserService;
import com.unioncast.ssp.front.service.ssp.SspAppInfoService;
import com.unioncast.ssp.front.service.ssp.SspCreativeService;
import com.unioncast.ssp.front.service.ssp.SspOrderService;
import com.unioncast.ssp.front.service.ssp.SspPlanService;
import com.unioncast.ssp.front.service.ssp.elasticsearchData.ElasticsearchADReport;
import com.unioncast.ssp.front.service.user.UserSystemService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api("MCS报表")
@Controller
@RequestMapping("rest/mcs/report")
public class MCSAdReportController extends BaseController {

	private static final Logger LOG = LogManager.getLogger(MCSAdReportController.class);

	@Resource
	private MCSAdReportService mcsAdReportService;
	@Resource
	private ElasticsearchADReport elasticsearchADReport;

	@ApiOperation(value = "条件分页查询", httpMethod = "GET", response = RestResponse.class)
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String page() {
		return "ssp/newReport/MCSReport";
	}

	@ApiOperation(value = "条件分页查询", httpMethod = "POST", response = RestResponse.class)
	@ResponseBody
	@RequestMapping(value = "/adPage", method = RequestMethod.POST)
	public RestResponse adPage(@RequestParam(value = "byHour", required = false) Boolean byHour,
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
				Pagination<SspAdHourReport> res = mcsAdReportService.adPageByHour(params);
				restResponse.setResult(res);

			}else if(byHour && regionState){//小时 地域
				Pagination<SspAdRegionHourReport> res = mcsAdReportService.adPageByHourAndRegion(params);
				restResponse.setResult(res);
			
			}else if(!byHour && regionState){//天 地域
				Pagination<SspAdRegionDayReport> res = mcsAdReportService.adPageByDayAndRegion(params);
				restResponse.setResult(res);
			
			} else if (!byHour && !regionState) {// 按天 查询
				Pagination<SspAdDayReport> res = mcsAdReportService.adPageByDay(params);
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

	@ApiOperation(value = "详情查询", httpMethod = "POST", response = RestResponse.class)
	@ResponseBody
	@RequestMapping(value = "/detail", method = RequestMethod.POST)
	public Object getDetailInfo(Integer infoType, Long id) {
		if (CommonUtil.isNull(infoType, id))
			return null;
		try {
			switch (infoType) {
			case 1:// 广告主
				SspAdvertiserService sspAdvertiserService = SpringUtils.getBean(SspAdvertiserService.class);
				return sspAdvertiserService.find(id);
			case 2:// 订单
				SspOrderService sspOrderService = SpringUtils.getBean(SspOrderService.class);
				return sspOrderService.find(id);
			case 3:// 策略
				SspPlanService sspPlanService = SpringUtils.getBean(SspPlanService.class);
				return sspPlanService.find(id);
			case 4:// 创意
				SspCreativeService sspCreativeService = SpringUtils.getBean(SspCreativeService.class);
				return sspCreativeService.find(id);
			case 5:// 开发者
				UserSystemService userSystemService = SpringUtils.getBean(UserSystemService.class);
				return userSystemService.findById(id);
			case 6:// 应用
				SspAppInfoService sspAppInfoService = SpringUtils.getBean(SspAppInfoService.class);
				SspAppInfo sspAppInfo = new SspAppInfo();
				sspAppInfo.setId(id);
				return sspAppInfoService.find(sspAppInfo);
			case 7:// 广告位
				SspAdPositionInfoService sspAdPositionInfoService = SpringUtils.getBean(SspAdPositionInfoService.class);
				SspAdPositionInfo sspAdPositionInfo = new SspAdPositionInfo();
				sspAdPositionInfo.setId(id);
				return sspAdPositionInfoService.find(sspAdPositionInfo);
			}
			return new RestResponse();
		} catch (Exception e) {
			return new RestResponse();
		}
	}
}
