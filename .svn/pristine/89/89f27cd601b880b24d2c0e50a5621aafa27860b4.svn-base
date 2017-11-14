package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.page.Operation;
import com.unioncast.common.page.OrderExpression;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.SearchExpression;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspCreativeReport;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspCreativeReportService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Component
public class SspCreativeReportServiceImpl implements SspCreativeReportService {

    @Resource
    private RestTemplate restTemplate;

    public RestResponse page(Long accountId, Long advertiserId, Long orderId, Long planId, Long creativeId, Integer currentPageNo, Integer pageSize, String startTime, String endTime) {

        PageCriteria pageCriteria = new PageCriteria();

        pageCriteria.setPageSize(pageSize);
        pageCriteria.setCurrentPageNo(currentPageNo);
        pageCriteria.setEntityClass(SspCreativeReport.class);
        pageCriteria.setPredicate(Operation.AND);

        // 封装排序，按照updateTime倒序
        List<OrderExpression> orderExpressionList = new ArrayList<OrderExpression>();
        OrderExpression orderExpression = new OrderExpression();
        orderExpression.setPropertyName("update_time");
        orderExpression.setOp("DESC");
        orderExpressionList.add(orderExpression);
        pageCriteria.setOrderExpressionList(orderExpressionList);

        //条件查询
        List<SearchExpression> searchExpressionList = new ArrayList<SearchExpression>();
        //用户ID
        /*if(accountId!=null){
			SearchExpression accountExpression = new SearchExpression();
			accountExpression.setPropertyName("account_id");
			accountExpression.setValue(accountId);
			accountExpression.setOperation(Operation.EQ);
			searchExpressionList.add(accountExpression);
		}*/
        //广告主ID
		if(advertiserId!=null){
			SearchExpression accountExpression = new SearchExpression();
			accountExpression.setPropertyName("advertiser_id");
			accountExpression.setValue(advertiserId);
			accountExpression.setOperation(Operation.EQ);
			searchExpressionList.add(accountExpression);
		}
		//订单ID
		if(orderId!=null){
			SearchExpression accountExpression = new SearchExpression();
			accountExpression.setPropertyName("order_id");
			accountExpression.setValue(orderId);
			accountExpression.setOperation(Operation.EQ);
			searchExpressionList.add(accountExpression);
		}
		//计划ID
		if(planId!=null){
			SearchExpression accountExpression = new SearchExpression();
			accountExpression.setPropertyName("plan_id");
			accountExpression.setValue(planId);
			accountExpression.setOperation(Operation.EQ);
			searchExpressionList.add(accountExpression);
		}
		//创意ID
		if(creativeId!=null){
			SearchExpression accountExpression = new SearchExpression();
			accountExpression.setPropertyName("creative_id");
			accountExpression.setValue(creativeId);
			accountExpression.setOperation(Operation.EQ);
			searchExpressionList.add(accountExpression);
		}

        if (StringUtils.isNotBlank(startTime)) {
            SearchExpression startTimeExpression = new SearchExpression();
            startTimeExpression.setPropertyName("update_time");
            startTimeExpression.setValue(startTime);
            startTimeExpression.setOperation(Operation.GE);
            searchExpressionList.add(startTimeExpression);
        }

        if (StringUtils.isNotBlank(endTime)) {
            endTime = endTime + " 23:59:59:99";
            SearchExpression endTimeExpression = new SearchExpression();
            endTimeExpression.setPropertyName("update_time");
            endTimeExpression.setValue(endTime);
            endTimeExpression.setOperation(Operation.LE);
            searchExpressionList.add(endTimeExpression);
        }

        pageCriteria.setSearchExpressionList(searchExpressionList);
        HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(pageCriteria);
        return restTemplate.postForObjectForDB("/rest/ssp/creativeReport/page", httpEntity, RestResponse.class);
    }

    @Override
    public RestResponse findAll() {
        SspCreativeReport cr = new SspCreativeReport();
        HttpEntity<SspCreativeReport> httpEntity = new HttpEntity<SspCreativeReport>(cr);
        return restTemplate.postForObjectForDB("/rest/ssp/creativeReport/find", httpEntity, RestResponse.class);

    }

}
