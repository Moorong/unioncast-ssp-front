package com.unioncast.ssp.front.service.ssp;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspDictAccessWay;

/**
 * @auther wangyao
 * @date 2017-03-31 13:50
 */
public interface SspDictAccessWayService {
	RestResponse find(SspDictAccessWay sspDictAccessWay);
}