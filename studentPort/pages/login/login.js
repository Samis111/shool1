Page({
  data: {
    userInfo: null,
    phoneNumber: null,
  },

  onLoad() {
    // 检查是否已经登录
    const token = wx.getStorageSync('token');
    if (token) {
      this.redirectToHome();
    }
  },

  // 处理微信登录
  async handleWechatLogin() {
    try {
      // 获取用户信息
      const userProfile = await wx.getUserProfile({
        desc: '用于完善用户资料'
      });

      this.setData({
        userInfo: userProfile.userInfo
      });

      // 获取登录凭证
      const loginResult = await wx.login();
      if (loginResult.code) {
        // 发送到后端进行登录验证
        const result = await this.loginWithServer({
          code: loginResult.code,
          userInfo: userProfile.userInfo
        });

        if (result.success) {
          // 保存登录信息
          wx.setStorageSync('token', result.token);
          wx.setStorageSync('userInfo', userProfile.userInfo);

          // 跳转到首页
          this.redirectToHome();
        }
      }
    } catch (error) {
      console.error('登录失败：', error);
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none'
      });
    }
  },

  // 获取手机号
  async getPhoneNumber(e) {
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      try {
        // 获取登录凭证
        const loginResult = await wx.login();

        // 发送到后端解密手机号
        const result = await this.loginWithServer({
          code: loginResult.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        });

        if (result.success) {
          this.setData({
            phoneNumber: result.phoneNumber
          });

          // 保存登录信息
          wx.setStorageSync('token', result.token);
          wx.setStorageSync('phoneNumber', result.phoneNumber);

          // 跳转到首页
          this.redirectToHome();
        }
      } catch (error) {
        console.error('获取手机号失败：', error);
        wx.showToast({
          title: '获取手机号失败，请重试',
          icon: 'none'
        });
      }
    }
  },

  // 与服务器通信进行登录
  async loginWithServer(data) {
    try {
      const response = await wx.request({
        url: 'YOUR_API_BASE_URL/api/login',
        method: 'POST',
        data: data
      });

      return response.data;
    } catch (error) {
      console.error('服务器通信失败：', error);
      throw error;
    }
  },

  // 跳转到首页
  redirectToHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  // 显示隐私政策
  showPrivacyPolicy() {
    wx.navigateTo({
      url: '/pages/privacy/privacy'
    });
  }
}); 