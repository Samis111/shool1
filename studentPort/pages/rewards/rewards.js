Page({
  data: {
    records: [
      {
        id: 1,
        studentName: '张三',
        time: '2024-03-15',
        type: 'reward',
        description: '获得三好学生称号'
      },
      {
        id: 2,
        studentName: '张三',
        time: '2024-03-10',
        type: 'reward',
        description: '在校园歌唱比赛中获得一等奖'
      },
      {
        id: 3,
        studentName: '张三',
        time: '2024-02-28',
        type: 'punishment',
        description: '旷课一次，给予警告处分'
      },
      {
        id: 4,
        studentName: '张三',
        time: '2024-02-15',
        type: 'reward',
        description: '积极参与志愿服务活动，表现优异'
      },
      {
        id: 5,
        studentName: '张三',
        time: '2024-01-20',
        type: 'punishment',
        description: '考试作弊，给予记过处分'
      }
    ]
  },

  onLoad() {
    // 按时间降序排序
    this.sortRecords();
  },

  sortRecords() {
    const sortedRecords = this.data.records.sort((a, b) => {
      return new Date(b.time) - new Date(a.time);
    });
    
    this.setData({
      records: sortedRecords
    });
  }
}); 