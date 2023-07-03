<template>
<div>我是paramRoute</div>
</template>

<script>
export default {
  name: "paramRoute",
  mounted() {
    console.log(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
