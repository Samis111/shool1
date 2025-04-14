const { rewardApi } = require('../../utils/api');

Page({
  data: {
    rewardList: [],
    stats: {
      rewardCount: 0,
      punishmentCount: 0
    }
  },

  onLoad() {
    this.loadRewardData();
  },

  onShow() {
    this.loadRewardData();
  },

  // 加载奖惩数据
  async loadRewardData() {
    try {
      wx.showLoading({
        title: '加载中...'
      });

      // 获取奖惩列表
      const rewardsRes = await rewardApi.getRewards();
      console.log('奖惩列表数据：', rewardsRes.data.records);
      const rewardList = Array.isArray(rewardsRes.data.records) ? rewardsRes.data.records : [];
      
      // 计算统计数据
      const stats = this.calculateStats(rewardList);
      
      this.setData({
        rewardList,
        stats
      });
    } catch (err) {
      console.error('加载奖惩记录失败：', err);
      wx.showToast({
        title: '加载失败，请稍后重试',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  },

  // 计算统计数据
  calculateStats(rewardList) {
    return rewardList.reduce((stats, item) => {
      if (item.eventType === '奖励') {
        stats.rewardCount++;
      } else if (item.eventType === '处分') {
        stats.punishmentCount++;
      }
      return stats;
    }, {
      rewardCount: 0,
      punishmentCount: 0
    });
  },

  // 格式化日期
  formatDate(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  },

  // 下拉刷新
  async onPullDownRefresh() {
    try {
      await this.loadRewardData();
    } finally {
      wx.stopPullDownRefresh();
    }
  }
}); 