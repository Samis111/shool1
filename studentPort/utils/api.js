// API基础URL
const BASE_URL = 'http://localhost:8082';  // 修改为实际的后端地址


// 添加请求拦截器
const requestInterceptor = (options) => {
  const token = wx.getStorageSync('token')
  if (token) {
    options.header = {
      ...options.header,
      'Authorization': `Bearer ${token}`
    }
  }
  return options
}

// 添加响应拦截器
const responseInterceptor = (response) => {
  if (response.statusCode === 401) {
    // token过期，清除登录状态
    wx.removeStorageSync('token')
    wx.redirectTo({
      url: '/pages/profile/profile'
    })
    throw new Error('登录已过期，请重新登录')
  }
  return response
}

// 修改request方法
const request = (url, options = {}) => {
  options = requestInterceptor(options)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      ...options,
      success: (res) => {
        try {
          const response = responseInterceptor(res)
          if (response.statusCode === 200) {
            resolve(response.data)
          } else {
            reject(new Error(response.data.message || '请求失败'))
          }
        } catch (error) {
          reject(error)
        }
      },
      fail: reject
    })
  })
}

// 获取当前用户 Id
const getCurrentUserId = () => {
  const userInfo = wx.getStorageSync('userInfo')
  return userInfo.id
}


// 用户相关接口
const userApi = {
  // 获取用户信息
  getUserInfo: () => {
    return request('/user/info');
  },

  // 更新用户信息
  updateUserInfo: (data) => {
    return request('/user/info', 'PUT', data);
  },

  // 更新用户头像
  updateAvatar: (filePath) => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${BASE_URL}/user/avatar`,
        filePath,
        name: 'avatar',
        header: {
          'Authorization': `Bearer ${wx.getStorageSync('token')}`
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(res.data));
          } else {
            reject(res);
            wx.showToast({
              title: '上传失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          reject(err);
          wx.showToast({
            title: '网络错误',
            icon: 'none'
          });
        }
      });
    });
  },

  // 修改密码
  changePassword: (data) => {
    return request('/user/password', 'PUT', data);
  }
};

// 课程相关接口
const courseApi = {
  // 获取课程表
  getSchedule: () => {
    return request(`/course?pageIndex=1&pageSize=10&searchValue=`, 'GET');

  },

};

// 成绩相关接口
const gradeApi = {
  // 获取所有成绩
  getGrades: () => {
    return request(`/scores?pageIndex=1&pageSize=10&userid=1&name=&stuno=${getCurrentUserId()}`, 'GET');
  },

};

// 奖惩相关接口
const rewardApi = {
  // 获取奖惩记录
  getRewards: () => {
    return request(`/rewardsPunishments?pageIndex=1&pageSize=10&searchValue=`, 'GET');
  },
};

module.exports = {
  userApi,
  courseApi,
  gradeApi,
  rewardApi
}; 