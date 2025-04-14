// pages/profile/profile.js
const { userApi } = require('../../utils/api');

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
    this.loadUserInfo();
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
    this.loadUserInfo();
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

  // 加载用户信息
  async loadUserInfo() {
    try {
      wx.showLoading({
        title: '加载中...'
      });
      const res = await userApi.getUserInfo();
      // 获取全局用户信息（微信头像和昵称）
      const wxUserInfo = getApp().globalData.userInfo || {};
      
      this.setData({
        userInfo: {
          ...res.data,
          avatarUrl: wxUserInfo.avatarUrl || res.data.avatarUrl,
          nickname: wxUserInfo.nickname || res.data.nickname
        },
        studentId: res.data.studentId
      });
    } catch (err) {
      console.error('获取用户信息失败：', err);
    } finally {
      wx.hideLoading();
    }
  },

  // 头像和昵称相关方法
  async userInput(e) {
    const nickname = e.detail.value;
    try {
      // 更新本地显示
      this.setData({
        'userInfo.nickname': nickname
      });
      
      // 更新全局数据
      getApp().globalData.userInfo = {
        ...getApp().globalData.userInfo,
        nickname
      };

      // 调用接口更新昵称
      await userApi.updateUserInfo({
        nickname
      });
    } catch (err) {
      console.error('更新昵称失败：', err);
    }
  },

  async onChooseAvatar(e) {
    const avatarUrl = e.detail.avatarUrl;
    try {
      // 更新本地显示
      this.setData({
        'userInfo.avatarUrl': avatarUrl
      });

      // 更新全局数据
      getApp().globalData.userInfo = {
        ...getApp().globalData.userInfo,
        avatarUrl
      };

      // 上传头像到服务器
      await userApi.updateAvatar(avatarUrl);
    } catch (err) {
      console.error('更新头像失败：', err);
    }
  },

  // 跳转到编辑页面
  navigateToEdit() {
    wx.navigateTo({
      url: '/pages/editProfile/editProfile',
      fail: (err) => {
        console.error('跳转失败：', err);
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        });
      }
    });
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
  async logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
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
          } catch (err) {
            console.error('退出登录失败：', err);
            wx.showToast({
              title: '退出失败',
              icon: 'none'
            });
          }
        }
      }
    });
  }
})