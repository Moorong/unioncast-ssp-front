package com.unioncast.ssp.front.service.ssp;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.Pagination;
import com.unioncast.common.ssp.model.report.SspMediaDayReport;
import com.unioncast.common.ssp.model.report.SspMediaHourReport;
import com.unioncast.common.ssp.model.report.SspMediaRegionDayReport;
import com.unioncast.common.ssp.model.report.SspMediaRegionHourReport;

public interface MCSMtReportService {

	Pagination<SspMediaHourReport> mtPageByHour(PageCriteria params);

	Pagination<SspMediaRegionHourReport> mtPageByHourAndRegion(PageCriteria params);

	Pagination<SspMediaRegionDayReport> mtPageByDayAndRegion(PageCriteria params);

	Pagination<SspMediaDayReport> mtPageByDay(PageCriteria params);

}
