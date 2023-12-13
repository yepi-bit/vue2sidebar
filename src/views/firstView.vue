<template>
  <div>
    <span v-myColor>主页</span>
    <el-button @click="paramClick">传参</el-button>
    <div>
      <h3>2.标签popover 展示全部</h3>
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
      <h3>3.v-model进行绑定,子组件通过value接收,实现父子组件的数据交互</h3>
      <vueMath v-model="desc"></vueMath>
    </div>
    <div>
      <h3>4.iframe换open</h3>
      <el-button @click="iframeOpen">弹窗open</el-button>
      <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="50%">
        <iframe id="iframe" src="https://www.bilibili.com/" width="800" height="400" frameborder="0"></iframe>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <h3>5.答题卡</h3>
      <el-button @click="testClick">Go</el-button>
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
      desc: '$$x = {-b \\\\pm \\\\sqrt{b^2-4ac} \\\\over 2a}.$$',
      dialogVisible:false,
    }
  },
  methods: {
    paramClick() {
      this.$router.push({
        name: 'paramRoute',
        params: {id: '1'}
      })
      // this.$router.push(`/paramRoute/${123123213}`)
    },
    iframeOpen() {
      this.dialogVisible = true
      window.open("https://www.bilibili.com/",'_blank');
    },
    testClick() {
      this.$router.push({
        name: 'paramRoute',
        params: {id: '2'}
      })
    }
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
