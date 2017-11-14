package com.unioncast.ssp.front.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * 接口文档配置类
 * @author changguobin@unioncast.cn
 * @date 2016-11-01 15:35:40
 */
@Configuration
@EnableSwagger2
public class Swagger2Config {
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.unioncast.ssp.front.controller"))
                .paths(PathSelectors.any())
                .build();
    }
    /**
     * API信息
     * @author changguobin@unioncast.cn
     * @date 2016-11-01 15:35:27
     *
     * @return ApiInfo
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("广视adx-front项目 API")// 大标题
                .description("REST API 设计在细节上有很多自己独特的需要注意的技巧，并且对开发人员在构架设计能力上比传统 API 有着更高的要求。<br/>以下是本项目的API文档")// 简单的描述
                .termsOfServiceUrl("服务条款")
                .contact("后台开发团队 (常国宾，丁雪银，师效婷，杨晨芳，张书瑞【排名不分先后，按字母顺序来】)")// 作者
                .license("The Apache License, Version 2.0") // 链接显示文字
                .licenseUrl("http://www.baidu.com")// 网站链接
                .version("1.0.0")// 版本
                .build();
    }
}