package com.unioncast.ssp.front.common.util;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.unioncast.common.restClient.RestError;
import com.unioncast.ssp.front.rest.model.RestResponse;
import com.unioncast.ssp.front.rest.model.RestStatus;

/**
 * 响应工厂
 * 
 * @author changguobin@unioncast.cn
 */
public class ResponseFactory {

	public static String ok() {
		String result = RestStatus.OK.name();
		return status(RestStatus.OK, null, result);
	}

	public static String ok(Object result) {
		return status(RestStatus.OK, null, result);
	}

	public static String ok(RestStatus restStatus, Object result) {
		return status(restStatus, null, result);
	}

	public static String ok(String key, Object value) {
		Map<String, Object> result = new HashMap<>();
		result.put(key, value);

		return status(RestStatus.OK, null, result);
	}

	public static String id(Long id) {
		if (id > 0) {
			return ok("id", id);
		}

		return exception();
	}

	public static String exception() {
		String errors = RestStatus.INTERNAL_SERVER_ERROR.name();

		return status(RestStatus.INTERNAL_SERVER_ERROR, errors, null);
	}

	public static String exception(Exception e) {
		return exception(RestStatus.INTERNAL_SERVER_ERROR, e);
	}

	public static String exception(RestStatus restStatus, Exception e) {
		String errors = null;
		if (e != null) {
			errors = e.getMessage();

			if (errors == null) {
				errors = e.getClass().getSimpleName();
			}
		}
		return status(restStatus, errors, null);
	}

	public static <T> String status(RestStatus restStatus, String errors, T result) {
		RestError restError = new RestError();
		restError.setCode(restStatus.getStatus());
		restError.setMessage(errors);
		return toJsonString(new RestResponse<T>(restStatus.getStatus(), new RestError[] { restError }, result));
	}

	private static String toJsonString(Object obj) {
		try {
			return JSONObject.toJSONString(obj);
		} catch (Exception e) {
			return toJsonString(exception());
		}
	}
}
