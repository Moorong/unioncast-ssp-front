package com.unioncast.ssp.front.controller.common;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.unioncast.ssp.front.service.user.UserSystemService;

import io.swagger.annotations.ApiOperation;

/**
 * 公共视图控制器
 * 
 * @author changguobin@unioncast.cn
 */
@Controller
public class CommonController extends BaseController {

	@Resource
	private UserSystemService userSystemService;

	/**
	 * 跳转到登陆页
	 * 
	 * @author shixiaoting
	 * @date 2016年10月11日 下午2:01:56
	 */
	@ApiOperation(value = "登录页跳转")
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth instanceof AnonymousAuthenticationToken) {
			return "main/login";
		}
		return "redirect:/index";
	}

	/**
	 * demo/list
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2016-10-10 19:12:55
	 *
	 * @return String
	 */
	@ApiOperation(value = "demo")
	@RequestMapping(value = { "/rest/demo" }, method = RequestMethod.GET)
	public String main(HttpSession session) {
		return "demo/demo";
	}

	/**
	 * 首页跳转
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2016-10-10 19:12:55
	 *
	 * @return String
	 */
	@ApiOperation(value = "默认跳转")
	@RequestMapping(value = { "/", "/index" }, method = RequestMethod.GET)
	public String index(HttpSession session) {
		return "main/main";
	}


	/**
	 * 无权限跳转
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2016-10-10 19:12:55
	 *
	 * @return String
	 */
	// @RequestMapping(value = {"/norole"},method = RequestMethod.GET)
	// public String norole(HttpSession session) {
	// return "error/norole";
	// }
}
