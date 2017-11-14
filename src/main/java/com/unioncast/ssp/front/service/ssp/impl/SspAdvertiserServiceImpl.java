package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.adx.model.UploadFileInfo;
import com.unioncast.common.page.Operation;
import com.unioncast.common.page.OrderExpression;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.SearchExpression;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdvertiser;
import com.unioncast.common.ssp.model.SspOrder;
import com.unioncast.ssp.front.model.SecurityUser;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.SspAdvertiserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
@Component
public class SspAdvertiserServiceImpl implements SspAdvertiserService {

	@Resource
	private RestTemplate restTemplate;
	
	//private SspAdvertiserDao sspAdvertiserDao;
	/**
	 * 根据ID查询广告主
	 * @param id
	 * @return
	 */
	@Override
	public RestResponse find(Long id) {
		SspAdvertiser sspAdvertiser = new SspAdvertiser();
		sspAdvertiser.setId(id);
		HttpEntity<SspAdvertiser> httpEntity = new HttpEntity<SspAdvertiser>(sspAdvertiser);
		return restTemplate.postForObjectForDB("rest/ssp/advertiser/find", httpEntity, RestResponse.class);
	}

	/**
	 * 广告主分页查询
	 * @param
	 * @return
	 */
	@Override
	public RestResponse page(Long accountId,String name,Integer state,String startTime , String endTime , Integer currentPageNo , Integer pageSize) {
		PageCriteria pageCriteria = new PageCriteria();
		
		pageCriteria.setPageSize(pageSize);
		pageCriteria.setCurrentPageNo(currentPageNo);
		pageCriteria.setEntityClass(SspAdvertiser.class);
		pageCriteria.setPredicate(Operation.AND);
		
		// 封装排序，按照createTime倒序
		List<OrderExpression> orderExpressionList = new ArrayList<OrderExpression>();
		OrderExpression orderExpression = new OrderExpression();
		orderExpression.setPropertyName("update_time");
		orderExpression.setOp("DESC");
		orderExpressionList.add(orderExpression);
		pageCriteria.setOrderExpressionList(orderExpressionList);
		
		//条件查询
		List<SearchExpression> searchExpressionList = new ArrayList<SearchExpression>();
		//用户ID
		if(accountId!=null){
			SearchExpression accountExpression = new SearchExpression();
			accountExpression.setPropertyName("account_id");
			accountExpression.setValue(accountId);
			accountExpression.setOperation(Operation.EQ);
			searchExpressionList.add(accountExpression);
		}
		
		//状态过滤
		 if(state!=null&&state!=0){
			 SearchExpression stateExpression = new SearchExpression();
			 stateExpression.setPropertyName("put_allowed_state");
			 stateExpression.setValue(state);
			 stateExpression.setOperation(Operation.EQ);
			 searchExpressionList.add(stateExpression);
		 }
		
		//广告主名称
		if (!StringUtils.isBlank(name)) {
				SearchExpression nameExpression = new SearchExpression();
				nameExpression.setPropertyName("name");
				nameExpression.setValue(name);
				nameExpression.setOperation(Operation.LIKE);
				searchExpressionList.add(nameExpression);
		}
		
		//起始时间
		if (StringUtils.isNotEmpty(startTime)) {
			SearchExpression startTimeExpression = new SearchExpression();
			startTimeExpression.setPropertyName("update_time");
			startTimeExpression.setValue(startTime);
			startTimeExpression.setOperation(Operation.GE);
			searchExpressionList.add(startTimeExpression);
		}
		 
		//结束时间
		if(StringUtils.isNotEmpty(endTime)) {
			SearchExpression endTimeExpression = new SearchExpression();
			endTimeExpression.setPropertyName("update_time");
			endTimeExpression.setValue(endTime+"23:59:59");
			endTimeExpression.setOperation(Operation.LE);
			searchExpressionList.add(endTimeExpression);
		}
 
		pageCriteria.setSearchExpressionList(searchExpressionList);
		HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(pageCriteria);
		return restTemplate.postForObjectForDB("rest/ssp/advertiser/page", httpEntity, RestResponse.class);
	}

	/**
	 * 查询所有广告主
	 * @return
	 */
	@Override
	public RestResponse findAll() {
		SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		SspAdvertiser sspAdvertiser=new SspAdvertiser();
		sspAdvertiser.setUser(user);
		sspAdvertiser.setDeleteState(1L);
		HttpEntity<SspAdvertiser> httpEntity = new HttpEntity<SspAdvertiser>(sspAdvertiser);
		return restTemplate.postForObjectForDB("rest/ssp/advertiser/findByUserId", httpEntity, RestResponse.class);
	}
	
	/**
	 * 保存广告主
	 * @param sspAdvertiser
	 */
	@Override
	public RestResponse save(SspAdvertiser sspAdvertiser) {
		/*
		String url = "rest/adxDspAdcreative/add";
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.set("authHeader", Const.SYSTEMID_TOKEN);
		HttpEntity<AdxDspAdcreative> httpEntity = new MyHttpEntity<AdxDspAdcreative>(
				adCreative);
		
		RestResponse result = restTemplateUtil.postForObjectForDB(url, httpEntity,
				RestResponse.class);
		return result;
		*/
//		HttpHeaders requestHeaders = new HttpHeaders();
//		requestHeaders.set("authHeader", "1;123456");
		HttpEntity<SspAdvertiser> httpEntity = new HttpEntity<SspAdvertiser>(sspAdvertiser);
		
		RestResponse result = restTemplate.postForObjectForDB("rest/ssp/advertiser/add", httpEntity, RestResponse.class);
		return result;
	}

	/**
	 * 更新广告主
	 * @param sspAdvertiser
	 */
	@Override
	public RestResponse update(SspAdvertiser sspAdvertiser) {
		HttpEntity<SspAdvertiser> httpEntity = new HttpEntity<SspAdvertiser>(sspAdvertiser);
		return restTemplate.postForObjectForDB("rest/ssp/advertiser/update", httpEntity, RestResponse.class);
	}

	/**
	 * 批量删除广告主
	 * @param ids
	 */
	@Override
	public void batchDelete(Long[] ids) {
		HttpEntity<Long[]> httpEntity = new HttpEntity<Long[]>(ids);
		restTemplate.postForObjectForDB("rest/ssp/advertiser/batchDelete", httpEntity, RestResponse.class);
		
	}

	@Override
	public void deleteById(Long id) {
		SspAdvertiser sspAdvertiser = new SspAdvertiser();
		sspAdvertiser.setId(id);
		sspAdvertiser.setDeleteState(2L);
		HttpEntity<SspAdvertiser> httpEntity = new HttpEntity<SspAdvertiser>(sspAdvertiser);
		restTemplate.postForObjectForDB("rest/ssp/advertiser/update", httpEntity, RestResponse.class);
	}

	@Override
	public RestResponse find(SspAdvertiser sspAdvertiser) {
		HttpEntity<SspAdvertiser> httpEntity = new HttpEntity<SspAdvertiser>(sspAdvertiser);
		return restTemplate.postForObjectForDB("rest/ssp/advertiser/find", httpEntity, RestResponse.class);
	}
	
	@Override
	public Integer countOrderByAdvertiser(Long advertierId) {
		PageCriteria pageCriteria = new PageCriteria();
		pageCriteria.setEntityClass(SspOrder.class);
		List<SearchExpression> searchExpressionList = new ArrayList<SearchExpression>();
		//用户ID
		if(advertierId!=null){
			SearchExpression advertiserExpression = new SearchExpression();
			advertiserExpression.setPropertyName("advertiser_id");
			advertiserExpression.setValue(advertierId);
			advertiserExpression.setOperation(Operation.EQ);
			searchExpressionList.add(advertiserExpression);
		}
		pageCriteria.setSearchExpressionList(searchExpressionList);
		HttpEntity<PageCriteria> httpEntity = new HttpEntity<PageCriteria>(pageCriteria);
		Integer count = (Integer) restTemplate.postForObjectForDB("rest/ssp/order/findByAdvertiser", httpEntity, RestResponse.class).getResult();
		return count;
	}

	public RestResponse saveFile(UploadFileInfo uploadFile) {
		HttpEntity<UploadFileInfo> httpEntity = new HttpEntity<UploadFileInfo>(uploadFile);
		return restTemplate.postForObjectForDB("rest/image/upload", httpEntity, RestResponse.class);
	}

	public RestResponse findIn(String startTimeStr, String endTimeStr) {
		
		return null;
		//return restTemplate.postForObjectForDB("rest/ssp/advertiser/find", httpEntity, String.class);
	}

}
