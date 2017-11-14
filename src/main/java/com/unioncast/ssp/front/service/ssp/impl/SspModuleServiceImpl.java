package com.unioncast.ssp.front.service.ssp.impl;

import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.rest.response.common.ModuleArrayResponse;
import com.unioncast.common.rest.response.common.ModulePaginationReponse;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.user.model.Module;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspModuleService;

/**
 * @auther wangyao
 * @date 2017-02-21 14:41
 */
@Component
public class SspModuleServiceImpl implements SspModuleService {
	private static final Logger logger = LogManager.getLogger(SspModuleServiceImpl.class);

	@Resource
	private RestTemplate restTemplate;

	@Override
	public Module[] findModuleBySystemId(Long systemId) {
		HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(systemId);
		ModuleArrayResponse result = restTemplate.postForObjectForDB("/rest/module/findModuleBySystemId", httpEntity,
				ModuleArrayResponse.class);
		return result.getResult();
	}

	@Override
	public Module[] findByRoleId(Long roleId) {
		HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(roleId);
		ModuleArrayResponse result = restTemplate.postForObjectForDB("/rest/module/findByRoleId", httpEntity,
				ModuleArrayResponse.class);
		return result.getResult();
	}

	@Override
	public RestResponse pageAll(PageCriteria pageCriteria) {
		String url = "rest/module/page";
		HttpEntity<PageCriteria> entity = new HttpEntity<PageCriteria>(pageCriteria);
		ModulePaginationReponse result = restTemplate.postForObjectForDB(url, entity, ModulePaginationReponse.class);
		return result;
	}

	@Override
	public Module[] findById(Long moduleId) {
		String url = "rest/module/find";
		HttpEntity<Long> entity = new HttpEntity<Long>(moduleId);
		ModuleArrayResponse result = restTemplate.postForObjectForDB(url, entity, ModuleArrayResponse.class);
		return result.getResult();
	}

	@Override
	public void deleteByModuleIds(Long[] longArray) {
		String url = "rest/module/delRoleModById";
		HttpEntity<Long[]> httpEntity = new HttpEntity<Long[]>(longArray);
		RestResponse result = restTemplate.postForObjectForDB(url, httpEntity, RestResponse.class);
	}

	@Override
	public void deleteById(Long moduleId) {
		String url = "rest/module/delete";
		HttpEntity<Long> httpEntity = new HttpEntity<Long>(moduleId);
		RestResponse result = restTemplate.postForObjectForDB(url, httpEntity, RestResponse.class);
	}

	@Override
	public Module[] findByNameAndSystem(String name, long systemId) {
		String url = "rest/module/findByNameAndSystem";
		HashMap<String, String> map = new HashMap<>();
		map.put("moduleName", name);
		map.put("systemId", String.valueOf(systemId));
		HttpEntity<HashMap<String, String>> httpEntity = new HttpEntity<HashMap<String, String>>(map);
		ModuleArrayResponse result = restTemplate.postForObjectForDB(url, httpEntity, ModuleArrayResponse.class);
		return result.getResult();
	}

	@Override
	public RestResponse save(Module module) {
		String url = "rest/module/add";
		HttpEntity<Module> entity = new HttpEntity<Module>(module);
		RestResponse result = restTemplate.postForObjectForDB(url, entity, RestResponse.class);
		return result;
	}

	@Override
	public RestResponse update(Module module) {
		String url = "rest/module/update";
		HttpEntity<Module> entity = new HttpEntity<Module>(module);
		RestResponse result = restTemplate.postForObjectForDB(url, entity, RestResponse.class);
		return result;
	}
}
