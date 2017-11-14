package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspDictAdPositionType;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspDictAdPositionTypeService;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @auther wangyao
 * @date 2017-04-05 9:30
 */
@Service
public class SspDictAdPositionTypeServiceImpl implements SspDictAdPositionTypeService {
	@Resource
	private RestTemplate restTemplate;

	@Override
	public RestResponse find(SspDictAdPositionType sspDictAdPositionType) {
		HttpEntity<SspDictAdPositionType> httpEntity = new MyHttpEntity<SspDictAdPositionType>(sspDictAdPositionType);
		return restTemplate.postForObjectForDB("/rest/ssp/dictAdPositionType/find", httpEntity, RestResponse.class);
	}
}
