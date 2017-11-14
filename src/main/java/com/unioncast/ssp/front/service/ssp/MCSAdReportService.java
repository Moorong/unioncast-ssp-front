package com.unioncast.ssp.front.service.ssp;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.Pagination;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.report.SspAdDayReport;
import com.unioncast.common.ssp.model.report.SspAdHourReport;
import com.unioncast.common.ssp.model.report.SspAdRegionDayReport;
import com.unioncast.common.ssp.model.report.SspAdRegionHourReport;

public interface MCSAdReportService {


	RestResponse findAll();


	Pagination<SspAdHourReport> adPageByHour(PageCriteria params);

	Pagination<SspAdDayReport> adPageByDay(PageCriteria params) throws JsonParseException, JsonMappingException, IOException;


	Pagination<SspAdRegionHourReport> adPageByHourAndRegion(PageCriteria params);


	Pagination<SspAdRegionDayReport> adPageByDayAndRegion(PageCriteria params);
	

}
