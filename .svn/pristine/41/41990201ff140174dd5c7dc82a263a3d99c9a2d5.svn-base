package com.unioncast.ssp.front.common.freemarker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.AbstractTemplateViewResolver;
import org.springframework.web.servlet.view.AbstractUrlBasedView;

/**
 * ViewResolver for RichFreeMarkerView
 * 
 * @author liutiejun
 * @date 2016年8月20日 上午11:32:04
 *
 */
public class RichFreeMarkerViewResolver extends AbstractTemplateViewResolver {

	private static final Logger LOG = LoggerFactory.getLogger(RichFreeMarkerViewResolver.class);

	public RichFreeMarkerViewResolver() {
		setViewClass(requiredViewClass());
	}

	@Override
	protected Class<?> requiredViewClass() {
		return RichFreeMarkerView.class;
	}

	/**
	 * if viewName start with / , then ignore prefix.
	 */
	@Override
	protected AbstractUrlBasedView buildView(String viewName) throws Exception {
		AbstractUrlBasedView view = super.buildView(viewName);

		// start with / ignore prefix
//		if (viewName.startsWith("/")) {
//			LOG.info("before viewName: {}", viewName);
//
//			viewName = viewName + getSuffix();
//
//			LOG.info("after viewName: {}", viewName);
//
//			view.setUrl(viewName);
//		}

		return view;
	}

}