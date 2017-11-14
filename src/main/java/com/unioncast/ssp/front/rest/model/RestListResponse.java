package com.unioncast.ssp.front.rest.model;

import java.io.Serializable;
import java.util.List;
/**
 * Rest列表响应对象
 * @author changguobin@unioncast.cn
 */
public class RestListResponse<T> implements Serializable {

	private static final long serialVersionUID = 8694878353724315950L;
	/**
	 * 响应列表
	 */
	private List<T> result;

	public List<T> getResult() {
		return result;
	}

	public void setResult(List<T> result) {
		this.result = result;
	}
}
