package com.unioncast.ssp.front.common.util;

import javax.servlet.http.HttpServletRequest;
/**
 * 公共方法工具类
 * @author changguobin@unioncast.cn
 * @date 2016-11-09 09:58:08
 */
public class Common {
	/**
	 * 通过请求信息判断请求类型
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2016-10-27 11:46:55
	 *
	 * @param request
	 * @return Boolean
	 */
	public static Boolean isJsonHeader(HttpServletRequest request) {
		return (request.getHeader("X-Requested-With") != null
				&& "XMLHttpRequest".equals(request.getHeader("X-Requested-With").toString()));
	}

	/**
	 * 获取登录IP地址
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2016-11-02 14:13:22
	 *
	 * @param request
	 * @return String
	 */
	public static String getIpAddress(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		if("0:0:0:0:0:0:0:1".equals(ip))return "127.0.0.1";
		return ip;
	}
}
