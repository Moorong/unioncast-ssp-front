package com.unioncast.ssp.front.service.ssp;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspDictAdType;

/**
 * Simple to Introduction
 *
 * @Description: [广告类型服务类]
 * @Author: [dxy]
 * @CreateDate: [2017/2/16 10:37]
 * @UpdateRemark: [说明本次修改内容]
 * @Version: [v1.0]
 */
public interface SspDictAdTypeService {
    public RestResponse find(Long id);

    public RestResponse save(SspDictAdType SspDictAdType);

    public void update(SspDictAdType SspDictAdType);

    public RestResponse page(PageCriteria pageCriteria);

    public void deleteById(Long id);

    public void batchDelete(Long[] ids);
}
