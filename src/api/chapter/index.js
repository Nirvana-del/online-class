import request from '../request';

export const getChapterList = (courseId, pagination) => {
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

export const addChapterItem = (addChapter) => {
    console.log(addChapter);
    const { course, name, state } = addChapter
    return request({
        method: 'post',
        url: `/section/add`,
        data: {
            course,
            name,
            state
        }
    })
}

// 删除章节
export const deleteChapterItem = (chapterId) => {
    return request({
        method: 'delete',
        url: `/section/delete?id=${chapterId}`
    })
}

// 更新章节
export const updateChapterItem = (addChapter) => {
    const { id, course, name, state } = addChapter
    console.log(id, course, name, state);
    return request({
        method: 'post',
        url: `/section/update`,
        data: {
            id,
            name,
            state,
            course,
        }
    })
}
