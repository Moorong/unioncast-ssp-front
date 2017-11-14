package com.unioncast.ssp.front.service.ssp.impl;

import com.unioncast.common.page.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspOperLog;
import com.unioncast.ssp.front.common.util.MyHttpEntity;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.ssp.sspOperLogService;

/**
 * Simple to Introduction
 *
 * @Description: [日志服务类实现类]
 * @Author: [dxy]
 * @CreateDate: [2017/2/22 15:54]
 * @UpdateRemark: [说明本次修改内容]
 * @Version: [v1.0]
 */
@Service
public class sspOperLogServiceImpl implements sspOperLogService {

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public RestResponse find(Long id) {
        SspOperLog sspOperLog = new SspOperLog();
        sspOperLog.setId(id);
        HttpEntity<SspOperLog> httpEntity = new MyHttpEntity<SspOperLog>(
                sspOperLog);
        return restTemplate.postForObjectForDB(
                "/rest/ssp/operLog/find", httpEntity,
                RestResponse.class);
    }

    @Override
    public RestResponse save(SspOperLog sspOperLog) {
        HttpEntity<SspOperLog> httpEntity = new MyHttpEntity<SspOperLog>(
                sspOperLog);
        return restTemplate.postForObjectForDB(
                "/rest/ssp/operLog/add",
                httpEntity, RestResponse.class);

    }

    @Override
    public void update(SspOperLog sspOperLog) {
        HttpEntity<SspOperLog> httpEntity = new MyHttpEntity<SspOperLog>(
                sspOperLog);
        restTemplate.postForObjectForDB("/rest/ssp/operLog/update",
                httpEntity, RestResponse.class);
    }

    @Override
    public Pagination<SspOperLog> page(PageCriteria pageCriteria) throws Exception {
        HttpEntity<PageCriteria> httpEntity = new MyHttpEntity<PageCriteria>(pageCriteria);
        return restTemplate.postForObjectForDB("/rest/ssp/operLog/page", httpEntity, Pagination.class);
    }

    @Override
    public void deleteById(Long id) {
        Long[] ids = new Long[] { id };
        HttpEntity<Long[]> httpEntity = new MyHttpEntity<Long[]>(ids);
        restTemplate.postForObjectForDB("/rest/ssp/operLog/update",
                httpEntity, RestResponse.class);
    }

    @Override
    public void batchDelete(Long[] ids) {
        HttpEntity<Long[]> httpEntity = new MyHttpEntity<Long[]>(ids);
        restTemplate.postForObjectForDB(
                "/rest/ssp/operLog/batchDelete", httpEntity,
                RestResponse.class);
    }
}
