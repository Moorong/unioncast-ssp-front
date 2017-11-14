package com.unioncast.ssp.front.controller.ssp;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.unioncast.ssp.front.common.util.SystemSession;
import com.unioncast.ssp.front.controller.common.BaseController;
import com.unioncast.ssp.front.service.ssp.SspRoleService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.restClient.RestResponseFactory;
import com.unioncast.common.user.model.Module;
import com.unioncast.common.user.model.Role;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

/**
 * @auther wangyao
 * @date 2017-01-12 11:32
 */
@Api("角色")
@Controller
@RequestMapping("/rest/ssp/role")
public class SspRoleController extends BaseController {

	private static final Logger LOG = LogManager.getLogger(SspRoleController.class);

	@Resource
	private SspRoleService sspRoleService;

	/**
	 * 角色列表映射
	 *
	 * @return
	 * @author wangyao
	 * @date 2017/1/20 15:24
	 */
	@RequestMapping(value = { "/roleList" })
	public String findRoleList(ModelMap model) {
		model.addAttribute("systemId", SystemSession.CURRENT_SYSTEM_IMFO.getId());
		return "ssp/system/roleList";
	}

	/**
	 * 添加角色
	 *
	 * @return
	 * @author wangyao
	 * @date 2017/1/20 16:28
	 */
	@RequestMapping(value = { "/add" })
	public String addRole() {
		return "ssp/system/addRole";
	}

	/**
	 * 修改角色
	 *
	 * @return
	 * @author wangyao
	 * @date 2017/1/20 16:28
	 */
	@RequestMapping(value = { "/update" })
	public String editRole(@RequestParam Long id, HttpServletRequest request, ModelMap model) {
		Role[] role = sspRoleService.findById(Long.valueOf(request.getParameter("id")));
		model.addAttribute("role", role[0]);
		return "ssp/system/editRole";
	}

	/**
	 * 根据系统类型获取所有角色
	 *
	 * @return
	 * @author wangyao
	 * @date 2017/1/12 14:35
	 */
	@ApiOperation(value = "根据系统类型获取所有角色", httpMethod = "POST", response = RestResponse.class)
	@RequestMapping(value = "/findBySystemId", method = RequestMethod.POST)
	public @ResponseBody RestResponse findBySystemId() {
		try {
			Long systemId = SystemSession.CURRENT_SYSTEM_IMFO.getId();
			Role[] allRole = sspRoleService.findBySystemId(systemId);
			LOG.info("allRole:{}", Arrays.toString(allRole));
			return RestResponseFactory.ok(allRole);
		} catch (Exception e) {
			LOG.error("获取角色列表出错",e.getMessage());
			return RestResponseFactory.exception(e);
		}
	}

	/**
	 * 根据名称查找橘色
	 *
	 * @param name
	 * @return
	 * @author wangyao
	 * @date 2017/1/19 19:40
	 */
	@ApiOperation(value = "根据名称查找角色", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParams({ @ApiImplicitParam(name = "name", required = true, dataType = "String", paramType = "body") })
	@RequestMapping(value = "/findByRoleName/{name}", method = RequestMethod.POST)
	public @ResponseBody RestResponse findByRoleName(@PathVariable String name) {
		LOG.info("findByRoleName-name:{}", name);
		try {
			Long systemId = SystemSession.CURRENT_SYSTEM_IMFO.getId();
			Role role = sspRoleService.findByRoleName(name, systemId);
			LOG.info("role:{}", role);
			return RestResponseFactory.ok(role);
		} catch (Exception e) {
			LOG.error("获取角色列表出错",e.getMessage());
			return RestResponseFactory.exception(e);
		}
	}

	/**
	 * 增加角色
	 *
	 * @param role
	 * @return
	 * @author wangyao
	 * @date 2017/1/12 14:43
	 */
	@ApiOperation(value = "增加角色", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "role", required = true, dataType = "Role", paramType = "body")
	@RequestMapping(value = "/addRole", method = RequestMethod.POST)
	public @ResponseBody RestResponse addRole(Role role) {
		LOG.info("addRole:{}", role);
		try {
			role.setCreateTime(new Date());
			role.setUpdateTime(new Date());
			role.setSystemId(Integer.valueOf(SystemSession.CURRENT_SYSTEM_IMFO.getId().toString()));
			RestResponse saveResult = sspRoleService.save(role);
			List<Module> modules = role.getModules();
			if (modules != null) {
				sspRoleService.saveModuleToRole(Long.valueOf(String.valueOf(saveResult.getResult())),
						modules.toArray(new Module[] {}));
			}
			return RestResponseFactory.ok();
		} catch (Exception e) {
			LOG.error("新增角色出错",e.getMessage());
			return RestResponseFactory.exception(e);
		}

	}

	@ApiOperation(value = "修改角色", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "updateRole", required = true, dataType = "Role", paramType = "body")
	@RequestMapping(value = "/updateRole", method = RequestMethod.POST)
	public @ResponseBody RestResponse updateRole(Role role) {
		LOG.info("updateRole:{}", role);
		try {
			role.setUpdateTime(new Date());
			sspRoleService.update(role);
			List<Module> modules = role.getModules();
			if (modules != null) {
				sspRoleService.saveModuleToRole(role.getId(), modules.toArray(new Module[] {}));
			} else {
				sspRoleService.saveModuleToRole(role.getId(), null);
			}
			return RestResponseFactory.ok();
		} catch (Exception e) {
			LOG.error("修改角色出错",e.getMessage());
			return RestResponseFactory.exception(e);
		}
	}

	/**
	 * 删除角色
	 *
	 * @param roleIds
	 * @return
	 * @author wangyao
	 * @date 2017/1/12 14:56
	 */
	@ApiOperation(value = "删除角色", httpMethod = "POST", response = RestResponse.class)
	@RequestMapping(value = "/deleteRoles", method = RequestMethod.POST)
	public @ResponseBody RestResponse deleteRoles(@RequestParam String roleIds) {
		LOG.info("roleIds:{}", roleIds);
		String[] roleIdArray = roleIds.split(",");
		Long longArray[] = new Long[roleIdArray.length];
		for (int i = 0; i < longArray.length; i++) {
			longArray[i] = Long.valueOf(roleIdArray[i]);
		}
		try {
			// 删除用户角色关联关系
			sspRoleService.deleteUserRoleByRoleId(roleIds);
			// 删除角色权限关联关系
			sspRoleService.deleteRoleModuleByRoleId(roleIds);
			// 删除角色信息
			sspRoleService.deleteRoles(longArray);
			return RestResponseFactory.ok();
		} catch (Exception e) {
			LOG.error("删除角色出错",e.getMessage());
			return RestResponseFactory.exception(e);
		}
	}

	/**
	 * 角色分页
	 *
	 * @param pageCriteria
	 * @return
	 * @author wangyao
	 * @date 2017/1/13 16:47
	 */
	@ApiOperation(value = "角色分页", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "pageCriteria", required = true, dataType = "PageCriteria", paramType = "body")
	@RequestMapping(value = "/page", method = RequestMethod.POST)
	public @ResponseBody RestResponse pageAll(PageCriteria pageCriteria) {
		LOG.info("pageCriteria:{}", pageCriteria);
		try {
			RestResponse pageAll = sspRoleService.pageAll(pageCriteria);
			LOG.info("pageAll----" + pageAll);
			return pageAll;
		} catch (Exception e) {
			LOG.error("获取角色数据出错", e.getMessage());
			return RestResponseFactory.exception(e);
		}
	}
}
