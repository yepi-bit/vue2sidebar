<template>
  <div class="side-bar">
    <el-menu
        :collapse="$store.state.collapse"
        :default-active="$route.path"
        router
        unique-opened
        active-text-color="#fff"
        :background-color="`${$store.state.dark ? '#1d1e1fbd' : '#001529'}`"
        @select="selectMenu"
        :class="`el-menu-vertical-demo ${$store.state.collapse && 'hideIcon'}`"
        style="height: 100vh"
        text-color="#ffffffa6">
      <div class="logo">
        <el-avatar :size="35" src="#"/>
        <span v-if="!$store.state.collapse" style="color: #FFFFFF">YePi</span>
      </div>
      <sub-menu :routes="getRoutes" />
    </el-menu>
  </div>
</template>

<script>
import subMenu from "@/layout/components/sidebar/subMenu";

export default {
  components: {
    subMenu
  },
  data() {
    return {
      // current: computed(() => router.currentRoute.value.path),
      // menuList: localStorage.getItem("localMenu")
    }
  },
  computed: {
    getRoutes() {
      return global.antRouter
    }
  },
  methods: {
    selectMenu() {

    }
  }
}
</script>

<style scoped>

</style>
