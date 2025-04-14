// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    currentWeek: 1,
    weekDays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    timeSlots: [
      { start: '8:00', end: '9:40' },
      { start: '10:00', end: '11:40' },
      { start: '14:00', end: '15:40' },
      { start: '16:00', end: '17:40' },
      { start: '19:00', end: '20:40' }
    ],
    courses: [
      {
        id: 1,
        name: '高等数学',
        teacher: '张教授',
        location: 'A101',
        time: '周一 1-2节',
        credit: 4,
        totalHours: 64,
        type: '必修课',
        intro: '本课程主要讲授高等数学的基本概念、基本理论和基本方法，培养学生的数学思维能力和应用数学知识解决实际问题的能力。通过本课程的学习，学生将掌握微积分、线性代数等重要数学工具，为后续专业课程打下坚实基础。',
        cover: '/images/math.png',
        color: '#e6f7ff',
        details: [
          '课程特点：注重理论与实践结合，采用案例教学方法',
          '考核方式：平时成绩30% + 期末考试70%',
          '教材：《高等数学》（第七版）同济大学数学系编'
        ]
      },
      {
        id: 2,
        name: '大学英语',
        teacher: '李教授',
        location: 'B202',
        time: '周二 3-4节',
        credit: 4,
        totalHours: 64,
        type: '必修课',
        intro: '培养学生在日常生活、社交、文化等方面的英语交际能力，提高学生的英语综合应用能力。课程设计新颖，融入大量实用场景对话和文化知识，让学习更有趣味性。',
        cover: '/images/english.png',
        color: '#fff7e6',
        details: [
          '课程特点：互动式教学，小组讨论，英语角活动',
          '考核方式：口语40% + 笔试60%',
          '教材：《新视野大学英语》（第三版）'
        ]
      },
      {
        id: 3,
        name: '计算机基础',
        teacher: '王教授',
        location: 'C303',
        time: '周三 5-6节',
        credit: 3,
        totalHours: 48,
        type: '必修课',
        intro: '介绍计算机的基本概念、原理和应用，培养学生计算机基础知识和基本操作技能。课程包含理论讲解和上机实践，让学生掌握必要的计算机应用能力。',
        cover: '/images/computer.png',
        color: '#f6ffed',
        details: [
          '课程特点：理论结合实践，每周2学时上机操作',
          '考核方式：上机考试60% + 理论考试40%',
          '教材：《计算机应用基础》（第四版）'
        ]
      }
    ],
    todayCourses: [],
    weeklyCourses: []
  },

  onLoad() {
    this.setCurrentWeek();
    this.updateCourses();
  },

  setCurrentWeek() {
    // 这里可以根据实际开学时间计算当前是第几周
    // 暂时写死为第1周
    this.setData({
      currentWeek: 1
    });
  },

  updateCourses() {
    // 获取当前是星期几（0-6，0代表周日）
    const today = new Date().getDay();
    // 转换为我们的日期格式（0-6，0代表周一）
    const adjustedToday = today === 0 ? 6 : today - 1;

    // 筛选今日课程
    const todayCourses = this.data.courses.filter(course => {
      return course.day === adjustedToday && 
             course.weeks.includes(this.data.currentWeek);
    }).sort((a, b) => a.slot - b.slot);

    // 筛选本周课程
    const weeklyCourses = this.data.courses.filter(course => {
      return course.weeks.includes(this.data.currentWeek);
    }).sort((a, b) => {
      if (a.day === b.day) {
        return a.slot - b.slot;
      }
      return a.day - b.day;
    });

    this.setData({
      todayCourses,
      weeklyCourses
    });
  },

  changeWeek(e) {
    const type = e.currentTarget.dataset.type;
    let newWeek = this.data.currentWeek;
    
    if (type === 'prev' && newWeek > 1) {
      newWeek--;
    } else if (type === 'next' && newWeek < 20) {
      newWeek++;
    }

    this.setData({
      currentWeek: newWeek
    }, () => {
      this.updateCourses();
    });
  },

  showCourseDetail(e) {
    const { course } = e.currentTarget.dataset;
    wx.showModal({
      title: course.name,
      content: `${course.intro}\n\n${course.details.join('\n')}`,
      showCancel: false
    });
  }
})
