<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;"><Histogram /></el-icon>课程成绩统计
        </h3>

        <div class="card-search">
          <el-select v-model="courseId" placeholder="请选择科目" style="width: 100%;" @change="changeCourse">
            <el-option v-for="item in courseOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
      </div>
    </template>

    <div class="chart-container">
      <div class="chart-wrapper">
        <div ref="pieChart" style="width: 100%; height: 400px;"></div>
      </div>
      <div class="chart-wrapper">
        <div ref="barChart" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCourseListApi } from "../../api/course/course"
import { getScoreCensusApi } from "../../api/census/census"
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'

// 定义科目ID和选项
const courseId = ref()
const courseOptions = ref<Array<{id: number, name: string}>>([])

// 图表实例
const pieChart = ref()
const barChart = ref()
let pieChartInstance: echarts.ECharts | null = null
let barChartInstance: echarts.ECharts | null = null

// 获取所有课程列表
async function getAllCourseList() {
  try {
    const { data } = await getCourseListApi({
      pageIndex: 1,
      pageSize: 1000
    })
    if (data.code === 200) {
      courseOptions.value = data.data.records.map(item => ({
        id: item.courseId,
        name: item.courseName
      }))
    }
  } catch (e) {
    console.log(e)
  }
}

// 统计课程成绩
const getScoreCensus = async () => {
  if (!courseId.value) return
  
  try {
    const { data } = await getScoreCensusApi(courseId.value)
    if (data.code === 200) {
      // 处理返回的数据
      const chartData = data.data.map((item: any) => ({
        gradeLevel: item.gradeLevel,
        count: item.count,
        percentage: item.percentage
      }))
      
      // 更新图表
      initPieChart(chartData)
      initBarChart(chartData)
    } else {
      ElMessage.error(data.message || '获取数据失败')
    }
  } catch (error) {
    console.error('获取成绩统计失败：', error)
    ElMessage.error('获取成绩统计失败，请重试')
  }
}

// 初始化饼图
const initPieChart = (data: any[]) => {
  if (!pieChartInstance) {
    pieChartInstance = echarts.init(pieChart.value)
  }

  const option = {
    title: {
      text: '成绩分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}人 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: data.map(item => item.gradeLevel)
    },
    series: [
      {
        name: '成绩分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data.map(item => ({
          value: item.count,
          name: item.gradeLevel,
          percentage: item.percentage
        }))
      }
    ]
  }

  pieChartInstance.setOption(option)
}

// 初始化柱状图
const initBarChart = (data: any[]) => {
  if (!barChartInstance) {
    barChartInstance = echarts.init(barChart.value)
  }

  const option = {
    title: {
      text: '成绩分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params: any) {
        const item = params[0]
        return `${item.name}<br/>人数：${item.value}人<br/>占比：${data[item.dataIndex].percentage.toFixed(1)}%`
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.gradeLevel)
    },
    yAxis: {
      type: 'value',
      name: '人数'
    },
    series: [
      {
        data: data.map(item => item.count),
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        itemStyle: {
          color: function(params: any) {
            const colors = ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272']
            return colors[params.dataIndex]
          }
        }
      }
    ]
  }

  barChartInstance.setOption(option)
}

const changeCourse = () => {
  getScoreCensus()
}

// 监听窗口大小变化
window.addEventListener('resize', () => {
  pieChartInstance?.resize()
  barChartInstance?.resize()
})

// 组件挂载后加载数据
onMounted(() => {
  getAllCourseList()
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-card__header) {
  border-bottom: 1px solid rgb(238 238 238);
  color: #178557;
}

.chart-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.chart-wrapper {
  flex: 1;
  min-width: 300px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  padding: 20px;
}

.el-card {
  border-radius: 0px;
  border: none;
}
</style>
