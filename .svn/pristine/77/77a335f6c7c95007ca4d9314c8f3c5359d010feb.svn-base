package com.unioncast.ssp.front.service.ssp;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspPlan;
import com.unioncast.common.ssp.model.SspPlanCreativeRelation;

import java.util.List;
import java.util.Map;


public interface SspPlanService {


	public RestResponse find(Long id) throws Exception ;

	public void save(SspPlan sspPlan) throws Exception ;

	public void update(SspPlan sspPlan) throws Exception ;

	/**
	 * 分页需要考虑的条件：用户id-从header中传递； 计划名称， 状态， 时间段，
	 * 级别（点击左侧计划显示的计划列表为：非执行计划+执行计划中的一级计划；点击一级计划时计划列表为：二级计划；点击非执行计划出来的是创意）
	 */
	//Long orderId,String startTime, String endTime, Integer planState, Long id,String name, int currentpage,int pageSize
	public RestResponse page( Long orderId,String startTime, String endTime, Integer planState, Long id,String name, Integer currentpage,int pageSize) throws Exception ;

	public void deleteById(Long id) throws Exception ;

	public void batchDelete(Long[] ids) throws Exception ;

	public RestResponse find() ;
	/**
	 * 校验策略名称
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-13 15:47:28
	 *
	 * @param name
	 * @param advertiserId
	 * @return boolean
	 */
	public boolean validataSspPlanName(String name,Long advertiserId) ;

	public RestResponse findLogsByPlanId(Long id) throws Exception;

	public RestResponse findCreativesByPlanId(Long id) throws Exception ;

	//根据是否为计划组 这个字段查询
	public List<SspPlan> findByIsPlanGroup(Integer isPlanGroup);

    RestResponse findByOrderId(Long orderId) throws Exception ;
//根据计划id查找所有子计划
	public RestResponse searchPlanChildren(SspPlan planParam,Integer currentPage);

	public Map<Long, Integer> findChildPlans(List<Long> ids);

	public RestResponse findAllCreativesByPlanId(Long planId);

	public RestResponse addPlanCreativeRelations(
			SspPlanCreativeRelation[] relations);

	public RestResponse addPlanCreativeRelationsMap(Map<String, String> map);

	public RestResponse searchPlanCreativeRelationPage(String planId,
			String currentPageNo, String pageSize, String name,
			String advertiserId, String state, String creativeType,
			String creativeLabel);

	public RestResponse findByAdvertiserId(Long advertiserId);
}
