package com.unioncast.ssp.front.security;

import com.alibaba.fastjson.JSON;
import com.unioncast.common.rest.response.common.UserArrayResponse;
import com.unioncast.common.ssp.model.SspOrder;
import com.unioncast.common.user.model.Role;
import com.unioncast.common.user.model.User;
import com.unioncast.common.util.CommonUtil;
import com.unioncast.common.util.Md5PwdEncoder;
import com.unioncast.ssp.front.common.util.SystemSession;
import com.unioncast.ssp.front.model.SecurityUser;
import com.unioncast.ssp.front.rest.template.RestTemplate;
import com.unioncast.ssp.front.service.user.UserSystemService;
import org.springframework.http.HttpEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.List;

/**
 * @auther wangyao
 * @date 2017-02-20 17:00
 */
@Component
public class CustomUserDetailService implements UserDetailsService{

    @Resource
    private UserSystemService userSystemService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userSystemService.findUserByLoginname(s);
        if (user == null) {
            throw new UsernameNotFoundException("验证失败");
        }
        List<Role> roleList = user.getRoleList();
        if (CommonUtil.isNull(roleList)) {
            throw new BadCredentialsException("没有权限");
        }
        return new SecurityUser(user);
    }
}
