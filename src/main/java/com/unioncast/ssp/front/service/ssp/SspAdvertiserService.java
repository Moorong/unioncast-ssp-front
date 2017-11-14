package com.unioncast.ssp.front.service.ssp;

import java.util.Date;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspAdvertiser;

public interface SspAdvertiserService {

	
	/**
	 * 根据ID查询广告主
	 * @param id
	 * @return
	 */
	public RestResponse find(Long id);

//	public void deleteById(Long id);

	/**
	 * 广告主分页查询
	 * @param pageCriteria
	 * @return
	 */
	public RestResponse page(Long accountId,String name,Integer state,String startTime , String endTime , Integer currentPageNo , Integer pageSize);



	/**
	 * 查询所有广告主
	 * @return
	 */
	public RestResponse findAll();
	
	/**
	 * 保存广告主
	 * @param sspAdvertiser
	 */
	public RestResponse save(SspAdvertiser sspAdvertiser);

	/**
	 * 更新广告主
	 * @param sspAdvertiser
	 * @return 
	 */
	public RestResponse update(SspAdvertiser sspAdvertiser);

	/**
	 * 根据ID查询广告主
	 * @param id
	 */
	public void deleteById(Long id);

	/**
	 * 批量删除广告主
	 * @param ids
	 */
	public void batchDelete(Long[] ids);

	public RestResponse find(SspAdvertiser sspAdvertiser);
	
	/**
     * 根据广告主ID查询订单数
     * @param id
     * @return
     */
    public Integer countOrderByAdvertiser(Long id);

}
