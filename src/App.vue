<script setup lang="ts">
const msg = ref('Hello Vue+Vite+Electron+Unocss')

window.versions.change((message) => {
  msg.value = message
})
</script>

<template>
  <div m-auto>
    <div>
      <div row>
        <img w32 h32 m5 src="@/assets/vue.svg" />
        <img w32 h32 m5 src="@/assets/electron.svg" />
      </div>
      <div row>
        <img w32 h32 m5 src="/vite.svg" />
        <img w32 h32 m5 src="@/assets/unocss.svg" />
      </div>
    </div>
    <HelloWorld :msg="msg" />
    <Upload />
    <Footer />
  </div>
</template>


