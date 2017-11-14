package com.unioncast.ssp.front.config;

import com.unioncast.common.user.model.User;
import com.unioncast.common.util.CommonUtil;
import com.unioncast.ssp.front.common.util.Common;
import com.unioncast.ssp.front.common.util.ResponseFactory;
import com.unioncast.ssp.front.rest.model.RestStatus;
import com.unioncast.ssp.front.security.CustomAuthenticationProvider;
import com.unioncast.ssp.front.security.CustomUserDetailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * WEB安全配置类
 * 
 * @author changguobin@unioncast.cn
 * @date 2016-11-02 14:12:52
 */
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Resource
	private CustomAuthenticationProvider customAuthenticationProvider;
	@Resource
	private Environment env;

	private final String loginUrl = "/login";

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				// 禁用CSRF保护
				.csrf().disable().authorizeRequests().antMatchers(loginUrl).permitAll()
				// 其他地址的访问均需验证权限
				.anyRequest().authenticated().and().formLogin()
				// 指定登录页是”/login”
				.loginPage(loginUrl).permitAll()
				// 登陆成功后的处理，因为是API的形式所以不用跳转页面
				.successHandler(new RestAuthenticationSuccessHandler())
				// 登陆失败后的处理
				.failureHandler(new RestAuthenticationFailureHandler()).and()
				// 登出后的处理
				.logout().logoutSuccessHandler(new RestLogoutSuccessHandler()).invalidateHttpSession(true).deleteCookies("remeber-me")
				.and()
				// 认证不通过后的处理
				.exceptionHandling().authenticationEntryPoint(new RestAuthenticationEntryPoint())
		        .and()
				.rememberMe().tokenValiditySeconds(2419200).rememberMeCookieName("remeber-me").key("!@#$%?").userDetailsService(userDetailService());
	}
	@Bean
	CustomUserDetailService userDetailService(){
		CustomUserDetailService userDetailService = new CustomUserDetailService();
		return userDetailService;
	}
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/register/**", "/plugs/**");
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// 将验证过程交给自定义验证工具
		auth.authenticationProvider(customAuthenticationProvider);
	}

	/**
	 * 登陆成功后的处理
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2016-11-02 14:13:14
	 */
	public class RestAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

		@Override
		public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
				Authentication authentication) throws ServletException, IOException {
			clearAuthenticationAttributes(request);
			System.err.println("登陆成功后的处理");
			// 获得授权后可得到用户信息 可使用SUserService进行数据库操作
			User userDetails = (User) authentication.getPrincipal();

			// 输出登录提示信息
			System.err.println("管理员 " + userDetails.getEmail() + " 登录");

			System.err.println("IP :" + Common.getIpAddress(request));

			super.onAuthenticationSuccess(request, response, authentication);
		}
	}

	/**
	 * 登陆失败后的处理
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2016-11-02 14:13:36
	 */
	public class RestAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
		@Override
		public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
				AuthenticationException exception) throws IOException, ServletException {
			// TODO Auto-generated method stub
			System.err.println("登陆失败后的处理");
			System.err.print(exception.getMessage());
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.setCharacterEncoding("UTF-8");
			// response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
			// exception.getMessage());
			response.getWriter().write(ResponseFactory.exception(RestStatus.UNAUTHORIZED, exception));
			// super.onAuthenticationFailure(request, response, exception);
		}
	}

	/**
	 * 登出成功后的处理
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2016-11-02 14:13:40
	 */
	public class RestLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {

		@Override
		public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
				Authentication authentication) throws IOException, ServletException {
			// Do nothing!
			System.err.println("登出成功后的处理");
			response.sendRedirect(String.format("%s%s", env.getProperty("server.contextPath"), loginUrl));
		}
	}

	/**
	 * 权限不通过的处理
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2016-11-02 14:13:44
	 */
	public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {
		@Override
		public void commence(HttpServletRequest request, HttpServletResponse response,
				AuthenticationException authException) throws IOException {
			System.err.println((Common.isJsonHeader(request) ? "Ajax" : "普通") + "请求权限不通过的处理");
			if (CommonUtil.isNull(authException, authException.getMessage()))
				return;
			if (Common.isJsonHeader(request)) {
				// response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
				// ResponseFactory.exception(authException));
				response.getWriter().write(ResponseFactory.exception(RestStatus.UNAUTHORIZED, authException));
			} else {
				response.sendRedirect(String.format("%s%s", env.getProperty("server.contextPath"), loginUrl));
			}
		}
	}
}
