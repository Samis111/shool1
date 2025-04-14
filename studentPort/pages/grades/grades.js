Page({
  data: {
    allGrades: [
      {
        id: 1,
        name: '高等数学',
        score: 95
      },
      {
        id: 2,
        name: '大学英语',
        score: 88
      },
      {
        id: 3,
        name: '计算机基础',
        score: 92
      },
      {
        id: 4,
        name: '大学物理',
        score: 85
      },
      {
        id: 5,
        name: '线性代数',
        score: 90
      },
      {
        id: 6,
        name: '程序设计基础',
        score: 94
      }
    ],
    averageScore: 0
  },

  onLoad() {
    this.calculateAverage();
  },

  // 计算平均分
  calculateAverage() {
    const total = this.data.allGrades.reduce((sum, grade) => sum + grade.score, 0);
    const average = (total / this.data.allGrades.length).toFixed(1);

    this.setData({
      averageScore: average
    });
  }
}); 