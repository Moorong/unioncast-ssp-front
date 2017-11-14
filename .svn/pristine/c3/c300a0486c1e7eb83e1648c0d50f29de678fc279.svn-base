package com.unioncast.ssp.front.service.ssp;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.rest.response.common.RoleArrayResponse;
import com.unioncast.common.rest.response.common.RolePaginationResponse;
import com.unioncast.common.rest.response.common.RoleResponse;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.user.model.Module;
import com.unioncast.common.user.model.Role;
import com.unioncast.common.user.model.RoleModule;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import org.springframework.http.HttpEntity;

import java.util.*;

/**
 * 角色接口方法
 *
 * @auther wangyao
 * @date 2017-02-21 14:35
 */
public interface SspRoleService {

	/**
	 * 根据系统查找
	 *
	 * @param systemId
	 * @return
	 * @author wangyao
	 * @date 2017/2/21 14:37
	 */
	Role[] findBySystemId(Long systemId);

	/**
	 * 保存
	 *
	 * @param role
	 * @return
	 * @author wangyao
	 * @date 2017/2/21 14:37
	 */
	RestResponse save(Role role);

	/**
	 * 为角色分配模块
	 *
	 * @param roleId
	 * @param modules
	 * @author wangyao
	 * @date 2017/2/21 14:38
	 */
	void saveModuleToRole(Long roleId, Module[] modules);

	/**
	 * 根据id查找
	 *
	 * @param roleId
	 * @return
	 * @author wangyao
	 * @date 2017/2/21 14:38
	 */
	Role[] findById(Long roleId);

	/**
	 * 删除
	 *
	 * @param longArray
	 * @return
	 * @author wangyao
	 * @date 2017/2/21 14:38
	 */
	RestResponse deleteRoles(Long[] longArray);

	/**
	 * 更新
	 *
	 * @param role
	 * @author wangyao
	 * @date 2017/2/21 14:39
	 */
	void update(Role role);

	/**
	 * 分页
	 *
	 * @param pageCriteria
	 * @return
	 * @author wangyao
	 * @date 2017/2/21 14:39
	 */
	RestResponse pageAll(PageCriteria pageCriteria);

	/**
	 * 根据角色删除用户角色关系
	 *
	 * @param roleIds
	 * @author wangyao
	 * @date 2017/2/21 14:39
	 */
	void deleteUserRoleByRoleId(String roleIds);

	/**
	 * 根据角色删除角色模块关系
	 *
	 * @param roleIds
	 * @author wangyao
	 * @date 2017/2/21 14:39
	 */
	void deleteRoleModuleByRoleId(String roleIds);

	/**
	 * 根据名称查找
	 *
	 * @param name
	 * @param systemId
	 * @return
	 * @author wangyao
	 * @date 2017/2/21 14:40
	 */
	Role findByRoleName(String name, Long systemId);
}
