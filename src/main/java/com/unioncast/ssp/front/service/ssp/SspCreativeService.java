package com.unioncast.ssp.front.service.ssp;

import com.unioncast.common.adx.model.UploadFileInfo;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdPositionInfo;
import com.unioncast.common.ssp.model.SspCreative;
import com.unioncast.common.ssp.model.SspPlanCreativeRelation;

public interface SspCreativeService {

	public RestResponse deleteById(Long id);

	public void batchDelete(Long[] ids);

	public void update(SspAdPositionInfo sspAdPositionInfo);

	public RestResponse save(SspCreative sspCreative);

	public RestResponse find(Long id);

	RestResponse page(Long accountId, Integer currentNumber, Integer pageSize, String name, Long advertiserId, Integer state, Integer creativeType, Long creativeGroupId);

	public RestResponse findByAdvertiserId(Long id);

	public RestResponse page(Long accountId, Long planId, Integer currentPageNo,
			Integer pageSize, String name, Long advertiserId, Integer state,
			Integer creativeType, Long creativeGroupId);

	public RestResponse saveFile(UploadFileInfo uploadFile);

	public RestResponse update(SspCreative sspCreative);

	public RestResponse find(SspCreative creative);

	public RestResponse changePlanCreativeRelationState(SspPlanCreativeRelation sspCreative);

	public RestResponse deletePlanCreativeRelationById(SspPlanCreativeRelation pcr);

	public RestResponse findCreativeByAdvertiser(Long advertiserId, Integer creativeType, String creativeLabel,String creativeName);

	public RestResponse findCreativeRelationByPlanId(Long planId);

}
