package com.unioncast.ssp.front.controller.ssp;

import com.alibaba.fastjson.JSONObject;
import com.unioncast.common.adx.model.UploadFileInfo;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.restClient.RestResponseFactory;
import com.unioncast.common.ssp.model.SspAdvertiser;
import com.unioncast.common.user.model.User;
import com.unioncast.ssp.front.controller.common.BaseController;
import com.unioncast.ssp.front.model.SecurityUser;
import com.unioncast.ssp.front.service.ssp.elasticsearchData.ElasticsearchADReport;
import com.unioncast.ssp.front.service.ssp.impl.SspAdvertiserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

@Api("广告主")
@Controller
@RequestMapping("/rest/sspAdvertiser")
public class SspAdvertiserController extends BaseController {

	private static final Logger LOG = LogManager.getLogger(SspAdvertiserController.class);

	@Resource
	private SspAdvertiserServiceImpl sspAdvertiserService;
	@Resource
	private ElasticsearchADReport elasticsearchADReport;

	@Resource
	private HttpServletRequest request;

	@RequestMapping(value = "/getPages", method = RequestMethod.GET)
	public String getPages() {

		return "ssp/advertiser/list";
	}

	@ApiOperation(value = "条件分页查询", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "pageCriteria", value = "分页查询条件", required = true, dataType = "PageCriteria", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/page", method = RequestMethod.POST)
	public RestResponse page(HttpServletRequest request, Long accountId,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "state", required = false, defaultValue = "0") Integer state,
			@RequestParam(value = "startTime", required = false) String startTimeStr,
			@RequestParam(value = "endTime", required = false) String endTimeStr,
			@RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
			@RequestParam(value = "currentPageNo", required = false, defaultValue = "1") Integer currentPageNo) {

		RestResponse restResponse = new RestResponse();
		restResponse.setStatus(RestResponse.OK);
		try {
			SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Long accountID = securityUser.getId();
			RestResponse response =sspAdvertiserService.page(accountID, name, state, startTimeStr, endTimeStr, currentPageNo, pageSize);
			// Integer orders = sspAdvertiserService.countOrderByAdvertiser(1L);
			return response;
		} catch (Exception e) {
			LOG.error("查询广告主分页出错");
			return RestResponseFactory.exception(e);
		}
	}

	@ApiOperation(value = "删除广告主", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "id", required = true, dataType = "long", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public RestResponse delete(Long id) {
		LOG.info("delete sspAdvertiser id:{}", id);
		try {
			SspAdvertiser advertiser = new SspAdvertiser();
			advertiser.setId(id);
			advertiser.setDeleteState(2l);
			advertiser.setUpdateTime(new Date());
			RestResponse response = sspAdvertiserService.update(advertiser);
			response.setStatus(RestResponse.OK);
			//删除es对应的报表
			elasticsearchADReport.esADRepordDelete("advertiserId",id);
			return response;
		} catch (Exception e) {
			LOG.error("删除广告主出错");
			return RestResponseFactory.exception(e);
		}
	}

	/**
	 * 广告主新增页面跳转
	 * 
	 * @return
	 */
	@RequestMapping(value = "/getAdd", method = RequestMethod.GET)
	public String getAdd(Long id) {
		return "ssp/advertiser/add";
	}

	/**
	 * 广告主新增、修改页面跳转
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getUpdate", method = RequestMethod.GET)
	public ModelAndView getUpdate(Long id) {
		ModelAndView modelAndeView = new ModelAndView();
		// return "ssp/advertiser/edit";
		modelAndeView.setViewName("ssp/advertiser/update");
		if (id != null) {
			SspAdvertiser advertiser = findById(id);

			if (advertiser != null) {
				modelAndeView.addObject("advertiser", advertiser);
			}
		}
		return modelAndeView;
	}

	private SspAdvertiser findById(Long id) {
		SspAdvertiser advertiser = new SspAdvertiser();
		advertiser.setId(id);
		ArrayList<Object> list = (ArrayList<Object>) sspAdvertiserService.find(advertiser).getResult();
		LinkedHashMap<String, SspAdvertiser> map = (LinkedHashMap<String, SspAdvertiser>) list.get(0);
		String json = JSONObject.toJSONString(map);
		advertiser = JSONObject.parseObject(json, SspAdvertiser.class);
		return advertiser;
	}

	@ApiOperation(value = "上传图片", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "request", required = true, dataType = "HttpServletRequest", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/imageUpload", method = RequestMethod.POST)
	public Map fileUpload(HttpServletRequest request) throws IOException {
		Map<String, String> imageUrl = new HashMap<String, String>();
		try {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
	
			Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
			Map<String, String> imageUrlMap = new HashMap<>();
			String url = null;
			for (MultipartFile tempFile : fileMap.values()) {
				if (tempFile != null) {
					UploadFileInfo uploadFile = new UploadFileInfo();
	
					uploadFile.setFileData(tempFile.getBytes());
					uploadFile.setFileLength(tempFile.getSize());
					uploadFile.setFileName(tempFile.getOriginalFilename());
	
					RestResponse response = sspAdvertiserService.saveFile(uploadFile);
					if(response.getStatus() == RestResponse.OK) {
						url = (String) response.getResult();
						imageUrl.put("imageUrl", url);
					} else {
						imageUrl.put("error", "文件上传出错");
					}
				}
			}
			return imageUrl;
		} catch (Exception e) {
			e.printStackTrace();
			imageUrl.put("error", "上传出错");
			return imageUrl;
		}
	}

	@ApiOperation(value = "增加或修改广告主", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "sspAdvertiser", required = true, dataType = "SspAdvertiser", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/addOrUpdate", method = RequestMethod.POST)
	public RestResponse addOrUpdate(SspAdvertiser sspAdvertiser, HttpServletRequest request) throws IOException {
		LOG.info("addOrUpdate sspAdvertiser:{}", sspAdvertiser);
		try {
			sspAdvertiser.setUpdateTime(new Date());
			String putState = request.getParameter("putState");
			if (putState != null && (putState.equals("on") || putState.equals("1"))) {
				sspAdvertiser.setPutAllowedState(1l);
			} else {
				sspAdvertiser.setPutAllowedState(2l);
			}
			SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			User user = new User();
			user.setId(securityUser.getId());
			sspAdvertiser.setUser(user);
			if (sspAdvertiser.getId() != null) {
				//修改
				return sspAdvertiserService.update(sspAdvertiser);
			} else {
				//新增
				sspAdvertiser.setCreateTime(new Date());
				sspAdvertiser.setPutAllowedState(1l);
				sspAdvertiser.setPutAlreadyState(2l);
				sspAdvertiser.setDeleteState(1l);
				String advertiserIdentifying = UUID.randomUUID().toString();
				sspAdvertiser.setAdvertiserIdentifying(advertiserIdentifying.replaceAll("-", ""));
				return sspAdvertiserService.save(sspAdvertiser);
			}
		} catch (Exception e) {
			LOG.error("增加或修改广告主出错");
			return RestResponseFactory.exception(e);
		}
	}

	/**
	 * 判断广告主名称的唯一性
	 * 
	 * @author 刘蓉
	 * @date 2017年1月18日 上午11:34:53
	 *
	 * @param name
	 * @return
	 * @throws IOException
	 */
	@ApiOperation(value = "判断广告主名称是否唯一", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "name", required = true, dataType = "String", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/validateName", method = RequestMethod.POST)
	public Map<String, Boolean> validateName(String name) throws IOException {
		SspAdvertiser advertiser = new SspAdvertiser();
		advertiser.setName(name);
		advertiser.setDeleteState(1l);
		return validate(advertiser);
	}

	/**
	 * 验证公司注册名称的唯一性
	 * 
	 * @author 刘蓉
	 * @date 2017年1月18日 下午7:41:12
	 *
	 * @param companyRegName
	 * @return
	 * @throws IOException
	 */
	@ApiOperation(value = "判断公司注册名称是否唯一", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "companyRegName", required = true, dataType = "String", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/validateCompanyRegName", method = RequestMethod.POST)
	public Map<String, Boolean> validateCompanyRegName(String companyRegName) throws IOException {
		SspAdvertiser advertiser = new SspAdvertiser();
		advertiser.setName(companyRegName);
		advertiser.setDeleteState(1l);
		return validate(advertiser);
	}

	private Map<String, Boolean> validate(SspAdvertiser advertiser) {
		Map<String, Boolean> map = new HashMap<>();
		boolean valid = false;
		List<SspAdvertiser> result = (ArrayList<SspAdvertiser>) sspAdvertiserService.find(advertiser).getResult();
		if (result.size() == 0) {
			valid = true;
		}
		map.put("valid", valid);
		return map;
	}

	@ApiOperation(value = "根据id查询广告主", httpMethod = "POST", response = RestResponse.class)
	@ResponseBody
	@RequestMapping(value = "/findById", method = RequestMethod.POST)
	public ModelAndView findById(Long advertiserId, ModelMap model) {
		ModelAndView mv = new ModelAndView("ssp/advertiser/add");
		SspAdvertiser advertiser = new SspAdvertiser();
		advertiser.setPutAllowedState(1L);
		advertiser.setId(1L);
		advertiser.setName("天智");
		advertiser.setUpdateTime(new Date());
		// SspAdvertiser sspAdvertiser = (SspAdvertiser) sspAdvertiserService.find(advertiserId).getResult();
		model.addAttribute("advertiser", advertiser);
		return mv;
	}

	@ApiOperation(value = "查询所有广告主", httpMethod = "POST", response = RestResponse.class)
	@ResponseBody
	@RequestMapping(value = "/find", method = RequestMethod.POST)
	public RestResponse find(Long userId) {
		try {
			return sspAdvertiserService.findAll();
		} catch (Exception e) {
			LOG.error("查询广告主出错");
			return RestResponseFactory.exception(e);
		}
	}

	@ApiOperation(value = "时间段内的所有广告主", httpMethod = "POST", response = RestResponse.class)
	@ResponseBody
	@RequestMapping(value = "/findIn", method = RequestMethod.POST)
	public RestResponse findIn(@RequestParam(value = "startTime", required = false) String startTimeStr,
			@RequestParam(value = "endTime", required = false) String endTimeStr) {
		try {
			return sspAdvertiserService.findIn(startTimeStr, endTimeStr);
		} catch (Exception e) {
			LOG.error("查询广告主出错");
			return RestResponseFactory.exception(e);
		}
	}

}
