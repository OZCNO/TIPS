<template>
	<div id="app">
		<el-container>
			<!-- <el-header>
        <el-row>
          <el-col :span="4">
            <div class="logo"><span>广州银行自助缴税服务系统</span></div>
          </el-col>
          <el-col :span="20">
            <el-menu
              router
              :default-active="activeIndex"
              mode="horizontal"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              >
              <el-menu-item index="/page1">应缴税收</el-menu-item>
              <el-menu-item index="/page3">问题反馈</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header> -->
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
        <span>版权所有：广州银行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 客户服务电话：96699（广东）、400-83-96699（全国）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址：广州市天河区珠江东路30号广州银行大厦</span>
      </el-footer>
		</el-container>
	</div>
</template>

<script>
export default {
	name: 'app',
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
      // handleSelect(key, keyPath) {
        // this.$router.push(key);
        // console.log(key, keyPath);
      // }
    }
}
</script>
<style src="./style/v1.css"></style>
