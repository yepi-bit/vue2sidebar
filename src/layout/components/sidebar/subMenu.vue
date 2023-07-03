<template>
  <div>
        <template v-for="item in meuns" v-if="!item.hidden">
          <el-menu-item :index="item.path" v-if="!item.children">
            <i class="el-icon-setting"></i>
            <template #title>
              <span v-if="item.meta.title">{{ item.meta.title }}</span>
            </template>
          </el-menu-item>
    <!--  多级    -->
          <el-submenu :index="item.path" v-if="item.children">
            <template slot="title">
              <span v-if="item.meta.title">{{ item.meta.title }}</span>
            </template>
            <template v-for="itemChild in item.children" v-if="!itemChild.hidden">
              <template>
                <el-menu-item :index="itemChild.path">
                  <span v-if="itemChild.meta?.title">{{ itemChild.meta?.title }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>


<!--    <div v-for="(item,i) in meuns"-->
<!--         :key="i">-->
<!--      <el-submenu :index="item.path"-->
<!--                  v-if="item.children">-->
<!--        <template slot="title">-->
<!--          <i :class="item.icon"></i>-->
<!--          <span class="tohide">{{ item.name }}</span>-->
<!--        </template>-->
<!--        <el-menu-item :index="val.path"-->
<!--                      v-for="val in item.children"-->
<!--                      :key="val.id">-->
<!--          <i class="el-icon-s-help"></i>-->
<!--          <span>{{ val.name }}</span>-->
<!--        </el-menu-item>-->
<!--      </el-submenu>-->
<!--      <el-menu-item :index="item.path"-->
<!--                    v-else>-->
<!--        <i :class="item.icon"></i>-->
<!--        <span slot="title">{{ item.name }}</span>-->
<!--      </el-menu-item>-->
<!--    </div>-->
  </div>
</template>
<script>
export default {
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      meuns: []
    }
  },

  mounted() {
    this.meuns = this.routes
  }
}

</script>
