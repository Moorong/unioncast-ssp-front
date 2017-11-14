package com.unioncast.ssp.front.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * ElasticsearchConfig
 *
 * @author zhangzhe
 * @date 2017/2/21 16:33
 */
@Configuration
//@PropertySource(value = "classpath:/elasticsearch.properties")
public class ElasticsearchConfig {

    private static final Logger LOG = LogManager.getLogger(ElasticsearchConfig.class);
    @Value("${spring.elasticsearch.host1}")
    private String host1;
    @Value("${spring.elasticsearch.host2}")
    private String host2;
    @Value("${spring.elasticsearch.host3}")
    private String host3;
    @Value("${spring.elasticsearch.host4}")
    private String host4;
    @Value("${spring.elasticsearch.host5}")
    private String host5;
    @Value("${spring.elasticsearch.port}")
    private int port;

    @Bean
    public TransportClient elasticsearchClient() {
        TransportClient transportClient = null;

        Settings settings = Settings.settingsBuilder()
                .put("cluster.name", "bigData-cluster").build();

        transportClient = TransportClient
                .builder()
                .settings(settings)
                .build();

        try {
            transportClient.addTransportAddress(
                    new InetSocketTransportAddress(InetAddress.getByName(host1), port)
            );
        } catch (UnknownHostException e) {
            LOG.error("创建elasticsearch客户端失败: " + host1, e);
        }

        try {
            transportClient.addTransportAddress(
                    new InetSocketTransportAddress(InetAddress.getByName(host2), port)
            );
        } catch (UnknownHostException e) {
            LOG.error("创建elasticsearch客户端失败: " + host2, e);
        }

        try {
            transportClient.addTransportAddress(
                    new InetSocketTransportAddress(InetAddress.getByName(host3), port)
            );
        } catch (UnknownHostException e) {
            LOG.error("创建elasticsearch客户端失败: " + host3, e);
        }

        try {
            transportClient.addTransportAddress(
                    new InetSocketTransportAddress(InetAddress.getByName(host4), port)
            );
        } catch (UnknownHostException e) {
            LOG.error("创建elasticsearch客户端失败: " + host4, e);
        }

        try {
            transportClient.addTransportAddress(
                    new InetSocketTransportAddress(InetAddress.getByName(host5), port)
            );
        } catch (UnknownHostException e) {
            LOG.error("创建elasticsearch客户端失败: " + host5, e);
        }


        LOG.info("创建elasticsearch客户端成功");

        return transportClient;

    }

}
