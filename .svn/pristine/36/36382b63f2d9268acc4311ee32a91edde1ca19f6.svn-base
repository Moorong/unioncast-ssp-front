package com.unioncast.ssp.front.service.ssp;

import com.unioncast.common.page.AdvertiserOrderModel;
import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.Pagination;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspOrder;

public interface SspOrderService {
	
	public RestResponse find(SspOrder sspOrder) throws Exception;

    public RestResponse find(String name) throws Exception;

    public RestResponse find(Long id) throws Exception;

    public void save(SspOrder sspOrder) throws Exception;

    public void update(SspOrder sspOrder) throws Exception;

    public Pagination<SspOrder> page(PageCriteria pageCriteria) throws Exception;

    public void deleteById(Long id) throws Exception;

    public void batchDelete(Long[] ids) throws Exception;

    RestResponse findByAdverId(Long id) throws Exception;

    //查询有广告主状态的列表
    public Pagination<SspOrder> AdStatePage(AdvertiserOrderModel params);

    RestResponse findCreativeByAdverId(Long id) throws Exception;

	public RestResponse findByAdvertiserId(Long id);

}
