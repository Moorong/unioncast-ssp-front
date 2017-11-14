package com.unioncast.ssp.front.controller.ssp.creative;

import com.alibaba.fastjson.JSONObject;
import com.unioncast.common.adx.model.UploadFileInfo;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.restClient.RestResponseFactory;
import com.unioncast.common.ssp.model.*;
import com.unioncast.common.user.model.User;
import com.unioncast.common.util.CommonUtil;
import com.unioncast.ssp.front.common.util.Common;
import com.unioncast.ssp.front.common.util.FileType;
import com.unioncast.ssp.front.common.util.FileTypeJudge;
import com.unioncast.ssp.front.common.util.SWFHeader;
import com.unioncast.ssp.front.common.util.SpringUtils;
import com.unioncast.ssp.front.controller.common.BaseController;
import com.unioncast.ssp.front.service.ssp.*;
import com.unioncast.ssp.front.service.ssp.elasticsearchData.ElasticsearchADReport;
import com.unioncast.ssp.front.service.ssp.impl.SspDictLabelServiceImpl;
import com.xiaoleilu.hutool.io.FileUtil;
import com.xiaoleilu.hutool.util.BeanUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import it.sauronsoftware.jave.Encoder;
import it.sauronsoftware.jave.MultimediaInfo;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileDescriptor;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.*;

/**
 * 
 * @author juchaochao
 * @2017年1月19日上午11:31:47
 */
@Api("创意")
@Controller
@RequestMapping("/rest/sspCreative")
public class SspCreativeController extends BaseController{

	private static final Logger LOG = LogManager.getLogger(SspCreativeController.class);

	// @Autowired
	// private SspCreativeGroupServiceImpl sspCreativeGroupService;

	@Autowired
	private SspCreativeService sspCreativeService;

	@Autowired
	private SspDictLabelServiceImpl sspCreativeLabelService;

	@Autowired
	private SspCreativePixelService sspCreativePixelService;

	@Resource
	private ElasticsearchADReport elasticsearchADReport;
	
	@Autowired
	private SspDictLabelService sspDictLabelService;
	@Resource
	private SspOrderService sspOrderService;
	@Resource
	private SspPlanService sspPlanService;

	/**
	 * 
	 * @author juchaochao
	 * @2017年1月19日上午11:31:54
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public String main(Model model, String planId) {
		model.addAttribute("planId", planId);
		return "ssp/putIn/creative/list";
	}


	@ApiOperation(value = "根据标签", httpMethod = "POST", response = RestResponse.class)
	@RequestMapping(value = "/findLabel", method = RequestMethod.POST)
	@ResponseBody
	public Object findLabel() {
		try {
			Object object = sspCreativeLabelService.find(null).getResult();
			LOG.info("sspCreativeGroups", object);
			return object;
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			return RestResponseFactory.exception(e);
		}
	}

	@ApiOperation(value = "根据标签", httpMethod = "POST", response = RestResponse.class)
	@RequestMapping(value = "/checkPixel", method = RequestMethod.POST)
	@ResponseBody
	public Boolean checkPixel(int width, int height) {
		SspDictCreativeSize[] creativeSizes = sspCreativePixelService.find(null);
		LOG.info("creativeSizes", (Object)creativeSizes);
		if (creativeSizes != null && creativeSizes.length > 0) {
			for (SspDictCreativeSize sspDictCreativeSize : creativeSizes) {
				int width1 = sspDictCreativeSize.getWidth();
				int height1 = sspDictCreativeSize.getHeight();
				if (width1 == width && height1 == height) {
					return true;
				}
			}
		}
		return false;
	}

	@ApiOperation(value = "条件分页查询", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "pageCriteria", value = "分页查询条件", required = true, dataType = "PageCriteria", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/page", method = RequestMethod.POST)
	public RestResponse page(HttpServletRequest request,
			@RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize,
			@RequestParam(value = "currentPageNo", required = false, defaultValue = "1") Integer currentPageNo,
			@RequestParam(value = "planId", required = false) Long planId,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "advertiserId", required = false) Long advertiserId,
			@RequestParam(value = "state", required = false) Integer state,
			@RequestParam(value = "creativeType", required = false) Integer creativeType,
			@RequestParam(value = "creativeGroup", required = false) Long creativeGroupId) {
		try {
			User user = SpringUtils.getCurrentLoginUserInfo();
			if (planId != null) {
				RestResponse response = sspCreativeService.page(user.getId(), planId, currentPageNo, pageSize, name, advertiserId,
						state, creativeType, creativeGroupId);

				return response;
			} else {
				RestResponse response = sspCreativeService.page(user.getId(), currentPageNo, pageSize, name, advertiserId, state,
						creativeType, creativeGroupId);

				return response;
			}
		} catch (Exception e) {
			LOG.error("获取创意分页出错");
			return RestResponseFactory.exception(e);
		}
	}

	@ResponseBody
	@RequestMapping(value = "/getAdd", method = RequestMethod.GET)
	public ModelAndView getAdd(Long id, String planId) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("planId", planId);
		modelAndView.setViewName("ssp/putIn/creative/add");

		return modelAndView;
	}
	
	
	@RequestMapping(value = "/getUpdate", method = RequestMethod.GET)
	public String getUpdate(Long id, Model model) {
		if (id != null) {
			SspCreative creative = findById(id);
			if (creative != null) {
				model.addAttribute("creative", creative);
			}
		}
		
		return "ssp/putIn/creative/update";
	}
	
	@SuppressWarnings("unchecked")
	private SspCreative findById(Long id) {
		SspCreative creative = new SspCreative();
		creative.setId(id);
		Object object = sspCreativeService.find(creative).getResult();
		System.out.println(object);
		ArrayList<Object> list = (ArrayList<Object>) object;
		LinkedHashMap<String, SspCreative> map = (LinkedHashMap<String, SspCreative>) list.get(0);
		String json = JSONObject.toJSONString(map);
		creative = JSONObject.parseObject(json, SspCreative.class);
		return creative;
	}

	/**
	 * 
	 * @author juchaochao
	 * @2017年1月19日上午11:32:00
	 * @param id
	 * @return
	 */
	@ApiOperation(value = "根据id查询广告组，id为空时查询所有", httpMethod = "POST", response = RestResponse.class)
	@RequestMapping(value = "/findByAdvertiserId", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse findByAdvertiserId(Long id) {
		LOG.info("id:{}", id);
		try {
			RestResponse response = sspCreativeService.findByAdvertiserId(id);
			LOG.info("sspCreativeGroups", response);
			return response;
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			return RestResponseFactory.exception(e);
		}
	}
	/**
	 * 
	 * @author juchaochao
	 * @2017年1月19日上午11:32:00
	 * @param id
	 * @return
	 */
	@ApiOperation(value = "根据id查询广告组，id为空时查询所有", httpMethod = "POST", response = RestResponse.class)
	@RequestMapping(value = "/findCreativeByAdvertiser", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse findCreativeByAdvertiser(Long advertiserId,Integer creativeType,String creativeLabel,String creativeName) {
		LOG.info("advertiserId:{},creativeType:{},creativeLabel:{},creativeName:{}", advertiserId,creativeType,creativeLabel,creativeName);
		try {
			RestResponse response = sspCreativeService.findCreativeByAdvertiser(advertiserId,creativeType,creativeLabel,creativeName);
			LOG.info("sspCreativeGroups", response);
			return response;
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			return RestResponseFactory.exception(e);
		}
	}
	@ApiOperation(value = "根据策略id查询分配创意", httpMethod = "POST", response = RestResponse.class)
	@RequestMapping(value = "/findCreativeRelationByPlanId", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse findCreativeRelationByPlanId(Long planId) {
		LOG.info("planId:{}",planId);
		try {
			RestResponse response = sspCreativeService.findCreativeRelationByPlanId(planId);
			LOG.info("sspCreativeGroups", response);
			return response;
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			return RestResponseFactory.exception(e);
		}
	}
	

	@ApiOperation(value = "增加或修改创意", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "sspCreative", required = true, dataType = "SspCreative", paramType = "body")
	@RequestMapping(value = "/addOrUpdate", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse addOrUpdate(SspCreative sspCreative,Long advertiserSubmit, HttpServletRequest request,HttpSession session) {
		LOG.info("add sspCreative:{}", sspCreative);

		try {
			String labels = request.getParameter("dictLabel");//原先为dictLabelArr 页面未赋值后改为dictLabel by Bin
			labels = CommonUtil.isNotNull(labels)?labels:request.getParameter("dictLabelArr");
			if(CommonUtil.isNotNull(labels)){
				String[] labelArray = labels.substring(labels.indexOf(",") + 1).split(",");
				List<SspDictLabel> dictLabelList = new ArrayList<>();
				for (int i = 0; i < labelArray.length; i++) {
					SspDictLabel sspDictLabel = new SspDictLabel();
					sspDictLabel.setId(Long.parseLong(labelArray[i]));
					dictLabelList.add(sspDictLabel);
				}
				sspCreative.setSspDictLabelArr(dictLabelList.toArray(new SspDictLabel[] {}));
			}
	
			Long advertiserId = Long.parseLong(request.getParameter("advertiserSubmit"));
			if(CommonUtil.isNotNull(advertiserSubmit)){
				SspAdvertiser advertiser = new SspAdvertiser();
				advertiser.setId(advertiserId);
				sspCreative.setSspAdvertiser(advertiser);
			}
			
			sspCreative.setUpdateTime(new Date());
	
			String putState = request.getParameter("putState");
			if (putState != null && (putState.equals("on") || putState.equals("1"))) {
				sspCreative.setCreativeState(1);
			} else {
				sspCreative.setCreativeState(2);
			}
			
			int creativeNum = Integer.parseInt(request.getParameter("fileNum"));
			String creativeData = request.getParameter("creativeData");
			for(int i=0; i<creativeNum; i++){
				/*if(sspCreative.getCreativeType() == 1) {
					//图片字段赋值
					
				} else if(sspCreative.getCreativeType() == 2) {
					//视频字段赋值 TODO creativeSize,picSize,picName,creativeFormat,videoDuration,creativeUrl,height,width
					
				} else if(sspCreative.getCreativeType() == 3) {
					//信息流字段赋值 TODO
					
				}*/
				int width = Integer.parseInt(request.getParameter("fileWidth"+i));
				int height = Integer.parseInt(request.getParameter("fileHeight"+i));
				String size = width + "*" + height;
				String picName = request.getParameter("fileName"+i);
				String creativeFormat = request.getParameter("fileFormat"+i);
				String imageUrl = request.getParameter("fileUrl"+i);
				Double picSize = Double.parseDouble(String.format("%.2f", Double.parseDouble(request.getParameter("fileSize"+i))));
				String fileDuration = request.getParameter("fileDuration"+i);
				if(CommonUtil.isNotNull(fileDuration)){
					sspCreative.setVideoDuration(Long.parseLong(fileDuration));
				}
				sspCreative.setPicSize(picSize);
				sspCreative.setWidth(width);
				sspCreative.setHeight(height);
				sspCreative.setCreativeSize(size);
				sspCreative.setPicName(picName);
				sspCreative.setCreativeFormat(creativeFormat);
				sspCreative.setCreativeUrl(imageUrl);
				
				if(StringUtils.isNotBlank(creativeData)){
					creativeData = creativeData.replaceAll(String.format("\\$\\{%s\\}","creativeWidth"),sspCreative.getWidth()+"")
							.replaceAll(String.format("\\$\\{%s\\}","creativeHeight"),sspCreative.getHeight()+"")
							.replaceAll(String.format("\\$\\{%s\\}","creativeUrl"),SpringUtils.getProperty("image.download.url") + sspCreative.getCreativeUrl())
							.replaceAll(String.format("\\$\\{%s\\}","creativeFormat"),sspCreative.getCreativeFormat())
							.replaceAll(String.format("\\$\\{%s\\}","creativeSize"),sspCreative.getPicSize()+"")
							.replaceAll(String.format("\\$\\{%s\\}","videoDuration"),sspCreative.getVideoDuration()+"")
							.replaceAll(String.format("\\$\\{%s\\}","creativeClickAddress"),sspCreative.getCreativeClickAddress())
							.replaceAll(String.format("\\$\\{%s\\}","creativeMonitorAddress"),sspCreative.getCreativeMonitorAddress());
					
					sspCreative.setCreativeData(creativeData);
				}
				
				if (sspCreative.getId() != null) {
					// 修改
					sspCreativeService.update(sspCreative);
				} else {
					//新增
					sspCreative.setDeleteState(1);
					
					User user = SpringUtils.getCurrentLoginUserInfo();
					if(CommonUtil.isNotNull(user))
						sspCreative.setUser(user);
					
					sspCreative.setCreateTime(new Date());
					sspCreative.setCreativeState(2);
					
					sspCreativeService.save(sspCreative);
				}
			}
			return RestResponseFactory.ok();
		} catch (Exception e) {
			LOG.error("新增创意出错");
			return RestResponseFactory.exception(e);
		}
	}

	
	@ApiOperation(value = "删除创意", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "id", required = true, dataType = "long", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public RestResponse delete(Long id) {
		LOG.info("delete sspAdvertiser id:{}", id);
		try {
			SspCreative creative = new SspCreative();
			creative.setId(id);
			creative.setDeleteState(2);
			creative.setUpdateTime(new Date());
			RestResponse response = sspCreativeService.update(creative);
			//删除es对应的报表
			elasticsearchADReport.esADRepordDelete("creativeId",id);

			response.setStatus(RestResponse.OK);
			return response;
		} catch (Exception e) {
			LOG.error("删除广告主出错");
			return RestResponseFactory.exception(e);
		}
	}
	
	@ApiOperation(value = "上传图片", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "request", required = true, dataType = "HttpServletRequest", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/imageUpload", method = RequestMethod.POST)
	public Map<String, String> fileUpload(MultipartFile uploadfile) {

		Map<String, String> imageUrl = new HashMap<String, String>();
		try {
			if(CommonUtil.isNotNull(uploadfile)&&!uploadfile.isEmpty()){
				InputStream is = uploadfile.getInputStream();
				FileType ft = FileTypeJudge.getType(is);
				if(null==ft){
					imageUrl.put("error", "上传出错，原因可能为文件类型不规范");
					LOG.error("上传出错，原因可能为文件类型不规范");
					return imageUrl;
				}
				switch(ft){
				case JPEG:case PNG:case GIF:
					uploadImage(uploadfile,imageUrl);
					break;
				case SWF_CWS:case SWF_FWS:case SWF_ZWS:
					uploadFlash(uploadfile,imageUrl);
					break;
				case MP4:case MP4_1:case AVI:case FLV:
					uploadVideo(uploadfile,imageUrl);
					break;
				default:
					break;
				}
			}
			return imageUrl;
		} catch (Exception e) {
			imageUrl.put("error", "上传出错，原因可能为文件过大");
			LOG.error(e);
			return imageUrl;
		}
	}
	private void uploadVideo(MultipartFile uploadfile, Map<String, String> imageUrl) {
		try {
			if(CommonUtil.isNotNull(uploadfile)&&!uploadfile.isEmpty()){
				UploadFileInfo uploadFile = new UploadFileInfo();
				uploadFile.setFileData(uploadfile.getBytes());
				uploadFile.setFileLength(uploadfile.getSize());
				uploadFile.setFileName(uploadfile.getOriginalFilename());
//				FileInputStream fin = (FileInputStream)uploadfile.getInputStream();
//				SWFHeader swfh = SWFHeader.load(fin.getChannel());
				File tempFile = com.unioncast.ssp.front.common.util.FileUtil.writeTempFile(uploadfile.getInputStream(),false);
				Encoder encoder = new Encoder();
				MultimediaInfo mInfo = encoder.getInfo(tempFile);
				
				try {
					imageUrl.put("width", mInfo.getVideo().getSize().getWidth() + "");
					imageUrl.put("height",mInfo.getVideo().getSize().getHeight() + "");
				} catch (Exception e) {
					LOG.error("可能文件尺寸获取不到!",e);
				}
				imageUrl.put("videoDuration",mInfo.getDuration() + "");
				
				imageUrl.put("picName", uploadfile.getOriginalFilename());
				imageUrl.put("picSize", uploadfile.getSize()/1024.00 + "");
				imageUrl.put("creativeFormat",uploadfile.getOriginalFilename().substring(uploadfile.getOriginalFilename().lastIndexOf(".")));
				//删除临时文件
				com.unioncast.ssp.front.common.util.FileUtil.deleteFile(tempFile);

				RestResponse response = sspCreativeService.saveFile(uploadFile);
				if(response.getStatus() == RestResponse.OK) {
					String url = (String) response.getResult();
					imageUrl.put("imageUrl", url);
				} else {
					imageUrl.put("error", "文件上传出错");
				}
			}else{
				imageUrl.put("error", "文件不存在!");
			}
		} catch (Exception e) {
			imageUrl.put("error", "上传出错，原因可能为文件过大");
			LOG.error(e);
		}
	}
	private void uploadFlash(MultipartFile uploadfile, Map<String, String> imageUrl) {
		try {
			if(CommonUtil.isNotNull(uploadfile)&&!uploadfile.isEmpty()){
				InputStream is = uploadfile.getInputStream();
				UploadFileInfo uploadFile = new UploadFileInfo();

				uploadFile.setFileData(uploadfile.getBytes());
				uploadFile.setFileLength(uploadfile.getSize());
				uploadFile.setFileName(uploadfile.getOriginalFilename());
				FileInputStream fin = (FileInputStream)is;
				SWFHeader swfh = SWFHeader.load(fin.getChannel());
				
				imageUrl.put("width", swfh.getWidth() + "");
				imageUrl.put("height", swfh.getHeight() + "");
				
				imageUrl.put("picName", uploadfile.getOriginalFilename());
				imageUrl.put("picSize", uploadfile.getSize()/1024.00 + "");
				imageUrl.put("creativeFormat",
						uploadfile.getOriginalFilename().substring(uploadfile.getOriginalFilename().lastIndexOf(".")));

				RestResponse response = sspCreativeService.saveFile(uploadFile);
				if(response.getStatus() == RestResponse.OK) {
					String url = (String) response.getResult();
					imageUrl.put("imageUrl", url);
				} else {
					imageUrl.put("error", "文件上传出错");
				}
			}else{
				imageUrl.put("error", "文件不存在!");
			}
		} catch (Exception e) {
			imageUrl.put("error", "上传出错，原因可能为文件过大");
			LOG.error(e);
		}
	}


	private void uploadImage(MultipartFile uploadfile,Map<String, String> imageUrl){
		try {
			if(CommonUtil.isNotNull(uploadfile)&&!uploadfile.isEmpty()){
				InputStream is = uploadfile.getInputStream();
				BufferedImage bi = ImageIO.read(is);
				// if((bi.getWidth() == 120 || bi.getWidth() == 320 || bi.getWidth() == 600) && bi.getHeight() == 100 ){

				UploadFileInfo uploadFile = new UploadFileInfo();

				uploadFile.setFileData(uploadfile.getBytes());
				uploadFile.setFileLength(uploadfile.getSize());
				uploadFile.setFileName(uploadfile.getOriginalFilename());

				imageUrl.put("width", bi.getWidth() + "");
				imageUrl.put("height", bi.getHeight() + "");
				
				imageUrl.put("picName", uploadfile.getOriginalFilename());
				imageUrl.put("picSize", uploadfile.getSize()/1024.00 + "");
				imageUrl.put("creativeFormat",
						uploadfile.getOriginalFilename().substring(uploadfile.getOriginalFilename().lastIndexOf(".")));

				RestResponse response = sspCreativeService.saveFile(uploadFile);
				if(response.getStatus() == RestResponse.OK) {
					String url = (String) response.getResult();
					imageUrl.put("imageUrl", url);
				} else {
					imageUrl.put("error", "文件上传出错");
				}
			}else{
				imageUrl.put("error", "文件不存在!");
			}
		} catch (Exception e) {
			imageUrl.put("error", "上传出错，原因可能为文件过大");
			LOG.error(e);
		}
	}
	
	@ApiOperation(value = "修改创意状态", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "sspCreative", required = true, dataType = "SspCreative", paramType = "body")
	@RequestMapping(value = "/updateState", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse updateState(SspCreative sspCreative, HttpServletRequest request) {
		try {
			sspCreativeService.update(sspCreative);
			
		} catch(Exception e){
			return RestResponseFactory.exception();
		}
		return RestResponseFactory.ok();
	}
	
	

	// 删除创意
	@ApiOperation(value = "根据id删除创意", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "id", required = true, dataType = "Long", paramType = "body")
	@ResponseBody
	@RequestMapping(value = "/deleteById", method = RequestMethod.POST)
	public RestResponse deleteById(Long id) {
		try {
			if (id != null) {
				RestResponse result = sspCreativeService.deleteById(id);

				return result;
			} else {
				// 没有选择id
				return null;
			}
		} catch (Exception e) {
			System.out.println(e);
		}

		return null;
	}

	// findAllcreativeByAdvId
	@ApiOperation(value = "分配创意页面请求跳转", httpMethod = "GET")
	@RequestMapping(value = "/findAllcreativeByAdvId", method = RequestMethod.GET)
	public String findAllcreativeByAdvId(Long planId, Long advertiserId, Model model) {
		model.addAttribute("planId", planId);
		model.addAttribute("advertiserId", advertiserId);
		
		
		try {
//			model.addAttribute("AllOrders", sspOrderService.find(new SspOrder()));
//			model.addAttribute("AllPlans", sspPlanService.findByIsPlanGroup(1));
			RestResponse restResponse = sspDictLabelService.find(new SspDictLabel());
			if(restResponse.isSuccess()){
				List<SspDictLabel> listDicLabel = restResponse.getResultArr(SspDictLabel.class);
				if(CommonUtil.isNotNull(listDicLabel)){
					model.addAttribute("AllCLabels", listDicLabel);
				}
			}
			
		} catch (Exception e) {
			LOG.error("字典信息查询出错!",e);
		}
		
		return "ssp/putIn/creative/advertiserCreativeList";
	}
	
	@ApiOperation(value = "修改与策略相关的创意状态", httpMethod = "POST", response = RestResponse.class)
	@ApiImplicitParam(name = "sspCreative", required = true, dataType = "SspCreative", paramType = "body")
	@RequestMapping(value = "/changePlanCreativeRelationState", method = RequestMethod.POST)
	@ResponseBody
	public RestResponse changePlanCreativeRelationState(Long creativeId,Integer creativeState,Long planId, HttpServletRequest request) {
		try {
			SspPlanCreativeRelation sspCreative = new SspPlanCreativeRelation();
			if(creativeId!=null){
				SspCreative cr = new SspCreative();
				cr.setId(creativeId);
				sspCreative.setSspCreative(cr);
			}
			if(creativeState!=null){
				sspCreative.setState(creativeState);
			}
			if(planId!=null){
				SspPlan plan = new SspPlan();
				plan.setId(planId);
				sspCreative.setSspPlan(plan);
						
			}
			RestResponse result = 	sspCreativeService.changePlanCreativeRelationState(sspCreative);
			
		} catch(Exception e){
			return RestResponseFactory.exception();
		}
		return RestResponseFactory.ok();
	}
		// 删除创意
		@ApiOperation(value = "根据id删除计划创意关系表", httpMethod = "POST", response = RestResponse.class)
		@ApiImplicitParam(name = "id", required = true, dataType = "Long", paramType = "body")
		@ResponseBody
		@RequestMapping(value = "/deletePlanCreativeById", method = RequestMethod.POST)
		public RestResponse deletePlanCreativeById(Long creativeId,Long planId) {
			try {
				SspPlanCreativeRelation pcr = new SspPlanCreativeRelation();
				SspPlan plan = new SspPlan();
				SspCreative creative = new SspCreative();
				if (creativeId != null) {
					creative.setId(creativeId);
					pcr.setSspCreative(creative);
				}
				if(planId!=null){
					plan.setId(planId);
					plan.setDeleteState(2);
					pcr.setSspPlan(plan);
				}

				RestResponse result = sspCreativeService.deletePlanCreativeRelationById(pcr);
				return result;
				
			} catch (Exception e) {
				System.out.println(e);
			}

			return null;
		}
}
