package com.unioncast.ssp.front.controller.ssp;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unioncast.common.page.Pagination;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.ssp.front.controller.common.BaseController;
import com.unioncast.ssp.front.model.SecurityUser;
import com.unioncast.ssp.front.service.ssp.elasticsearchData.ElasticsearchMTReport;

@Api("媒体报表")
@Controller
@RequestMapping("rest/ssp/mtReport")
public class SspMTReportController extends BaseController {
	  private static final Logger LOG = LogManager.getLogger(SspMTReportController.class);

	  @Resource
	    private ElasticsearchMTReport elasticsearchMTReport;

	  @ApiOperation(value = "条件分页查询", httpMethod = "POST", response = RestResponse.class)
	    @ResponseBody
	    @RequestMapping(value = "/mtPage", method = RequestMethod.POST)
	    public RestResponse esADReport(
	            @RequestParam(value = "userId", required = false) Long userId,
	            @RequestParam(value = "appInfoId", required = false) Long appInfoId,
	            @RequestParam(value = "adPositionInfoId", required = false) Long adPositionInfoId,
	            @RequestParam(value = "mtStartTime", required = false) String startTime,
	            @RequestParam(value = "mtEndTime", required = false) String endTime,
	            @RequestParam(value = "currentPageNo", required = false, defaultValue = "1") Integer currentPageNo) {

	        RestResponse restResponse = new RestResponse();
	        restResponse.setStatus(RestResponse.OK);
	        Pagination<Map<String, Object>> pag = null;
	        try {
	            SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	            Long accountId = user.getId();
	            pag = elasticsearchMTReport.esMTReport(accountId, userId, appInfoId, adPositionInfoId,
	                    currentPageNo, startTime, endTime);
	            restResponse.setResult(pag);
	        } catch (Exception e) {
	            LOG.error("媒体报表分页出错: " + e.getMessage(), e);
	        }

	        return restResponse;
	    }

}
