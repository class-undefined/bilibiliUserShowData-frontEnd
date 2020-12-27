<template>
  <div id="app">
    <el-container>
      <el-header >
        <header-div @updateInfo="upDataInfo"/>
      </el-header>
      <el-main>
        <home v-loading="loading" :userInfo="userInfo" :navNumInfo="navNumInfo"></home>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import Home from "@/views/Home";
import request from "@/api/request/request";
import query from "@/api/config/query";
import HeaderDiv from "@/components/HeaderDiv";
export default {
  name: 'app',
  components: {
    HeaderDiv,
    Home,
  },
  data() {
    return {
      userInfo:require("@/assets/userInfo.json"),//获取信息入口，暂时使用本地json数据，之后将使用axios与后端进行联调
      navNumInfo:require("@/assets/navNumInfo.json"),
      loading:true,
      requestCount:0
    }
  },
  mounted() {
    this.getNumInfo()
    this.getUserInfo()
  },
  methods:{
    getNumInfo(){
      request.post(query.numInfo,{"mid":3766866})
      .then(res=>{
        // console.log(res);
        this.navNumInfo = res.data
        this.requestCount++
        if(this.requestCount==2){
          this.loading = false
        }
      })
    },
    getUserInfo(){
      request.post(query.userInfo,{"mid":3766866})
          .then(res=>{
            this.userInfo = res.data
            this.requestCount++
            if(this.requestCount==2){
              this.loading = false
            }
          })
    },
    upDataInfo(data){
      // let self = this
      let userInfo = data.userInfo
      let numInfo = data.numInfo
      this.userInfo = userInfo
      this.navNumInfo = numInfo

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
  /*background-color: #B3C0D1;*/
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  margin-bottom: 10px;
  min-height: 65px;
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
