<script setup lang="ts">
const isDark = useDark()
const toggle = useToggle(isDark)
function handleClick() {
  console.log(1);
  
  toggle()
}
</script>

<template>
  <div row  justify-center>
    <button icon-btn @click="handleClick" mr2>
      <i dark:i-carbon-moon i-carbon-sun block text-xl></i>
    </button>
    <a href="https://github.com/810505339/electron-vite-vue-uncoss"><i icon-btn i-carbon-logo-github text-xl></i></a>
  </div>
</template>
