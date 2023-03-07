<script setup lang="ts">
import { ipcRenderer } from 'electron';
import Item from './Item.vue'
import { v4 as uuidv4 } from 'uuid'
import { ElMessage } from 'element-plus'
const el = ref<HTMLElement>()
const data = ref(Array.from({ length: 10 }, (v) => ({ id: uuidv4() })))
const itemUrl = ref('')
const loading = ref(false)
function load() {
  loading.value = true
  setTimeout(() => {
    data.value.push(...Array.from({ length: 10 }, (v) => ({ id: uuidv4() })))
    loading.value = false
  }, 1000)

}

function download() {

  ipcRenderer.send('downloadFile', itemUrl.value, 'down')

}

function wallpaper() {
  console.log(itemUrl.value);

  ipcRenderer.send('downloadFile', itemUrl.value, 'set')

}



const modal = ref(false)
const modalRef = ref<HTMLDivElement>()

onClickOutside(
  modalRef,
  (event) => {
    console.log(event)
    modal.value = false
  },
)



function itemClick(url: string | undefined) {
  modal.value = true
  itemUrl.value = url as string
}


onMounted(() => {

  console.log(1)
  ipcRenderer.on('downloadItemDone', (event, type,file) => {
    console.log(type,file)
    ElMessage({
      type: 'success',
      message: `${type === 'set' ? '设置' : '下载'}成功`
    })
  })
})
</script>

<template>
  <div h="600px">
    <el-scrollbar flex flex-row justify-center ref="el" m-auto h="100%">
      <div v-infinite-scroll="load" :infinite-scroll-delay="1000" :infinite-scroll-disabled="loading"
        :infinite-scroll-immediate="false">
        <Item :id="i.id" v-for="i in data" @itemClick="itemClick" />
        <p v-if="loading" text-center>Loading...</p>
      </div>
    </el-scrollbar>
  </div>

  <Teleport to="#modal">
    <div fixed v-if="modal" left="0" top="0" w="100vw" h="100vh" bg="#00000080">
      <div block ref="modalRef" absolute top="25%">
        <img :src="itemUrl" block>
        <div justify-around items-center flex-row bg="slate-300/20" rounded-xl w="50%" m-auto py1 flex>
          <i icon-btn i-heroicons:arrow-down @click="download"></i>
          <i icon-btn i-heroicons:viewfinder-circle-solid @click="wallpaper"></i>
        </div>
      </div>

    </div>
  </Teleport>
</template>
