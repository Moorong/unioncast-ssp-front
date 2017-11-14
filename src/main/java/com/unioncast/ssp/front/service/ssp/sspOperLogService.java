package com.unioncast.ssp.front.service.ssp;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.page.Pagination;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspOperLog;

/**
 * Simple to Introduction
 *
 * @Description: [日志服务类]
 * @Author: [dxy]
 * @CreateDate: [2017/2/22 15:52]
 * @UpdateRemark: [说明本次修改内容]
 * @Version: [v1.0]
 */
public interface sspOperLogService {

    public RestResponse find(Long id);

    public RestResponse save(SspOperLog sspOperLog);

    public void update(SspOperLog sspOperLog);

    public void deleteById(Long id);

    public void batchDelete(Long[] ids);

    public Pagination<SspOperLog> page(PageCriteria pageCriteria) throws Exception;
}
