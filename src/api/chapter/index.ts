import request from '@/utils/axios/request'

export const getChapterList = (courseId:any, pagination:any) => {
    const { currentPage, pageSize } = pagination
    return request({
        method: 'get',
        url: `/section/findAll`,
        params: {
            courseId,
            page: currentPage - 1,
            size: pageSize
        }
    })
}

export const addChapterItem = (addChapter:any) => {
    console.log(addChapter);
    const { course, name, state, videoUrl,info } = addChapter
    return request({
        method: 'post',
        url: `/section/add`,
        data: {
            course,
            name,
            state,
            videoUrl,
            info
        }
    })
}

// 删除章节
export const deleteChapterItem = (chapterId:any) => {
    return request({
        method: 'delete',
        url: `/section/delete?id=${chapterId}`
    })
}

// 更新章节
export const updateChapterItem = (chapterInfo:any) => {
    const { id, course, name, state, videoUrl, info } = chapterInfo
    return request({
        method: 'post',
        url: `/section/update`,
        data: {
            id,
            name,
            state,
            course:course.id,
            videoUrl,
            info
        }
    })
}