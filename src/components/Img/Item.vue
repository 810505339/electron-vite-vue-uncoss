<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios'
const emit = defineEmits<{
  (e: 'itemClick', url: string | undefined): void
}>()
const { isLoading, error, data } = useAxios<{ imgurl: string }>('https://api.ixiaowai.cn/mcapi/mcapi2.php?return=json')
function handleClick() {
  emit('itemClick', data.value?.imgurl)
}
</script>

<template>
  <div class="w-[300px] h-[200px]" rounded-xl overflow-hidden row ref="target" my5 shadow cursor-pointer hover:shadow-md>
    <div v-if="error" animate-pulse bg="gray-500/5" class=" w100% h100%" text-center items-center justify-center flex>
      <i i-material-symbols:error icon-btn></i>
    </div>
    <div animate-pulse bg="gray-500/5" class=" w100% h100%" v-if="isLoading" text-center items-center justify-center flex>
      <i i-eos-icons:loading icon-btn></i>
    </div>
    <img v-if="!error && !isLoading" :src="data?.imgurl" block @click.stop="handleClick()" h="100%">

  </div>
</template>
