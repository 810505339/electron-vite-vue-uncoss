<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import HelloWorld from '@/components/HelloWorld.vue'
console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
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
      <img w32 h32  m5 src="@/assets/unocss.svg" />
    </div>
    </div>
    <HelloWorld msg="Hello Vue+Vite+Electron+Unocss" />
    <Footer/>
  </div>
</template>


