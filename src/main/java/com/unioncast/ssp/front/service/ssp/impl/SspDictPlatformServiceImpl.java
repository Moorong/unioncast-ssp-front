package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspDictPlatform;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspDictPlatformService;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @auther wangyao
 * @date 2017-03-30 18:56
 */
@Service
public class SspDictPlatformServiceImpl implements SspDictPlatformService {

	@Resource
	private RestTemplate restTemplate;

	@Override
	public RestResponse find(SspDictPlatform sspDictPlatform) {
		HttpEntity<SspDictPlatform> httpEntity = new MyHttpEntity<SspDictPlatform>(sspDictPlatform);
		return restTemplate.postForObjectForDB("/rest/ssp/dictPlatform/find", httpEntity, RestResponse.class);
	}
}
