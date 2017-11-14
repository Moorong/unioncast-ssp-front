package com.unioncast.ssp.front.service.ssp.impl;

import javax.annotation.Resource;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import com.unioncast.common.page.AdvertiserOrderModel;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.Pagination;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdvertiser;
import com.unioncast.common.ssp.model.SspOrder;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspOrderService;

@Component
public class SspOrderServiceImpl implements SspOrderService {

    @Resource
    private RestTemplate restTemplate;

    @Override
    public RestResponse find(String name) throws Exception {
        SspOrder so = new SspOrder();
        so.setName(name);
        HttpEntity<SspOrder> httpEntity = new MyHttpEntity<SspOrder>(so);
        return restTemplate.postForObjectForDB("/rest/ssp/order/find", httpEntity, RestResponse.class);
    }

    public RestResponse find(Long id) {
        SspOrder so = new SspOrder();
        so.setId(id);
        HttpEntity<SspOrder> httpEntity = new MyHttpEntity<SspOrder>(so);
        return restTemplate.postForObjectForDB("/rest/ssp/order/find", httpEntity, RestResponse.class);
    }

    public void save(SspOrder sspOrder) {
        HttpEntity<SspOrder> httpEntity = new MyHttpEntity<SspOrder>(sspOrder);
        restTemplate.postForObjectForDB("/rest/ssp/order/add", httpEntity, RestResponse.class);

    }

    public void update(SspOrder sspOrder) {
        HttpEntity<SspOrder> httpEntity = new MyHttpEntity<SspOrder>(sspOrder);
        restTemplate.postForObjectForDB("/rest/ssp/order/update", httpEntity, RestResponse.class);

    }

    public Pagination<SspOrder> page(PageCriteria pageCriteria) {
        HttpEntity<PageCriteria> httpEntity = new MyHttpEntity<PageCriteria>(pageCriteria);
        return restTemplate.postForObjectForDB("/rest/ssp/order/page", httpEntity, Pagination.class);
    }

    public void deleteById(Long id) {
        Long[] ids = new Long[]{id};
        HttpEntity<Long[]> httpEntity = new MyHttpEntity<Long[]>(ids);
        restTemplate.postForObjectForDB("/rest/ssp/order/batchDelete", httpEntity, RestResponse.class);

    }

    public void batchDelete(Long[] ids) {
        HttpEntity<Long[]> httpEntity = new MyHttpEntity<Long[]>(ids);
        restTemplate.postForObjectForDB("/rest/ssp/order/batchDelete", httpEntity, RestResponse.class);

    }

    @Override
    public RestResponse findByAdverId(Long id) throws Exception {
        SspOrder so = new SspOrder();
        SspAdvertiser sa = new SspAdvertiser();
        sa.setId(id);
        sa.setDeleteState(1L);
        so.setSspAdvertiser(sa);
        HttpEntity<SspOrder> httpEntity = new MyHttpEntity<SspOrder>(so);
        return restTemplate.postForObjectForDB("/rest/ssp/order/find", httpEntity, RestResponse.class);
    }

    @Override
    public RestResponse findCreativeByAdverId(Long id) throws Exception {
/*        SspCreative so = new SspCreative();
        SspAdvertiser sa = new SspAdvertiser();
        sa.setId(id);
        so.setSspAdvertiser(sa);*/
        HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(id);
        return restTemplate.postForObjectForDB("/rest/ssp/creative/findByAdvertiserId", httpEntity, RestResponse.class);


    }

    @Override
    public Pagination<SspOrder> AdStatePage(AdvertiserOrderModel params) {
        HttpEntity<AdvertiserOrderModel> httpEntity = new MyHttpEntity<AdvertiserOrderModel>(params);
        return restTemplate.postForObjectForDB("/rest/ssp/order/AdStatePage", httpEntity, Pagination.class);
    }


    @Override
    public RestResponse findByAdvertiserId(Long id) {
        HttpEntity<Long> httpEntity = new HttpEntity<Long>(id);
        return restTemplate.postForObjectForDB("rest/ssp/order/findByAdvertiserId", httpEntity, RestResponse.class);
    }

	@Override
	public RestResponse find(SspOrder sspOrder) throws Exception {
        HttpEntity<SspOrder> httpEntity = new MyHttpEntity<SspOrder>(sspOrder);
        return restTemplate.postForObjectForDB("/rest/ssp/order/find", httpEntity, RestResponse.class);
	}

}
