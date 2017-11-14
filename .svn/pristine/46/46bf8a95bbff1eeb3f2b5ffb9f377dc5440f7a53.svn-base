package com.unioncast.ssp.front.service.ssp.impl;

import java.io.IOException;
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

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.Pagination;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdvertiser;
import com.unioncast.common.ssp.model.SspCreative;
import com.unioncast.common.ssp.model.SspCreativeReport;
import com.unioncast.common.ssp.model.report.SspAdDayReport;
import com.unioncast.common.ssp.model.report.SspAdHourReport;
import com.unioncast.common.ssp.model.report.SspAdRegionDayReport;
import com.unioncast.common.ssp.model.report.SspAdRegionHourReport;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.MCSAdReportService;
import com.unioncast.ssp.front.service.ssp.SspAdvertiserService;
import com.unioncast.ssp.front.service.ssp.SspCreativeService;
import com.unioncast.ssp.front.service.ssp.SspOrderService;
import com.unioncast.ssp.front.service.ssp.SspPlanService;

@Component
public class MCSAdReportServiceImpl implements MCSAdReportService {

	private static final Logger LOG = LogManager.getLogger(MCSAdReportServiceImpl.class);

	@Resource
	private RestTemplate restTemplate;

	@Resource
	SspAdvertiserService sspAdvertiserService;

	@Resource
	SspOrderService sspOrderService;

	@Resource
	SspPlanService sspPlanService;

	@Resource
	SspCreativeService sspCreativeService;

	@Override
	public Pagination<SspAdHourReport> adPageByHour(PageCriteria params) {
		// TODO Auto-generated method stub
		HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(params);
		RestResponse resu = restTemplate.postForObjectForRep("/adReport/adHourReportPage",
				httpEntity, RestResponse.class);
		
		// 遍历结果
				List<SspAdHourReport> resultList = new ArrayList<>();
				Object pageList =  resu.getResult();
				LinkedHashMap<String, Pagination<SspAdHourReport>> map = (LinkedHashMap<String, Pagination<SspAdHourReport>>) pageList;
				
				//totalCount
				String totalCountString = JSONObject.toJSONString(map.get("totalCount"));
				Integer totalCount = JSONObject.parseObject(totalCountString, Integer.class);
				//pagesize
				String pageSizeString = JSONObject.toJSONString(map.get("pageSize"));
				Integer pagesize = JSONObject.parseObject(pageSizeString, Integer.class);
				//currentPageNo
				String currentPageNoString = JSONObject.toJSONString(map.get("currentPageNo"));
				Integer currentPageNo = JSONObject.parseObject(currentPageNoString, Integer.class);
				
				List<Object> reportObjectList = (List<Object>) map.get("dataArray");
				String json = JSONObject.toJSONString(reportObjectList);
				List<SspAdHourReport> list = JSONObject.parseObject(json, List.class);
				
				if (null != list &&  list.size() > 0 ) {
					
						for (int i=0;i<list.size();i++) {
							Object reportJson = list.get(i);
							String reportJsonString = JSONObject.toJSONString(reportJson);
							SspAdHourReport adReport = JSONObject.parseObject(reportJsonString, SspAdHourReport.class);
							if (null != adReport) {
								Integer adId = adReport.getAdvertiserId();
								Integer ordId = adReport.getOrderId();
								Integer strId = adReport.getStrategyId();
								Integer creId = adReport.getCreativeId();

								Map<String, String> names = getNames(adId, ordId, strId, creId);

								if (StringUtils.isBlank(names.get("advertiserName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setAdvertiserName(names.get("advertiserName"));

								if (StringUtils.isBlank(names.get("orderName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setOrderName(names.get("orderName"));

								if (StringUtils.isBlank(names.get("strategyName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setStrategyName(names.get("strategyName"));

								if (StringUtils.isBlank(names.get("creativeName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setCreativeName(names.get("creativeName"));

								resultList.add(adReport);
							}
						}

						Pagination<SspAdHourReport> pageResult =  new Pagination<SspAdHourReport>(totalCount, pagesize,
								currentPageNo, resultList.toArray(new SspAdHourReport[] {}));
						System.out.println(pageResult);
						 return pageResult;
					}
			
				return null;
	}

	

	@Override
	public Pagination<SspAdDayReport> adPageByDay(PageCriteria params)
			throws JsonParseException, JsonMappingException, IOException {
		HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(params);

		RestResponse resu = restTemplate.postForObjectForRep("/adReport/adDayReportPage", httpEntity,
				RestResponse.class);
		
		// 遍历结果
		List<SspAdDayReport> resultList = new ArrayList<>();
		Object pageList =  resu.getResult();
		LinkedHashMap<String, Pagination<SspAdDayReport>> map = (LinkedHashMap<String, Pagination<SspAdDayReport>>) pageList;
		
		//totalCount
		String totalCountString = JSONObject.toJSONString(map.get("totalCount"));
		Integer totalCount = JSONObject.parseObject(totalCountString, Integer.class);
		//pagesize
		String pageSizeString = JSONObject.toJSONString(map.get("pageSize"));
		Integer pagesize = JSONObject.parseObject(pageSizeString, Integer.class);
		//currentPageNo
		String currentPageNoString = JSONObject.toJSONString(map.get("currentPageNo"));
		Integer currentPageNo = JSONObject.parseObject(currentPageNoString, Integer.class);
		
		List<Object> reportObjectList = (List<Object>) map.get("dataArray");
		String json = JSONObject.toJSONString(reportObjectList);
		List<SspAdDayReport> list = JSONObject.parseObject(json, List.class);
		
		if (null != list &&  list.size() > 0 ) {
			
				for (int i=0;i<list.size();i++) {
					Object reportJson = list.get(i);
					String reportJsonString = JSONObject.toJSONString(reportJson);
					SspAdDayReport adReport = JSONObject.parseObject(reportJsonString, SspAdDayReport.class);
					if (null != adReport) {
						Integer adId = adReport.getAdvertiserId();
						Integer ordId = adReport.getOrderId();
						Integer strId = adReport.getStrategyId();
						Integer creId = adReport.getCreativeId();

						Map<String, String> names = getNames(adId, ordId, strId, creId);

						if (StringUtils.isBlank(names.get("advertiserName"))) {
							totalCount = totalCount - 1;
							continue;
						}
						adReport.setAdvertiserName(names.get("advertiserName"));

						if (StringUtils.isBlank(names.get("orderName"))) {
							totalCount = totalCount - 1;
							continue;
						}
						adReport.setOrderName(names.get("orderName"));

						if (StringUtils.isBlank(names.get("strategyName"))) {
							totalCount = totalCount - 1;
							continue;
						}
						adReport.setStrategyName(names.get("strategyName"));

						if (StringUtils.isBlank(names.get("creativeName"))) {
							totalCount = totalCount - 1;
							continue;
						}
						adReport.setCreativeName(names.get("creativeName"));

						resultList.add(adReport);
					}
				}

				Pagination<SspAdDayReport> pageResult =  new Pagination<SspAdDayReport>(totalCount, pagesize,
						currentPageNo, resultList.toArray(new SspAdDayReport[] {}));
				 return pageResult;
			}
	
		return null;

	}
	@Override
	public Pagination<SspAdRegionHourReport> adPageByHourAndRegion(PageCriteria params) {
		
		HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(params);

		RestResponse resu = restTemplate.postForObjectForRep("/adReport/adRegionHourReportPage", httpEntity,
				RestResponse.class);
		// 遍历结果
				List<SspAdRegionHourReport> resultList = new ArrayList<>();
				Object pageList =  resu.getResult();
				LinkedHashMap<String, Pagination<SspAdRegionHourReport>> map = (LinkedHashMap<String, Pagination<SspAdRegionHourReport>>) pageList;
				
				//totalCount
				String totalCountString = JSONObject.toJSONString(map.get("totalCount"));
				Integer totalCount = JSONObject.parseObject(totalCountString, Integer.class);
				//pagesize
				String pageSizeString = JSONObject.toJSONString(map.get("pageSize"));
				Integer pagesize = JSONObject.parseObject(pageSizeString, Integer.class);
				//currentPageNo
				String currentPageNoString = JSONObject.toJSONString(map.get("currentPageNo"));
				Integer currentPageNo = JSONObject.parseObject(currentPageNoString, Integer.class);
				
				List<Object> reportObjectList = (List<Object>) map.get("dataArray");
				String json = JSONObject.toJSONString(reportObjectList);
				List<SspAdRegionHourReport> list = JSONObject.parseObject(json, List.class);
				
				if (null != list &&  list.size() > 0 ) {
					
						for (int i=0;i<list.size();i++) {
							Object reportJson = list.get(i);
							String reportJsonString = JSONObject.toJSONString(reportJson);
							SspAdRegionHourReport adReport = JSONObject.parseObject(reportJsonString, SspAdRegionHourReport.class);
							if (null != adReport) {
								Integer adId = adReport.getAdvertiserId();
								Integer ordId = adReport.getOrderId();
								Integer strId = adReport.getStrategyId();
								Integer creId = adReport.getCreativeId();

								Map<String, String> names = getNames(adId, ordId, strId, creId);

								if (StringUtils.isBlank(names.get("advertiserName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setAdvertiserName(names.get("advertiserName"));

								if (StringUtils.isBlank(names.get("orderName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setOrderName(names.get("orderName"));

								if (StringUtils.isBlank(names.get("strategyName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setStrategyName(names.get("strategyName"));

								if (StringUtils.isBlank(names.get("creativeName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setCreativeName(names.get("creativeName"));

								resultList.add(adReport);
							}
						}

						Pagination<SspAdRegionHourReport> pageResult =  new Pagination<SspAdRegionHourReport>(totalCount, pagesize,
								currentPageNo, resultList.toArray(new SspAdRegionHourReport[] {}));
						 return pageResult;
					}
		return null;
	}

	@Override
	public Pagination<SspAdRegionDayReport> adPageByDayAndRegion(PageCriteria params) {
		HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(params);

		RestResponse resu = restTemplate.postForObjectForRep("/adReport/adRegionDayReportPage", httpEntity,
				RestResponse.class);
		// 遍历结果
				List<SspAdRegionDayReport> resultList = new ArrayList<>();
				Object pageList =  resu.getResult();
				LinkedHashMap<String, Pagination<SspAdRegionDayReport>> map = (LinkedHashMap<String, Pagination<SspAdRegionDayReport>>) pageList;
				
				//totalCount
				String totalCountString = JSONObject.toJSONString(map.get("totalCount"));
				Integer totalCount = JSONObject.parseObject(totalCountString, Integer.class);
				//pagesize
				String pageSizeString = JSONObject.toJSONString(map.get("pageSize"));
				Integer pagesize = JSONObject.parseObject(pageSizeString, Integer.class);
				//currentPageNo
				String currentPageNoString = JSONObject.toJSONString(map.get("currentPageNo"));
				Integer currentPageNo = JSONObject.parseObject(currentPageNoString, Integer.class);
				
				List<Object> reportObjectList = (List<Object>) map.get("dataArray");
				String json = JSONObject.toJSONString(reportObjectList);
				List<SspAdRegionDayReport> list = JSONObject.parseObject(json, List.class);
				
				if (null != list &&  list.size() > 0 ) {
					
						for (int i=0;i<list.size();i++) {
							Object reportJson = list.get(i);
							String reportJsonString = JSONObject.toJSONString(reportJson);
							SspAdRegionDayReport adReport = JSONObject.parseObject(reportJsonString, SspAdRegionDayReport.class);
							if (null != adReport) {
								Integer adId = adReport.getAdvertiserId();
								Integer ordId = adReport.getOrderId();
								Integer strId = adReport.getStrategyId();
								Integer creId = adReport.getCreativeId();

								Map<String, String> names = getNames(adId, ordId, strId, creId);

								if (StringUtils.isBlank(names.get("advertiserName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setAdvertiserName(names.get("advertiserName"));

								if (StringUtils.isBlank(names.get("orderName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setOrderName(names.get("orderName"));

								if (StringUtils.isBlank(names.get("strategyName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setStrategyName(names.get("strategyName"));

								if (StringUtils.isBlank(names.get("creativeName"))) {
									totalCount = totalCount - 1;
									continue;
								}
								adReport.setCreativeName(names.get("creativeName"));

								resultList.add(adReport);
							}
						}

						Pagination<SspAdRegionDayReport> pageResult =  new Pagination<SspAdRegionDayReport>(totalCount, pagesize,
								currentPageNo, resultList.toArray(new SspAdRegionDayReport[] {}));
						 return pageResult;
					}
		return null;
	}

	private Map<String, String> getNames(Integer adId, Integer ordId, Integer strId, Integer creId) {
		Map<String, String> nameMap = new HashMap<>();
		if (null != adId) {
			Long adverId = Long.parseLong(adId.toString());
			String advertiserName = findSspAdvertiserName(adverId);

			nameMap.put("advertiserName", advertiserName);
		}
		if (null != ordId) {
			Long orId = Long.parseLong(ordId.toString());
			String orderName = findSspOrderName(orId);

			nameMap.put("orderName", orderName);
		}

		if (null != strId) {
			Long straId = Long.parseLong(strId.toString());
			String strategyName = findSspPlanName(straId);

			nameMap.put("strategyName", strategyName);
		}
		if (null != creId) {
			Long crId = Long.parseLong(creId.toString());
			String creativeName = findSspCreativeName(crId);

			nameMap.put("creativeName", creativeName);
		}
		return nameMap;
	}

	@Override
	public RestResponse findAll() {
		SspCreativeReport cr = new SspCreativeReport();
		HttpEntity<SspCreativeReport> httpEntity = new HttpEntity<SspCreativeReport>(cr);
		return restTemplate.postForObjectForDB("/rest/ssp/creativeReport/find", httpEntity, RestResponse.class);

	}

	private String findSspAdvertiserName(Long advertiserId) {
		String name = null;
		try {
			SspAdvertiser sspAdvertiser = new SspAdvertiser();
			sspAdvertiser.setId(advertiserId);
			RestResponse restResponse = sspAdvertiserService.find(sspAdvertiser);
			ArrayList result = (ArrayList) restResponse.getResult();
			LinkedHashMap map = (LinkedHashMap) result.get(0);
			name = (String) map.get("name");
			String deleteState = map.get("deleteState").toString();
			if ("2".equals(deleteState)) {
				return null;
			}
		} catch (Exception e) {
			LOG.error("广告主查询失败: " + e);
		}
		return name;

	}

	private String findSspOrderName(Long orderId) {
		String name = null;
		try {
			RestResponse restResponse = sspOrderService.find(orderId);
			ArrayList result = (ArrayList) restResponse.getResult();
			LinkedHashMap map = (LinkedHashMap) result.get(0);
			name = (String) map.get("name");
			String deleteState = map.get("deleteState").toString();
			if ("2".equals(deleteState)) {
				return null;
			}
		} catch (Exception e) {
			LOG.error("订单查询失败: " + e);
		}
		return name;
	}

	private String findSspPlanName(Long planId) {
		String name = null;
		try {
			RestResponse restResponse = sspPlanService.find(planId);
			LinkedHashMap map = (LinkedHashMap) restResponse.getResult();
			name = (String) map.get("name");
			String deleteState = map.get("deleteState").toString();
			if ("2".equals(deleteState)) {
				return null;
			}
		} catch (Exception e) {
			LOG.error("计划查询失败" + e);
		}
		return name;
	}

	private String findSspCreativeName(Long creativeId) {
		String name = null;
		try {
			SspCreative creative = new SspCreative();
			creative.setId(creativeId);
			RestResponse restResponse = sspCreativeService.find(creative);
			ArrayList result = (ArrayList) restResponse.getResult();
			LinkedHashMap map = (LinkedHashMap) result.get(0);
			name = (String) map.get("creativeName");
			String deleteState = map.get("deleteState").toString();
			if ("2".equals(deleteState)) {
				return null;
			}
		} catch (Exception e) {
			LOG.error("创意查询失败" + e);
		}
		return name;
	}

	public Integer parseToInteger(Long id) {
		if (null != id) {
			String idS = id.toString();
			Integer idI = Integer.valueOf(idS);
			return idI;
		}
		return null;
	}

	
}
