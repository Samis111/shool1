<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formTeacher" label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item prop="gradeClass" label="学生">
          <el-select v-model="formTeacher.course.studentId" placeholder="请选择学生" style="width: 100%;">
            <el-option v-for="item in courseOptions" :key="item.studentId" :label="item.studentName" :value="item.studentId" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="gradeClass" label="类型">
          <el-select v-model="formTeacher.course.eventType" placeholder="请选择类型" style="width: 100%;">
            <el-option 
              v-for="item in addtype" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value" 
            />
          </el-select>
        </el-form-item>
      </el-col>


      <el-col :span="24">
        <el-form-item label="备注">
          <el-input v-model="formTeacher.eventDescription" :rows="2" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <div class="dialong__button--wrap">
    <el-button @click="close">取消</el-button>
    <el-button color="#178557" :loading="subLoading" type="success" @click="addTeacher(ruleFormRef)">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { addTeacherApi, getAllCourseListApi } from "../../../api/teacher/teacher";
import type { FormInstance, FormRules } from 'element-plus'

// 定义学生信息接口
interface Student {
  studentId: number
  studentName: string
  // ... 其他学生相关字段
}

// 定义事件类型接口
interface EventType {
  value: string
  label: string
}

// 定义表单数据接口
interface TeacherForm {
  name: string
  teachno: string
  sex: string
  phone: string
  course: {
    id: string
    studentId?: number
    eventType?: string
  }
  qq: string
  remarks: string
  eventDescription?: string
}

const ruleFormRef = ref<FormInstance>()
const subLoading = ref(false)

// 使用类型定义
const formTeacher = reactive<TeacherForm>({
  name: '',
  teachno: '',
  sex: '',
  phone: '',
  course: {
    id: '',
    studentId: undefined,
    eventType: undefined
  },
  qq: '',
  remarks: '',
  eventDescription: ''
})

// 使用类型定义
const addtype = ref<EventType[]>([
  { value: '奖励', label: '奖励' },
  { value: '惩罚', label: '惩罚' }
])

// 使用类型定义
const courseOptions = ref<Student[]>([])

// 获取所有课程列表
async function getAllCourseList() {
  try {
    const { data } = await getAllCourseListApi()
    if (data.code === 200) {
      courseOptions.value = data.result
    }
  } catch (e) {
    console.log(e)
  }
}

// 定义表单约束规则对象
const rules = reactive<FormRules>({
  name: [{ required: true, message: '教师姓名不能为空', trigger: 'blur' }],
  sex: [{ required: true, message: '性别不能为空', trigger: 'blur' }],
  phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
  qq: [{ required: true, message: 'qq号不能为空', trigger: 'blur' }],
  course: [{ required: true, message: '教授科目不能为空', trigger: 'blur' }],
  teachno: [{ required: true, message: '教师工号不能为空', trigger: 'blur' }],
})

// 新增教师信息
const addTeacher = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      const { data } = await addTeacherApi(formTeacher)
      if (data.status === 200) {
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

getAllCourseList()
const emit = defineEmits(['closeAddTeacherForm', 'success'])
// 取消表单
const close = () => {
  emit('closeAddTeacherForm')
}
</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>
