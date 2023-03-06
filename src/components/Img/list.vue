<script setup lang="ts">
import { ipcRenderer } from 'electron';
import Item from './Item.vue'
import { v4 as uuidv4 } from 'uuid'
import { ElMessage } from 'element-plus'
const el = ref<HTMLElement>()
const data = ref(Array.from({ length: 5 }, (v) => ({ id: uuidv4() })))


useInfiniteScroll(
  window,
  () => {
    // load more
    data.value.push(...Array.from({ length: 5 }, (v) => ({ id: uuidv4() })))
  },
  { distance: 10 }
)
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
  <div flex flex-row flex-wrap mx5 ref="el">
    <Item :id="i.id" v-for="i in data" />
  </div>
</template>
