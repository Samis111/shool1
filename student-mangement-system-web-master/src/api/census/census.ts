import request from '../request'

// 获取成绩统计信息
export function getScoreCensusApi(courseId:number) {
  return request({
    url: '/scores/census',
    method: 'get',
    params: {
      courseId,
    }
  })
} 