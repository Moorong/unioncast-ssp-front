package com.unioncast.ssp.front.service.ssp.elasticsearchData;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.stereotype.Component;

import com.unioncast.common.page.Pagination;
import com.unioncast.common.ssp.model.SspAdPositionInfo;
import com.unioncast.common.ssp.model.SspAppInfo;
import com.unioncast.common.user.model.User;
import com.unioncast.ssp.front.service.ssp.SspAdPositionInfoService;
import com.unioncast.ssp.front.service.ssp.SspAppInfoService;
import com.unioncast.ssp.front.service.user.UserSystemService;
@Component
public class ElasticsearchMTReportImpl implements ElasticsearchMTReport{
	  private static final Logger LOG = LogManager.getLogger(ElasticsearchADReportImpl.class);
	  
	    private static final String INDEX = "ssp_mt_day_report";
	    private static final String TYPE = "mt_day_report";
	    private static final Integer PAGESIZE = 10;
	    private static final String ESC = "dayOrHour";
	    @Resource
	    TransportClient transportClient;
	  
	    @Resource
	    private UserSystemService userSystemService;
	    @Resource
	    private SspAppInfoService sspAppInfoService;
	    @Resource
	    private SspAdPositionInfoService sspAdPositionInfoService;
	  @Override
	public Pagination<Map<String, Object>> esMTReport(Long accountId, Long userId, Long appInfoId,
			Long adPositionInfoId, Integer currentPageNo, String startTime, String endTime) {
		  List<Map<String, Object>> list = new ArrayList<>();
	        Integer totalCount = 0;

	        QueryBuilder query = QueryBuilders.boolQuery();

	        Long start = null;

	        Long end = null;

	        //用户ID
	        if (accountId != null) {
	            query = QueryBuilders.boolQuery()
	                    .must(QueryBuilders.matchPhraseQuery("devUserId", accountId));

	        }

	        //开始结束时间
	        if (StringUtils.isNotBlank(startTime) && StringUtils.isNotBlank(endTime)) {
	/*            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	            try {
	                start = sdf.parse(startTime).getTime();
	                end = sdf.parse(endTime).getTime();
	            } catch (ParseException e) {
	                e.printStackTrace();
	            }*/


	            //日期格式化处理
	            String pat1 = "yyyy-MM-dd";
	            String pat2 = "yyyy-MM-dd";
	            SimpleDateFormat sdf1 = new SimpleDateFormat(pat1);        // 实例化模板对象
	            SimpleDateFormat sdf2 = new SimpleDateFormat(pat2);        // 实例化模板对象
	            Date d1 = null;
	            Date d2 = null;
	            try {
	                d1 = sdf1.parse(startTime);
	                d2 = sdf1.parse(endTime);     // 将给定的字符串中的日期提取出来
	            } catch (Exception e) {            // 如果提供的字符串格式有错误，则进行异常处理
	                e.printStackTrace();       // 打印异常信息
	            }
	            startTime = sdf2.format(d1);// 将日期变为新的格式
	            endTime = sdf2.format(d2);

	            String regEx = "[^0-9]";
	            Pattern p = Pattern.compile(regEx);
	            Matcher m = p.matcher(startTime);
	            start = Long.parseLong(m.replaceAll("").trim());
	            m = p.matcher(endTime);
	            end = Long.parseLong(m.replaceAll("").trim());


	            query = QueryBuilders.boolQuery()
	                    .must(QueryBuilders.rangeQuery("dayOrHour").gte(start).lte(end))
	                    .must(QueryBuilders.matchPhraseQuery("devUserId", accountId));

	        }


	        //开发者ID
	        if (userId != null) {
	            query = QueryBuilders.boolQuery()
	                    .must(QueryBuilders.rangeQuery("dayOrHour").gte(start).lte(end))
	                    .must(QueryBuilders.matchPhraseQuery("devUserId", userId));

	        }

	        //应用ID
	        if (appInfoId != null) {
	            query = QueryBuilders.boolQuery()
	                    .must(QueryBuilders.rangeQuery("dayOrHour").gte(start).lte(end))
	                    .must(QueryBuilders.matchPhraseQuery("appId", appInfoId));

	        }

	        //广告位ID
	        if (adPositionInfoId != null) {
	            query = QueryBuilders.boolQuery()
	                    .must(QueryBuilders.rangeQuery("dayOrHour").gte(start).lte(end))
	                    .must(QueryBuilders.matchPhraseQuery("positionId", adPositionInfoId));

	        }

	      /*  //创意ID
	        if (creativeId != null) {
	            query = QueryBuilders.boolQuery()
	                    .must(QueryBuilders.rangeQuery("dayOrHour").gte(start).lte(end))
	                    .must(QueryBuilders.matchPhraseQuery("creativeId", creativeId));

	        }*/

	        //总数
	/*        SearchResponse rsTotal = transportClient.prepareSearch(INDEX).setTypes(TYPE)
	                .setSearchType(SearchType.DFS_QUERY_AND_FETCH)
	                .setQuery(query)
	                .addSort(ESC, SortOrder.DESC)
	                .setExplain(true).execute().actionGet();
	        if (rsTotal != null && rsTotal.getHits().getHits().length != 0) {
	            totalCount = (int) rsTotal.getHits().getTotalHits();
//	            System.out.println("totalHits: "+totalHits);
//	            totalCount=rsTotal.getHits().getHits().length;
//	            System.out.println("totalCount: "+totalCount);
	        }*/

	/*        query = QueryBuilders.boolQuery()
	                .must(QueryBuilders.rangeQuery("dayOrHour").gte("100").lte("200"));*/
	        //搜索
	        int pageIndex = (currentPageNo - 1) * PAGESIZE;
	        SearchResponse rs = null;
	        try {
	            rs = transportClient.prepareSearch(INDEX).setTypes(TYPE)
	                    .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
	                    .setQuery(query)
	                    .addSort(ESC, SortOrder.DESC)
	                    .setFrom(pageIndex).setSize(PAGESIZE)
	                    .setExplain(true).execute().actionGet();
	        } catch (Exception e) {
	            LOG.error("es数据查询失败: " + e);
	        }

	        // 遍历查询结果
	        if (rs != null && rs.getHits().getHits().length != 0) {
	            totalCount = (int) rs.getHits().getTotalHits();
	            SearchHit[] hits = rs.getHits().getHits();
	            //List<SearchHit> page = page(currentPageNo, PAGESIZE, hits);
	            for (SearchHit hit : hits) {
	                Map<String, Object> source = hit.getSource();

	                //针对id做出的查询
	                Map<String, Object> map = new HashMap();

	                if (source.get("updateTime") != null) {
	                    String updateTime = source.get("updateTime").toString();
	                    String updateTimeStr = updateTime.substring(0, 11);
	                    map.put("updateTimeStr", updateTimeStr);
	                }

	                if (source.get("devUserId") != null) {
	                    Long sspUserId = Long.parseLong(source.get("devUserId").toString());
	                    String userName = findSspUserName(sspUserId);
	                    if (StringUtils.isBlank(userName)) {
	                        totalCount = totalCount - 1;
	                        continue;
	                    }
	                    map.put("userName", userName);
	                }

	                if (source.get("appId") != null) {
	                    Long sspAppInfoId = Long.parseLong(source.get("appId").toString());
	                    String sspAppInfoName = findSspAppInfoName(sspAppInfoId);
	                    if (StringUtils.isBlank(sspAppInfoName)) {
	                        totalCount = totalCount - 1;
	                        continue;
	                    }
	                    map.put("appInfoName", sspAppInfoName);
	                }

	                if (source.get("positionId") != null) {
	                    Long sspadPositionInfoId = Long.parseLong(source.get("positionId").toString());
	                    String sspPositionName = findSspPositionName(sspadPositionInfoId);
	                    if (StringUtils.isBlank(sspPositionName)) {
	                        totalCount = totalCount - 1;
	                        continue;
	                    }
	                    map.put("positionName", sspPositionName);
	                }

	                /*if (source.get("creativeId") != null) {
	                    Long sspCreativeId = Long.parseLong(source.get("creativeId").toString());
	                    String sspCreativeName = findSspCreativeName(sspCreativeId);
	                    if (StringUtils.isBlank(sspCreativeName)) {
	                        totalCount = totalCount - 1;
	                        continue;
	                    }
	                    map.put("creativeName", sspCreativeName);
	                }*/


	                if (source.get("cpc") != null) {
	                    if ("NaN".equals(source.get("cpc")) || "Infinity".equals(source.get("cpc"))) {
	                        map.put("cpc", 0.0);
	                    }
	                }
					if (source.get("cpm") != null) {
						if ("NaN".equals(source.get("cpm")) || "Infinity".equals(source.get("cpm"))) {
							map.put("cpm", 0.0);
						}
					}
	                source.putAll(map);

	                list.add(source);
	                //System.out.println(hit.getSourceAsString());
	            }
	        }

	        return new Pagination<Map<String, Object>>(totalCount, PAGESIZE, currentPageNo, list.toArray(new Map[]{}));

	}
	  
	private String findSspAppInfoName(Long sspAppInfoId) {
		SspAppInfo sspAppInfo  =new SspAppInfo();
		sspAppInfo.setId(sspAppInfoId);
		SspAppInfo[] SspAppInfos = sspAppInfoService.findT(sspAppInfo);
		if(null != SspAppInfos && SspAppInfos.length!=0){
			SspAppInfo result = SspAppInfos[0] ;
			if(null !=result){
				return result.getName();
			}
		}
		return null;
	}

	private String findSspPositionName(Long sspadPositionInfoId) {
		SspAdPositionInfo sspAdPositionInfo = new SspAdPositionInfo();
		sspAdPositionInfo.setId(sspadPositionInfoId);
		try {
			SspAdPositionInfo[] SspAdPositionInfos = sspAdPositionInfoService.findT(sspAdPositionInfo);
			if(null != SspAdPositionInfos && SspAdPositionInfos.length!=0){
				SspAdPositionInfo result = SspAdPositionInfos[0];
				if(null !=result){
					return result.getName();
				}
			}
		} catch (Exception e) {
			LOG.error("媒体报表中根据id查询广告位出错"+e);
		}
		return null;
	}

	private String findSspUserName(Long sspUserId) {
		try {
			User[] users = userSystemService.findById(sspUserId);
			if(null != users && users.length!=0){
				User user = users[0];
				if(null !=user){
					
					return user.getUsername();
				}
			}
		} catch (Exception e) {
			LOG.error("根据开发者id查询用户出错"+e);
			
		}
		return null;
	}

}
