<template id="v1">
<el-container class="v1">
  <el-header class="header" style="padding:0">
      <div class="logo"><span>广州银行自助缴税服务系统</span></div>
      <div class="menu">
        <router-link to='/page1' class="item">应缴税收</router-link>
        <router-link to='/page3' class="item">问题反馈</router-link>
      </div>
  </el-header>
  <el-main>
    <el-col :span="24">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-col>
  </el-main>
  <el-footer>
    <span>版权所有：广州银行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 客户服务电话：96699（广东）、400-83-96699（全国）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址：广州市天河区珠江东路30号广州银行大厦&nbsp;&nbsp;&nbsp;</span>
    <router-link to='/v2' class="item">版本2</router-link>
  </el-footer>
</el-container>
</template>
<script>
export default {
  name: 'v1',
  data() {
    return {
      activeIndex: '/page1',
      isActive:true,
    };
  },
  created:function(){
    this.$router.push("/page1");
  },
  methods: {
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" src="./../style/v1.scss"></style>
