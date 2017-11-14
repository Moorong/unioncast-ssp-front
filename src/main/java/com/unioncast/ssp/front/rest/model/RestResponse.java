package com.unioncast.ssp.front.rest.model;

import java.io.Serializable;

import com.unioncast.common.restClient.RestError;
import com.unioncast.common.util.CommonUtil;

/**
 * rest请求响应
 * 
 * @author changguobin@unioncast.cn
 */
public class RestResponse<T> implements Serializable {

	public RestResponse(int status, RestError[] restErrors, Object result) {
		super();
		this.status = status;
		this.restErrors = restErrors;
		this.result = result;
	}

	private static final long serialVersionUID = 8694878353724315950L;

	public static final int OK = 0;

	public static final int FAIL = 1;

	/**
	 * 状态码，0：调用成功，1：调用失败
	 */
	private int status;
	/**
	 * 异常信息
	 */
	private RestError[] restErrors;

	/**
	 * 正常的返回结果
	 */
	private Object result;

	public RestResponse() {
		super();
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Object getResult() {
		return result;
	}

	public T getResultT() {
		try {
			if (CommonUtil.isNotNull(result))
				return (T) result;
		} catch (Exception e) {
			return null;
		}
		return null;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public RestError[] getRestErrors() {
		return restErrors;
	}

	public void setRestErrors(RestError[] restErrors) {
		this.restErrors = restErrors;
	}

	public static int getOk() {
		return OK;
	}

	public static int getFail() {
		return FAIL;
	}
}
