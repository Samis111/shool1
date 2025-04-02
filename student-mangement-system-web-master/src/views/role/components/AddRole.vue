<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formRole" label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="院系名称" prop="departmentName">
          <el-input v-model="formRole.departmentName" placeholder="请输入院系名称" />
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>

  <div class="dialong__button--wrap">
    <el-button @click="close">取消</el-button>
    <el-button color="#178557" :loading="subLoading" type="success" @click="addRole(ruleFormRef)">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { addRoleApi } from "../../../api/role/role";
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
// 定义表单约束规则对象
const rules = reactive<FormRules>({
  
})
const subLoading = ref(false)
const emit = defineEmits(['closeAddRoleForm', 'success'])
const formRole = reactive({
  departmentName: '',
  
})
// 新增角色信息
const addRole = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      const { data } = await addRoleApi(formRole)
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
  emit('closeAddRoleForm')
}
</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>
