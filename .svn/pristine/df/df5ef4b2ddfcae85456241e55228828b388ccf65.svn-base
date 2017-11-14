package com.unioncast.ssp.front.service.ssp.impl;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import com.unioncast.common.page.Operation;
import com.unioncast.common.page.OrderExpression;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.SearchExpression;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspPlan;
import com.unioncast.common.ssp.model.SspPlanCreativeRelation;
import com.unioncast.common.util.CommonUtil;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.common.util.RestUtil;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspPlanService;

@Service
public class SspPlanServiceImpl implements SspPlanService{

	@Resource
	private RestTemplate restTemplate;

	public RestResponse find(Long id) throws Exception {
		HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(id);
		return restTemplate.postForObjectForDB("rest/ssp/plan/find",
				httpEntity, RestResponse.class);
	}

	public void save(SspPlan sspPlan) throws Exception {
		HttpEntity<SspPlan> httpEntity = new MyHttpEntity<SspPlan>(sspPlan);
		restTemplate.postForObjectForDB("/rest/ssp/plan/add", httpEntity,
				RestResponse.class);
	}
//更新计划
	public void update(SspPlan sspPlan) throws Exception {
		HttpEntity<SspPlan> httpEntity = new MyHttpEntity<SspPlan>(sspPlan);
		restTemplate.postForObjectForDB("/rest/ssp/plan/update", httpEntity,RestResponse.class);
	}

	public void deleteById(Long id) throws Exception {
		HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(id);
		restTemplate.postForObjectForDB("/rest/ssp/plan/delete", httpEntity,
				RestResponse.class);
	}

	public void batchDelete(Long[] ids) throws Exception {
		HttpEntity<Long[]> httpEntity = new MyHttpEntity<Long[]>(ids);
		restTemplate.postForObjectForDB("/rest/ssp/plan/batchDelete",
				httpEntity, RestResponse.class);
	}

	public RestResponse find() {
		HttpEntity httpEntity = new MyHttpEntity();
		return restTemplate.postForObjectForDB("/rest/ssp/plan/find",
				httpEntity, RestResponse.class);
	}

	public RestResponse findLogsByPlanId(Long id) throws Exception {
		HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(id);
		return restTemplate.postForObjectForDB(
				"/rest/ssp/plan/findLogsByPlanId", httpEntity,
				RestResponse.class);
	}

	public RestResponse findCreativesByPlanId(Long id) throws Exception {
		HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(id);
		return restTemplate.postForObjectForDB(
				"/rest/ssp/plan/findCreativesByPlanId", httpEntity,
				RestResponse.class);
	}

	@Override
	public List<SspPlan> findByIsPlanGroup(Integer isPlanGroup) {
		HttpEntity<Integer> httpEntity = new MyHttpEntity<Integer>(isPlanGroup);
		RestResponse result = restTemplate.postForObjectForDB("/rest/ssp/plan/findByIsPlanGroup", httpEntity,RestResponse.class);
		if(CommonUtil.isNotNull(result)){
			List<SspPlan> planList = (List<SspPlan>) result.getResult();
			if(CommonUtil.isNotNull(planList)){
				return planList;
			}
			
		}
		
		return null;
	}

	@Override
	public RestResponse findByOrderId(Long orderId) throws Exception {
				HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(orderId);
		return restTemplate.postForObjectForDB("/rest/ssp/plan/findByOrderId",
				httpEntity, RestResponse.class);
	}

	@Override
	//public RestResponse page(Long orderId,String startTime, String endTime, Integer planState, Long id,String name, Integer currentpage,int pageSize) {
	public RestResponse page(Long orderId,String startTime, String endTime, Integer planState, Long id,String name, Integer currentpage,int pageSize) {
		  
		PageCriteria pageCriteria = new PageCriteria();
		
		pageCriteria.setPageSize(pageSize);
		pageCriteria.setCurrentPageNo(currentpage);
		pageCriteria.setEntityClass(SspPlan.class);
		pageCriteria.setPredicate(Operation.AND);
		// 封装排序，按照updateTime倒序
	    List<OrderExpression> orderExpressionList = new ArrayList<OrderExpression>();
	    OrderExpression orderExpression = new OrderExpression();
	    orderExpression.setPropertyName("update_time");
	    orderExpression.setOp("DESC");
 	    orderExpressionList.add(orderExpression);
	    pageCriteria.setOrderExpressionList(orderExpressionList);
	  //条件查询  GT(">"), LT("<"), LIKE("like"), EQ("="), NE("!"), NEQ("<>"), GE(">="), LE("<="), BETWEEN("between"), IN("in"), AND(
	         //"and"), OR("or");
	  		List<SearchExpression> searchExpressionList = new ArrayList<SearchExpression>();
	  		//订单ID
	  		if( orderId!=null){
	  			SearchExpression orderIdExpression = new SearchExpression();
	  			orderIdExpression.setPropertyName("order_id");
	  			orderIdExpression.setValue(orderId);
	  			orderIdExpression.setOperation(Operation.EQ);
	  			searchExpressionList.add(orderIdExpression);
	  		}	
	  	//投放周期开始时间
	  		if(startTime != ""&&startTime!=null){
	  			SearchExpression startTimeExpression = new SearchExpression();
	  			//startTimeExpression.setPropertyName("put_start_time");
	  			startTimeExpression.setPropertyName("update_time");
	  			startTimeExpression.setValue(startTime+ " 23:59:59");
	  			startTimeExpression.setOperation(Operation.GE);
	  			searchExpressionList.add(startTimeExpression);
	  		}	
	  	//投放周期结束时间
	  		if(endTime != ""&&endTime!=null){
	  			SearchExpression endTimeExpression = new SearchExpression();
	  			//endTimeExpression.setPropertyName("put_end_time");
	  			endTimeExpression.setPropertyName("update_time");
	  			endTimeExpression.setValue(endTime+ " 23:59:59");
	  			endTimeExpression.setOperation(Operation.LT);
	  			 searchExpressionList.add(endTimeExpression);
	  		}	
	  	//计划状态
	  		if(planState!=null){
	  			SearchExpression planStateExpression = new SearchExpression();
	  			planStateExpression.setPropertyName("state");
	  			planStateExpression.setValue(planState);
	  			planStateExpression.setOperation(Operation.EQ);
	  			searchExpressionList.add(planStateExpression);
	  		}	
	  	//计划id
	  		if(id!=null){
	  			//有父id的列表
	  			SearchExpression idExpression = new SearchExpression();
	  			//计划id不为空时 查询的是子计划
	  			idExpression.setPropertyName("parent_plan_id");
	  			idExpression.setValue(id);
	  			idExpression.setOperation(Operation.EQ);
	  			searchExpressionList.add(idExpression);
	  		}else{
	  			//没有父id的列表
	  			SearchExpression idExpression = new SearchExpression();
	  			//计划id不为空时 查询的是子计划
	  			idExpression.setPropertyName("parent_plan_id");
	  			idExpression.setValue("null");
	  			idExpression.setOperation(Operation.IS);
	  			searchExpressionList.add(idExpression);
	  		}
	  	//计划名称
	  		if(name != ""&&name!=null){
	  			SearchExpression nameExpression = new SearchExpression();
	  			nameExpression.setPropertyName("name");
	  			nameExpression.setValue(name);
	  			nameExpression.setOperation(Operation.LIKE);
	  			searchExpressionList.add(nameExpression);
	  		}	
//	  		//delete_state =1未删除  =2已删除
//	  		SearchExpression deleteStateExpression = new SearchExpression();
//	  		deleteStateExpression.setPropertyName("delete_state");
//  			//未删除
//	  		deleteStateExpression.setValue(1);
//	  		deleteStateExpression.setOperation(Operation.EQ);
//  			searchExpressionList.add(deleteStateExpression);
  		
	  			
  			pageCriteria.setSearchExpressionList(searchExpressionList);
  			HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(pageCriteria);
  			return restTemplate.postForObjectForDB("rest/ssp/plan/page", httpEntity, RestResponse.class);
	}

	//查询子计划
	public RestResponse searchPlanChildren(SspPlan planParam,Integer currentPage) {
	
		PageCriteria pageCriteria = new PageCriteria();
		pageCriteria.setPageSize(10);
		if(currentPage!=null){
			//当前页
			pageCriteria.setCurrentPageNo(currentPage);
		}else{
			//第一页
			pageCriteria.setCurrentPageNo(1);
		}
		pageCriteria.setEntityClass(SspPlan.class);
		pageCriteria.setPredicate(Operation.AND);
		// 封装排序，按照updateTime倒序
	    List<OrderExpression> orderExpressionList = new ArrayList<OrderExpression>();
	    OrderExpression orderExpression = new OrderExpression();
	    orderExpression.setPropertyName("update_time");
	    orderExpression.setOp("DESC");
 	    orderExpressionList.add(orderExpression);
	    pageCriteria.setOrderExpressionList(orderExpressionList);
	  //条件查询  GT(">"), LT("<"), LIKE("like"), EQ("="), NE("!"), NEQ("<>"), GE(">="), LE("<="), BETWEEN("between"), IN("in"), AND(
	         //"and"), OR("or");
	  		List<SearchExpression> searchExpressionList = new ArrayList<SearchExpression>();
	  		if(planParam!=null&&planParam.getId()!=null){
	  			SearchExpression planId = new SearchExpression();
	  			planId.setPropertyName("parent_plan_id");
	  			planId.setValue(planParam.getId());
	  			planId.setOperation(Operation.EQ);
	  			searchExpressionList.add(planId);
	  		}
	  		
	  		SearchExpression deleteStateExpression = new SearchExpression();
	  		deleteStateExpression.setPropertyName("delete_state");
  			//未删除 
	  		deleteStateExpression.setValue(1);
	  		deleteStateExpression.setOperation(Operation.EQ);
  			searchExpressionList.add(deleteStateExpression);
  			pageCriteria.setSearchExpressionList(searchExpressionList);
  			HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(pageCriteria);
  			return restTemplate.postForObjectForDB("rest/ssp/plan/searchPlanChildren", httpEntity, RestResponse.class);
	}

	@Override
	public Map<Long, Integer> findChildPlans(List<Long> ids) {
		Map<Long, Integer> result = null;
		HttpEntity<List<Long>> httpEntity = new HttpEntity<List<Long>>(ids);
		RestResponse rs = restTemplate.postForObjectForDB("rest/ssp/plan/findChildPlans", httpEntity, RestResponse.class);
		if(rs!=null&&rs.getResult()!=null){
			result = (Map<Long, Integer>) rs.getResult();
		}
		return result;
		//return restTemplate.postForObjectForDB("rest/ssp/plan/findChildPlans", httpEntity, RestResponse.class);
	}

	@SuppressWarnings("serial")
	@Override
	public boolean validataSspPlanName(String name,Long advertiserId) {
		RestResponse restResponse = RestUtil.postForObjectForDB("rest/ssp/plan/validataSspPlanName", new HashMap<String,Object>(){{
			put("name",name);
			put("advertiserId",advertiserId);
		}}, RestResponse.class);
		if(restResponse.isSuccess()&&CommonUtil.isNotNull(restResponse.getResult())){
			return (boolean)restResponse.getResult();
		}
		return false;
	}

	@Override
	public RestResponse findAllCreativesByPlanId(Long planId) {
		HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(planId);
		return restTemplate.postForObjectForDB(
				"/rest/ssp/planCreativeRelation/findByPlanId", httpEntity,
				RestResponse.class);
	}

	@Override
	public RestResponse addPlanCreativeRelations(
			SspPlanCreativeRelation[] relations) {
		HttpEntity<SspPlanCreativeRelation[]> httpEntity = new MyHttpEntity<SspPlanCreativeRelation[]>(relations);
		return restTemplate.postForObjectForDB(
				"/rest/ssp/planCreativeRelation/addPlanCreativeRelations", httpEntity,
				RestResponse.class);
	}

	@Override
	public RestResponse addPlanCreativeRelationsMap(Map<String, String> map) {
		HttpEntity<Map<String, String>> httpEntity = new MyHttpEntity<Map<String, String>>(map);
		return restTemplate.postForObjectForDB(
				"/rest/ssp/planCreativeRelation/addPlanCreativeRelationsMap", httpEntity,
				RestResponse.class);
	}

	@Override
	public RestResponse searchPlanCreativeRelationPage(String planId,
			String currentPageNo, String pageSize, String name,
			String advertiserId, String state, String creativeType,
			String creativeLabel) {
		Map<String,String> params = new HashMap<String,String> ();
		
		if(planId!=null&&planId!=""){
			params.put("planId", planId);
		}
		if(currentPageNo!=null&&currentPageNo!=""){
			params.put("currentPageNo", currentPageNo);
		}else{
			params.put("currentPageNo", "1");
		}
		if(pageSize!=null&&pageSize!=""){
			params.put("pageSize", pageSize);
		}else{
			params.put("pageSize", "10");
		}
		if(name!=null&&name!=""){
			params.put("name", name);
		}
		if(advertiserId!=null&&advertiserId!=""){
			params.put("advertiserId", advertiserId);
		}
		if(state!=null&&state!=""){
			params.put("state", state);
		}
		if(creativeType!=null&&creativeType!=""){
			params.put("creativeType", creativeType);
		}
		if(creativeLabel!=null&&creativeLabel!=""){
			params.put("creativeLabel",creativeLabel);
		}
		HttpEntity<Map<String,String>> httpEntity = new MyHttpEntity<Map<String,String>>( params);
		
		return restTemplate.postForObjectForDB(
				"/rest/ssp/creative/searchPlanCreativeRelationPage", httpEntity,
				RestResponse.class);
	}

	@Override
	public RestResponse findByAdvertiserId(Long advertiserId) {
		HttpEntity<Long> httpEntity = new MyHttpEntity<Long>(advertiserId);
		return restTemplate.postForObjectForDB("/rest/ssp/planCreativeRelation/findByAdvertiserId", httpEntity,RestResponse.class);
	}

}

