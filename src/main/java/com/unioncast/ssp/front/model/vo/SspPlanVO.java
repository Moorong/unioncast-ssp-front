package com.unioncast.ssp.front.model.vo;

import com.unioncast.common.annotation.MyColumn;
import com.unioncast.common.annotation.MyId;
import com.unioncast.common.annotation.MyTable;
import com.unioncast.common.user.model.User;

import java.io.Serializable;
import java.util.Date;

/**
 * 计划  ssp_plan
 * <p>
 * </p>
 * @author dmpchengyunyun
 * @date 2017年1月9日上午10:33:54
 */
public class SspPlanVO implements Serializable {
	
	private static final long serialVersionUID = -5595479358795023776L;
	

	private Long id;

	private User user;

	//广告主
	private Long sspAdvertiserId;

	//订单
	private Long sspOrderId;

	//计划名称
	private String name;

	//计划唯一编号
	private String planIdentifying;

	//计划类型1-rtb，2-pdb，3-直投
	private Long planType;

	//投放周期状态，1-限制，2-不限制
	private Long putTimeState;

	//投放周期--开始时间
	private Date putStartTime;

	//投放周期--结束时间
	private Date putEndTime;

	//预算状态，1-限制，2-不限制
	private Long budgetState;

	//预算
	private Double budget;

	//外部关联id--合同
	private String contractId;

	//投放周期内单人曝光次数
	private Long singlePeriodShowTimes;

	//1-每人每天，2-每人每小时
	private Integer showCalculationType;

	//曝光不超过次数
	private Long singleShowTimes;

	//1-每人每天，2-每人每小时
	private Integer clickCalculationType;

	//点击不超过
	private Long singleClickTimes;

	//每日预算上限
	private Double dailyBudgetCap;

	//每日曝光上限
	private Long dailyShowCap;

	//每日点击上限
	private Long dailyClickCap;

	//投放节奏，1-不限，2-曝光，3-预算
	private Integer putRhythm;

	//kpi设置,1-cpa,2-cpc,3-cpm
	private Integer kpi;

	//最高cpm出价
	private Double highestCpm;

	private String keywords;

	private String comment;

	//是否为计划组,1-是,2-否
	private Integer isPlanGroup;

	//关联父类id
	private Long parentPlanId;

	//关联广告定向条件
	private SspPlanTargetConditionVO sspPlanTargetCondition;

	private Date createTime;

	private Date updateTime;

	//删除状态，1-未删除，2-已删除
	private Integer deleteState;
	
	private Integer level;
	
	//1-开启 2-关闭
	private Integer state;
	
	//所有子计划个数 0是没有
	private Integer childrenNum;
	//开启状态的子计划个数
	private Integer childStateCount;
	//消费金额
	private Double consumptionAmount ;
	
	
	


	public SspPlanVO() {
		super();
	}
	
	

	public SspPlanVO(Long id, User user, Long sspAdvertiserId, Long sspOrderId, String name, String planIdentifying,
			Long planType, Long putTimeState, Date putStartTime, Date putEndTime, Long budgetState, Double budget,
			String contractId, Long singlePeriodShowTimes, Integer showCalculationType, Long singleShowTimes,
			Integer clickCalculationType, Long singleClickTimes, Double dailyBudgetCap, Long dailyShowCap,
			Long dailyClickCap, Integer putRhythm, Integer kpi, Double highestCpm, String keywords, String comment,
			Integer isPlanGroup, Long parentPlanId, SspPlanTargetConditionVO sspPlanTargetCondition, Date createTime,
			Date updateTime, Integer deleteState, Integer level, Integer state, Integer childrenNum,
			Integer childStateCount, Double consumptionAmount) {
		super();
		this.id = id;
		this.user = user;
		this.sspAdvertiserId = sspAdvertiserId;
		this.sspOrderId = sspOrderId;
		this.name = name;
		this.planIdentifying = planIdentifying;
		this.planType = planType;
		this.putTimeState = putTimeState;
		this.putStartTime = putStartTime;
		this.putEndTime = putEndTime;
		this.budgetState = budgetState;
		this.budget = budget;
		this.contractId = contractId;
		this.singlePeriodShowTimes = singlePeriodShowTimes;
		this.showCalculationType = showCalculationType;
		this.singleShowTimes = singleShowTimes;
		this.clickCalculationType = clickCalculationType;
		this.singleClickTimes = singleClickTimes;
		this.dailyBudgetCap = dailyBudgetCap;
		this.dailyShowCap = dailyShowCap;
		this.dailyClickCap = dailyClickCap;
		this.putRhythm = putRhythm;
		this.kpi = kpi;
		this.highestCpm = highestCpm;
		this.keywords = keywords;
		this.comment = comment;
		this.isPlanGroup = isPlanGroup;
		this.parentPlanId = parentPlanId;
		this.sspPlanTargetCondition = sspPlanTargetCondition;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.deleteState = deleteState;
		this.level = level;
		this.state = state;
		this.childrenNum = childrenNum;
		this.childStateCount = childStateCount;
		this.consumptionAmount = consumptionAmount;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name == null ? null : name.trim();
	}

	public String getPlanIdentifying() {
		return planIdentifying;
	}

	public void setPlanIdentifying(String planIdentifying) {
		this.planIdentifying = planIdentifying == null ? null : planIdentifying
				.trim();
	}

	public Long getPlanType() {
		return planType;
	}

	public void setPlanType(Long planType) {
		this.planType = planType;
	}

	public Long getPutTimeState() {
		return putTimeState;
	}

	public void setPutTimeState(Long putTimeState) {
		this.putTimeState = putTimeState;
	}

	public Date getPutStartTime() {
		return putStartTime;
	}

	public void setPutStartTime(Date putStartTime) {
		this.putStartTime = putStartTime;
	}

	public Date getPutEndTime() {
		return putEndTime;
	}

	public void setPutEndTime(Date putEndTime) {
		this.putEndTime = putEndTime;
	}

	public Long getBudgetState() {
		return budgetState;
	}

	public void setBudgetState(Long budgetState) {
		this.budgetState = budgetState;
	}

	public Double getBudget() {
		return budget;
	}
	
	
	public Long getSspAdvertiserId() {
		return sspAdvertiserId;
	}

	public void setSspAdvertiserId(Long sspAdvertiserId) {
		this.sspAdvertiserId = sspAdvertiserId;
	}

	public Long getSspOrderId() {
		return sspOrderId;
	}

	public void setSspOrderId(Long sspOrderId) {
		this.sspOrderId = sspOrderId;
	}

	public Integer getIsPlanGroup() {
		return isPlanGroup;
	}

	public void setIsPlanGroup(Integer isPlanGroup) {
		this.isPlanGroup = isPlanGroup;
	}

	public Long getParentPlanId() {
		return parentPlanId;
	}

	public void setParentPlanId(Long parentPlanId) {
		this.parentPlanId = parentPlanId;
	}

	public SspPlanTargetConditionVO getSspPlanTargetCondition() {
		return sspPlanTargetCondition;
	}

	public void setSspPlanTargetCondition(SspPlanTargetConditionVO sspPlanTargetCondition) {
		this.sspPlanTargetCondition = sspPlanTargetCondition;
	}

	public void setBudget(Double budget) {
		this.budget = budget;
	}

	public String getContractId() {
		return contractId;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId == null ? null : contractId.trim();
	}

	public Long getSinglePeriodShowTimes() {
		return singlePeriodShowTimes;
	}

	public void setSinglePeriodShowTimes(Long singlePeriodShowTimes) {
		this.singlePeriodShowTimes = singlePeriodShowTimes;
	}

	public Long getSingleShowTimes() {
		return singleShowTimes;
	}

	public void setSingleShowTimes(Long singleShowTimes) {
		this.singleShowTimes = singleShowTimes;
	}

	public Long getSingleClickTimes() {
		return singleClickTimes;
	}

	public void setSingleClickTimes(Long singleClickTimes) {
		this.singleClickTimes = singleClickTimes;
	}

	public Double getDailyBudgetCap() {
		return dailyBudgetCap;
	}

	public void setDailyBudgetCap(Double dailyBudgetCap) {
		this.dailyBudgetCap = dailyBudgetCap;
	}

	public Long getDailyShowCap() {
		return dailyShowCap;
	}

	public void setDailyShowCap(Long dailyShowCap) {
		this.dailyShowCap = dailyShowCap;
	}

	public Long getDailyClickCap() {
		return dailyClickCap;
	}

	public void setDailyClickCap(Long dailyClickCap) {
		this.dailyClickCap = dailyClickCap;
	}

	public Double getHighestCpm() {
		return highestCpm;
	}

	public void setHighestCpm(Double highestCpm) {
		this.highestCpm = highestCpm;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords == null ? null : keywords.trim();
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment == null ? null : comment.trim();
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	

	public Integer getShowCalculationType() {
		return showCalculationType;
	}

	public void setShowCalculationType(Integer showCalculationType) {
		this.showCalculationType = showCalculationType;
	}

	public Integer getClickCalculationType() {
		return clickCalculationType;
	}

	public void setClickCalculationType(Integer clickCalculationType) {
		this.clickCalculationType = clickCalculationType;
	}

	public Integer getPutRhythm() {
		return putRhythm;
	}

	public void setPutRhythm(Integer putRhythm) {
		this.putRhythm = putRhythm;
	}

	public Integer getKpi() {
		return kpi;
	}

	public void setKpi(Integer kpi) {
		this.kpi = kpi;
	}

	
	public Integer getDeleteState() {
		return deleteState;
	}

	public void setDeleteState(Integer deleteState) {
		this.deleteState = deleteState;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public Integer getChildrenNum() {
		return childrenNum;
	}

	public void setChildrenNum(Integer childrenNum) {
		this.childrenNum = childrenNum;
	}

	public Integer getChildStateCount() {
		return childStateCount;
	}

	public void setChildStateCount(Integer childStateCount) {
		this.childStateCount = childStateCount;
	}

	public Double getConsumptionAmount() {
		return consumptionAmount;
	}

	public void setConsumptionAmount(Double consumptionAmount) {
		this.consumptionAmount = consumptionAmount;
	}
	
}