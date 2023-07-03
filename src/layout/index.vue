<template>
  <div :class="$store.state.dark && 'common-layout'" style="transition: background-color .4s ease;">
    <el-scrollbar height="100vh">
      <el-container>
        <el-aside :style="`--el-aside-width: ${!$store.state.collapse ? '200px' : '55px'}`">
          <vs-sidebar/>
        </el-aside>
        <el-container>
          <el-header class="el-header">
            <navBar/>
          </el-header>
          <el-main class="el-main">
            <vs-main/>
          </el-main>
        </el-container>
      </el-container>
    </el-scrollbar>
  </div>
</template>

<script>
import navBar from "@/layout/components/navBar";
import vsMain from "@/layout/components/main";
import vsSidebar from "@/layout/components/sidebar";

export default {
  components: {
    navBar,
    vsMain,
    vsSidebar
  }

}
</script>

<style scoped>
.common-layout {
  background-color: #1d1e1f;
}


.el-main {
  padding: 0 6px;
}

.test {
  height: 100%;
  overflow: hidden;
}

.el-header {
  height: 50px;
  padding: 0;
}

.el-aside {
  transition: width 0.3s ease-in-out;
}
</style>
