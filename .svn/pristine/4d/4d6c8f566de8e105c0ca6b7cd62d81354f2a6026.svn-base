package com.unioncast.ssp.front.common.util;

import org.springframework.http.HttpEntity;

public class MyHttpEntity<T> extends HttpEntity<T>{
	
	/**
	 * Create a new, empty {@code HttpEntity}.
	 */
	public MyHttpEntity() {
		super(null, HttpHeaderUtil.requestHeaders);
	}

	/**
	 * Create a new {@code HttpEntity} with the given body and no headers.
	 * @param body the entity body
	 */
	public MyHttpEntity(T body) {
		super(body, HttpHeaderUtil.requestHeaders);
	}

}
