package com.unioncast.ssp.front.interceptor;

import com.unioncast.ssp.front.common.util.Common;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Configuration
public class LoggingInterceptor extends HandlerInterceptorAdapter{
	private static final Logger LOG = LoggerFactory.getLogger(LoggingInterceptor.class);
	public static final String START_TIME = "_start_time";

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		LOG.info("current visiting uri : [{}] ip : [{}]", request.getRequestURI(), Common.getIpAddress(request));
		long startTime = System.currentTimeMillis();
		request.setAttribute("_start_time", Long.valueOf(startTime));
		return true;
	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		String requestUri = request.getRequestURI();
		long startTime = ((Long) request.getAttribute("_start_time")).longValue();
		long executeTime = System.currentTimeMillis() - startTime;
		LOG.info("current visiting uri :[{}] , ip : [{}] , in {}ms.", requestUri, Common.getIpAddress(request),
				Long.valueOf(executeTime));
	}
}