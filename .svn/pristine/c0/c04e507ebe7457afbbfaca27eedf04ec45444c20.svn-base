package com.unioncast.ssp.front.controller.common;

import javax.servlet.http.HttpServletRequest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import com.unioncast.ssp.front.common.util.Common;
import com.unioncast.ssp.front.common.util.ResponseFactory;
import com.unioncast.common.util.CommonUtil;
/**
 * 统一异常处理父类
 * @author changguobin@unioncast.cn
 * @date 2016-10-27 11:46:25
 */
public class BaseController implements EnvironmentAware{
	
	public static final String DEFAULT_ERROR_VIEW = "error/500";
	private static final Logger logger = LogManager.getLogger(BaseController.class);
	/**
	 * 获取配置
	 */
	protected Environment env;
	
    /**
     * 统一异常处理
     * @author changguobin@unioncast.cn
     * @date 2016-10-27 11:46:44
     *
     * @param request
     * @param e
     * @return Object
     */
    @ExceptionHandler(Exception.class)
    public Object handleBaseException(HttpServletRequest request,Exception e) {
    	if(CommonUtil.isNull(e,e.getMessage()))return null;
        if(Common.isJsonHeader(request)) {
            return ResponseFactory.exception(e);
        } else {
        	ModelAndView mav = new ModelAndView();
    		mav.addObject("exception", e);
    		mav.addObject("url", request.getRequestURL());
    		mav.setViewName(DEFAULT_ERROR_VIEW);
    		logger.error("defaultErrorHandler \n[\n-url:{}\n-exception:{}\n]",request.getRequestURL(),e.toString());
            return mav;
        }
    }

	@Override
	public void setEnvironment(Environment env) {
		this.env = env;
	}
}