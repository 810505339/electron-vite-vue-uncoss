<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios'
<<<<<<< HEAD
import { ElMessage } from 'element-plus'
import { ipcRenderer } from 'electron'
=======
import { ipcRenderer } from 'electron';
>>>>>>> a3eeaa2bb0c84a6000283680f641e7cda7f0df27
const modal = ref(false)
const modalRef = ref<HTMLDivElement>()
const { isLoading, error, data } = useAxios<{ imgurl: string }>('https://api.ixiaowai.cn/mcapi/mcapi2.php?return=json')
onClickOutside(
  modalRef,
  (event) => {
    console.log(event)
    modal.value = false
  },
)

function handleClick() {
  modal.value = true
}

function download() {

  ipcRenderer.send('downloadFile', data.value!.imgurl, 'down')

}

function wallpaper() {
  ipcRenderer.send('downloadFile', data.value!.imgurl, 'set')

}

</script>

<template>
  <Teleport to="#modal">
    <div v-if="modal" fixed left="0" top="0" w="100vw" h="100vh" bg="#00000080">
      <div block ref="modalRef" absolute top="25%">
        <img :src="data?.imgurl" block>
        <div justify-around items-center flex-row bg="slate-300/20" rounded-xl w="50%" m-auto py1 flex>
          <i icon-btn i-heroicons:arrow-down @click="download"></i>
          <i icon-btn i-heroicons:viewfinder-circle-solid @click="wallpaper"></i>
        </div>
      </div>

    </div>
  </Teleport>

  <div class="w-[300px] h-[200px]" rounded-xl overflow-hidden row ref="target" my5 shadow cursor-pointer hover:shadow-md>
    <div v-if="error" animate-pulse bg="gray-500/5" class=" w100% h100%" text-center items-center justify-center flex>
      <i i-material-symbols:error icon-btn></i>
    </div>
    <div animate-pulse bg="gray-500/5" class=" w100% h100%" v-if="isLoading" text-center items-center justify-center flex>
      <i i-eos-icons:loading icon-btn></i>
    </div>
    <img v-if="!error && !isLoading" :src="data?.imgurl" block @click.stop="handleClick" h="100%">

  </div>
</template>
