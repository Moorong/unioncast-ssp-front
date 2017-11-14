package com.unioncast.ssp.front.service.ssp.elasticsearchData;

import com.unioncast.common.page.Pagination;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdvertiser;
import com.unioncast.common.ssp.model.SspCreative;
import com.unioncast.ssp.front.service.ssp.SspAdvertiserService;
import com.unioncast.ssp.front.service.ssp.SspCreativeService;
import com.unioncast.ssp.front.service.ssp.SspOrderService;
import com.unioncast.ssp.front.service.ssp.SspPlanService;
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

import javax.annotation.Resource;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author zhangzhe
 * @date 2017/2/21 10:25
 */


@Component
public class ElasticsearchADReportImpl implements ElasticsearchADReport {

    private static final Logger LOG = LogManager.getLogger(ElasticsearchADReportImpl.class);

    private static final String INDEX = "ssp_day_report";
    private static final String TYPE = "day_report";
    private static final Integer PAGESIZE = 10;
    private static final String ESC = "dayOrHour";
    @Resource
    TransportClient transportClient;

    @Resource
    SspAdvertiserService sspAdvertiserService;

    @Resource
    SspOrderService sspOrderService;

    @Resource
    SspPlanService sspPlanService;

    @Resource
    SspCreativeService sspCreativeService;


    //es数据删除
    public void esADRepordDelete(String name, Long value) {
        try {
            QueryBuilder query = QueryBuilders.boolQuery()
                    .must(QueryBuilders.matchPhraseQuery(name, value));

            SearchResponse rs = transportClient.prepareSearch(INDEX).setTypes(TYPE)
                    .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
                    .setQuery(query)
                    .setExplain(true).execute().actionGet();

            if (rs != null && rs.getHits().getTotalHits() != 0) {
                LOG.info("当前需要删除的数据总数为:{}", rs.getHits().getTotalHits());
                // 遍历查询结果
                for (SearchHit hit : rs.getHits().getHits()) {
                    String esId = hit.getId();
                    transportClient.prepareDelete(INDEX, TYPE, esId).execute().actionGet();
                }
            } else {
                LOG.info("es报表中并无对应数据.");
            }

        } catch (Exception e) {
            LOG.error("es数据查询失败: " + e);
        }

    }


    //es报表查询
    public Pagination<Map<String, Object>> esADReport(Long accountId, Long advertiserId, Long orderId, Long planId, Long creativeId,
                                                      Integer currentPageNo, String startTime, String endTime)
            throws UnknownHostException {

        List<Map<String, Object>> list = new ArrayList<>();
        Integer totalCount = 0;

        QueryBuilder query = QueryBuilders.boolQuery();

        Long start = null;

        Long end = null;

        //用户ID
        if (accountId != null) {
            query = QueryBuilders.boolQuery()
                    .must(QueryBuilders.matchPhraseQuery("accountId", accountId));

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
                    .must(QueryBuilders.matchPhraseQuery("accountId", accountId));

        }


        //广告主ID
        if (advertiserId != null) {
            query = QueryBuilders.boolQuery()
                    .must(QueryBuilders.rangeQuery("dayOrHour").gte(start).lte(end))
                    .must(QueryBuilders.matchPhraseQuery("advertiserId", advertiserId));

        }

        //订单ID
        if (orderId != null) {
            query = QueryBuilders.boolQuery()
                    .must(QueryBuilders.rangeQuery("dayOrHour").gte(start).lte(end))
                    .must(QueryBuilders.matchPhraseQuery("orderId", orderId));

        }

        //计划ID
        if (planId != null) {
            query = QueryBuilders.boolQuery()
                    .must(QueryBuilders.rangeQuery("dayOrHour").gte(start).lte(end))
                    .must(QueryBuilders.matchPhraseQuery("planId", planId));

        }

        //创意ID
        if (creativeId != null) {
            query = QueryBuilders.boolQuery()
                    .must(QueryBuilders.rangeQuery("dayOrHour").gte(start).lte(end))
                    .must(QueryBuilders.matchPhraseQuery("creativeId", creativeId));

        }

        //总数
/*        SearchResponse rsTotal = transportClient.prepareSearch(INDEX).setTypes(TYPE)
                .setSearchType(SearchType.DFS_QUERY_AND_FETCH)
                .setQuery(query)
                .addSort(ESC, SortOrder.DESC)
                .setExplain(true).execute().actionGet();
        if (rsTotal != null && rsTotal.getHits().getHits().length != 0) {
            totalCount = (int) rsTotal.getHits().getTotalHits();
//            System.out.println("totalHits: "+totalHits);
//            totalCount=rsTotal.getHits().getHits().length;
//            System.out.println("totalCount: "+totalCount);
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

                if (source.get("advertiserId") != null) {
                    Long sspAdvertiserId = Long.parseLong(source.get("advertiserId").toString());
                    String sspAdvertiserName = findSspAdvertiserName(sspAdvertiserId);
                    if (StringUtils.isBlank(sspAdvertiserName)) {
                        totalCount = totalCount - 1;
                        continue;
                    }
                    map.put("advertiserName", sspAdvertiserName);
                }

                if (source.get("orderId") != null) {
                    Long sspOrderId = Long.parseLong(source.get("orderId").toString());
                    String sspOrderName = findSspOrderName(sspOrderId);
                    if (StringUtils.isBlank(sspOrderName)) {
                        totalCount = totalCount - 1;
                        continue;
                    }
                    map.put("orderName", sspOrderName);
                }

                if (source.get("planId") != null) {
                    Long sspPlanId = Long.parseLong(source.get("planId").toString());
                    String sspPlanName = findSspPlanName(sspPlanId);
                    if (StringUtils.isBlank(sspPlanName)) {
                        totalCount = totalCount - 1;
                        continue;
                    }
                    map.put("planName", sspPlanName);
                }

                if (source.get("creativeId") != null) {
                    Long sspCreativeId = Long.parseLong(source.get("creativeId").toString());
                    String sspCreativeName = findSspCreativeName(sspCreativeId);
                    if (StringUtils.isBlank(sspCreativeName)) {
                        totalCount = totalCount - 1;
                        continue;
                    }
                    map.put("creativeName", sspCreativeName);
                }


                if (source.get("cpc") != null) {
                    if ("NaN".equals(source.get("cpc")) || "Infinity".equals(source.get("cpc"))) {
                        map.put("cpc", 0.0);
                    }
                }
                source.putAll(map);

                list.add(source);
                //System.out.println(hit.getSourceAsString());
            }
        }

        return new Pagination<Map<String, Object>>(totalCount, PAGESIZE, currentPageNo, list.toArray(new Map[]{}));

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


/*    public List<SearchHit> page(int pageNo, int pageSize, SearchHit[] hits) {
        List<SearchHit> result = new ArrayList<>();
        if (hits != null && hits.length > 0) {
            int allCount = hits.length;
            int pageCount = (allCount + pageSize - 1) / pageSize;
            if (pageNo >= pageCount) {
                pageNo = pageCount;
            }
            if (pageNo < 1) {
                pageNo = 1;
            }
            int start = (pageNo - 1) * pageSize;
            int end = pageNo * pageSize;
            if (end >= allCount) {
                end = allCount;
            }
            for (int i = start; i < end; i++) {
                result.add(hits[i]);
            }
        }
        return (result != null && result.size() > 0) ? result : null;
    }*/

}
