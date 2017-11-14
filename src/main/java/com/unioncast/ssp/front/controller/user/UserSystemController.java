package com.unioncast.ssp.front.controller.user;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import com.unioncast.common.util.Md5PwdEncoder;
import com.unioncast.ssp.front.common.util.SystemSession;
import com.unioncast.ssp.front.controller.common.BaseController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.restClient.RestResponseFactory;
import com.unioncast.common.user.model.Role;
import com.unioncast.common.user.model.User;
import com.unioncast.common.user.model.UserRole;
import com.unioncast.ssp.front.common.util.ResponseFactory;
import com.unioncast.ssp.front.model.SecurityUser;
import com.unioncast.ssp.front.service.user.UserSystemService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

/**
 * 用户视图控制器
 *
 * @author changguobin@unioncast.cn
 */
@Controller
@RequestMapping("rest/ssp/user")
public class UserSystemController extends BaseController {

    @Resource
    private UserSystemService userSystemService;

    private static final Logger LOG = LoggerFactory.getLogger(UserSystemController.class);

    /**
     * 用户注册映射
     *
     * @return
     * @author wangyao
     * @date 2017/1/20 9:17
     */
    @ApiOperation(value = "添加页面映射", httpMethod = "POST", response = RestResponse.class)
    @RequestMapping(value = {"/add"})
    public String saveUser() {
        return "ssp/system/redister";
    }

    /**
     * 账号列表映射
     *
     * @return
     * @author wangyao
     * @date 2017/1/20 9:25
     */
    @ApiOperation(value = "账号信息页面映射", httpMethod = "POST", response = RestResponse.class)
    @RequestMapping(value = {"/accountList"})
    public String accountList(ModelMap model) {
        model.addAttribute("systemId", SystemSession.CURRENT_SYSTEM_IMFO.getId());
        return "ssp/system/accountList";
    }

    /**
     * 修改密码页面映射
     *
     * @return
     * @author wangyao
     * @date 2017/2/6 9:40
     */
    @ApiOperation(value = "修改密码页面映射", httpMethod = "POST", response = RestResponse.class)
    @RequestMapping(value = {"/editPassword/{id}"})
    public String editPsw(@PathVariable Long id, ModelMap model) {
        model.addAttribute("id", id);
        return "ssp/system/editPassword";
    }

    /**
     * 修改邮箱页面映射
     *
     * @return
     * @author wangyao
     * @date 2017/2/6 9:41
     */
    @ApiOperation(value = "修改邮件页面映射", httpMethod = "POST", response = RestResponse.class)
    @RequestMapping(value = {"/editEmail"})
    public String editEmail() {
        return "ssp/system/editEmail";
    }

    /**
     * 修改手机号页面映射
     *
     * @return
     * @author wangyao
     * @date 2017/2/6 9:41
     */
    @ApiOperation(value = "修改手机号页面映射", httpMethod = "POST", response = RestResponse.class)
    @RequestMapping(value = {"/editPhone"})
    public String editPhone() {
        return "ssp/system/editPhone";
    }

    /**
     * 账号信息
     *
     * @return
     * @author wangyao
     * @date 2017/1/20 9:30
     */
    @ApiOperation(value = "当前账号信息", httpMethod = "POST", response = RestResponse.class)
    @RequestMapping(value = {"/currentAccountInfo"})
    public String currentAccountInfo(ModelMap model) {
        SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try {
            User[] currentUser = userSystemService.findById(user.getId());
            model.addAttribute("user", currentUser[0]);
            model.addAttribute("roleName", currentUser[0].getRoleList().get(0).getName());
            model.addAttribute("roleId", currentUser[0].getRoleList().get(0).getId());
        } catch (Exception e) {
            LOG.error("获取账号信息出错", e.getMessage());
        }
        return "ssp/system/currentAccountInfo";
    }

    /**
     * 验证当前密码
     *
     * @param oldPwd
     * @return
     * @author wangyao
     * @date 2017/2/6 14:34
     */
    @ApiOperation(value = "验证密码", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "oldPwd", required = true, dataType = "String", paramType = "body")
    @RequestMapping(value = {"/checkOldPwd/{oldPwd}"})
    @ResponseBody
    public String checkOldPwd(@PathVariable String oldPwd) {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String password = user.getPassword();
        String encodePassword = Md5PwdEncoder.encodePassword(oldPwd);
        if (password.equals(encodePassword)) {
            return "true";
        }
        return "false";
    }

    /**
     * 账号信息
     *
     * @param id
     * @param model
     * @return
     * @author wangyao
     * @date 2017/2/6 14:35
     */
    @ApiOperation(value = "账号信息", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "id", required = true, dataType = "Long", paramType = "body")
    @RequestMapping(value = {"/accountInfo/{id}"})
    public String accountInfo(@PathVariable Long id, ModelMap model) {
        try {
            User[] result = userSystemService.findById(id);
            List<Role> roleList = result[0].getRoleList();
            Role role = null;
            if (roleList != null && roleList.size() > 0) {
                role = roleList.get(0);
            }
            model.addAttribute("account", result[0]);
            model.addAttribute("role", role);
        } catch (Exception e) {
            LOG.error("获取账号信息出错", e.getMessage());
        }
        return "ssp/system/accountInfo";
    }

    /**
     * 登录校验
     *
     * @param username
     * @param password
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "validateLogin", method = RequestMethod.POST)
    public String login(String username, String password) {
        try {
            boolean flag = userSystemService.validateLogin(username, password);
            return ResponseFactory.ok(flag);
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            return ResponseFactory.exception(e);
        }
    }

    /**
     * 根据登录账号查找用户
     *
     * @param loginName
     * @return
     * @author wangyao
     * @date 2017/1/12 10:32
     */
    @ApiOperation(value = "根据登录名查找用户", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "loginName", required = true, dataType = "String", paramType = "body")
    @RequestMapping(value = "findByLoginName/{loginName}", method = RequestMethod.POST)
    public
    @ResponseBody
    RestResponse findByLoginName(@PathVariable String loginName) {
        LOG.info("loginName：{}", loginName);
        try {
            User user = new User();
            user.setLoginName(loginName);
            return userSystemService.findByLoginName(user);
        } catch (Exception e) {
            LOG.error("根据loginName查找用户出错", e.getMessage());
            return RestResponseFactory.exception(e);
        }
    }

    /**
     * 根据用户名查找用户
     *
     * @param userName
     * @return
     * @author wangyao
     * @date 2017/1/19 17:41
     */
    @ApiOperation(value = "根据用户名查找用户", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "userName", required = true, dataType = "String", paramType = "body")
    @RequestMapping(value = "findByLoginName/{userName}", method = RequestMethod.POST)
    public
    @ResponseBody
    RestResponse findByUserName(@PathVariable String userName) {
        LOG.info("userName：{}", userName);
        try {
            User user = new User();
            user.setUsername(userName);
            return userSystemService.findByUserName(user);
        } catch (Exception e) {
            LOG.error("根据userName查找用户出错", e.getMessage());
            return RestResponseFactory.exception(e);
        }
    }

    /**
     * 根据对象查找用户
     *
     * @param user
     * @return
     * @author wangyao
     * @date 2017/1/19 17:48
     */
    @ApiOperation(value = "根据对象查找用户", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "user", required = true, dataType = "User", paramType = "body")
    @RequestMapping(value = "findByUser", method = RequestMethod.POST)
    public
    @ResponseBody
    RestResponse findByUser(User user) {
        LOG.info("user：{}", user);
        try {
            User[] users = userSystemService.findByUser(user);
            return RestResponseFactory.ok(users[0]);
        } catch (Exception e) {
            LOG.error("根据对象查找用户出错", e.getMessage());
            return RestResponseFactory.exception(e);
        }
    }

    /**
     * 根据id查找用户
     *
     * @param id
     * @return
     * @author wangyao
     * @date 2017/1/12 14:07
     */
    @ApiOperation(value = "根据id查找用户", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "id", required = true, dataType = "Long", paramType = "body")
    @RequestMapping(value = "findById/{id}", method = RequestMethod.POST)
    public
    @ResponseBody
    RestResponse findById(@PathVariable Long id) {
        LOG.info("id：{}", id);
        try {
            User[] user = userSystemService.findById(id);
            return RestResponseFactory.ok(user[0]);
        } catch (Exception e) {
            LOG.error("根据id查找用户出错", e.getMessage());
            return RestResponseFactory.exception(e);
        }
    }

    /**
     * 修改用户信息
     *
     * @param user
     * @return
     * @author wangyao
     * @date 2017/1/12 11:11
     */
    @ApiOperation(value = "修改用户", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "user", required = true, dataType = "User", paramType = "body")
    @RequestMapping(value = "update", method = RequestMethod.POST)
    public
    @ResponseBody
    RestResponse findByLoginName(User user) {
        LOG.info("user：{}", user);
        try {
            //String encodePassword = Md5PwdEncoder.encodePassword(user.getLoginPassword());
            //user.setLoginPassword(encodePassword);
            user.setUpdateTime(new Date());
            userSystemService.update(user);
            LOG.info("修改用户信息执行成功!",user);
            Long userId = user.getId();
            List<Role> roleList = user.getRoleList();

            // 先将用户角色表中跟userId相关的数据都删除掉
            LOG.info("setRolesToUser--userId:{}", userId);
            userSystemService.deleteByUserId(userId);
            LOG.info("根据用户id删除用户角色关系执行成功!",user);
            if (roleList != null) {
                List<UserRole> userRoleList = new ArrayList<UserRole>();
                for (int i = 0; i < roleList.size(); i++) {
                    UserRole userRole = new UserRole();
                    Role role = roleList.get(i);
                    userRole.setRoleId(role.getId());
                    userRole.setUserId(userId);
                    userRole.setCreateTime(new Date());
                    String id = UUID.randomUUID().toString();
                    userRole.setUserRoleId(id);
                    userRoleList.add(userRole);
                }
                userSystemService.saveUserRole(userRoleList.toArray(new UserRole[]{}));
                LOG.info("添加用户角色关系执行成功!",user);
            }
            return RestResponseFactory.ok();
        } catch (Exception e) {
            LOG.error("修改用户出错", e.getMessage());
            return RestResponseFactory.exception(e);
        }
    }

    /**
     * 修改密码
     *
     * @param user
     * @return
     * @author wangyao
     * @date 2017/3/28  16:28
     */
    @ApiOperation(value = "修改用户密码", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "user", required = true, dataType = "User", paramType = "body")
    @RequestMapping(value = "editPwd", method = RequestMethod.POST)
    public
    @ResponseBody
    RestResponse editPwd(User user) {
        LOG.info("user：{}", user);
        try {
            String encodePassword = Md5PwdEncoder.encodePassword(user.getLoginPassword());
            user.setLoginPassword(encodePassword);
            user.setUpdateTime(new Date());
            userSystemService.update(user);
            LOG.info("修改用户信息执行成功!",user);
            return RestResponseFactory.ok();
        } catch (Exception e) {
            LOG.error("修改用户密码出错", e.getMessage());
            return RestResponseFactory.exception(e);
        }
    }

    /**
     * 加载修改密码页面
     *
     * @param model
     * @return
     * @author wangyao
     * @date 2017/1/12 16:03
     */
    @ApiOperation(value = "加载修改密码页面", httpMethod = "POST", response = RestResponse.class)
    @RequestMapping(value = "checkPassword", method = RequestMethod.POST)
    public String checkPassword(ModelMap model) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String password = userDetails.getPassword();
        model.addAttribute("oldPassword", password);
        // TODO
        return "";
    }

    /**
     * 账户分页
     *
     * @param pageCriteria
     * @return
     * @author wangyao
     * @date 2017/1/13 16:32
     */
    @ApiOperation(value = "用户分页", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "pageCriteria", required = true, dataType = "PageCriteria", paramType = "body")
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    public
    @ResponseBody
    RestResponse pageAll(PageCriteria pageCriteria) {
        LOG.info("pageCriteria:{}", pageCriteria);
        try {
            return userSystemService.pageAll(pageCriteria);
        } catch (Exception e) {
            LOG.error("获取用户数据出错", e.getMessage());
            return RestResponseFactory.exception(e);
        }
    }

    /**
     * 新增用户
     *
     * @param user
     * @return
     * @author wangyao
     * @date 2017/1/19 19:24
     */
    @ApiOperation(value = "新增用户", httpMethod = "POST", response = RestResponse.class)
    @ApiImplicitParam(name = "user", required = true, dataType = "User", paramType = "body")
    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public
    @ResponseBody
    RestResponse addUser(User user) {
        LOG.info("addUser:{}", user);
        try {
            user.setCreateTime(new Date());
            user.setUpdateTime(new Date());
            user.setIsDelete(0);
            user.setState(0);
            RestResponse saveResult = userSystemService.save(user);
            Long userId = Long.valueOf(String.valueOf(saveResult.getResult()));
            List<Role> roleList = user.getRoleList();

            // 先将用户角色表中跟userId相关的数据都删除掉
            LOG.info("setRolesToUser--userId:{}", userId);
            // userSystemService.deleteByUserId(userId);
            if (roleList != null) {
                List<UserRole> userRoleList = new ArrayList<UserRole>();
                for (int i = 0; i < roleList.size(); i++) {
                    UserRole userRole = new UserRole();
                    Role role = roleList.get(i);
                    userRole.setRoleId(role.getId());
                    userRole.setUserId(userId);
                    userRole.setCreateTime(new Date());
                    String id = UUID.randomUUID().toString();
                    userRole.setUserRoleId(id);
                    userRoleList.add(userRole);
                }
                userSystemService.saveUserRole(userRoleList.toArray(new UserRole[]{}));
            }
            return RestResponseFactory.ok();
        } catch (Exception e) {
            LOG.error("新增用户出错", e.getMessage());
            return RestResponseFactory.exception(e);
        }
    }
    
    @ApiOperation(value = "查找所有用户", httpMethod = "POST", response = RestResponse.class)
    @RequestMapping(value = "/findAll", method = RequestMethod.POST)
    public @ResponseBody RestResponse findAll() {
        try {
            return userSystemService.findAll();
        } catch (Exception e) {
            LOG.error("获取所有用户数据出错", e.getMessage());
            return RestResponseFactory.exception(e);
        }
    }

}
