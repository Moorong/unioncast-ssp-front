package com.unioncast.ssp.front.service.ssp.elasticsearchData;

import java.util.Map;

import com.unioncast.common.page.Pagination;
/**
 * 
 *<p>Title: ElasticsearchMTReport</p>
 *<p>Description:媒体报表 </p>
 *@author dsp2liufengjiao
 *@date 2017年4月24日 下午5:48:00
 *
 */

public interface ElasticsearchMTReport {
	
	Pagination<Map<String, Object>> esMTReport(Long accountId, Long userId, Long appInfoId, Long adPositionInfoId,
			Integer currentPageNo, String startTimeStr, String endTimeStr);

}
