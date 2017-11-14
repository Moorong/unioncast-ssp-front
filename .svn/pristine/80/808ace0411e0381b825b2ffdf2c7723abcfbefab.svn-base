package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.rest.response.common.ModulePaginationReponse;
import com.unioncast.common.rest.response.ssp.SspAppInfoArrResponse;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAppInfo;
import com.unioncast.common.user.model.Role;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspAppInfoService;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @auther wangyao
 * @date 2017-03-30 17:09
 */

@Service
public class SspAppInfoServiceImpl implements SspAppInfoService {

    @Resource
    private RestTemplate restTemplate;

    @Override
    public RestResponse find(SspAppInfo sspAppInfo) {
        HttpEntity<SspAppInfo> httpEntity = new MyHttpEntity<SspAppInfo>(sspAppInfo);
        return restTemplate.postForObjectForDB("/rest/ssp/appInfo/find", httpEntity, RestResponse.class);
    }

    @Override
    public Long save(SspAppInfo sspAppInfo) {
        HttpEntity<SspAppInfo> httpEntity = new MyHttpEntity<SspAppInfo>(sspAppInfo);
        RestResponse result = restTemplate.postForObjectForDB("/rest/ssp/appInfo/add", httpEntity, RestResponse.class);
        return  Long.valueOf(String.valueOf(result.getResult()));
    }

    @Override
    public void update(SspAppInfo sspAppInfo) {
        HttpEntity<SspAppInfo> httpEntity = new MyHttpEntity<SspAppInfo>(sspAppInfo);
        RestResponse result = restTemplate.postForObjectForDB("/rest/ssp/appInfo/update", httpEntity, RestResponse.class);
    }

    @Override
    public RestResponse page(PageCriteria pageCriteria) {
        String url = "rest/ssp/appInfo/page";
        HttpEntity<PageCriteria> entity = new HttpEntity<PageCriteria>(pageCriteria);
        RestResponse result = restTemplate.postForObjectForDB(url, entity, RestResponse.class);
        return result;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public void batchDelete(Long[] ids) {
        HttpEntity<Long[]> httpEntity = new MyHttpEntity<Long[]>(ids);
        RestResponse result = restTemplate.postForObjectForDB("/rest/ssp/appInfo/batchDelete", httpEntity, RestResponse.class);
    }

    @Override
    public SspAppInfo[] findT(SspAppInfo sspAppInfo) {
        HttpEntity<SspAppInfo> httpEntity = new MyHttpEntity<SspAppInfo>(sspAppInfo);
        SspAppInfoArrResponse result = restTemplate.postForObjectForDB("/rest/ssp/appInfo/find", httpEntity, SspAppInfoArrResponse.class);
        return result.getResult();
    }

	@Override
	public RestResponse findByUserId(Long id) {
		HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(id);
		RestResponse result = restTemplate.postForObjectForDB("/rest/ssp/appInfo/findByUserId", httpEntity, RestResponse.class);
        return result;
	}
}
