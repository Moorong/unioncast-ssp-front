package com.unioncast.ssp.front.controller.ssp;

import com.unioncast.common.page.*;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.ssp.model.SspOperLog;
import com.unioncast.ssp.front.controller.common.BaseController;
import com.unioncast.ssp.front.service.ssp.sspOperLogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * Simple to Introduction
 *
 * @Description: [日志管理控制类]
 * @Author: [dxy]
 * @CreateDate: [2017/2/22 16:01]
 * @UpdateRemark: [说明本次修改内容]
 * @Version: [v1.0]
 */
@Api("日志")
@Controller
@RequestMapping("/rest/orerLog/log")
public class SspOperLogController extends BaseController {

    private static final Logger LOG = LogManager.getLogger(SspOrderController.class);

    @Autowired
    private sspOperLogService service;


    @ApiOperation(value = "日志列表跳转页", httpMethod = "GET")
    @RequestMapping(value = {"/list"}, method = RequestMethod.GET)
    public String list(){
        return "ssp/operlog/loglist";
    }



    @ApiOperation(value = "条件分页查询", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "pageCriteria", value = "分页查询条件", required = true, dataType = "PageCriteria", paramType = "body")
    @ResponseBody
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    public Pagination<SspOperLog> page(@RequestParam(value = "adPutState", required = false) String adPutState,
                                     @RequestParam(value = "orderName", required = false) String orderName,
                                     @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize,
                                     @RequestParam(value = "currentPageNo", required = false, defaultValue = "1") int currentPageNo,
                                     @RequestParam(value = "pushStartTime", required = false) String pushStartTime,
                                     @RequestParam(value = "pushEndTime", required = false) String pushEndTime,
                                     String advertiserId) {
        Pagination<SspOperLog> result = null;
        try {
            PageCriteria pageCriteria = new PageCriteria();
            List<SearchExpression> seplist = new ArrayList<>(); //搜索条件集合
            List<OrderExpression> orderExpressionList = new ArrayList<>();//排序集合

            pageCriteria.setCurrentPageNo(currentPageNo);
            pageCriteria.setPageSize(pageSize);
            pageCriteria.setEntityClass(SspOperLog.class);
            pageCriteria.setPredicate(Operation.AND);

        /*    OrderExpression orderExpression = new OrderExpression();
            orderExpression.setPropertyName("update_time");
            orderExpression.setOp("DESC");
            orderExpressionList.add(orderExpression);
            pageCriteria.setOrderExpressionList(orderExpressionList);
            SearchExpression sep = null;
            if (CommonUtil.isNotNull(advertiserId)) {
                sep = new SearchExpression();
                sep.setPropertyName("advertiser_id");
                sep.setValue(advertiserId);
                sep.setOperation(Operation.EQ);
                seplist.add(sep);
            }
            pageCriteria.setSearchExpressionList(seplist);*/
            result = service.page(pageCriteria);
        } catch (Exception e) {
            LOG.error("获取订单分页出错");
        }
        return result;
    }

}
