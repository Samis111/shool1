<template>
  <el-card class="box-card">
    <!--头部 start-->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;">
            <UserFilled />
          </el-icon>课程管理
        </h3>

        <!--搜索区域 start-->
        <div class="card-search">
          <el-row :gutter="10">
            <el-col :span="10">
              <el-input :prefix-icon="Search" v-model="searchValue" @keyup.enter.native="search"
                placeholder="关键字搜索（回车）" />
            </el-col>
            <el-col :span="11">
              <div class="my-button">
                <el-button plain style="width: 100%;" color="#2fa7b9" @click="addCourse">添加课程</el-button>
                <el-button @click="exportExcelAction" type="primary">
                  <el-icon style="margin-right: 1px">
                    <Download />
                  </el-icon>导出 Excel
                </el-button>
              </div>
            </el-col>
            <el-col :span="3"
              style="display: inline-flex;justify-content: center;align-items: center; cursor: pointer;">
              <el-icon style="font-size: 20px;color: #b3b6bc;" @click="refresh">
                <Refresh />
              </el-icon>
            </el-col>
          </el-row>
        </div>
        <!--搜索区域 end-->

      </div>
    </template>
    <!--头部 end-->
    <!--表格区域 start-->
    <div class="table-box">
      <el-table element-loading-text="数据加载中..." v-loading="loading" :data="tableData"
        style="width: 100%;text-align: center" :cell-style="{ textAlign: 'center' }" :row-class-name="rowClassName"
        :header-cell-style="{ fontSize: '15px', background: '#178557', color: 'white', textAlign: 'center' }">

        <el-table-column label="序号" width="100" type="index" :index="Nindex" />
        <el-table-column label="课程编号">
          <template #default="scope">
            <span>{{ scope.row.courseId }}</span>
          </template>
        </el-table-column>

        <el-table-column label="课程名称">
          <template #default="scope">
            <span>{{ scope.row.courseName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="院系">
          <template #default="scope">
            <span>{{ scope.row.teacher }}</span>
          </template>
        </el-table-column>


        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="editCourse(scope.row.courseId)"
              style="margin: 0 0 10px 10px;">编辑</el-button>
            <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="Delete" icon-color="#626AEF"
              :title="'确定删除课程名为“' + scope.row.courseName + '”的课程吗？'" @confirm="delCourse(scope.row.courseId)">
              <template #reference>
                <el-button size="small" type="danger" style="margin-bottom: 10px;">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!--表格区域 end-->
    <!--分页 start-->
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total"
      v-model:page-size="pageSize" @current-change="changePage" :page-sizes="[10, 20, 30, 40]" />
    <!--分页 end-->
  </el-card>

  <!--新增课程弹出框 start-->
  <el-dialog align-center v-model="addCourseDialogFormVisible" width="42%" destroy-on-close>
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <el-icon size="26px">
          <EditPen />
        </el-icon>
        <h1 id="titleId">{{ addTitle }}</h1>
      </div>

    </template>
    <!--添加课程组件 start-->
    <AddCourse @closeAddCourseForm="closeAddCourseForm" @success="success" />
    <!--添加课程组件 end-->
  </el-dialog>
  <!--新增课程弹出框 end-->

  <!--编辑课程弹出框 start-->
  <el-dialog align-center v-model="editCourseDialogFormVisible" width="42%" destroy-on-close>
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <el-icon size="26px">
          <EditPen />
        </el-icon>
        <h1 id="titleId">{{ editTitle }}</h1>
      </div>

    </template>
    <!--编辑课程组件 start-->
    <EditCourse :courseInfo="courseInfo" @closeEditCourseForm="closeEditCourseForm" @success="success" />
    <!--编辑课程组件 end-->
  </el-dialog>
  <!--编辑课程弹出框 end-->

</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import { formatTime } from "../../utils/date"
import { ElMessage } from 'element-plus'
import AddCourse from "./components/AddCourse.vue";
import EditCourse from "./components/EditCourse.vue"
import { deleteCourseApi, getCourseApi, getCourseListApi } from "../../api/course/course";
import { exportExcel } from "../../utils/exprotExcel";
const state = reactive({
  // 搜索表单内容
  searchValue: "",
  // 表格全部信息
  tableData: [],
  total: 0, //总条数
  pageSize: 10, //每页显示行数
  pageIndex: 1, //当前页码
  loading: false, // 数据加载
})
// 新增课程弹出框
const addCourseDialogFormVisible = ref(false)
const addTitle = ref('新增课程')
// 获取课程列表数据
const loadData = async (state: any) => {
  state.loading = true
  // 先清空数据
  state.tableData = []
  const params = {
    'pageIndex': state.pageIndex,
    'pageSize': state.pageSize,
    'searchValue': state.searchValue
  }
  const { data } = await getCourseListApi(params)

  state.tableData = data.data.records
  state.total = data.data.size
  state.loading = false
}
const Nindex = (index) => {
  // 当前页数 - 1 * 每页数据条数 + 1
  const page = state.pageIndex // 当前页码
  const pagesize = state.pageSize // 每页条数
  return index + 1 + (page - 1) * pagesize
}
// 刷新按钮
const refresh = () => {
  // 搜索表单内容
  state.searchValue = ""
  // 更新数据
  loadData(state);
}
// 搜索
const search = () => {
  if (state.searchValue !== null) {
    ElMessage({
      type: 'success',
      message: `关键字“${state.searchValue}”搜索内容如下`,
    })
    loadData(state)
  }
}
// 切换页面的执行事件，  val 当前页码
const changePage = (val) => {
  state.pageIndex = val;
  loadData(state);
}
// 添加课程
const addCourse = () => {
  addCourseDialogFormVisible.value = true
}
// 关闭新增课程弹出框
const closeAddCourseForm = () => {
  addCourseDialogFormVisible.value = false
}
// 提交表单回调函数
const success = () => {
  loadData(state);
  addCourseDialogFormVisible.value = false
  editCourseDialogFormVisible.value = false
}
// 编辑课程弹窗状态
const editCourseDialogFormVisible = ref(false)
const editTitle = ref('编辑课程')
// 编辑课程信息
const courseInfo = ref()
const editCourse = async (id: number) => {
  const { data } = await getCourseApi(id)
  courseInfo.value = data.data
  editCourseDialogFormVisible.value = true
}
// 关闭编辑课程弹出框
const closeEditCourseForm = () => {
  editCourseDialogFormVisible.value = false
}
// 删除课程信息
const delCourse = async (id: number) => {
  const { data } = await deleteCourseApi(id)
  if (data.code === 200) {
    ElMessage.success('删除成功')
    await loadData(state);
  } else {
    ElMessage.error('删除失败')
  }
}
// 导出列表
const column = [
  { name: 'id', label: '课程id' },
  { name: 'courseno', label: '课程编号' },
  { name: 'coursename', label: '课程名称' },
  { name: 'remarks', label: '备注' }
]
const exportExcelAction = () => {
  exportExcel({
    column,
    data: state.tableData,
    filename: '课程信息数据',
    format: 'xlsx',
    autoWidth: true,
  })
}
//挂载后加载数据
onMounted(() => {
  loadData(state);
})
const { tableData, pageIndex, pageSize, loading, total, searchValue } = toRefs(state)
</script>

<style scoped>
.card-header {
  display: flex;
  /* 弹性布局 */
  justify-content: space-between;
  /*内容对齐方式 */
  align-items: center;
  /*设置或检索弹性盒子元素在侧轴（纵轴）方向上的对齐方式*/
}

.card-header h3 {
  display: inline-flex;
  /*行内块元素*/
  justify-content: center;
  align-items: center;
}

:deep(.el-card__header) {
  border-bottom: 1px solid rgb(238 238 238);
  color: #178557;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.el-card {
  border-radius: 0px;
  border: none;
}

/*分页样式*/
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #178557;
}

.el-pagination {
  margin-top: 20px;
  justify-content: center;
}

/*新增课程弹出框自定义头部样式*/
.my-header {
  display: flex;
  justify-content: flex-start;
}

/*自定义按钮样式*/
.my-button {
  display: flex;
  justify-content: space-between;
}

/*修改v-loading样式*/
:deep(.el-loading-spinner .el-loading-text) {
  color: #178557;
}

:deep(.el-loading-spinner .path) {
  stroke: #178557;
}
</style>
