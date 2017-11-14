package com.unioncast.ssp.front.rest.model;

import java.io.Serializable;
import java.util.List;

import com.unioncast.common.user.model.User;
/**
 * 
 *<p>
 *
 *</p>
 *@author shixiaoting
 * @param <T>
 *@date 2016年10月11日  上午11:40:36
 */
public class UserRestResponse extends RestResponse<User> implements Serializable {

	private static final long serialVersionUID = 8694878353764315950L;
	/**
	 * 响应列表
	 */
	private List<User> result;

	public List<User> getResult() {
		return result;
	}

	public void setResult(List<User> result) {
		this.result = result;
	}
}
