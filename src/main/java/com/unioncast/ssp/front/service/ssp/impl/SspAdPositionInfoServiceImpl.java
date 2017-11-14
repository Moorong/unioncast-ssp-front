package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.rest.response.ssp.SspAdPositionInfoArrResponse;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdPositionInfo;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspAdPositionInfoService;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @auther wangyao
 * @date 2017-04-05 9:43
 */
@Service
public class SspAdPositionInfoServiceImpl implements SspAdPositionInfoService {

    @Resource
    private RestTemplate restTemplate;


    @Override
    public RestResponse find(SspAdPositionInfo sspAdPositionInfo) throws Exception {
        HttpEntity<SspAdPositionInfo> httpEntity = new MyHttpEntity<SspAdPositionInfo>(sspAdPositionInfo);
        return restTemplate.postForObjectForDB("/rest/ssp/adPositionInfo/find", httpEntity, RestResponse.class);
    }

    @Override
    public SspAdPositionInfo[] findT(SspAdPositionInfo sspAdPositionInfo) throws Exception {
        HttpEntity<SspAdPositionInfo> httpEntity = new MyHttpEntity<SspAdPositionInfo>(sspAdPositionInfo);
        SspAdPositionInfoArrResponse result = restTemplate.postForObjectForDB("/rest/ssp/adPositionInfo/find", httpEntity, SspAdPositionInfoArrResponse.class);
        return result.getResult();
    }

    @Override
    public void save(SspAdPositionInfo sspAdPositionInfo) throws Exception {
        HttpEntity<SspAdPositionInfo> httpEntity = new MyHttpEntity<SspAdPositionInfo>(sspAdPositionInfo);
        RestResponse result = restTemplate.postForObjectForDB("/rest/ssp/adPositionInfo/add", httpEntity, RestResponse.class);
    }

    @Override
    public void update(SspAdPositionInfo sspAdPositionInfo) throws Exception {
        HttpEntity<SspAdPositionInfo> httpEntity = new MyHttpEntity<SspAdPositionInfo>(sspAdPositionInfo);
        RestResponse result = restTemplate.postForObjectForDB("/rest/ssp/adPositionInfo/update", httpEntity, RestResponse.class);
    }

    @Override
    public RestResponse page(PageCriteria pageCriteria) throws Exception {
        String url = "rest/ssp/adPositionInfo/page";
        HttpEntity<PageCriteria> entity = new HttpEntity<PageCriteria>(pageCriteria);
        RestResponse result = restTemplate.postForObjectForDB(url, entity, RestResponse.class);
        return result;
    }

    @Override
    public void deleteById(Long id) throws Exception {

    }

    @Override
    public void batchDelete(Long[] ids) throws Exception {
        HttpEntity<Long[]> httpEntity = new MyHttpEntity<Long[]>(ids);
        RestResponse result = restTemplate.postForObjectForDB("/rest/ssp/adPositionInfo/batchDelete", httpEntity, RestResponse.class);
    }

	@Override
	public RestResponse findByAppInfoId(Long id) {
		HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(id);
		 RestResponse result = restTemplate.postForObjectForDB("/rest/ssp/adPositionInfo/findByAppInfoId", httpEntity, RestResponse.class);
		return result;
	}
}
