package com.unioncast.ssp.front.common.util;

import org.springframework.http.HttpEntity;

import com.unioncast.common.rest.response.common.UnioncastSystemArrResponse;
import com.unioncast.common.user.model.UnioncastSystem;
import com.unioncast.ssp.front.rest.template.RestTemplate;

/**
 * @auther wangyao
 * @date 2017-02-16 11:08
 */

public class SystemSession {
	// 当前系统信息，放入内存
	public final static UnioncastSystem CURRENT_SYSTEM_IMFO;
	static {
		RestTemplate restTemplate = new RestTemplate();
		UnioncastSystem unioncastSystem = new UnioncastSystem();
		String systemName = SpringUtils.getConfig().getRestSystemName();
		unioncastSystem.setSystemName(systemName);
		HttpEntity<UnioncastSystem> httpEntity = new MyHttpEntity<UnioncastSystem>(unioncastSystem);
		UnioncastSystemArrResponse result = restTemplate.postForObjectForDB("/rest/system/find", httpEntity,
				UnioncastSystemArrResponse.class);
		UnioncastSystem[] unioncastSystems = result.getResult();
		CURRENT_SYSTEM_IMFO = unioncastSystems[0];
	}
}
