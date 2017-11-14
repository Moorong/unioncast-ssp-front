package com.unioncast.ssp.front.service.ssp;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspDictIndustry;

/**
 * @auther wangyao
 * @date 2017-03-30 17:39
 */

public interface SspDictIndustryService {

    RestResponse find(SspDictIndustry sspDictIndustry);
}
