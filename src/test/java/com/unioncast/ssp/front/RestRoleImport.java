package com.unioncast.ssp.front;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import com.unioncast.ssp.front.common.util.ClassUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

public class RestRoleImport {

	@SuppressWarnings({ "rawtypes", "unused" })
	public static void main(String[] args) {
		Map<String, Map<String, String>> urlMap = new HashMap<String, Map<String, String>>();
		List<Class<?>> classes = ClassUtil.getClasses("com.unioncast.ssp.front.controller");
		for (Class clas : classes) {
			String cNote = "";
			String cReqMap = "";
			String clasName = clas.getSimpleName();
			try {
				Annotation[] clasAnnArr = clas.getAnnotations();
				for (Annotation ann : clasAnnArr) {
					if (ann instanceof Api)
						cNote = ((Api) ann).value();
					if (ann instanceof RequestMapping) {
						String[] values = ((RequestMapping) ann).value();
						if (!ArrayUtils.isEmpty(values)) {
							cReqMap = values[0];
						}
					}
				}
				// 获取方法注解列表
				Method[] methodArr = clas.getDeclaredMethods();
				for (Method method : methodArr) {
					String mNote = "";
					String mReqMap = "";
					Annotation[] methodAnnArr = method.getAnnotations();
					for (Annotation ann : methodAnnArr) {
						if (ann instanceof ApiOperation)
							mNote = ((ApiOperation) ann).value();
						if (ann instanceof RequestMapping) {
							String[] values = ((RequestMapping) ann).value();
							if (!ArrayUtils.isEmpty(values)) {
								mReqMap = values[0];
							}
						}
					}
					if (!StringUtils.isEmpty(cReqMap) && !StringUtils.isEmpty(mReqMap)) {
						Map<String, String> map = urlMap.get(cReqMap);
						if (MapUtils.isEmpty(map)) {
							map = new HashMap<String, String>();
						}
						cReqMap = cReqMap.indexOf("/") != 0 ? ("/" + cReqMap) : cReqMap;
						map.put(String.format("%s%s", cReqMap, mReqMap), String.format("%s-%s", cNote, mNote));
						urlMap.put(cReqMap, map);
					}
				}
			} catch (Exception e) {
				System.err.println("获取类注解出错!");
			}
		}
		// 生成sql
		StringBuffer sbf = new StringBuffer("insert into common_method(name,prefix_url,url,state,create_time,update_time) values ");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		for (String k : urlMap.keySet()) {
			Map<String, String> cmap = urlMap.get(k);
			for (String ck : cmap.keySet()) {
				String note = cmap.get(ck);
				String dt = sdf.format(new Date());
				sbf.append(String.format("('%s','%s','%s',%s,'%s','%s'),", note, k, ck, 0, dt, dt));
			}
		}
		String sql = sbf.toString().replaceAll(",$", "");
		System.out.println(sql);
	}
}
