<template>
  <div>
    <span v-myColor>主页</span>
    <el-button @click="paramClick">传参</el-button>
    <div>
      <h3>标签popover 展示全部</h3>
      <div>
        <span class="s_greenType" v-for="(item,index) in tagsList" :key="index">
          <span>{{ item }}</span>
        </span>
      </div>
      <div v-if="tagsList2 && tagsList2.length > 3">
        <span class="s_greenType" v-for="(item,index) in tagsList" :key="index">
          <span>{{ item }}</span>
        </span>
        <template>
          <el-popover trigger="hover" visible-arrow="false" placement="bottom">
            <div slot="reference" style="display: inline-block">
              <span class="s_greenType" style="cursor: pointer">
                <span>···</span>
              </span>
            </div>
            <span class="s_greenType" v-for="(item,index) in tagsList2.slice(3,tagsList2.length)" :key="index">
                <span>{{ item }}</span>
              </span>
          </el-popover>
        </template>
      </div>
    </div>
    <div>
      <h3>v-model进行绑定,子组件通过value接收,实现父子组件的数据交互</h3>
      <vueMath v-model="desc"></vueMath>
    </div>
  </div>
</template>

<script>
import vueMath from '../components/vueMath.vue'
export default {
  name: "firstView",
  components: {vueMath},
  data() {
    return {
      tagsList: ['JAVA', 'JavaScript', 'HTML'],
      tagsList2: ['JAVA', 'JavaScript', 'HTML', 'CSS3', 'Python', 'Go', 'Linux', 'C++'],
      desc: '$$x = {-b \\\\pm \\\\sqrt{b^2-4ac} \\\\over 2a}.$$'
    }
  },
  methods: {
    paramClick() {
      this.$router.push({
        name: 'paramRoute',
        params: {id: '123123'}
      })
      // this.$router.push(`/paramRoute/${123123213}`)
    },
  }
}
</script>

<style scoped>

.s_greenType {
  display: inline-block;
  margin-right: 6px;
  padding: 4px 8px;
  color: #00efa1;
  border: 1px solid #00efa1;
  background-color: rgb(241, 248, 230);
  margin-bottom: 3px;
  /*cursor: pointer;*/
}

</style>
