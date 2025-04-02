<template>
  <el-col class="hidden-md-and-down" :lg="6" :xl="6">

  </el-col>
</template>

<script setup lang="ts">

import { useUserStore } from '../../../store/modules/user'
import { calculateDays } from "../../../utils/date";
const { userInfo } = useUserStore()
// 服务器路径
const url = import.meta.env.VITE_APP_BASE_API


</script>

<style scoped>
.right_box {
  width: 100%;
  height: auto;
  background: white;
  padding: 20px;
  /* 添加此属性 padding间距不扩大div */
  box-sizing: border-box;
}

.right_photo {
  position: relative;
  text-align: center;
  height: 100px;
  width: 100px;
  margin-left: -50px;
  left: 50%;
}

.info {
  text-align: center;
}

.right_photo img {
  width: 100%;
  border-radius: 50%;
}

.right_box h2 {
  padding-top: 10px;
  letter-spacing: 0;
  font-size: 30px;
}

.right_box .title {
  color: #178557;
}
</style>
