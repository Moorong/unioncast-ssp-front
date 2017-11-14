package com.unioncast.ssp.front.controller.ssp;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspDictIndustry;
import com.unioncast.ssp.front.service.ssp.SspDictIndustryService;
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
 * @date 2017-03-30 17:38
 */
@Api("所属行业")
@Controller
@RequestMapping("/rest/sspDicIndustry")
public class SspDictIndustryController {

	private final Logger LOG = LogManager.getLogger(SspDictIndustryController.class);

	@Autowired
	private SspDictIndustryService sspDictIndustryService;

	@ApiOperation(value = "查询所有行业类型", httpMethod = "POST", response = RestResponse.class)
	@RequestMapping(value = "/find", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse find(SspDictIndustry sspDictIndustry) {
		LOG.info("find sspDictIndustry :{}", sspDictIndustry);
		return sspDictIndustryService.find(sspDictIndustry);
	}
}
