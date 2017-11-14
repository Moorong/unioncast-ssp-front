package com.unioncast.ssp.front.controller.ssp;

import com.unioncast.common.page.Operation;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.SearchExpression;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.restClient.RestResponseFactory;
import com.unioncast.common.ssp.model.SspAppInfo;
import com.unioncast.common.ssp.model.SspDictAudit;
import com.unioncast.common.user.model.User;
import com.unioncast.common.util.CommonUtil;
import com.unioncast.ssp.front.controller.common.BaseController;
import com.unioncast.ssp.front.service.ssp.SspAppInfoService;
import com.unioncast.ssp.front.service.ssp.SspDictAuditService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Api("应用")
@Controller
@RequestMapping("/rest/sspAppInfo")
public class SspAppInfoController extends BaseController {

	private static final Logger LOG = LogManager.getLogger(SspAppInfoController.class);

	@Resource
	private SspAppInfoService sspAppInfoService;
	@Resource
	private SspDictAuditService sspDictAuditService;

	/**
	 * 应用列表映射
	 *
	 * @return
	 * @author wangyao
	 * @date 2017/3/30 15:11
	 */
	@RequestMapping(value = { "/list" })
	public String appList() {
		return "ssp/app/appList";
	}

	/**
	 * 应用列表后台管理
	 * 
	 * @author 刘蓉
	 * @date 2017年4月5日 下午3:55:56
	 *
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/listManage", method = RequestMethod.GET)
	public String listManage() {
		return "ssp/media/appManager/list";
	}

	/**
	 * 更新app信息
	 *
	 * @return
	 * @author wangyao
	 * @date 2017/3/31 19:11
	 */
	@RequestMapping(value = { "/update/{id}" })
	public String appUpdate(@PathVariable Long id, ModelMap model) {
		SspAppInfo sspAppInfo = new SspAppInfo();
		sspAppInfo.setId(id);
		SspAppInfo[] sspAppInfos = sspAppInfoService.findT(sspAppInfo);
		if (CommonUtil.isNotNull(sspAppInfos)) {
			sspAppInfo = sspAppInfos[0];
		}
		model.addAttribute("app", sspAppInfo);
		String sta = new SimpleDateFormat("yyyy-MM-dd").format(sspAppInfo.getPriceStartTime()==null?new Date():sspAppInfo.getPriceStartTime());
		String end = new SimpleDateFormat("yyyy-MM-dd").format(sspAppInfo.getPriceEndTime()==null?new Date():sspAppInfo.getPriceEndTime());
		model.addAttribute("sta", sta);
		model.addAttribute("end", end);
		return "ssp/app/editApp";
	}

	/**
	 * 添加app映射
	 *
	 * @return
	 * @author wangyao
	 * @date 2017/3/30 16:09
	 */
	@RequestMapping(value = { "/add" })
	public String addApp() {
		return "ssp/app/addApp";
	}

	@ApiOperation(value = "查询所有应用", httpMethod = "POST", response = RestResponse.class)
	@ResponseBody
	@RequestMapping(value = "/find", method = RequestMethod.POST)
	public RestResponse find(SspAppInfo sspAppInfo) {
		LOG.info("find sspAppInfo:{}", sspAppInfo);
		sspAppInfo.setDeleteState(1);
		RestResponse restResponse = new RestResponse();
		restResponse.setStatus(RestResponse.OK);
		try {
			return sspAppInfoService.find(sspAppInfo);
		} catch (Exception e) {
			LOG.error("查询应用出错");
			return RestResponseFactory.exception(e);
		}
	}

	@ApiOperation(value = "增加应用", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "sspAppInfo", required = true, dataType = "SspAppInfo", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/addInfo", method = RequestMethod.POST)
	public RestResponse add(SspAppInfo sspAppInfo, @RequestParam String priceStartTimeStr,
			@RequestParam String priceEndTimeStr) {
		LOG.info("add sspAppInfo:{}", sspAppInfo);
		try {
			User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			sspAppInfo.setUser(user);
			sspAppInfo.setCreateTime(new Date());
			sspAppInfo.setUpdateTime(new Date());
			sspAppInfo.setDeleteState(1);
			sspAppInfo.setAppId(UUID.randomUUID().toString().replace("-", ""));
			// 审核状态初始化
			SspDictAudit sspDictAudit = new SspDictAudit();
			sspDictAudit.setCode(1);
			sspAppInfo.setSspDictAudit(sspDictAudit);
			Date priceStartTime = new SimpleDateFormat("yyyy-MM-dd").parse(priceStartTimeStr);
			Date priceEndTime = new SimpleDateFormat("yyyy-MM-dd").parse(priceEndTimeStr);
			sspAppInfo.setPriceStartTime(priceStartTime);
			sspAppInfo.setPriceEndTime(priceEndTime);
			Long id = sspAppInfoService.save(sspAppInfo);

			return RestResponseFactory.ok();
		} catch (Exception e) {
			LOG.error("增加应用出错");
			return RestResponseFactory.exception(e);
		}
	}

	@ApiOperation(value = "更新应用", httpMethod = "POST")
	@ApiImplicitParam(name = "sspAppInfo", required = true, dataType = "SspAppInfo", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/updateInfo", method = RequestMethod.POST)
	public RestResponse update(SspAppInfo sspAppInfo,@RequestParam String priceStartTimeStr,
							   @RequestParam String priceEndTimeStr) throws Exception {
		LOG.info("update sspAppInfo:{}", sspAppInfo);
		try {
			sspAppInfo.setUpdateTime(new Date());
			Date priceStartTime = new SimpleDateFormat("yyyy-MM-dd").parse(priceStartTimeStr);
			Date priceEndTime = new SimpleDateFormat("yyyy-MM-dd").parse(priceEndTimeStr);
			sspAppInfo.setPriceStartTime(priceStartTime);
			sspAppInfo.setPriceEndTime(priceEndTime);
			sspAppInfoService.update(sspAppInfo);
			return RestResponseFactory.ok();
		} catch (Exception e) {
			LOG.error("更新应用出错");
			return RestResponseFactory.exception(e);
		}
	}

	@ApiOperation(value = "条件分页查询", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "pageCriteria", value = "分页查询条件", required = true, dataType = "PageCriteria", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/page", method = RequestMethod.POST)
	public RestResponse page(@RequestBody PageCriteria pageCriteria) {
		LOG.info("page sspAppInfo pageCriteria:{}", pageCriteria);
		try {
			User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			if (user.getUserType() == 2) {
				List<SearchExpression> searchExpressionList = pageCriteria.getSearchExpressionList();
				SearchExpression searchExpression = new SearchExpression();
				searchExpression.setOperation(Operation.EQ);
				searchExpression.setPropertyName("creater_id");
				searchExpression.setValue(user.getId());
				searchExpressionList.add(searchExpression);
			}
			return sspAppInfoService.page(pageCriteria);
		} catch (Exception e) {
			LOG.error("应用分页出错");
			return RestResponseFactory.exception(e);
		}
	}

	@ApiOperation(value = "删除一个应用", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "id", required = true, dataType = "long", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public RestResponse delete(@RequestBody Long id) {
		LOG.info("delete sspAppInfo id:{}", id);
		try {
			sspAppInfoService.deleteById(id);
			return RestResponseFactory.ok();
		} catch (Exception e) {
			LOG.error("删除应用出错");
			return RestResponseFactory.exception(e);
		}
	}

	@ApiOperation(value = "批量删除应用", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "ids", required = true, dataType = "List<Long>", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/batchDelete", method = RequestMethod.POST)
	public RestResponse batchDelete(@RequestParam String ids) {
		LOG.info("batchDelete sspAppInfo ids:{}", ids);
		String[] appIdArr = ids.split(",");
		Long longArray[] = new Long[appIdArr.length];
		for (int i = 0; i < longArray.length; i++) {
			longArray[i] = Long.valueOf(appIdArr[i]);
		}
		try {
			sspAppInfoService.batchDelete(longArray);
			return RestResponseFactory.ok();
		} catch (Exception e) {
			LOG.error("批量删除应用出错");
			return RestResponseFactory.exception(e);
		}
	}
	
	@ApiOperation(value = "根据用户id查找应用", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "id", required = true, dataType = "Long", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/findByUserId", method = RequestMethod.POST)
	public RestResponse findByUserId(Long id) {
		LOG.info("findByUserId sspAppInfo userId:{}", (Long) id);
		try {
			RestResponse result = sspAppInfoService.findByUserId(id);
			return result;
		} catch(Exception e) {
			LOG.error("根据用户id查找应用出错");
			return RestResponseFactory.exception(e);
		}
	}
}
