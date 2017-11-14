package com.unioncast.ssp.front;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * 服务启动
 * 
 * @author changguobin.unioncast.cn
 *
 */
@SpringBootApplication
public class StartServer extends SpringBootServletInitializer {

	private static Class<StartServer> applicationClass = StartServer.class;

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(applicationClass);
	}

	public static void main(String[] args) {
		SpringApplication.run(applicationClass, args);
	}
}
