const { userApi } = require('../../utils/api');

Page({
  data: {
    realName: '',
    genders: ['男', '女'],
    genderIndex: 0,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  },

  async onLoad() {
    try {
      wx.showLoading({
        title: '加载中...'
      });
      // 获取用户信息
      const res = await userApi.getUserInfo();
      const userInfo = res.data;
      
      this.setData({
        realName: userInfo.realName || '',
        genderIndex: userInfo.gender === 'female' ? 1 : 0
      });
    } catch (err) {
      console.error('获取用户信息失败：', err);
      wx.showToast({
        title: '获取信息失败',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
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
  async saveChanges() {
    const { realName, genderIndex, oldPassword, newPassword, confirmPassword } = this.data;

    // 验证表单
    if (!realName.trim()) {
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'none'
      });
      return;
    }

    try {
      wx.showLoading({
        title: '保存中...'
      });

      // 更新用户基本信息
      await userApi.updateUserInfo({
        realName: realName.trim(),
        gender: genderIndex === 1 ? 'female' : 'male'
      });

      // 如果输入了密码，则更新密码
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

        // 更新密码
        await userApi.changePassword({
          oldPassword,
          newPassword
        });
      }

      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });

      // 延迟返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);

    } catch (err) {
      console.error('保存失败：', err);
      wx.showToast({
        title: err.data?.message || '保存失败',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  }
}); 