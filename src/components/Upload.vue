<script setup lang="ts">

const fileList = ref<string[]>([])
async function upload() {

  const res = await window.versions.upload()
  console.log(res);
  fileList.value = res
}
</script>

<template>
  <div block text-center>
    <button px4 py2 bg-fuchsia rounded m2 @click="upload">通过electron上传文件</button>
    <div>
      <div>上传的文件:</div>
      <div v-for="file in fileList" :key="file">{{ file }}</div>
    </div>
  </div>
</template>
