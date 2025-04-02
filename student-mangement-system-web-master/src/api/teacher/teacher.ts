import request from '../request'
export function getTeacherListApi(data:object) {
    return request({
        url: 'rewardsPunishments',
        method: 'get',
        params: data
    })
}
// 添加教师信息
export function addTeacherApi(data:object) {
    return request({
        url: 'rewardsPunishments/save',
        method: 'post',
        data
    })
}
// 获取所有课程列表
export function getAllCourseListApi() {
    return request({
        url: 'user/list',
        method: 'get'
    })
}
// 根据ID获取教师信息
export function getTeacherApi(id:number) {
    return request({
        url: `rewardsPunishments/${id}`,
        method: 'get'
    })
}
// 更新教师信息
export function editTeacherApi(data:object) {
    return request({
        url: 'rewardsPunishments/update',
        method: 'post',
        data
    })
}
// 根据ID删除教师信息
export function deleteTeacherApi(id:number) {
    return request({
        url: `rewardsPunishments/del/${id}`,
        method: 'post'
    })
}
