package com.unioncast.ssp.front.model;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.beanutils.BeanUtils;
import com.unioncast.common.page.OrderExpression;

/**
 * 前端通用分页查询条件
 * 
 * @author changguobin@unioncast.cn
 * @date 2016-11-07 14:38:44
 */
public class PageCondition implements Serializable {

	private static final long serialVersionUID = -156858113997314511L;

	private Map<String, Object> query = new HashMap<String, Object>();
	private OrderExpression order;

	private int pno = 1;
	private int psize = 10;
	private int pages = 1;
	private int count = 0;

	public int getPrev() {
		return pno - 1 < 1 ? 1 : pno - 1;
	}

	public int getNext() {
		return pno + 1 > getPages() ? pages : pno + 1;
	}

	public int getPno() {
		return pno;
	}

	public void setPno(int pno) {
		this.pno = pno < 1 ? 1 : pno;
	}

	public int getPsize() {
		return psize;
	}

	public void setPsize(int psize) {
		this.psize = psize < psize ? psize : (psize > psize * 2 ? psize * 2 : psize);
	}

	public int getPend() {
		return pno * psize - 1;
	}

	public int getPstart() {
		return (pno - 1) * psize;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getPages() {
		if (count > 0 && count > psize) {
			pages = (count % psize == 0) ? (count / psize) : (count / psize + 1);
		}
		return pages;
	}

	public Map<String, Object> getQuery() {
		return query;
	}

	/**
	 * 获取查询条件
	 * 
	 * @author changguobin@unioncast.cn
	 * @date 2016-11-15 14:39:04
	 *
	 * @param bean
	 *            查询条件实体
	 * @return T
	 */
	public <T> T getQuery(T bean) {
		try {
			BeanUtils.populate(bean, query);
		} catch (Exception e) {
		}
		return bean;
	}

	public void setQuery(Map<String, Object> query) {
		this.query = query;
	}

	public OrderExpression getOrder() {
		return order;
	}

	public void setOrder(OrderExpression order) {
		this.order = order;
	}
}
