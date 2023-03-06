<script setup lang="ts">
import Item from './Item.vue'
import { v4 as uuidv4 } from 'uuid'
const el = ref<HTMLElement>()
const data = ref(Array.from({ length: 5 }, (v) => ({ id: uuidv4() })))


useInfiniteScroll(
  window,
  () => {
    // load more
    data.value.push(...Array.from({ length: 5 }, (v) => ({ id: uuidv4() })))
  },
  { distance: 10 }
)

</script>

<template>
  <div flex flex-row flex-wrap mx5 ref="el">
    <Item :id="i.id" v-for="i in data" />
  </div>
</template>
