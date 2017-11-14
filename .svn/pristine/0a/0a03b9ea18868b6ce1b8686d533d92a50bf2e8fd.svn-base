package com.unioncast.ssp.front.controller.ssp;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.restClient.RestResponseFactory;
import com.unioncast.common.ssp.model.SspDictAdPositionType;
import com.unioncast.ssp.front.service.ssp.SspDictAdPositionTypeService;
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
 * @date 2017-04-05 9:26
 */

@Api("广告位类型")
@Controller
@RequestMapping("/rest/sspDictAdPositionType")
public class SspDictAdPositionTypeController {
	private final Logger LOG = LogManager.getLogger(SspDictAdPositionTypeController.class);
	@Autowired
	private SspDictAdPositionTypeService sspDictAdPositionTypeService;

	@ApiOperation(value = "查询所有广告位类型", httpMethod = "POST", response = RestResponse.class)
	@ResponseBody
	@RequestMapping(value = "/find", method = RequestMethod.POST)
	public RestResponse find(SspDictAdPositionType sspDictAdPositionType) {
		LOG.info("find sspDictAdPositionType:{}", sspDictAdPositionType);
		RestResponse restResponse = new RestResponse();
		restResponse.setStatus(RestResponse.OK);
		try {
			return sspDictAdPositionTypeService.find(sspDictAdPositionType);
		} catch (Exception e) {
			LOG.error("查询广告位类型出错");
			return RestResponseFactory.exception(e);
		}
	}
}
