package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspDictAdType;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspDictAdTypeService;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Simple to Introduction
 *
 * @Description: [广告类型实现服务类]
 * @Author: [dxy]
 * @CreateDate: [2017/2/16 10:39]
 * @UpdateRemark: [说明本次修改内容]
 * @Version: [v1.0]
 */
@Component
public class SspDictAdTypeServiceImpl implements SspDictAdTypeService {
    @Resource
    private RestTemplate restTemplate;

    @Override
    public RestResponse find(Long id) {
        SspDictAdType sspDictAdType = new SspDictAdType();
        sspDictAdType.setId(id);
        HttpEntity<SspDictAdType> httpEntity = new MyHttpEntity<SspDictAdType>(
                sspDictAdType);
        return restTemplate.postForObjectForDB(
                "/rest/ssp/dictAdType/find", httpEntity,
                RestResponse.class);
    }

    @Override
    public RestResponse save(SspDictAdType sspDictAdType) {
        HttpEntity<SspDictAdType> httpEntity = new MyHttpEntity<SspDictAdType>(
                sspDictAdType);
        return restTemplate.postForObjectForDB(
                "/rest/ssp/dictAdType/add",
                httpEntity, RestResponse.class);

    }

    @Override
    public void update(SspDictAdType sspDictAdType) {
        HttpEntity<SspDictAdType> httpEntity = new MyHttpEntity<SspDictAdType>(
                sspDictAdType);
        restTemplate.postForObjectForDB("/rest/ssp/dictAdType/update",
                httpEntity, RestResponse.class);
    }

    @Override
    public RestResponse page(PageCriteria pageCriteria) {
        return null;
    }

    @Override
    public void deleteById(Long id) {
        Long[] ids = new Long[] { id };
        HttpEntity<Long[]> httpEntity = new MyHttpEntity<Long[]>(ids);
        restTemplate.postForObjectForDB("/rest/ssp/dictAdType/update",
                httpEntity, RestResponse.class);
    }

    @Override
    public void batchDelete(Long[] ids) {
        HttpEntity<Long[]> httpEntity = new MyHttpEntity<Long[]>(ids);
        restTemplate.postForObjectForDB(
                "/rest/ssp/dictAdType/batchDelete", httpEntity,
                RestResponse.class);
    }
}
