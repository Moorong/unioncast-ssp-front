package com.unioncast.ssp.front.common.freemarker;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.view.freemarker.FreeMarkerView;

import com.unioncast.ssp.front.common.util.Const;
import com.unioncast.ssp.front.common.util.SpringUtils;

//import com.eduction.core.web.util.FrontUtils;

/**
 * <p>
 * 扩展spring的FreemarkerView，加上base属性
 * </p>
 * <p>
 * 在model中增加部署路径base，方便处理部署路径问题
 * </p>
 * 
 * @author liutiejun
 * @date 2016年8月20日 上午11:27:17
 *
 */
public class RichFreeMarkerView extends FreeMarkerView {

	@Override
	protected void exposeHelpers(Map<String, Object> model, HttpServletRequest request) throws Exception {
		super.exposeHelpers(model, request);
		
		model.put(Const.SYS_IMG_SERVER_URL, SpringUtils.getProperty("image.download.url"));
//		FrontUtils.frontData(request, model);
	}

}