package com.unioncast.ssp.front.service.user;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.user.model.*;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserSystemService {
    /**
     * 验证登录
     *
     * @param username
     * @param password
     * @return boolean
     * @author changguobin@unioncast.cn
     * @date 2016-10-10 16:01:01
     */
    public boolean validateLogin(String username, String password);

    /**
     * 注册用户
     *
     * @param username
     * @param password
     * @return boolean
     * @author changguobin@unioncast.cn
     * @date 2016-10-10 17:02:18
     */
    public boolean registerUser(String username, String password);

    /**
     * 根据登录用户名获取用户信息
     *
     * @param username
     * @return User
     * @author changguobin@unioncast.cn
     * @date 2016-10-24 14:51:43
     */
    public User findUserByName(String username);

    /**
     * 根据登录用户名获取用户登录详情信息
     *
     * @param loginName
     * @return UserDetails
     * @author changguobin@unioncast.cn
     * @date 2016-10-26 16:45:39
     */
    public UserDetails loadUserByUsername(String loginName, String password);

    /**
     * 根据登录用户名获取用户登录详情信息
     * @param loginName
     * @return
     * @author  wangyao
     * @date  2017/2/22  11:13
     */
    public User findUserByLoginname(String loginName);

    /**
     * 根据登录账号查找用户
     *
     * @param user
     * @return
     * @throws Exception
     * @author wangyao
     * @date 2017/1/12 10:33
     */
    RestResponse findByLoginName(User user) throws Exception;

    /**
     * 修改用户信息
     *
     * @param user
     * @return
     * @throws Exception
     * @author wangyao
     * @date 2017/1/12 11:10
     */
    RestResponse update(User user) throws Exception;

    /**
     * 根据id查找用户
     *
     * @param id
     * @return
     * @throws Exception
     * @author wangyao
     * @date 2017/1/12 14:07
     */
    User[] findById(Long id) throws Exception;

    /**
     * 用户分页
     *
     * @param pageCriteria
     * @return
     * @throws Exception
     * @author wangyao
     * @date 2017/1/13 16:33
     */
    RestResponse pageAll(PageCriteria pageCriteria) throws Exception;

    /**
     * 根据用户名查找用户
     *
     * @param user
     * @return
     * @throws Exception
     * @author wangyao
     * @date 2017/1/19 17:42
     */
    RestResponse findByUserName(User user) throws Exception;

    /**
     * 根据对象查找用户
     *
     * @param user
     * @return
     * @throws Exception
     * @author wangyao
     * @date 2017/1/19 17:49
     */
    User[] findByUser(User user) throws Exception;

    /**
     * 新增用户
     *
     * @param user
     * @return
     * @throws Exception
     * @author wangyao
     * @date 2017/1/19 19:02
     */
    RestResponse save(User user) throws Exception;

    /**
     * 根据用户id删除用户角色关系
     *
     * @param userId
     * @throws Exception
     * @author wangyao
     * @date 2017/1/19 19:27
     */
    void deleteByUserId(Long userId) throws Exception;

    /**
     * 添加用户角色关系
     *
     * @param userRoles
     * @throws Exception
     * @author wangyao
     * @date 2017/1/19 19:28
     */
    void saveUserRole(UserRole[] userRoles) throws Exception;

    /**
     * 根据邮箱修改密码
     *
     * @param user
     * @return
     * @throws Exception
     * @author wangyao
     * @date 2017/2/10  11:49
     */
    RestResponse updateByEmail(User user) throws Exception;

    User[] findByUserAndSystem(User user)throws Exception;

    void saveUserSystem(UserSystem[] userSystems);

	public RestResponse findAll();

    /*void createNewToken(PersistentLogins persistentLogins);

    void updateToken(PersistentLogins persistentLogins);

    RestResponse getTokenForSeries(PersistentLogins persistentLogins);

    void removeUserTokens(PersistentLogins persistentLogins);*/
}
