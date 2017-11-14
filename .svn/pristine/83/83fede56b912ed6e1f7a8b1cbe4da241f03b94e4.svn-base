package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspDictAudit;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspDictAuditService;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @auther wangyao
 * @date 2017-03-31 11:50
 */
@Service
public class SspDictAuditServiceImpl implements SspDictAuditService {
    @Resource
    private RestTemplate restTemplate;
    @Override
    public RestResponse find(SspDictAudit sspDictAudit) {
        HttpEntity<SspDictAudit> httpEntity = new MyHttpEntity<SspDictAudit>(sspDictAudit);
        return restTemplate.postForObjectForDB("/rest/ssp/dictAudit/find", httpEntity, RestResponse.class);
    }
}
