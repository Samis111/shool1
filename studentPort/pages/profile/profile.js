// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    studentId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取全局用户信息
    const app = getApp();
    const userInfo = app.globalData.userInfo || {};
    const studentId = wx.getStorageSync('studentId');
    
    // 确保 userInfo 中有 nickname 字段
    if (!userInfo.nickname && userInfo.nickName) {
      userInfo.nickname = userInfo.nickName;
    }
    
    this.setData({
      userInfo,
      studentId
    });
    console.log('当前用户信息：', userInfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时也更新用户信息
    const app = getApp();
    const userInfo = app.globalData.userInfo || {};
    if (!userInfo.nickname && userInfo.nickName) {
      userInfo.nickname = userInfo.nickName;
    }
    this.setData({
      userInfo
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 跳转到编辑页面
  navigateToEdit() {
    console.log('准备跳转到编辑页面');
    wx.navigateTo({
      url: '/pages/editProfile/editProfile',
      success: (res) => {
        console.log('跳转成功');
      },
      fail: (err) => {
        console.error('跳转失败：', err);
        // 尝试使用另一种跳转方式
        wx.redirectTo({
          url: '/pages/editProfile/editProfile',
          success: (res) => {
            console.log('重定向跳转成功');
          },
          fail: (error) => {
            console.error('重定向也失败了：', error);
            wx.showToast({
              title: '页面跳转失败',
              icon: 'none'
            });
          }
        });
      }
    });
  },

  // 头像和昵称相关方法
  userInput(e) {
    console.log(e);
    // 使用 e.detail.value 获取输入框的值
    let nickname = e.detail.value;
    this.setData({
      userInfo: {
       ...this.data.userInfo,
        nickname: nickname
      }
    });
    // 更改全局用户信息
    getApp().globalData.userInfo = this.data.userInfo;
    console.log(getApp().globalData.userInfo);
  },

  onChooseAvatar(e) {
    console.log('选择头像：', e.detail);
    this.setData({
      // 更新头像 userInfo.avatarUrl
      userInfo: {
        ...this.data.userInfo,
        avatarUrl: e.detail.avatarUrl
      }
    });
    // 更改全局用户信息
    getApp().globalData.userInfo = this.data.userInfo;
    console.log(getApp().globalData.userInfo);
  },

  // 编辑真实姓名
  editRealName() {
    wx.showModal({
      title: '修改姓名',
      content: '请输入真实姓名',
      editable: true,
      placeholderText: this.data.userInfo.realName,
      success: (res) => {
        if (res.confirm && res.content) {
          // TODO: 更新服务器数据
          this.setData({
            'userInfo.realName': res.content
          });
        }
      }
    });
  },

  // 编辑性别
  editGender() {
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: (res) => {
        const gender = res.tapIndex === 0 ? 'male' : 'female';
        // TODO: 更新服务器数据
        this.setData({
          'userInfo.gender': gender
        });
      }
    });
  },

  // 修改密码
  changePassword() {
    wx.showModal({
      title: '修改密码',
      content: '请前往密码修改页面',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/changePassword/changePassword'
          });
        }
      }
    });
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储
          wx.clearStorage();
          // 清除全局数据
          getApp().globalData.userInfo = {};
          // 重置数据
          this.setData({
            userInfo: {},
            studentId: ''
          });
          // 跳转到登录页
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
      }
    });
  }
})