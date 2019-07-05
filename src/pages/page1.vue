<template>
  <div id="app">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="应缴查询" name="first">应缴查询</el-tab-pane>
      <el-tab-pane label="发起缴税" name="second">发起缴税</el-tab-pane>
      <el-tab-pane label="缴纳结果" name="third">缴纳结果</el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  name: 'page1',
  data() {
      return {
          activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }

    }
}
</script>

<style>

</style>
