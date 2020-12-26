<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <home :userInfo="userInfo" :navNumInfo="navNumInfo"></home>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import Home from "@/views/Home";
export default {
  name: 'app',
  components: {
    Home,
  },
  data() {
    return {
      userInfo:require("@/assets/userInfo.json"),//获取信息入口，暂时使用本地json数据，之后将使用axios与后端进行联调
      navNumInfo:require("@/assets/navNumInfo.json")
    }
  }
}
</script>

<style>
*{
  /*margin: 0;*/
  font-weight: 300;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  position: relative;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  min-height: 600px;
  /*line-height: 160px;*/
  position: relative;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
