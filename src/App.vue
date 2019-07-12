<template>
	<div id="app">
		<el-container>
			<el-header>
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
            <!-- <el-menu-item index="/page2">个税计算</el-menu-item> -->
            <el-menu-item index="/page3">问题反馈</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      </el-header>
      <el-main>
        <el-col :span="24">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </el-main>
		</el-container>
	</div>
</template>

<script>
export default {
	name: 'app',
  data() {
      return {
        activeIndex: '/page1',
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

<style>
*{
	padding:0;
	margin:0;
}
.el-header{
	background-color: #545c64;
	color: #fff;
	line-height: 60px;
  font-size:22px;
}
.logo{
  border-right-width:1px;
  border-right-style:solid;
  border-color:hsla(62,77%,76%,.3);
  width:285px;
}
.el-main {
}
</style>
