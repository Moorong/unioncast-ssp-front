package com.unioncast.ssp.front.common.util;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

/**
 * @auther wangyao
 * @date 2017-02-09 15:20
 */

public class SendEmail {
	private static Session getSession() {

		Properties props = new Properties();
		props.put("mail.smtp.host", SpringUtils.getConfig().getRestEmailHost());// 设置服务器地址
		props.put("mail.store.protocol", SpringUtils.getConfig().getRestEmailProtocol());// 设置协议
		props.put("mail.smtp.port", SpringUtils.getConfig().getRestEmailPort());// 设置端口
																				// //
		props.put("mail.smtp.auth", "true");

		Authenticator authenticator = new Authenticator() {

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(SpringUtils.getConfig().getRestEmailAdress(),
						SpringUtils.getConfig().getRestEmailPassword());
			}
		};
		//Session session = Session.getDefaultInstance(props, authenticator);
		Session session = Session.getInstance(props, authenticator);
		/*Properties props = new Properties();
		props.put("mail.smtp.host", HOST);// 设置服务器地址
		props.put("mail.store.protocol", PROTOCOL);// 设置协议
		props.put("mail.smtp.port", PORT);// 设置端口
		// props.put("mail.smtp.auth" , true);
		props.put("mail.smtp.auth", "true");

		Authenticator authenticator = new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(FROM, PWD);
			}

		};
		Session session = Session.getDefaultInstance(props, authenticator);*/

		return session;
	}

	public static void send(String toEmail, String content) {
		Session session = getSession();
		try {
			System.out.println("--send--" + content);
			// Instantiate a message
			Message msg = new MimeMessage(session);
			// Set message attributes
			msg.setFrom(new InternetAddress(SpringUtils.getConfig().getRestEmailAdress()));
			InternetAddress[] address = { new InternetAddress(toEmail) };
			msg.setRecipients(Message.RecipientType.TO, address);
			msg.setSubject("找回密码邮件");
			msg.setSentDate(new Date());
			msg.setContent(content, "text/html;charset=utf-8");
			// Send the message
			Transport.send(msg);
		} catch (MessagingException mex) {
			mex.printStackTrace();
		}
	}
}
