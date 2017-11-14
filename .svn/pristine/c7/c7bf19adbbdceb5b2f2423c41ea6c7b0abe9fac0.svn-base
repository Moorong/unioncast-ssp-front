package com.unioncast.ssp.front.controller.ssp;

import com.unioncast.common.page.Pagination;
import com.unioncast.common.restClient.RestError;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.restClient.RestStatus;
import com.unioncast.common.ssp.model.SspAdPositionInfo;
import com.unioncast.common.ssp.model.SspAppInfo;
import com.unioncast.common.util.CommonUtil;
import com.unioncast.ssp.front.common.util.Common;
import com.unioncast.ssp.front.common.util.SpringUtils;
import com.unioncast.ssp.front.controller.common.BaseController;
import com.unioncast.ssp.front.model.SecurityUser;
import com.unioncast.ssp.front.service.ssp.SspAdPositionInfoService;
import com.unioncast.ssp.front.service.ssp.SspAdvertiserService;
import com.unioncast.ssp.front.service.ssp.SspAppInfoService;
import com.unioncast.ssp.front.service.ssp.SspCreativeReportService;
import com.unioncast.ssp.front.service.ssp.SspCreativeService;
import com.unioncast.ssp.front.service.ssp.SspOrderService;
import com.unioncast.ssp.front.service.ssp.SspPlanService;
import com.unioncast.ssp.front.service.ssp.elasticsearchData.ElasticsearchADReport;
import com.unioncast.ssp.front.service.user.UserSystemService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.net.ssl.SSLPeerUnverifiedException;

import java.util.Map;

@Api("广告报表")
@Controller
@RequestMapping("rest/ssp/report")
public class SspReportController extends BaseController {

    private static final Logger LOG = LogManager.getLogger(SspReportController.class);

    @Resource
    private SspCreativeReportService sspCreativeReportService;

    @Resource
    private ElasticsearchADReport elasticsearchADReport;


    @ApiOperation(value = "条件分页查询", httpMethod = "GET", response = RestResponse.class)
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String page() {
        return "ssp/report/report";
    }


/*    @ApiOperation(value = "条件分页查询", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "pageCriteria", value = "分页查询条件", required = true, dataType = "PageCriteria", paramType = "body")
    @ResponseBody
    @RequestMapping(value = "/adPage", method = RequestMethod.POST)
    public RestResponse advertisementPage(
            @RequestParam(value = "accountId", required = false, defaultValue = "1") Long accountId,
            @RequestParam(value = "advertiserId", required = false) Long advertiserId,
            @RequestParam(value = "orderId", required = false) Long orderId,
            @RequestParam(value = "planId", required = false) Long planId,
            @RequestParam(value = "creativeId", required = false) Long creativeId,
            @RequestParam(value = "state", required = false, defaultValue = "1") Long state,
            @RequestParam(value = "startTime", required = false) String startTimeStr,
            @RequestParam(value = "endTime", required = false) String endTimeStr,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
            @RequestParam(value = "currentPageNo", required = false, defaultValue = "1") Integer currentPageNo) {
        //LOG.info("page sspCreativeReport pageCriteria:{}", pageCriteria);

        RestResponse restResponse = new RestResponse();
        restResponse.setStatus(RestResponse.OK);
        try {
            RestResponse response = sspCreativeReportService.page(accountId, advertiserId, orderId, planId, creativeId, currentPageNo, pageSize, startTimeStr, endTimeStr);
            return response;
        } catch (Exception e) {
            LOG.error("广告报表分页出错");
            return RestResponseFactory.exception(e);
        }
    }*/

    @ApiOperation(value = "条件分页查询", httpMethod = "POST", response = RestResponse.class)
    @ResponseBody
    @RequestMapping(value = "/adPage", method = RequestMethod.POST)
    public RestResponse esADReport(
            //@RequestParam(value = "accountId", required = false) Long accountId,
            @RequestParam(value = "advertiserId", required = false) Long advertiserId,
            @RequestParam(value = "orderId", required = false) Long orderId,
            @RequestParam(value = "planId", required = false) Long planId,
            @RequestParam(value = "creativeId", required = false) Long creativeId,
            //@RequestParam(value = "state", required = false, defaultValue = "1") Long state,
            @RequestParam(value = "startTime", required = false) String startTimeStr,
            @RequestParam(value = "endTime", required = false) String endTimeStr,
            //@RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
            @RequestParam(value = "currentPageNo", required = false, defaultValue = "1") Integer currentPageNo) {
        //LOG.info("page sspCreativeReport pageCriteria:{}", pageCriteria);

        RestResponse restResponse = new RestResponse();
        restResponse.setStatus(RestResponse.OK);
        Pagination<Map<String, Object>> pag = null;
        try {
            SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Long accountId = user.getId();
            pag = elasticsearchADReport.esADReport(accountId, advertiserId, orderId, planId,
                    creativeId, currentPageNo, startTimeStr, endTimeStr);
            restResponse.setResult(pag);
        } catch (Exception e) {
            LOG.error("广告报表分页出错: " + e.getMessage(), e);
        }

        return restResponse;
    }
    @ApiOperation(value = "详情查询", httpMethod = "POST", response = RestResponse.class)
    @ResponseBody
    @RequestMapping(value = "/detail", method = RequestMethod.POST)
    public Object getDetailInfo(Integer infoType,Long id){
    	if(CommonUtil.isNull(infoType,id))return null;
    	try {
			switch(infoType){
				case 1://广告主
					SspAdvertiserService sspAdvertiserService = SpringUtils.getBean(SspAdvertiserService.class);
					return sspAdvertiserService.find(id);
				case 2://订单
					SspOrderService sspOrderService = SpringUtils.getBean(SspOrderService.class);
					return sspOrderService.find(id);
				case 3://策略
					SspPlanService sspPlanService = SpringUtils.getBean(SspPlanService.class);
					return sspPlanService.find(id);
				case 4://创意
					SspCreativeService sspCreativeService = SpringUtils.getBean(SspCreativeService.class);
					return sspCreativeService.find(id);
				case 5://开发者
					UserSystemService userSystemService = SpringUtils.getBean(UserSystemService.class);
					return userSystemService.findById(id);
				case 6://应用
					SspAppInfoService sspAppInfoService = SpringUtils.getBean(SspAppInfoService.class);
					SspAppInfo sspAppInfo = new SspAppInfo();
					sspAppInfo.setId(id);
					return sspAppInfoService.find(sspAppInfo);
				case 7://广告位
					SspAdPositionInfoService sspAdPositionInfoService = SpringUtils.getBean(SspAdPositionInfoService.class);
					SspAdPositionInfo sspAdPositionInfo = new SspAdPositionInfo();
					sspAdPositionInfo.setId(id);
					return sspAdPositionInfoService.find(sspAdPositionInfo);
			}
			return new RestResponse();
		}catch (Exception e) {
			return new RestResponse();
		}
    }
}
