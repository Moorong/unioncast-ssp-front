package com.unioncast.ssp.front.service.ssp.dict;

import java.util.List;

import com.unioncast.common.ssp.model.SspCityInfo;
import com.unioncast.common.ssp.model.SspDictAccessWay;
import com.unioncast.common.ssp.model.SspDictAdPositionType;
import com.unioncast.common.ssp.model.SspDictAdType;
import com.unioncast.common.ssp.model.SspDictAgeTarget;
import com.unioncast.common.ssp.model.SspDictAudit;
import com.unioncast.common.ssp.model.SspDictBuyTarget;
import com.unioncast.common.ssp.model.SspDictCreativeSize;
import com.unioncast.common.ssp.model.SspDictEducationTarget;
import com.unioncast.common.ssp.model.SspDictIndustry;
import com.unioncast.common.ssp.model.SspDictInterestsTarget;
import com.unioncast.common.ssp.model.SspDictLabel;
import com.unioncast.common.ssp.model.SspDictMediaType;
import com.unioncast.common.ssp.model.SspDictMobileBrandType;
import com.unioncast.common.ssp.model.SspDictPlatform;
import com.unioncast.common.ssp.model.SspDictSysOperationType;

public interface DictService {
	/**
	 * 接入方式
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 16:59:25
	 *
	 * @param sspDictAccessWay
	 * @return List<SspDictAccessWay>
	 */
	List<SspDictAccessWay> queryAccessWay(SspDictAccessWay sspDictAccessWay);
	/**
	 * 广告位类型
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:01:03
	 *
	 * @param sspDictAdPositionType
	 * @return List<SspDictAdPositionType>
	 */
	List<SspDictAdPositionType> queryAdPositionType(SspDictAdPositionType sspDictAdPositionType);
	/**
	 * 广告类型
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 16:52:56
	 *
	 * @param sspDictAdType
	 * @return List<SspDictAdType>
	 */
	List<SspDictAdType> queryAdType(SspDictAdType sspDictAdType);
	/**
	 * 地域定向
	 * @author zylei
	 * @data   2017年2月9日 上午10:05:52
	 * @param sspCityInfo
	 * @return
	 */
	List<SspCityInfo> queryCityInfo(SspCityInfo sspCityInfo);
	/**
	 * 年龄定向
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:01:31
	 *
	 * @param sspDictAgeTarget
	 * @return List<SspDictAgeTarget>
	 */
	List<SspDictAgeTarget> queryAgeTarget(SspDictAgeTarget sspDictAgeTarget);
	/**
	 * 审核状态
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:01:44
	 *
	 * @param sspDictAudit
	 * @return List<SspDictAudit>
	 */
	List<SspDictAudit> queryAudit(SspDictAudit sspDictAudit);
	/**
	 * 购买倾向
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:02:05
	 *
	 * @param sspDictBuyTarget
	 * @return List<SspDictBuyTarget>
	 */
	List<SspDictBuyTarget> queryBuyTarget(SspDictBuyTarget sspDictBuyTarget);
	/**
	 * 创意尺寸
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:02:23
	 *
	 * @param sspDictCreativeSize
	 * @return List<SspDictCreativeSize>
	 */
	List<SspDictCreativeSize> queryCreativeSize(SspDictCreativeSize sspDictCreativeSize);
	/**
	 * 学历定向
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:02:39
	 *
	 * @param sspDictEducationTarget
	 * @return List<SspDictEducationTarget>
	 */
	List<SspDictEducationTarget> queryEducationTarget(SspDictEducationTarget sspDictEducationTarget);
	/**
	 * 行业类型
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:02:53
	 *
	 * @param sspDictIndustry
	 * @return List<SspDictIndustry>
	 */
	List<SspDictIndustry> queryIndustry(SspDictIndustry sspDictIndustry);
	/**
	 * 兴趣定向
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:02:59
	 *
	 * @param sspDictInterestsTarget
	 * @return List<SspDictInterestsTarget>
	 */
	List<SspDictInterestsTarget> queryInterestsTarget(SspDictInterestsTarget sspDictInterestsTarget);
	/**
	 * 创意标签
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:03:03
	 *
	 * @param SspDictLabel
	 * @return List<SspDictLabel>
	 */
	List<SspDictLabel> queryLabel(SspDictLabel sspDictLabel);
	/**
	 * 媒体类型
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:03:06
	 *
	 * @param sspDictMediaType
	 * @return List<SspDictMediaType>
	 */
	List<SspDictMediaType> queryMediaType(SspDictMediaType sspDictMediaType);
	/**
	 * 设备品牌
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:03:09
	 *
	 * @param sspDictMobileBrandType
	 * @return List<SspDictMobileBrandType>
	 */
	List<SspDictMobileBrandType> queryMobileBrandType(SspDictMobileBrandType sspDictMobileBrandType);
	/**
	 * 所属平台
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:03:12
	 *
	 * @param SspDictPlatform
	 * @return List<SspDictPlatform>
	 */
	List<SspDictPlatform> queryPlatform(SspDictPlatform sspDictPlatform);
	/**
	 * 操作系统类型
	 * @author changguobin@unioncast.cn
	 * @date 2017-02-06 17:03:15
	 *
	 * @param sspDictSysOperationType
	 * @return List<SspDictSysOperationType>
	 */
	List<SspDictSysOperationType> querySysOperationType(SspDictSysOperationType sspDictSysOperationType);
	
	
	
	
	
	
	
	
	
}
