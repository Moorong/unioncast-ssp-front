package com.unioncast.ssp.front.common.util;

import java.util.Comparator;

import com.unioncast.common.user.model.Module;

/**
 * 模块比较器
 * 
 * @auther wangyao
 * @date 2016-12-23 15:05
 */

public class ModuleInfoComparator implements Comparator<Module> {
	@Override
	public int compare(Module o1, Module o2) {
		if (o1.getSort() > o2.getSort()) {
			return 1;
		} else if (o1.getSort() == o2.getSort()) {
			return o1.getName().compareTo(o2.getName());
		} else {
			return -1;
		}
	}
}
