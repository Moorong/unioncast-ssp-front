package com.unioncast.ssp.front.common.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


public class FileUtil {
	/**
	 * 写入临时文件
	 * @author changguobin@unioncast.cn
	 * @date 2017-06-29 09:31:03
	 *
	 * @param inputStream
	 * @param fileName
	 * @param autoDeleteFile
	 * @return File
	 */
	public static File writeTempFile(InputStream inputStream, boolean autoDeleteFile) {
		String folder=System.getProperty("java.io.tmpdir");
		String tempFilePath = String.format("%s%s.tmp",folder,UUID.randomUUID().toString().replaceAll("-",""));
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		File f = new File(tempFilePath);
		try {
			f.createNewFile();
			bis = new BufferedInputStream(inputStream);
			bos = new BufferedOutputStream(new FileOutputStream(f));
			int len = 2048;
			byte[] b = new byte[len];
			while ((len = bis.read(b)) != -1) {
				bos.write(b, 0, len);
			}
			bos.flush();
			bis.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				bis.close();
				bos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (autoDeleteFile) {
			final ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
			Runnable runnable = new Runnable() {
				public void run() {
					FileUtil.deleteFile(tempFilePath);
					service.shutdown();
				}
			};
			// 第二个参数为首次执行的延时时间，第三个参数为定时执行的间隔时间
			service.scheduleAtFixedRate(runnable, 30, 1, TimeUnit.SECONDS);
		}
		return f;
	}
	public static void deleteFile(String filepath) {
		deleteFile(new File(filepath));
	}
	public static void deleteFile(File file) {
		if (file.exists())
			file.delete();
	}
}

