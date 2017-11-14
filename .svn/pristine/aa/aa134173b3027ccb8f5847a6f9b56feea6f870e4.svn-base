package com.unioncast.ssp.front.service.ssp;

import com.unioncast.common.page.PageCriteria;
import com.unioncast.common.restClient.RestResponse;
import com.unioncast.common.user.model.Module;

/**
 * 模块接口方法
 *
 * @auther wangyao
 * @date 2017-02-21 14:30
 */
public interface SspModuleService {

    /**
     * 根据系统查找模块
     *
     * @param systemId
     * @return
     * @author wangyao
     * @date 2017/2/21  14:33
     */
    Module[] findModuleBySystemId(Long systemId);

    /**
     * 根据角色查找模块
     *
     * @param roleId
     * @return
     * @author wangyao
     * @date 2017/2/21  14:33
     */
    Module[] findByRoleId(Long roleId);

    /**
     * 分页
     *
     * @param pageCriteria
     * @return
     * @author wangyao
     * @date 2017/2/21  14:33
     */
    RestResponse pageAll(PageCriteria pageCriteria);

    /**
     * 根据id查找
     *
     * @param moduleId
     * @return
     * @author wangyao
     * @date 2017/2/21  14:33
     */
    Module[] findById(Long moduleId);

    /**
     * 删除
     *
     * @param longArray
     * @author wangyao
     * @date 2017/2/21  14:34
     */
    void deleteByModuleIds(Long[] longArray);

    /**
     * 根据id删除
     *
     * @param moduleId
     * @author wangyao
     * @date 2017/2/21  14:34
     */
    void deleteById(Long moduleId);

    /**
     * 根据名称查找
     *
     * @param name
     * @param systemId
     * @return
     * @author wangyao
     * @date 2017/2/21  14:34
     */
    Module[] findByNameAndSystem(String name, long systemId);

    /**
     * 保存
     *
     * @param module
     * @return
     * @author wangyao
     * @date 2017/2/21  14:34
     */
    RestResponse save(Module module);

    /**
     * 更新
     *
     * @param module
     * @return
     * @author wangyao
     * @date 2017/2/21  14:34
     */
    RestResponse update(Module module);
}
