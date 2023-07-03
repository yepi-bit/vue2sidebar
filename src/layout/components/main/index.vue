<template>
  <div class="content" :style="`background-color:${$store.state.dark ? '#1d1e1f' : '#fff'}`">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
