package com.unioncast.ssp.front.rest.template;

import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;
import com.unioncast.ssp.front.common.util.RestUtil;
/**
 * 服务请求父类
 * @author changguobin@unioncast.cn
 */
@Component
public class RestTemplate {

	/**
	 * 向用户系统服务发起post请求
	 * 
	 * @author changguobin@unioncast.cn
	 * @param <T>
	 * @date 2016-10-10 17:19:05
	 *
	 * @param methodUrl
	 * @param paramEntity
	 * @param restResponseClass
	 * @return RestResponse<T>
	 */
	public <T> T postForObjectForUser(String methodUrl, HttpEntity<?> paramEntity, Class<T> restResponseClass) {
		return RestUtil.postForObjectForUser(methodUrl, paramEntity, restResponseClass);
	}

	/**
	 * 向数据访问层服务发起post请求
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2016-10-10 17:19:31
	 *
	 * @param methodUrl
	 * @param paramEntity
	 * @param restResponseClass
	 * @return RestResponse<T>
	 */
	public <T> T postForObjectForDB(String methodUrl, HttpEntity<?> paramEntity, Class<T> restResponseClass) {
		return RestUtil.postForObjectForDB(methodUrl, paramEntity, restResponseClass);
	}
	public <T> T postForObjectForRep(String methodUrl, HttpEntity<?> paramEntity, Class<T> restResponseClass) {
		return RestUtil.postForObjectForRep(methodUrl, paramEntity, restResponseClass);
	}
}
