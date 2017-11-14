package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspDictAccessWay;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspDictAccessWayService;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @auther wangyao
 * @date 2017-03-31 13:51
 */
@Service
public class SspDictAccessWayServiceImpl implements SspDictAccessWayService {
    @Resource
    private RestTemplate restTemplate;
    @Override
    public RestResponse find(SspDictAccessWay sspDictAccessWay) {
        HttpEntity<SspDictAccessWay> httpEntity = new MyHttpEntity<SspDictAccessWay>(sspDictAccessWay);
        return restTemplate.postForObjectForDB("/rest/ssp/dictAccessWay/find", httpEntity, RestResponse.class);
    }
}
