package com.unioncast.ssp.front.service.ssp;

import javax.annotation.Resource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdPositionInfo;
import com.unioncast.ssp.front.rest.template.RestTemplate;

public interface SspAdPositionInfoService {

	public RestResponse find(SspAdPositionInfo sspAdPositionInfo) throws Exception;

	SspAdPositionInfo[] findT(SspAdPositionInfo sspAdPositionInfo) throws Exception;

	public void save(SspAdPositionInfo sspAdPositionInfo) throws Exception;

	public void update(SspAdPositionInfo sspAdPositionInfo) throws Exception;

	public RestResponse page(PageCriteria pageCriteria) throws Exception;

	public void deleteById(Long id) throws Exception;

	public void batchDelete(Long[] ids) throws Exception;

	public RestResponse findByAppInfoId(Long id);

}
