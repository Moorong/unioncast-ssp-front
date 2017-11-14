package com.unioncast.ssp.front.service.ssp.impl;

import java.util.*;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.rest.response.common.RoleArrayResponse;
import com.unioncast.common.rest.response.common.RolePaginationResponse;
import com.unioncast.common.rest.response.common.RoleResponse;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.user.model.Module;
import com.unioncast.common.user.model.Role;
import com.unioncast.common.user.model.RoleModule;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspRoleService;

/**
 * @auther wangyao
 * @date 2017-02-21 14:43
 */
@Component
public class SspRoleServiceImpl implements SspRoleService {
	private static final Logger logger = LogManager.getLogger(SspRoleServiceImpl.class);

	@Resource
	private RestTemplate restTemplate;

	@Override
	public Role[] findBySystemId(Long systemId) {
		HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(systemId);
		RoleArrayResponse result = restTemplate.postForObjectForDB("/rest/role/findBySystemId", httpEntity,
				RoleArrayResponse.class);
		return result.getResult();
	}

	@Override
	public RestResponse save(Role role) {
		HttpEntity<Role> httpEntity = new MyHttpEntity<Role>(role);
		RestResponse result = restTemplate.postForObjectForDB("/rest/role/add", httpEntity, RestResponse.class);
		return result;
	}

	@Override
	public void saveModuleToRole(Long roleId, Module[] modules) {
		deleteRoleModuleByRoleId(String.valueOf(roleId));
		List<RoleModule> roleModuleList = new ArrayList<RoleModule>();
		if (modules != null && modules.length > 0) {
			for (Module module : modules) {
				RoleModule roleModule = new RoleModule();
				roleModule.setRoleId(roleId);
				roleModule.setModuleId(module.getId());
				roleModule.setCreateTime(new Date());
				String id = UUID.randomUUID().toString();
				roleModule.setRoleModuleId(id);
				roleModuleList.add(roleModule);
			}
		}
		String url = "rest/role/batchAddRoleModule";
		HttpEntity<RoleModule[]> entity = new MyHttpEntity<RoleModule[]>(roleModuleList.toArray(new RoleModule[] {}));
		RestResponse result = restTemplate.postForObjectForDB(url, entity, RestResponse.class);
	}

	@Override
	public Role[] findById(Long roleId) {
		String url = "rest/role/find";
		HttpEntity<Long> entity = new HttpEntity<Long>(roleId);
		RoleArrayResponse result = restTemplate.postForObjectForDB(url, entity, RoleArrayResponse.class);
		return result.getResult();
	}

	@Override
	public RestResponse deleteRoles(Long[] longArray) {
		HttpEntity<Long[]> httpEntity = new MyHttpEntity<Long[]>(longArray);
		RestResponse result = restTemplate.postForObjectForDB("/rest/role/batchDelete", httpEntity, RestResponse.class);
		return result;
	}

	@Override
	public void update(Role role) {
		String url = "rest/role/update";
		HttpEntity<Role> entity = new HttpEntity<Role>(role);
		RestResponse result = restTemplate.postForObjectForDB(url, entity, RestResponse.class);
	}

	@Override
	public RestResponse pageAll(PageCriteria pageCriteria) {
		HttpEntity<PageCriteria> httpEntity = new MyHttpEntity<PageCriteria>(pageCriteria);
		RolePaginationResponse result = restTemplate.postForObjectForDB("/rest/role/page", httpEntity,
				RolePaginationResponse.class);
		return result;
	}

	@Override
	public void deleteUserRoleByRoleId(String roleIds) {
		HttpEntity<String> httpEntity = new MyHttpEntity<String>(roleIds);
		RestResponse result = restTemplate.postForObjectForDB("/rest/user/batchDeleteUserRoleByRoleId", httpEntity,
				RestResponse.class);
	}

	@Override
	public void deleteRoleModuleByRoleId(String roleIds) {
		String[] roleIdArr = roleIds.split(",");
		Long[] ids = new Long[roleIdArr.length];
		for (int i = 0; i < roleIdArr.length; i++) {
			ids[i] = Long.valueOf(roleIdArr[i]);
		}
		HttpEntity<Long[]> httpEntity = new MyHttpEntity<Long[]>(ids);
		RestResponse result = restTemplate.postForObjectForDB("/rest/role/batchDeleteRoleModule", httpEntity,
				RestResponse.class);
	}

	@Override
	public Role findByRoleName(String name, Long systemId) {
		HashMap<String, String> map = new HashMap<>();
		map.put("roleName", name);
		map.put("systemId", String.valueOf(systemId));
		HttpEntity<HashMap<String, String>> httpEntity = new MyHttpEntity<HashMap<String, String>>(map);
		RoleResponse result = restTemplate.postForObjectForDB("/rest/role/findByNameAndSystemId", httpEntity,
				RoleResponse.class);
		return result.getResult();
	}
}
