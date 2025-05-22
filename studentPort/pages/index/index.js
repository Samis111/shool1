// index.js
const { courseApi } = require('../../utils/api');
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    courses: []
  },

  onLoad() {
    this.loadInitialData();
  },

  onShow() {
    this.loadInitialData();
  },

  // 加载初始数据
  async loadInitialData() {
    try {
      wx.showLoading({
        title: '加载中...'
      });

      // 获取课程表
      const scheduleRes = await courseApi.getSchedule();
      console.log('课程表数据：', scheduleRes.data.records);
      const courses = Array.isArray(scheduleRes.data.records) ? scheduleRes.data.records : [];
      
    this.setData({
        courses
      });
    } catch (err) {
      console.error('加载数据失败：', err);
      wx.showToast({
        title: '加载失败，请稍后重试',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  },

  showCourseDetail(e) {
    const { course } = e.currentTarget.dataset;
    wx.showModal({
      title: course.courseName,
      content: `课程编号：${course.courseId}\n教师：${course.teacher}\n${course.credits ? `学分：${course.credits}` : ''}`,
      showCancel: false
    });
  }
})
