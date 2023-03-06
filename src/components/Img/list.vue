<script setup lang="ts">
import { ipcRenderer } from 'electron';
import Item from './Item.vue'
import { v4 as uuidv4 } from 'uuid'
import { ElMessage } from 'element-plus'
const el = ref<HTMLElement>()
const data = ref(Array.from({ length: 10 }, (v) => ({ id: uuidv4() })))



onMounted(() => {
  ipcRenderer.on('downloadItemDone', (event, type) => {
    ElMessage({
      type: 'success',
      message: `${type === 'set' ? '设置' : '下载'}成功`
    })
  })
})
</script>

<template>
  <el-scrollbar flex flex-row justify-center mx5 ref="el" m-auto  height="600px">
    <Item :id="i.id" v-for="i in data" />
  </el-scrollbar>

  
</template>
<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
