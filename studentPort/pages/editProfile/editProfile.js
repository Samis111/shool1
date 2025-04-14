Page({
  data: {
    realName: '',
    genders: ['男', '女'],
    genderIndex: 0,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  },

  onLoad() {
    // 获取本地存储的用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        realName: userInfo.realName || '',
        genderIndex: userInfo.gender === 'female' ? 1 : 0
      });
    }
  },

  // 输入事件处理
  onRealNameInput(e) {
    this.setData({
      realName: e.detail.value
    });
  },

  onGenderChange(e) {
    this.setData({
      genderIndex: e.detail.value
    });
  },

  onOldPasswordInput(e) {
    this.setData({
      oldPassword: e.detail.value
    });
  },

  onNewPasswordInput(e) {
    this.setData({
      newPassword: e.detail.value
    });
  },

  onConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },

  // 保存修改
  saveChanges() {
    const { realName, genderIndex, oldPassword, newPassword, confirmPassword } = this.data;

    // 验证表单
    if (!realName.trim()) {
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'none'
      });
      return;
    }

    // 如果输入了密码，则验证密码
    if (oldPassword || newPassword || confirmPassword) {
      if (!oldPassword) {
        wx.showToast({
          title: '请输入原密码',
          icon: 'none'
        });
        return;
      }
      if (!newPassword) {
        wx.showToast({
          title: '请输入新密码',
          icon: 'none'
        });
        return;
      }
      if (!confirmPassword) {
        wx.showToast({
          title: '请确认新密码',
          icon: 'none'
        });
        return;
      }
      if (newPassword !== confirmPassword) {
        wx.showToast({
          title: '两次密码输入不一致',
          icon: 'none'
        });
        return;
      }
      if (newPassword.length < 6 || newPassword.length > 20) {
        wx.showToast({
          title: '密码长度需在6-20位之间',
          icon: 'none'
        });
        return;
      }
    }

    // 更新用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    userInfo.realName = realName;
    userInfo.gender = genderIndex === 1 ? 'female' : 'male';
    
    // 保存到本地存储
    wx.setStorageSync('userInfo', userInfo);

    // TODO: 调用后端API更新用户信息和密码

    wx.showToast({
      title: '保存成功',
      icon: 'success',
      success: () => {
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
  }
}); 