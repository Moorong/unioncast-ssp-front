package com.unioncast.ssp.front.service.ssp.impl;

import javax.annotation.Resource;

import com.unioncast.common.rest.response.common.UnioncastSystemArrResponse;
import com.unioncast.common.rest.response.common.UserArrayResponse;
import com.unioncast.common.user.model.User;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import com.unioncast.common.user.model.UnioncastSystem;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspSystemService;

/**
 * @auther wangyao
 * @date 2017-02-16 10:43
 */
@Component
public class SspSystemServiceImpl implements SspSystemService {
	private static final Logger logger = LogManager.getLogger(SspSystemServiceImpl.class);

	@Resource
	private RestTemplate restTemplate;

	@Override
	public UnioncastSystem[] find(UnioncastSystem unioncastSystem) throws Exception {
		HttpEntity<UnioncastSystem> httpEntity = new MyHttpEntity<UnioncastSystem>(unioncastSystem);
		UnioncastSystemArrResponse result = restTemplate.postForObjectForDB("/rest/system/find", httpEntity,
				UnioncastSystemArrResponse.class);
		return result.getResult();

	}
}
