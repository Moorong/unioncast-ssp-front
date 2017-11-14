package com.unioncast.ssp.front.model.vo;

import com.unioncast.common.annotation.MyColumn;

import java.io.Serializable;
import java.util.Date;

/**
 * 广告定向条件 ssp_plan_target_condition
 * <p>
 * </p>
 *
 * @author dmpchengyunyun
 * @date 2017年1月9日上午10:37:38
 */
public class SspPlanTargetConditionVO implements Serializable {

    private static final long serialVersionUID = 8047341100855145498L;

    private Long id;

    // 时间定向
    private String timeTarget;

    // 广告类型
    private Long sspDictAdTypeId;

    // 投放节奏，1-均匀投放，2-加速投放，3-集中投放，4-效果最有投放，5-低CPC投放
    private Long putRhythm;

    // 地域定向,1-不限定,2-按地域（省、市）,3-LBS
    private Long areaTargetState;
    private String cityInfoArrStr;

    // 经度-纬度-半径
    private String lbsInfo;
    // 操作系统定向状态1不限，2限制
    private Long dictSysOperationState;
    // 操作系统定向
    private String dictSysOperationTypeArrStr;

    // 移动设备品牌定向
    private String dictMobileBrandTypeArrStr;

    // 网络类型，1-全选，2-2G，3-3G，4-4G，5-WIFI，逗号区分
    private String networkType;

    //设备ID定向控制状态
    private Long deviceTypeState;

    // 设备ID定向类型
    private String deviceTypeIdfa;

    // 设备ID定向类型
    private String deviceTypeMac;

    // 设备ID定向类型
    private String deviceTypeImei;

    // 媒体类型定向状态1不限，2限制
    private Long mediaState;

    // 媒体类型定向
    private String dictMediaTypeArrStr;

    // 媒体ID定向，逗号区分
    private String mediaIds;

    // 性别，1-男，2-女
    private Long sex;

    // 年龄定向
    private String ageTargetArrStr;

    // 学历
    @MyColumn("education")
    private String educationTargetArrStr;

    // 婚姻，1-已婚，2-未婚，，逗号区分
    private Long marriage;

    // 收入，1-高，2-中，3-低，，逗号区分
    private Long income;

    // 兴趣爱好，
    private String interestsTargetArrStr;

    // 购买倾向
    private String buyTargetArrStr;
    private Date createTime;
    private Date updateTime;

    // 删除状态，1-未删除，2-已删除
    private Long deleteState;


    

    public SspPlanTargetConditionVO() {
		super();
	}

	public SspPlanTargetConditionVO(Long id, String timeTarget, Long sspDictAdTypeId, Long putRhythm,
			Long areaTargetState, String cityInfoArrStr, String lbsInfo, String dictSysOperationTypeArrStr,
			String dictMobileBrandTypeArrStr, String networkType, String deviceTypeIdfa, String deviceTypeMac,
			String deviceTypeImei, String dictMediaTypeArrStr, String mediaIds, Long sex, String ageTargetArrStr,
			String educationTargetArrStr, Long marriage, Long income, String interestsTargetArrStr,
			String buyTargetArrStr, Date createTime, Date updateTime, Long deleteState,Long mediaState,Long dictSysOperationState,Long deviceTypeState) {
		super();
		this.id = id;
		this.timeTarget = timeTarget;
		this.sspDictAdTypeId = sspDictAdTypeId;
		this.putRhythm = putRhythm;
		this.areaTargetState = areaTargetState;
		this.cityInfoArrStr = cityInfoArrStr;
		this.lbsInfo = lbsInfo;
		this.dictSysOperationTypeArrStr = dictSysOperationTypeArrStr;
		this.dictMobileBrandTypeArrStr = dictMobileBrandTypeArrStr;
		this.networkType = networkType;
		this.deviceTypeIdfa = deviceTypeIdfa;
		this.deviceTypeMac = deviceTypeMac;
		this.deviceTypeImei = deviceTypeImei;
		this.dictMediaTypeArrStr = dictMediaTypeArrStr;
		this.mediaIds = mediaIds;
		this.sex = sex;
		this.ageTargetArrStr = ageTargetArrStr;
		this.educationTargetArrStr = educationTargetArrStr;
		this.marriage = marriage;
		this.income = income;
		this.interestsTargetArrStr = interestsTargetArrStr;
		this.buyTargetArrStr = buyTargetArrStr;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.deleteState = deleteState;
		this.mediaState = mediaState;
		this.dictSysOperationState = dictSysOperationState;
		this.deviceTypeState = deviceTypeState;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTimeTarget() {
        return timeTarget;
    }

    public void setTimeTarget(String timeTarget) {
        this.timeTarget = timeTarget == null ? null : timeTarget.trim();
    }

    public Long getPutRhythm() {
        return putRhythm;
    }

    public void setPutRhythm(Long putRhythm) {
        this.putRhythm = putRhythm;
    }

    public Long getAreaTargetState() {
        return areaTargetState;
    }

    public void setAreaTargetState(Long areaTargetState) {
        this.areaTargetState = areaTargetState;
    }

    public String getLbsInfo() {
        return lbsInfo;
    }

    public void setLbsInfo(String lbsInfo) {
        this.lbsInfo = lbsInfo == null ? null : lbsInfo.trim();
    }

    public String getNetworkType() {
        return networkType;
    }

    public void setNetworkType(String networkType) {
        this.networkType = networkType == null ? null : networkType.trim();
    }

    public String getDeviceTypeIdfa() {
        return deviceTypeIdfa;
    }

    public void setDeviceTypeIdfa(String deviceTypeIdfa) {
        this.deviceTypeIdfa = deviceTypeIdfa == null ? null : deviceTypeIdfa
                .trim();
    }

    public String getDeviceTypeMac() {
        return deviceTypeMac;
    }

    public void setDeviceTypeMac(String deviceTypeMac) {
        this.deviceTypeMac = deviceTypeMac == null ? null : deviceTypeMac
                .trim();
    }

    public String getDeviceTypeImei() {
        return deviceTypeImei;
    }

    public void setDeviceTypeImei(String deviceTypeImei) {
        this.deviceTypeImei = deviceTypeImei == null ? null : deviceTypeImei
                .trim();
    }

    public String getMediaIds() {
        return mediaIds;
    }

    public void setMediaIds(String mediaIds) {
        this.mediaIds = mediaIds == null ? null : mediaIds.trim();
    }

    public Long getSex() {
        return sex;
    }

    public void setSex(Long sex) {
        this.sex = sex;
    }

    public Long getMarriage() {
        return marriage;
    }

    public void setMarriage(Long marriage) {
        this.marriage = marriage;
    }

    public Long getIncome() {
        return income;
    }

    public void setIncome(Long income) {
        this.income = income;
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

    public Long getDeleteState() {
        return deleteState;
    }

    public void setDeleteState(Long deleteState) {
        this.deleteState = deleteState;
    }

	public Long getSspDictAdTypeId() {
		return sspDictAdTypeId;
	}

	public void setSspDictAdTypeId(Long sspDictAdTypeId) {
		this.sspDictAdTypeId = sspDictAdTypeId;
	}

	public String getCityInfoArrStr() {
		return cityInfoArrStr;
	}

	public void setCityInfoArrStr(String cityInfoArrStr) {
		this.cityInfoArrStr = cityInfoArrStr;
	}

	public String getDictSysOperationTypeArrStr() {
		return dictSysOperationTypeArrStr;
	}

	public void setDictSysOperationTypeArrStr(String dictSysOperationTypeArrStr) {
		this.dictSysOperationTypeArrStr = dictSysOperationTypeArrStr;
	}

	public String getDictMobileBrandTypeArrStr() {
		return dictMobileBrandTypeArrStr;
	}

	public void setDictMobileBrandTypeArrStr(String dictMobileBrandTypeArrStr) {
		this.dictMobileBrandTypeArrStr = dictMobileBrandTypeArrStr;
	}

	public String getDictMediaTypeArrStr() {
		return dictMediaTypeArrStr;
	}

	public void setDictMediaTypeArrStr(String dictMediaTypeArrStr) {
		this.dictMediaTypeArrStr = dictMediaTypeArrStr;
	}

	public String getAgeTargetArrStr() {
		return ageTargetArrStr;
	}

	public void setAgeTargetArrStr(String ageTargetArrStr) {
		this.ageTargetArrStr = ageTargetArrStr;
	}

	public String getEducationTargetArrStr() {
		return educationTargetArrStr;
	}

	public void setEducationTargetArrStr(String educationTargetArrStr) {
		this.educationTargetArrStr = educationTargetArrStr;
	}

	public String getInterestsTargetArrStr() {
		return interestsTargetArrStr;
	}

	public void setInterestsTargetArrStr(String interestsTargetArrStr) {
		this.interestsTargetArrStr = interestsTargetArrStr;
	}

	public String getBuyTargetArrStr() {
		return buyTargetArrStr;
	}

	public void setBuyTargetArrStr(String buyTargetArrStr) {
		this.buyTargetArrStr = buyTargetArrStr;
	}

    public Long getDictSysOperationState() {
        return dictSysOperationState;
    }

    public void setDictSysOperationState(Long dictSysOperationState) {
        this.dictSysOperationState = dictSysOperationState;
    }

    public Long getMediaState() {
        return mediaState;
    }

    public void setMediaState(Long mediaState) {
        this.mediaState = mediaState;
    }

    public Long getDeviceTypeState() {
        return deviceTypeState;
    }

    public void setDeviceTypeState(Long deviceTypeState) {
        this.deviceTypeState = deviceTypeState;
    }
}