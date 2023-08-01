<template>
  <div class="mathTex">
    <el-row :gutter="50">
      <el-col :span="12">
        <h3>编写</h3>
        <textarea :value="value" @input="changeDesc($event.target.value)" style="width: 100%;"></textarea>
      </el-col>
      <el-col :span="12">
        <h3>预览</h3>
        <math-jax :latex="value" :block="true" />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {MathJax} from 'mathjax-vue'

export default {
  components: {
    MathJax
  },
  props: ['value'], // 接受父组件v-model绑定的数据传参
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    changeDesc(data) {
      this.$emit('input', data)
    }
  },
  watch: {
    desc(newVal, oldVal) {

    }
  }
}
</script>

<style scoped>
.mathTex {
  width: 50%;
}
</style>


