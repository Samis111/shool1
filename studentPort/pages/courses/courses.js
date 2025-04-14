Page({
  data: {
    courses: [
      {
        name: '高等数学',
        teacher: '张教授',
        time: '周一 1-2节',
        location: '教学楼A-101',
        credit: 4
      },
      {
        name: '大学英语',
        teacher: '李教授',
        time: '周二 3-4节',
        location: '教学楼B-202',
        credit: 4
      },
      {
        name: '计算机基础',
        teacher: '王教授',
        time: '周三 5-6节',
        location: '实验楼C-303',
        credit: 3
      }
    ]
  },

  onLoad: function() {
    // 可以在这里从服务器获取课程数据
  }
}); 