package com.unioncast.ssp.front.common.util;

import java.io.Serializable;

/**
 * 前端分页对象
 * @author changguobin@unioncast.cn
 * @date 2016-11-15 15:22:30
 */
public class Page implements Serializable {
	private static final long serialVersionUID = 8485073363035941380L;
	private int pno=1;
	private int psize = 10;
	private int pages = 1;
	private int count=0;
	
	public int getPrev() {
		return pno-1<1?1:pno-1;
	}
	public int getNext() {
		return pno+1>getPages()?pages:pno+1;
	}
	public int getPno() {
		return pno;
	}
	public void setPno(int pno) {
		this.pno = pno<1?1:pno;
	}
	public int getPsize() {
		return psize;
	}
	public void setPsize(int psize) {
		this.psize = psize<psize?psize:(psize>psize*2?psize*2:psize);
	}
	public int getPend(){
		return pno*psize-1;
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
		if(count>0&&count>psize){
			pages = (count%psize==0)?(count/psize):(count/psize+1);
		}
		return pages;
	}
}
