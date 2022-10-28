import request from '@/utils/axios/request'

// 获取班级列表
export const reqGetClassList = (pagination: any) => {
    let params = {}
    if(pagination !== undefined){
        const { currentPage, pageSize } = pagination
         params = {
            page: currentPage-1,
            size: pageSize
        }
    }else{
         params = {}
    }
    return request({
        method: 'get',
        url: `/grade/findAll`,
        params
    })
}

// 添加班级
export const reqAddClassesItem = (classesItem: any) => {
    const { name, atmosphere, coverUrl, headteacher } = classesItem
    return request({
        method: 'post',
        url: `/grade/add`,
        data: {
            name, 
            atmosphere, 
            coverUrl, 
            headteacher: headteacher.id
        }
    })
}

// 删除班级
export const reqDeleteClasserItem = (classId: any) => {
    return request({
        method: 'delete',
        url: `/grade/delete`,
        params: {
            id: classId
        }
    })
}
