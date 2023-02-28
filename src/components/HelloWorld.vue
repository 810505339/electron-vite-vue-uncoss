<script setup lang='ts'>
defineProps<{
  msg: string
}>()
const count = ref(0)
function handleClick() {
  count.value++
}
</script>

<template>
  <div my5>
    <p text-xl mb5>{{ msg }}</p>
    <div block text-center>
      <button py2 px4 inline-block  bg-blue-3 dark:bg-blue-4 rounded  @click="handleClick" block >counter:{{ count }}</button>
    </div>
  </div>
</template>
