package com.unioncast.ssp.front.security;

import java.util.Collection;

import javax.annotation.Resource;

import com.unioncast.common.util.Md5PwdEncoder;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.unioncast.ssp.front.service.user.UserSystemService;

/**
 * 自定义安全验证
 * @author changguobin@unioncast.cn
 * @date 2016-10-26 19:30:10
 */
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Resource
    private CustomUserDetailService customUserDetailService;

    /**
     * 自定义验证方式
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String loginName = authentication.getName();
        String password = (String) authentication.getCredentials();
        UserDetails user = customUserDetailService.loadUserByUsername(loginName);

        String encodePassword = Md5PwdEncoder.encodePassword(password);
        if (!encodePassword.equals(user.getPassword())) {
            throw new BadCredentialsException("密码错误");
        }
        Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
        return new UsernamePasswordAuthenticationToken(user, password, authorities);
    }

    @Override
    public boolean supports(Class<?> arg0) {
        return true;
    }

}