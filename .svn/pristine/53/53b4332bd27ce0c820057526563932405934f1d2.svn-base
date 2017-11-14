package com.unioncast.ssp.front.service.ssp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.rest.response.ssp.SspDictCreativeSizeArrayResponse;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdPositionInfo;
import com.unioncast.common.ssp.model.SspDictCreativeSize;
import com.unioncast.common.ssp.model.SspDictLabel;
import com.unioncast.ssp.front.rest.template.RestTemplate;
@Component
public class SspCreativePixelService {
	
	@Autowired
	private RestTemplate restTemplate;
	
	public SspDictCreativeSize[] find(Long id) {
		SspDictLabel dictLabel = new SspDictLabel();
		dictLabel.setId(id);
		HttpEntity<SspDictLabel> httpEntity = new HttpEntity<SspDictLabel>(dictLabel);
		SspDictCreativeSizeArrayResponse response = restTemplate.postForObjectForDB("rest/ssp/dictCreativeSize/find", httpEntity, SspDictCreativeSizeArrayResponse.class);
		SspDictCreativeSize[] creativeSizes = response.getResult();
		return creativeSizes;
	}

	public void save(SspAdPositionInfo sspAdPositionInfo) {
		// TODO Auto-generated method stub
		
	}

	public void update(SspAdPositionInfo sspAdPositionInfo) {
		// TODO Auto-generated method stub
		
	}

	public RestResponse page(PageCriteria pageCriteria) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		
	}

	public void batchDelete(Long[] ids) {
		// TODO Auto-generated method stub
		
	}

}
