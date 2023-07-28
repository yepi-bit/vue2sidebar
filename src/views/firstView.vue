<template>
  <div>
    <span v-myColor>主页</span>
    <el-button @click="paramClick">传参</el-button>
  </div>
</template>

<script>
export default {
  name: "firstView",
  methods: {
    paramClick() {
      this.$router.push({
        name: 'paramRoute',
        params: {id: '123123'}
      })
      // this.$router.push(`/paramRoute/${123123213}`)
    }
  }
}
</script>

<style scoped>

</style>
