package com.unioncast.ssp.front.controller.user;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.unioncast.common.user.model.UserSystem;
import com.unioncast.common.util.CommonUtil;
import com.unioncast.ssp.front.common.util.SystemSession;
import com.unioncast.ssp.front.controller.common.BaseController;
import com.unioncast.ssp.front.service.ssp.SspRoleService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.restClient.RestResponseFactory;
import com.unioncast.common.user.model.Role;
import com.unioncast.common.user.model.User;
import com.unioncast.common.user.model.UserRole;
import com.unioncast.common.util.Md5PwdEncoder;
import com.unioncast.ssp.front.common.util.SendEmail;
import com.unioncast.ssp.front.service.user.UserSystemService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

/**
 * 注册和忘记密码方法，免验证
 * 
 * @auther wangyao
 * @date 2017-02-09 10:59
 * 
 */
@Controller
@RequestMapping("/register")
public class RegisterController extends BaseController {
	@Resource
	private UserSystemService userSystemService;

	@Resource
	private Environment env;
	@Resource
	private SspRoleService sspRoleService;

	/**
	 * 注册跳转页
	 *
	 * @return
	 * @author wangyao
	 * @date 2017/2/7 9:53
	 */
	@ApiOperation(value = "注册页跳转")
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String register() {
		return "main/register";
	}

	/**
	 * 找回密码跳转
	 *
	 * @return
	 * @author wangyao
	 * @date 2017/2/9 11:08
	 */
	@ApiOperation(value = "找回密码跳转")
	@RequestMapping(value = "/findPassword", method = RequestMethod.GET)
	public String findPassword() {
		return "main/findPassword";
	}

	/**
	 * 邮箱安全验证跳转
	 * 
	 * @return
	 * @author wangyao
	 * @date 2017/2/9 11:55
	 */
	@ApiOperation(value = "邮箱安全验证跳转")
	@RequestMapping(value = "/emailCertificate", method = RequestMethod.GET)
	public String emailCertificate(@RequestParam String email, ModelMap model) {
		email = email.replace("'", "");
		model.addAttribute("email", email);
		return "main/securityCertificate";
	}

	/**
	 * 手机号验证跳转
	 * 
	 * @param phone
	 * @param model
	 * @return
	 * @author wangyao
	 * @date 2017/2/22 17:14
	 */
	@ApiOperation(value = "手机号验证跳转")
	@RequestMapping(value = "/phoneCertificate", method = RequestMethod.GET)
	public String phoneCertificate(@RequestParam String phone, ModelMap model) {
		model.addAttribute("phone", phone);
		return "main/resetPassword";
	}

	/**
	 * 通过邮件链接重置密码
	 * 
	 * @return
	 * @author wangyao
	 * @date 2017/2/9 12:00
	 */
	@ApiOperation(value = "通过邮件链接重置密码")
	@RequestMapping(value = "/resetPassword", method = RequestMethod.GET)
	public String resetPassword(HttpServletRequest request, ModelMap model) throws Exception {
		String sid = request.getParameter("sid");
		String email = request.getParameter("email");
		User user = new User();
		user.setEmail(email);
		System.out.println("sid>>>" + sid);

		if (StringUtils.isBlank(sid) || StringUtils.isBlank(email)) {
			model.addAttribute("err", "链接不完整,请重新生成.");
			return "main/findPassword";
		}
		user.setRemark(env.getProperty("rest.restSystemName"));
		User[] users = userSystemService.findByUserAndSystem(user);
		if (users != null && users.length > 0) {
			User user1 = users[0];
			// TODO 获取签名 截取时间
			String str = user1.getValidataCode();
			String[] s = str.split("\\$");
			Long outDate = Long.valueOf(s[1]);
			Long currentTime = System.currentTimeMillis();
			if (outDate <= currentTime) { // 表示已经过期
				model.addAttribute("err", "链接失效,请重新申请找回密码.");
				return "main/findPassword";
			}

			String digitalSignature = Md5PwdEncoder.encodePassword(str);// 数字签名

			if (!digitalSignature.equals(sid)) {
				throw new Exception("链接不正确,请重新申请找回密码.");
			} else {
				model.addAttribute("sid", str);
				return "main/resetPassword";
			}
		} else {
			model.addAttribute("err", "链接错误,无法找到匹配用户,请重新申请找回密码.");
			return "main/findPassword";
		}

	}

	/**
	 * 查找用户（免验证）
	 *
	 * @param user
	 * @return
	 * @author wangyao
	 * @date 2017/2/7 16:20
	 */
	@ApiOperation(value = "根据对象查找用户", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "user", required = true, dataType = "User", paramType = "body")
	@RequestMapping(value = "/findByUser", method = RequestMethod.POST)
	public @ResponseBody RestResponse findByUser(User user) {
		try {
			User[] user1 = userSystemService.findByUser(user);
			return RestResponseFactory.ok(user1);
		} catch (Exception e) {
			return RestResponseFactory.exception(e);
		}
	}

	/**
	 * 查找系统所属用户
	 * 
	 * @param user
	 * @return
	 * @author wangyao
	 * @date 2017/2/23 15:51
	 */
	@ApiOperation(value = "根据对象查找用户", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "user", required = true, dataType = "User", paramType = "body")
	@RequestMapping(value = "/findByUserAndSystem", method = RequestMethod.POST)
	public @ResponseBody RestResponse findByUserAndSystem(User user) {
		try {
			user.setRemark(env.getProperty("rest.restSystemName"));
			User[] user1 = userSystemService.findByUserAndSystem(user);
			return RestResponseFactory.ok(user1);
		} catch (Exception e) {
			return RestResponseFactory.exception(e);
		}
	}

	/**
	 * 注册用户（免验证）
	 *
	 * @param user
	 * @return
	 * @author wangyao
	 * @date 2017/2/7 16:20
	 */
	@ApiOperation(value = "新增用户", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "user", required = true, dataType = "User", paramType = "body")
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public @ResponseBody RestResponse addUser(User user) {
		try {
			String encodePassword = Md5PwdEncoder.encodePassword(user.getLoginPassword());
			user.setLoginPassword(encodePassword);
			user.setCreateTime(new Date());
			user.setUpdateTime(new Date());
			user.setIsDelete(0);
			user.setState(0);
			user.setUserType(2);
			RestResponse saveResult = userSystemService.save(user);
			Long userId = Long.valueOf(String.valueOf(saveResult.getResult()));
			Long sysyemId = SystemSession.CURRENT_SYSTEM_IMFO.getId();
			UserSystem userSystem = new UserSystem();
			userSystem.setSystemId(sysyemId);
			userSystem.setUserId(userId);
			userSystem.setCreateTime(new Date());
			String id = UUID.randomUUID().toString();
			userSystem.setUserSystemId(id);

			userSystemService.saveUserSystem(new UserSystem[] { userSystem });
			Role role = sspRoleService.findByRoleName("默认角色", sysyemId);
			if (CommonUtil.isNotNull(role)) {
				List<UserRole> userRoleList = new ArrayList<UserRole>();
				UserRole userRole = new UserRole();
				userRole.setRoleId(role.getId());
				userRole.setUserId(userId);
				userRole.setCreateTime(new Date());
				String userRoleId = UUID.randomUUID().toString();
				userRole.setUserRoleId(userRoleId);
				userRoleList.add(userRole);
				userSystemService.saveUserRole(userRoleList.toArray(new UserRole[] {}));
			}
			return RestResponseFactory.ok();
		} catch (Exception e) {
			return RestResponseFactory.exception(e);
		}
	}

	/**
	 * 通过邮箱找回密码
	 *
	 * @param user
	 * @param request
	 * @return
	 * @author wangyao
	 * @date 2017/2/9 16:27
	 */
	@ApiOperation(value = "通过邮箱找回密码", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "findPwdByEmail", required = true, dataType = "String", paramType = "body")
	@RequestMapping(value = "/findPwdByEmail", method = RequestMethod.POST)
	public @ResponseBody RestResponse findPwdByEmail(User user, HttpServletRequest request) {
		try {
			user.setRemark(env.getProperty("rest.restSystemName"));
			User[] users = userSystemService.findByUserAndSystem(user);
			User user1 = users[0];
			String secretKey = UUID.randomUUID().toString().replace("-", ""); // 密钥
			long date = (System.currentTimeMillis() + 30 * 60 * 1000);// 30分钟后过期
			// 设置标识，链接只可以使用一次
			String key = user.getEmail() + "$" + date + "$" + secretKey + "$000000";
			// 更库，设置数字签名 不加密保存
			user1.setValidataCode(key);
			user1.setUpdateTime(new Date());

			userSystemService.update(user1);

			String digitalSignature = Md5PwdEncoder.encodePassword(key);// 数字签名

			String path = request.getContextPath();
			String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
					+ path + "/";
			String resetPassHref = basePath + "register/resetPassword?sid=" + digitalSignature + "&email="
					+ user1.getEmail();
			String emailContent = "请勿回复本邮件.点击下面的链接,重设密码<br/><a href=" + resetPassHref + " target='_BLANK'>"
					+ resetPassHref + "</a><br/>  或者    <a href=" + resetPassHref + " target='_BLANK'>点击我重新设置密码</a>"
					+ "<br/>tips:本邮件超过30分钟,链接将会失效，需要重新申请";

			SendEmail.send(user1.getEmail(), emailContent);
			return RestResponseFactory.ok();
		} catch (Exception e) {
			return RestResponseFactory.exception(e);
		}
	}

	/**
	 * 通过邮箱修改用户密码
	 * 
	 * @param user
	 * @param sid
	 * @return
	 * @author wangyao
	 * @date 2017/2/22 17:19
	 */
	@ApiOperation(value = "通过邮箱修改用户密码", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParams({ @ApiImplicitParam(name = "user", required = true, dataType = "User", paramType = "body"),
			@ApiImplicitParam(name = "sid", required = true, dataType = "String", paramType = "body") })
	@RequestMapping(value = "resetPswByEamil", method = RequestMethod.POST)
	public @ResponseBody RestResponse resetPswByEamil(User user, @RequestParam String sid) {
		try {
			String[] s = sid.split("\\$");
			user.setEmail(s[0].toString());
			user.setUpdateTime(new Date());
			String encodePassword = Md5PwdEncoder.encodePassword(user.getLoginPassword());
			user.setLoginPassword(encodePassword);
			Long currentTime = System.currentTimeMillis();
			String key = user.getEmail() + "$" + currentTime + "$" + s[2].toString();// 数字签名
			// 设置数字签名中时间过期，保证链接只能使用一次
			user.setValidataCode(key);
			userSystemService.updateByEmail(user);
			return RestResponseFactory.ok();
		} catch (Exception e) {
			return RestResponseFactory.exception(e);
		}
	}

	@ApiOperation(value = "通过手机号找回密码", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "findPwdByPhone", required = true, dataType = "String", paramType = "body")
	@RequestMapping(value = "/findPwdByPhone", method = RequestMethod.POST)
	public @ResponseBody RestResponse findPwdByPhone(User user, HttpServletRequest request) {
		try {
			user.setRemark(env.getProperty("rest.restSystemName"));
			User[] users = userSystemService.findByUserAndSystem(user);
			User user1 = users[0];
			String secretKey = UUID.randomUUID().toString().replace("-", ""); // 密钥
			String smsCode = String.valueOf((Math.random() * 9 + 1) * 100000); // 验证码
			smsCode = "123456";
			// String smsCode = String.valueOf((Math.random() * 9 + 1) *
			// 100000); // 验证码
			long date = (System.currentTimeMillis() + 30 * 60 * 1000);// 30分钟后过期
			// 设置标识，链接只可以使用一次
			String key = user.getPhone() + "$" + date + "$" + secretKey + "$" + smsCode;
			// 更库，设置数字签名 不加密保存
			user1.setValidataCode(key);
			user1.setUpdateTime(new Date());

			userSystemService.update(user1);

			// TODO 发送短信验证码

			return RestResponseFactory.ok();
		} catch (Exception e) {
			return RestResponseFactory.exception(e);
		}
	}

	/**
	 * 验证短信验证码
	 * 
	 * @param smsCode
	 * @return
	 */
	@ApiOperation(value = "验证短信验证码", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParams({
			@ApiImplicitParam(name = "smsCode", required = true, dataType = "String", paramType = "body") })
	@RequestMapping(value = "checkSmsCode", method = RequestMethod.POST)
	public @ResponseBody boolean checkSmsCode(@RequestParam String smsCode, @RequestParam String phone) {
		User user = new User();
		user.setRemark(env.getProperty("rest.restSystemName"));
		try {
			user.setPhone(phone);
			User[] users = userSystemService.findByUserAndSystem(user);
			if (users != null) {
				User user1 = users[0];
				// 获取数字签名
				String validataCode = user1.getValidataCode();
				String[] s = validataCode.split("\\$");
				Long outDate = Long.valueOf(s[1]);
				String phoneStr = String.valueOf(s[0]);
				String smsCodeStr = String.valueOf(s[3]);
				Long currentTime = System.currentTimeMillis();
				// 手机号、时间（30分）、验证码都满足时，验证通过
				if ((phone.equals(phoneStr)) && (outDate > currentTime) && (smsCode.equals(smsCodeStr))) {
					return true;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@ApiOperation(value = "通过手机号找回密码")
	@RequestMapping(value = "/resetPwdByPhone", method = RequestMethod.POST)
	public String resetPwdByPhone(User user, ModelMap model) {
		model.addAttribute("phone", user.getPhone());
		return "main/resetPassword";
	}
}
