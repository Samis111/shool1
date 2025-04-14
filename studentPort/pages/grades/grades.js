const { gradeApi } = require('../../utils/api');

Page({
  data: {
    gradeList: [],
    stats: {
      totalScore: 0,
      averageScore: 0,
      totalCount: 0
    }
  },

  onLoad() {
    this.loadGradeData();
  },

  onShow() {
    this.loadGradeData();
  },

  // 加载成绩数据
  async loadGradeData() {
    try {
      wx.showLoading({
        title: '加载中...'
      });

      // 获取成绩列表
      const gradesRes = await gradeApi.getGrades();
      console.log('成绩列表数据：', gradesRes.data.records);
      const gradeList = Array.isArray(gradesRes.data.records) ? gradesRes.data.records : [];
      
      // 计算统计数据
      const stats = this.calculateStats(gradeList);
      
      this.setData({
        gradeList,
        stats
      });
    } catch (err) {
      console.error('加载成绩失败：', err);
      wx.showToast({
        title: '加载失败，请稍后重试',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  },

  // 计算统计数据
  calculateStats(gradeList) {
    if (!gradeList.length) {
      return {
        totalScore: 0,
        averageScore: 0,
        totalCount: 0
      };
    }

    const totalScore = gradeList.reduce((sum, grade) => sum + (grade.score || 0), 0);
    const totalCount = gradeList.length;
    const averageScore = totalCount ? (totalScore / totalCount).toFixed(1) : 0;

    return {
      totalScore,
      averageScore,
      totalCount
    };
  },

  // 获取成绩等级
  getGradeLevel(score) {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 60) return 'pass';
    return 'fail';
  },

  // 下拉刷新
  async onPullDownRefresh() {
    try {
      await this.loadGradeData();
    } finally {
      wx.stopPullDownRefresh();
    }
  }
}); 