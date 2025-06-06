<template>

  <el-form ref="ruleFormRef" :rules="rules" :model="formUser" label-width="80px">
    <el-row>
      <!-- <el-col :span="24">
        <el-form-item prop="role" label="所属角色">
          <el-select v-model="formUser.sysRole.id" placeholder="请选择角色" style="width: 100%;">
            <el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-col> -->
      <el-col :span="12">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formUser.username" placeholder="请输入用户名" />
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
      <el-col :span="12">
        <el-form-item label="学院" prop="college">
          <el-select v-model="formUser.college" placeholder="请选择学院" clearable>
            <el-option
              v-for="item in collegeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <div class="dialong__button--wrap">
    <el-button @click="close">取消</el-button>
    <el-button color="#178557" :loading="subLoading" type="success" @click="editUser(ruleFormRef)">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { addUserApi, editUserApi, getAllRoleListApi } from "../../../api/user/user"
import { getRoleListApi } from "../../../api/role/role"
import type { FormInstance, FormRules } from 'element-plus'

const emit = defineEmits(['closeEditUserForm', 'success'])

const props = defineProps<{
  userInfo: any
}>()

const userInfo = ref(props.userInfo)

const subLoading = ref(false)
const ruleFormRef = ref<FormInstance>()
const formUser = reactive({
  studentId: 0,
  username: '',
  password: '',
  status: 1,
  studentName: '',
  email: '',
  gender: '男',
  remarks: '',
  sysRole: {
    id: ''
  },
  college: '',
})

console.log(userInfo)

// 给表单填充数据
for (const key in formUser) {
  formUser[key] = userInfo.value[key]
}

// 替换静态学院选项为动态获取
const collegeOptions = ref<Array<{value: string, label: string}>>([])

// 获取学院列表
const getCollegeList = async () => {
  try {
    const { data } = await getRoleListApi({
      pageIndex: 1,
      pageSize: 100, // 设置较大的数值以获取所有学院
      searchValue: ''
    })
    if (data.code === 200) {
      collegeOptions.value = data.data.records.map(item => ({
        value: item.departmentName,
        label: item.departmentName
      }))
    }
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  getCollegeList()
  if (props.userInfo) {
    formUser.college = props.userInfo.college
  }
})

// 定义表单约束规则对象
const rules = reactive<FormRules>({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '登录密码不能为空', trigger: 'blur' }],
  realname: [{ required: true, message: '真实姓名不能为空', trigger: 'blur' }],
  sysRole: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
  email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
  college: [{ required: true, message: '请选择学院', trigger: 'change' }]
})

// 编辑用户信息
const editUser = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      const { data } = await editUserApi(formUser)
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
  emit('closeEditUserForm')
}
</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>
