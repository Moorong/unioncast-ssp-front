package com.unioncast.ssp.front.service.ssp.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONObject;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.Pagination;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdPositionInfo;
import com.unioncast.common.ssp.model.SspAppInfo;
import com.unioncast.common.ssp.model.report.SspMediaDayReport;
import com.unioncast.common.ssp.model.report.SspMediaHourReport;
import com.unioncast.common.ssp.model.report.SspMediaRegionDayReport;
import com.unioncast.common.ssp.model.report.SspMediaRegionHourReport;
import com.unioncast.common.user.model.User;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.MCSMtReportService;
import com.unioncast.ssp.front.service.ssp.SspAdPositionInfoService;
import com.unioncast.ssp.front.service.ssp.SspAppInfoService;
import com.unioncast.ssp.front.service.user.UserSystemService;

@Component
public class MCSMtReportServiceImpl implements MCSMtReportService {
	private static final Logger LOG = LogManager.getLogger(MCSMtReportServiceImpl.class);
	@Resource
	private RestTemplate restTemplate;
	@Resource
	private UserSystemService userSystemService;
	@Resource
	private SspAppInfoService sspAppInfoService;
	@Resource
	private SspAdPositionInfoService sspAdPositionInfoService;

	// 小时报表
	public Pagination<SspMediaHourReport> mtPageByHour(PageCriteria params) {
		HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(params);
		RestResponse resu = restTemplate.postForObjectForRep("/mediaReport/mediaHourReportPage", httpEntity,
				RestResponse.class);

		// 遍历结果
		List<SspMediaHourReport> resultList = new ArrayList<>();
		Object pageList = resu.getResult();
		LinkedHashMap<String, Pagination<SspMediaHourReport>> map = (LinkedHashMap<String, Pagination<SspMediaHourReport>>) pageList;

		// totalCount
		String totalCountString = JSONObject.toJSONString(map.get("totalCount"));
		Integer totalCount = JSONObject.parseObject(totalCountString, Integer.class);
		// pagesize
		String pageSizeString = JSONObject.toJSONString(map.get("pageSize"));
		Integer pagesize = JSONObject.parseObject(pageSizeString, Integer.class);
		// currentPageNo
		String currentPageNoString = JSONObject.toJSONString(map.get("currentPageNo"));
		Integer currentPageNo = JSONObject.parseObject(currentPageNoString, Integer.class);

		List<Object> reportObjectList = (List<Object>) map.get("dataArray");
		String json = JSONObject.toJSONString(reportObjectList);
		List<SspMediaHourReport> list = JSONObject.parseObject(json, List.class);

		if (null != list && list.size() > 0) {

			for (int i = 0; i < list.size(); i++) {
				Object reportJson = list.get(i);
				String reportJsonString = JSONObject.toJSONString(reportJson);
				SspMediaHourReport adReport = JSONObject.parseObject(reportJsonString, SspMediaHourReport.class);
				if (null != adReport) {
					Integer accountId = adReport.getAccountId();
					String appId = adReport.getAppId();
					String adSlotId = adReport.getAdslotId();

					Map<String, String> names = getNames(accountId, appId, adSlotId);

					if (StringUtils.isBlank(names.get("userName"))) {
						totalCount = totalCount - 1;
						continue;
					}
				
					adReport.setUserName(names.get("userName"));
					
					if (StringUtils.isBlank(names.get("appInfoName"))|| StringUtils.isBlank(names.get("appInfoId"))) {
						totalCount = totalCount - 1;
						continue;
					}
					adReport.setAppInfoName(names.get("appInfoName"));
					adReport.setAppInfoId(Long.parseLong(names.get("appInfoId")));
					if (StringUtils.isBlank(names.get("positionName")) || StringUtils.isBlank(names.get("adSlotInfoId"))) {
						totalCount = totalCount - 1;
						continue;
					}
					adReport.setPositionName(names.get("positionName"));
					adReport.setAdSlotInfoId(Long.parseLong(names.get("adSlotInfoId")));
					resultList.add(adReport);
				}
			}

			Pagination<SspMediaHourReport> pageResult = new Pagination<SspMediaHourReport>(totalCount, pagesize,
					currentPageNo, resultList.toArray(new SspMediaHourReport[] {}));
			System.out.println(pageResult);
			return pageResult;
		}

		return null;
	}

	// 小时地域 报表
	public Pagination<SspMediaRegionHourReport> mtPageByHourAndRegion(PageCriteria params) {
		HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(params);
		RestResponse resu = restTemplate.postForObjectForRep("/mediaReport/mediaRegionHourReportPage", httpEntity,
				RestResponse.class);
		
		// 遍历结果
				List<SspMediaRegionHourReport> resultList = new ArrayList<>();
				Object pageList = resu.getResult();
				LinkedHashMap<String, Pagination<SspMediaRegionHourReport>> map = (LinkedHashMap<String, Pagination<SspMediaRegionHourReport>>) pageList;

				// totalCount
				String totalCountString = JSONObject.toJSONString(map.get("totalCount"));
				Integer totalCount = JSONObject.parseObject(totalCountString, Integer.class);
				// pagesize
				String pageSizeString = JSONObject.toJSONString(map.get("pageSize"));
				Integer pagesize = JSONObject.parseObject(pageSizeString, Integer.class);
				// currentPageNo
				String currentPageNoString = JSONObject.toJSONString(map.get("currentPageNo"));
				Integer currentPageNo = JSONObject.parseObject(currentPageNoString, Integer.class);

				List<Object> reportObjectList = (List<Object>) map.get("dataArray");
				String json = JSONObject.toJSONString(reportObjectList);
				List<SspMediaRegionHourReport> list = JSONObject.parseObject(json, List.class);

				if (null != list && list.size() > 0) {

					for (int i = 0; i < list.size(); i++) {
						Object reportJson = list.get(i);
						String reportJsonString = JSONObject.toJSONString(reportJson);
						SspMediaRegionHourReport adReport = JSONObject.parseObject(reportJsonString, SspMediaRegionHourReport.class);
						if (null != adReport) {
							Integer accountId = adReport.getAccountId();
							String appId = adReport.getAppId();
							String adSlotId = adReport.getAdslotId();

							Map<String, String> names = getNames(accountId, appId, adSlotId);

							if (StringUtils.isBlank(names.get("userName"))) {
								totalCount = totalCount - 1;
								continue;
							}
							adReport.setUserName(names.get("userName"));

							if (StringUtils.isBlank(names.get("appInfoName"))|| StringUtils.isBlank(names.get("appInfoId"))) {
								totalCount = totalCount - 1;
								continue;
							}
							adReport.setAppInfoName(names.get("appInfoName"));
							adReport.setAppInfoId(Long.parseLong(names.get("appInfoId")));
							if (StringUtils.isBlank(names.get("positionName")) || StringUtils.isBlank(names.get("adSlotInfoId"))) {
								totalCount = totalCount - 1;
								continue;
							}
							adReport.setPositionName(names.get("positionName"));
							adReport.setAdSlotInfoId(Long.parseLong(names.get("adSlotInfoId")));
							resultList.add(adReport);
						}
					}

					Pagination<SspMediaRegionHourReport> pageResult = new Pagination<SspMediaRegionHourReport>(totalCount, pagesize,
							currentPageNo, resultList.toArray(new SspMediaRegionHourReport[] {}));
					System.out.println(pageResult);
					return pageResult;
				}
		return null;
	}

	// 天 地域报表
	public Pagination<SspMediaRegionDayReport> mtPageByDayAndRegion(PageCriteria params) {
		HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(params);
		RestResponse resu = restTemplate.postForObjectForRep("/mediaReport/mediaRegionDayReportPage", httpEntity,
				RestResponse.class);
		
		// 遍历结果
		List<SspMediaRegionDayReport> resultList = new ArrayList<>();
		Object pageList = resu.getResult();
		LinkedHashMap<String, Pagination<SspMediaRegionDayReport>> map = (LinkedHashMap<String, Pagination<SspMediaRegionDayReport>>) pageList;

		// totalCount
		String totalCountString = JSONObject.toJSONString(map.get("totalCount"));
		Integer totalCount = JSONObject.parseObject(totalCountString, Integer.class);
		// pagesize
		String pageSizeString = JSONObject.toJSONString(map.get("pageSize"));
		Integer pagesize = JSONObject.parseObject(pageSizeString, Integer.class);
		// currentPageNo
		String currentPageNoString = JSONObject.toJSONString(map.get("currentPageNo"));
		Integer currentPageNo = JSONObject.parseObject(currentPageNoString, Integer.class);

		List<Object> reportObjectList = (List<Object>) map.get("dataArray");
		String json = JSONObject.toJSONString(reportObjectList);
		List<SspMediaRegionDayReport> list = JSONObject.parseObject(json, List.class);

		if (null != list && list.size() > 0) {

			for (int i = 0; i < list.size(); i++) {
				Object reportJson = list.get(i);
				String reportJsonString = JSONObject.toJSONString(reportJson);
				SspMediaRegionDayReport adReport = JSONObject.parseObject(reportJsonString, SspMediaRegionDayReport.class);
				if (null != adReport) {
					Integer accountId = adReport.getAccountId();
					String appId = adReport.getAppId();
					String adSlotId = adReport.getAdslotId();

					Map<String, String> names = getNames(accountId, appId, adSlotId);

					if (StringUtils.isBlank(names.get("userName"))) {
						totalCount = totalCount - 1;
						continue;
					}
					adReport.setUserName(names.get("userName"));

					if (StringUtils.isBlank(names.get("appInfoName"))|| StringUtils.isBlank(names.get("appInfoId"))) {
						totalCount = totalCount - 1;
						continue;
					}
					adReport.setAppInfoName(names.get("appInfoName"));
					adReport.setAppInfoId(Long.parseLong(names.get("appInfoId")));
					if (StringUtils.isBlank(names.get("positionName")) || StringUtils.isBlank(names.get("adSlotInfoId"))) {
						totalCount = totalCount - 1;
						continue;
					}
					adReport.setPositionName(names.get("positionName"));
					adReport.setAdSlotInfoId(Long.parseLong(names.get("adSlotInfoId")));

					resultList.add(adReport);
				}
			}

			Pagination<SspMediaRegionDayReport> pageResult = new Pagination<SspMediaRegionDayReport>(totalCount, pagesize,
					currentPageNo, resultList.toArray(new SspMediaRegionDayReport[] {}));
			System.out.println(pageResult);
			return pageResult;
		}
		return null;
	}

	// 媒体天报表
	public Pagination<SspMediaDayReport> mtPageByDay(PageCriteria params) {
		HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(params);
		RestResponse resu = restTemplate.postForObjectForRep("/mediaReport/mediaDayReportPage", httpEntity,
				RestResponse.class);
		
		// 遍历结果
		List<SspMediaDayReport> resultList = new ArrayList<>();
		Object pageList = resu.getResult();
		LinkedHashMap<String, Pagination<SspMediaDayReport>> map = (LinkedHashMap<String, Pagination<SspMediaDayReport>>) pageList;

		// totalCount
		String totalCountString = JSONObject.toJSONString(map.get("totalCount"));
		Integer totalCount = JSONObject.parseObject(totalCountString, Integer.class);
		// pagesize
		String pageSizeString = JSONObject.toJSONString(map.get("pageSize"));
		Integer pagesize = JSONObject.parseObject(pageSizeString, Integer.class);
		// currentPageNo
		String currentPageNoString = JSONObject.toJSONString(map.get("currentPageNo"));
		Integer currentPageNo = JSONObject.parseObject(currentPageNoString, Integer.class);

		List<Object> reportObjectList = (List<Object>) map.get("dataArray");
		String json = JSONObject.toJSONString(reportObjectList);
		List<SspMediaDayReport> list = JSONObject.parseObject(json, List.class);

		if (null != list && list.size() > 0) {

			for (int i = 0; i < list.size(); i++) {
				Object reportJson = list.get(i);
				String reportJsonString = JSONObject.toJSONString(reportJson);
				SspMediaDayReport adReport = JSONObject.parseObject(reportJsonString, SspMediaDayReport.class);
				if (null != adReport) {
					Integer accountId = adReport.getAccountId();
					String appId = adReport.getAppId();
					String adSlotId = adReport.getAdslotId();

					Map<String, String> names = getNames(accountId, appId, adSlotId);

					if (StringUtils.isBlank(names.get("userName"))) {
						totalCount = totalCount - 1;
						continue;
					}
					adReport.setUserName(names.get("userName"));

					if (StringUtils.isBlank(names.get("appInfoName"))|| StringUtils.isBlank(names.get("appInfoId"))) {
						totalCount = totalCount - 1;
						continue;
					}
					adReport.setAppInfoName(names.get("appInfoName"));
					adReport.setAppInfoId(Long.parseLong(names.get("appInfoId")));
					if (StringUtils.isBlank(names.get("positionName")) || StringUtils.isBlank(names.get("adSlotInfoId"))) {
						totalCount = totalCount - 1;
						continue;
					}
					adReport.setPositionName(names.get("positionName"));
					adReport.setAdSlotInfoId(Long.parseLong(names.get("adSlotInfoId")));
					resultList.add(adReport);
				}
			}

			Pagination<SspMediaDayReport> pageResult = new Pagination<SspMediaDayReport>(totalCount, pagesize,
					currentPageNo, resultList.toArray(new SspMediaDayReport[] {}));
			System.out.println(pageResult);
			return pageResult;
		}
		return null;
	}

	private SspAppInfo findSspAppInfoName(String sspAppInfoId) {
		SspAppInfo sspAppInfo = new SspAppInfo();
		sspAppInfo.setAppId(sspAppInfoId);
		SspAppInfo[] SspAppInfos = sspAppInfoService.findT(sspAppInfo);
		if (null != SspAppInfos && SspAppInfos.length != 0) {
			SspAppInfo result = SspAppInfos[0];
			if (null != result) {
				return result;
			}
		}
		return null;
	}

	private SspAdPositionInfo findSspPositionName(String sspadPositionInfoId) {
		SspAdPositionInfo sspAdPositionInfo = new SspAdPositionInfo();
		sspAdPositionInfo.setAdPositionId(sspadPositionInfoId);
		try {
			SspAdPositionInfo[] SspAdPositionInfos = sspAdPositionInfoService.findT(sspAdPositionInfo);
			if (null != SspAdPositionInfos && SspAdPositionInfos.length != 0) {
				SspAdPositionInfo result = SspAdPositionInfos[0];
				if (null != result) {
					return result;
				}
			}
		} catch (Exception e) {
			LOG.error("媒体报表中根据id查询广告位出错" + e);
		}
		return null;
	}

	private String findSspUserName(Long sspUserId) {
		try {
			User[] users = userSystemService.findById(sspUserId);
			if (null != users && users.length != 0) {
				User user = users[0];
				if (null != user) {

					return user.getUsername();
				}
			}
		} catch (Exception e) {
			LOG.error("根据开发者id查询用户出错" + e);

		}
		return null;
	}

	private Map<String, String> getNames(Integer accountId, String appId, String adSlotId) {
		Map<String, String> map = new HashMap<String, String>();
		Long userId = Long.parseLong(accountId.toString());
		String userName = findSspUserName(userId);
		map.put("userName", userName);
		SspAppInfo appinfo = findSspAppInfoName(appId);
		if(null != appinfo){
			
			map.put("appInfoName", appinfo.getName());
			map.put("appInfoId", appinfo.getId().toString());
		}
		SspAdPositionInfo position = findSspPositionName(adSlotId);
		if(null != position){
			
			map.put("positionName", position.getName());
			map.put("adSlotInfoId", position.getId().toString());
		}
		return map;
	}
}
