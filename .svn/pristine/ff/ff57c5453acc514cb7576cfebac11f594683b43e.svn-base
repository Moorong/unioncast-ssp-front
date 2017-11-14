package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspDictIndustry;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspDictIndustryService;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @auther wangyao
 * @date 2017-03-30 17:41
 */
@Service
public class SspDictIndustryServiceImpl implements SspDictIndustryService {
	@Resource
	private RestTemplate restTemplate;

	@Override
	public RestResponse find(SspDictIndustry sspDictIndustry) {

		HttpEntity<SspDictIndustry> httpEntity = new MyHttpEntity<SspDictIndustry>(sspDictIndustry);
		return restTemplate.postForObjectForDB("/rest/ssp/dictIndustry/find", httpEntity, RestResponse.class);
	}
}
