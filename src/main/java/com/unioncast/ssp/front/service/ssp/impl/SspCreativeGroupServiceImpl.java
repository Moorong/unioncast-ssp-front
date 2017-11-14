//package com.unioncast.ssp.front.service.ssp.impl;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpEntity;
//import org.springframework.stereotype.Component;
//
//import com.unioncast.common.page.PageCriteria;
//import com.unioncast.common.restClient.RestResponse;
//import com.unioncast.common.ssp.model.SspAdPositionInfo;
//import com.unioncast.common.ssp.model.SspCreativeGroup;
//import com.unioncast.ssp.front.rest.template.RestTemplate;
//
//@Component
//public class SspCreativeGroupServiceImpl {
//
//	@Autowired
//	private RestTemplate restTemplate;
//
//	public RestResponse find(Long id) {
//		SspCreativeGroup creativeGroup = new SspCreativeGroup();
//		HttpEntity<SspCreativeGroup> httpEntity = new HttpEntity<SspCreativeGroup>(creativeGroup);
//		RestResponse response = restTemplate.postForObjectForDB("rest/ssp/creativeGroup/find", httpEntity,
//				RestResponse.class);
//		return response;
//	}
//
//	public void save(SspAdPositionInfo sspAdPositionInfo) {
//		// TODO Auto-generated method stub
//
//	}
//
//	public void update(SspAdPositionInfo sspAdPositionInfo) {
//		// TODO Auto-generated method stub
//
//	}
//
//	public RestResponse page(PageCriteria pageCriteria) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	public void deleteById(Long id) {
//		// TODO Auto-generated method stub
//
//	}
//
//	public void batchDelete(Long[] ids) {
//		// TODO Auto-generated method stub
//
//	}
//
//}
