package com.unioncast.ssp.front.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Rest服务配置地址注入
 * 
 * @author changguobin@unioncast.cn
 */
@Component
@ConfigurationProperties(prefix = "rest") // 配置文件中的前缀
public class RestConfig {
	/**
	 * 数据访问层服务
	 */
	private String restDBServiceUrl;
	/**
	 * 用户系统服务
	 */
	private String restUserServiceUrl;
	private String restEmailHost;
	private String restEmailProtocol;
	private String restEmailPort;
	private String restEmailAdress;
	private String restEmailPassword;
	private String restSystemName;
    private String restReport;
	public String getRestDBServiceUrl() {
		return restDBServiceUrl;
	}

	public void setRestDBServiceUrl(String restDBServiceUrl) {
		this.restDBServiceUrl = restDBServiceUrl;
	}

	public String getRestUserServiceUrl() {
		return restUserServiceUrl;
	}

	public void setRestUserServiceUrl(String restUserServiceUrl) {
		this.restUserServiceUrl = restUserServiceUrl;
	}

	public String getRestEmailHost() {
		return restEmailHost;
	}

	public void setRestEmailHost(String restEmailHost) {
		this.restEmailHost = restEmailHost;
	}

	public String getRestEmailProtocol() {
		return restEmailProtocol;
	}

	public void setRestEmailProtocol(String restEmailProtocol) {
		this.restEmailProtocol = restEmailProtocol;
	}

	public String getRestEmailPort() {
		return restEmailPort;
	}

	public void setRestEmailPort(String restEmailPort) {
		this.restEmailPort = restEmailPort;
	}

	public String getRestEmailAdress() {
		return restEmailAdress;
	}

	public void setRestEmailAdress(String restEmailAdress) {
		this.restEmailAdress = restEmailAdress;
	}

	public String getRestEmailPassword() {
		return restEmailPassword;
	}

	public void setRestEmailPassword(String restEmailPassword) {
		this.restEmailPassword = restEmailPassword;
	}

	public String getRestSystemName() {
		return restSystemName;
	}

	public void setRestSystemName(String restSystemName) {
		this.restSystemName = restSystemName;
	}

	public String getRestReport() {
		return restReport;
	}

	public void setRestReport(String restReport) {
		this.restReport = restReport;
	}
	
}
