package com.unioncast.ssp.front.controller.ssp;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.restClient.RestResponseFactory;
import com.unioncast.common.ssp.model.SspDictAudit;
import com.unioncast.ssp.front.service.ssp.SspDictAuditService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @auther wangyao
 * @date 2017-03-31 11:47
 */
@Api("审核状态")
@Controller
@RequestMapping("/rest/sspDictAudit")
public class SspDictAuditController {
	private final Logger LOG = LogManager.getLogger(SspDictAuditController.class);

	@Autowired
	private SspDictAuditService sspDictAuditService;

	@ApiOperation(value = "查询所有状态", httpMethod = "POST", response = RestResponse.class)
	@ResponseBody
	@RequestMapping(value = "/find", method = RequestMethod.POST)
	public RestResponse find(SspDictAudit sspDictAudit) {
		LOG.info("find sspDictAudit:{}", sspDictAudit);
		RestResponse restResponse = new RestResponse();
		restResponse.setStatus(RestResponse.OK);
		try {
			return sspDictAuditService.find(sspDictAudit);
		} catch (Exception e) {
			LOG.error("查询状态出错");
			return RestResponseFactory.exception(e);
		}
	}

}
