<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formCourse" label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="课程编号" prop="courseId">
          <el-input v-model="formCourse.courseId" placeholder="请输入课程编号" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="formCourse.courseName" placeholder="请输入课程名称" />
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>

  <div class="dialong__button--wrap">
    <el-button @click="close">取消</el-button>
    <el-button color="#178557" :loading="subLoading" type="success" @click="editCourse(ruleFormRef)">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { editCourseApi } from "../../../api/course/course"
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
const props = defineProps(['courseInfo'])
const emit = defineEmits(['closeEditCourseForm', 'success'])
const courseInfo = ref(props.courseInfo)
const subLoading = ref(false)
const formCourse = reactive({
  courseId: '',
  courseName: '',
})
// 给表单填充数据
for (const key in formCourse) {
  formCourse[key] = courseInfo.value[key]
}
const ruleFormRef = ref<FormInstance>()
// 定义表单约束规则对象
const rules = reactive<FormRules>({
  courseno: [{ required: true, message: '课程编号不能为空', trigger: 'blur' }],
  coursename: [{ required: true, message: '课程名称不能为空', trigger: 'blur' }]
})
// 编辑课程信息
const editCourse = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      const { data } = await editCourseApi(formCourse)
      if (data.code === 200) {
        ElMessage.success(data.message)
        emit('success')
      } else {
        ElMessage.error(data.message)
      }
    } else {
      ElMessage.error('提交失败，你还有未填写的项！')
      console.log('error submit!', fields)
    }
    subLoading.value = false
  })
}
// 取消表单
const close = () => {
  emit('closeEditCourseForm')
}
</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>
