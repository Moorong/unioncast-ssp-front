package com.unioncast.ssp.front.common.util;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.unioncast.common.user.model.User;
import com.unioncast.common.util.CommonUtil;
import com.unioncast.ssp.front.config.RestConfig;

@Component
public final class SpringUtils implements ApplicationContextAware, EnvironmentAware {

	private static ApplicationContext context;
	private static Environment env;

	/**
	 * 获取对象
	 * 
	 * @param name
	 * @return Object 一个以所给名字注册的bean的实例
	 * @throws org.springframework.beans.BeansException
	 * 
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getBean(String name) throws BeansException {
		return (T) context.getBean(name);
	}

	/**
	 * 获取类型为requiredType的对象
	 * 
	 * @param clz
	 * @return
	 * @throws org.springframework.beans.BeansException
	 * 
	 */
	public static <T> T getBean(Class<T> clz) throws BeansException {
		T result = (T) context.getBean(clz);
		return result;
	}

	/**
	 * 如果BeanFactory包含一个与所给名称匹配的bean定义，则返回true
	 * 
	 * @param name
	 * @return boolean
	 */
	public static boolean containsBean(String name) {
		return context.containsBean(name);
	}

	/**
	 * 判断以给定名字注册的bean定义是一个singleton还是一个prototype。
	 * 如果与给定名字相应的bean定义没有被找到，将会抛出一个异常（NoSuchBeanDefinitionException）
	 * 
	 * @param name
	 * @return boolean
	 * 
	 */
	public static boolean isSingleton(String name) throws NoSuchBeanDefinitionException {
		return context.isSingleton(name);
	}

	/**
	 * @param name
	 * @return Class 注册对象的类型
	 * 
	 */
	public static Class<?> getType(String name) throws NoSuchBeanDefinitionException {
		return context.getType(name);
	}

	/**
	 * 获取配置信息
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 11:43:49
	 *
	 * @return RestConfig
	 */
	public static RestConfig getConfig() {
		return SpringUtils.getBean(RestConfig.class);
	}

	public static User getCurrentLoginUserInfo() {
		try {
			return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 获取配置信息
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2017-03-08 19:18:01
	 *
	 * @param key
	 * @return String
	 */
	public static String getProperty(String key) {
		if (CommonUtil.isNull(env))
			return "";
		return env.getProperty(key);
	}

	/**
	 * 如果给定的bean名字在bean定义中有别名，则返回这些别名
	 * 
	 * @param name
	 * @return
	 * @throws org.springframework.beans.factory.NoSuchBeanDefinitionException
	 * 
	 */
	public static String[] getAliases(String name) throws NoSuchBeanDefinitionException {
		return context.getAliases(name);
	}

	public static void setSpringApplicationContext(ApplicationContext context) {
		SpringUtils.context = context;
	}

	@Override
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		SpringUtils.context = context;
	}

	@Override
	public void setEnvironment(Environment env) {
		SpringUtils.env = env;
	}
}
