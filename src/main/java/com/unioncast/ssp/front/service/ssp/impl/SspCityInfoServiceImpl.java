package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.rest.response.ssp.SspCityInfoArrResponse;
import com.unioncast.common.ssp.model.SspCityInfo;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspCityInfoService;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @auther wangyao
 * @date 2017-03-10 17:04
 */
@Component
public class SspCityInfoServiceImpl implements SspCityInfoService{

    @Resource
    private RestTemplate restTemplate;
    @Override
    public SspCityInfo[] findByCode(String[] codes) {
        HttpEntity<String[]> httpEntity = new HttpEntity<String[]>(codes);
        SspCityInfoArrResponse sspCityInfoArrResponse = restTemplate.postForObjectForDB("rest/ssp/cityInfo/batchFindbyCodes", httpEntity, SspCityInfoArrResponse.class);
        return sspCityInfoArrResponse.getResult();
    }
}
