<script setup lang="ts">
import { isDark } from '@/composables/dark';
import { ipcRenderer } from 'electron';


const toggle = useToggle(isDark)

async function handleClick() {
  toggle()
}
function close() {
  ipcRenderer.send('close')
}
</script>

<template>
  <div justify-center z20 flex py2 shadow-xl>
    <i icon-btn i-heroicons:x-mark text-xl absolute left="5" @click="close"></i>
    <i icon-btn dark:i-carbon-moon i-carbon-sun block text-xl mr5 @click="handleClick"></i>
    <a href="https://github.com/810505339/electron-vite-vue-uncoss" target="_blank">
      <i icon-btn i-carbon-logo-github text-xl>

      </i>
    </a>
  </div>
</template>
