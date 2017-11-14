package com.unioncast.ssp.front.service.ssp.elasticsearchData;

import com.unioncast.common.page.Pagination;

import java.net.UnknownHostException;
import java.util.Map;

/**
 * @author zhangzhe
 * @date 2017/2/21 10:25
 */

public interface ElasticsearchADReport {

    void esADRepordDelete(String name, Long value);

    Pagination<Map<String, Object>> esADReport(Long accountId, Long advertiserId, Long orderId, Long planId,
                                               Long creativeId, Integer currentPageNo, String startTime,
                                               String endTime) throws UnknownHostException;
}
