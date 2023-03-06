<script setup lang="ts">
import { isDark } from '@/composables/dark';


const toggle = useToggle(isDark)

async function handleClick() {
  toggle()
}
</script>

<template>
  
  <div  justify-center  z20 flex>
    <button icon-btn @click="handleClick" mr2>
      <i dark:i-carbon-moon i-carbon-sun block text-xl></i>
    </button>
    <a href="https://github.com/810505339/electron-vite-vue-uncoss"><i icon-btn i-carbon-logo-github text-xl></i></a>
  </div>
</template>
