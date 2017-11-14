package com.unioncast.ssp.front.service.ssp.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdPositionInfo;
import com.unioncast.common.ssp.model.SspCreative;
import com.unioncast.common.ssp.model.SspDictCreativeSize;
import com.unioncast.common.ssp.model.SspDictLabel;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspDictLabelService;

@Component
public class SspDictLabelServiceImpl implements SspDictLabelService {

	@Autowired
	private RestTemplate restTemplate;

	@Override
	public RestResponse find(SspDictLabel dictLabel) {
		HttpEntity<SspDictLabel> httpEntity = new HttpEntity<SspDictLabel>(dictLabel);
		RestResponse response = restTemplate.postForObjectForDB("rest/ssp/dictLabel/find", httpEntity,
				RestResponse.class);
		return response;
	}

	public Boolean checkImgWidthAndHeight(int width, int height) {
		SspDictCreativeSize creativeSize = new SspDictCreativeSize();
		HttpEntity<SspDictCreativeSize> httpEntity = new HttpEntity<SspDictCreativeSize>(creativeSize);
		RestResponse response = restTemplate.postForObjectForDB("rest/ssp/dictCreativeSize/find", httpEntity,
				RestResponse.class);
		SspDictCreativeSize[] creativeSizes = (SspDictCreativeSize[]) response.getResult();
		for (SspDictCreativeSize sspDictCreativeSize : creativeSizes) {
			if (sspDictCreativeSize.getHeight() == width) {
				if (sspDictCreativeSize.getHeight() == height) {
					return true;
				}
			}
		}
		return false;
	}

	@Override
	public RestResponse save(SspDictLabel sspDictLabel) {
		HttpEntity<SspDictLabel> httpEntity = new HttpEntity<SspDictLabel>(sspDictLabel);
		return restTemplate.postForObjectForDB("rest/ssp/dictLabel/add", httpEntity, RestResponse.class);
	}

	@Override
	public void update(SspAdPositionInfo sspAdPositionInfo) {
		// TODO Auto-generated method stub

	}

	@Override
	public RestResponse page(PageCriteria pageCriteria) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void batchDelete(Long[] ids) {
		// TODO Auto-generated method stub

	}

	@Override
	public RestResponse count() {
		HttpEntity httpEntity = new HttpEntity(null);
		return restTemplate.postForObjectForDB("rest/ssp/dictLabel/count", httpEntity, RestResponse.class);
	}

	@Override
	public RestResponse page(Integer clickCount) {
		HttpEntity<Integer> httpEntity = new HttpEntity<Integer>(clickCount);
		return restTemplate.postForObjectForDB("rest/ssp/dictLabel/findPage", httpEntity, RestResponse.class);
	}

}
