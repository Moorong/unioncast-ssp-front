package com.unioncast.ssp.front.controller.ssp;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.restClient.RestResponseFactory;
import com.unioncast.common.ssp.model.SspDictLabel;
import com.unioncast.ssp.front.controller.common.BaseController;
import com.unioncast.ssp.front.model.SecurityUser;
import com.unioncast.ssp.front.service.ssp.SspDictLabelService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@Api("创意标签")
@Controller
@RequestMapping("/rest/sspDictLabel")
public class SspDictLabelController extends BaseController {

	private static final Logger LOG = LogManager.getLogger(SspDictLabelController.class);
	
	@Autowired
	private SspDictLabelService sspDictLabelService;
	/**
	 * 
	 * @author 刘蓉
	 * @date 2017年2月9日 下午3:04:48
	 *
	 * @param id
	 * @return
	 */
	@ApiOperation(value = "根据id查询广告组，id为空时查询所有", httpMethod = "POST", response = RestResponse.class)
	@RequestMapping(value = "/find", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse find(Long id) {
		SspDictLabel dictLabel = new SspDictLabel();
		if (id != null) {
			dictLabel.setId(id);
		}
		return sspDictLabelService.find(dictLabel);
	}
	
	
	@ApiOperation(value = "根据id查询广告组，id为空时查询所有", httpMethod = "POST", response = RestResponse.class)
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse add(SspDictLabel sspDictLabel) {
		List result = (List) sspDictLabelService.find(sspDictLabel).getResult();
		if(result.size() > 0) {
			System.out.println(result.get(0));
			LinkedHashMap<String, Object> map = (LinkedHashMap<String, Object>) result.get(0);
			
			RestResponse response = new RestResponse();
			response.setStatus(RestResponse.OK);
			Map<String, String> msg = new HashMap<String, String>();
			msg.put("error", "该标签已存在，直接选择即可");
			msg.put("id", map.get("id").toString());
			msg.put("name", map.get("name").toString());
			response.setResult(msg);
			return response;
		}
		return sspDictLabelService.save(sspDictLabel);
	}
	
	/**
	 * 查询标签的总条数
	 * @author 刘蓉
	 * @date 2017年2月24日 下午4:13:07
	 * @return
	 */
	@ApiOperation(value = "查询标签的条数", httpMethod = "POST", response = RestResponse.class)
	@RequestMapping(value = "/count", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse count() {
		return sspDictLabelService.count();
	}
	
	@ApiOperation(value = "分页查询", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "clickCount", value = "分页查询", required = true, dataType = "Integer", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/findPage", method = RequestMethod.POST)
	public RestResponse findPage(Integer clickCount) {

		RestResponse response = new RestResponse();
		response.setStatus(RestResponse.OK);
		try {
			response = sspDictLabelService.page(clickCount);
			return response;
		} catch (Exception e) {
			LOG.error("查询广告主分页出错");
			response.setStatus(RestResponse.FAIL);
			e.printStackTrace();
			return response;
		}
	}
}
