<template>

  <el-form ref="ruleFormRef" :rules="rules" :model="formUser" label-width="80px">
    <el-row>
 
      <el-col :span="12">
        <el-form-item label="账号" prop="studentId">
          <el-input v-model="formUser.studentName" placeholder="请输入账号" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="formUser.password" placeholder="请输入密码" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="真实姓名" prop="studentName">
          <el-input v-model="formUser.studentName" placeholder="请输入真实姓名" />
        </el-form-item>
      </el-col>
     
      <el-col :span="12">
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formUser.gender" fill="#178557">
            <el-radio-button label="男" />
            <el-radio-button label="女" />
          </el-radio-group>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="12">
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formUser.status" fill="#178557">
            <el-radio-button :label="1">正常</el-radio-button>
            <el-radio-button :label="0">封禁</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col> -->

      <!-- <el-col :span="24">
        <el-form-item label="备注">
          <el-input v-model="formUser.remarks" :rows="2" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-col> -->

    </el-row>
  </el-form>

  <div class="dialong__button--wrap">
    <el-button @click="close">取消</el-button>
    <el-button color="#178557" :loading="subLoading" type="success" @click="addUser(ruleFormRef)">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addUserApi, getAllRoleListApi } from "../../../api/user/user"
import type { FormInstance, FormRules } from 'element-plus'
import { getAllCourseListApi } from "../../../api/teacher/teacher";
const emit = defineEmits(['closeAddUserForm', 'success'])
const subLoading = ref(false)
const ruleFormRef = ref<FormInstance>()
const formUser = reactive({
  studentId: '',
  password: '',
  status: 1,
  studentName: '',
  email: '',
  gender: '男',
  remarks: '',
  
})
// 定义表单约束规则对象
const rules = reactive<FormRules>({
  studentId: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '登录密码不能为空', trigger: 'blur' }],
  studentName: [{ required: true, message: '真实姓名不能为空', trigger: 'blur' }],
  sysRole: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
 
})

// 新增用户信息
const addUser = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      const { data } = await addUserApi(formUser)
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

// 定义角色下拉选择项
const roleOptions = ref<object[]>([])
// 获取所有角色列表
async function getAllRoleList() {
  try {
    const { data } = await getAllRoleListApi()
    if (data.status === 200) {
      roleOptions.value = data.result
    }
  } catch (e) {
    console.log(e)
  }
}
getAllRoleList()
// 取消表单
const close = () => {
  emit('closeAddUserForm')
}
</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>
