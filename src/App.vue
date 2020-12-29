<template>
  <div id="app">
    <el-container>
      <el-header>
        <header-div />
      </el-header>
      <el-main>
        <home v-loading="loading"
              :element-loading-text="loadingText"
              :userInfo="userInfo"
              :navNumInfo="navNumInfo"></home>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import Home from "@/views/Home";
import request from "@/api/request/request";
import  {query,queryNum} from "@/api/config/query";
import HeaderDiv from "@/components/HeaderDiv";
import signal from "@/SignalConfig";
export default {
  name: 'app',
  components: {
    HeaderDiv,
    Home,
  },
  data() {
    return {
      userInfo: require("@/assets/userInfo.json"),//获取信息入口，暂时使用本地json数据，之后将使用axios与后端进行联调
      navNumInfo: require("@/assets/navNumInfo.json"),
      typeInfo:{},
      loading: true,
      loadingText:"正在获取数据...",
      requestCount: 0,
    }
  },
  mounted() {
    // this.getNumInfo()
    // this.getUserInfo()
    // this.getTypeInfo()
    this.globalEmit.$on(signal.UPDATE,this.upDataInfo)
    /*接收来自HeaderDiv组件的axios请求的then的callback函数发送的SEARCH信号, 改变loading状态*/
    this.globalEmit.$on(signal.SEARCH,load=>{
      this.loadingText = load.text
      this.loading = load.state
    })
  },
  methods: {
    getNumInfo() {
      request.post(query.numInfo, {"mid": 3766866})
          .then(res => {
            // console.log(res);
            this.navNumInfo = res.data
            this.requestCount++
            if (this.requestCount === queryNum) {
              this.globalEmit.$emit(signal.UPDATE,{navNumInfo:self.navNumInfo,userInfo:self.userInfo,typeInfo:self.typeInfo})
              this.loading = false
              this.requestCount = 0
            }
          })
    },
    getUserInfo() {
      request.post(query.userInfo, {"mid": 3766866})
          .then(res => {
            this.userInfo = res.data
            this.requestCount++
            if (this.requestCount === queryNum) {
              this.globalEmit.$emit(signal.UPDATE,{navNumInfo:self.navNumInfo,userInfo:self.userInfo,typeInfo:self.typeInfo})
              this.loading = false
              this.requestCount = 0
            }
          })
    },
    getTypeInfo(){
      request.post(query.typeInfo, {"mid": 3766866})
          .then(res => {
            this.typeInfo = res.data.tlist
            this.requestCount++
            if (this.requestCount === queryNum) {
              this.globalEmit.$emit(signal.UPDATE,{navNumInfo:self.navNumInfo,userInfo:self.userInfo,typeInfo:self.typeInfo})
              this.loading = false
              this.requestCount = 0
            }
          })
    },
    upDataInfo(data) {
      // let self = this
      let userInfo = data.userInfo
      let numInfo = data.numInfo
      let typeInfo = data.typeInfo
      this.userInfo = userInfo
      this.navNumInfo = numInfo
      this.typeInfo = typeInfo
      this.loading = false
    }
  }
}
</script>

<style>
* {
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
<!--TODO：数据传递方法优化-->
<!--
发现一个刷新数据的问题：目前采用的是使用props传递数据，但发现由于组件生存周期的问题，传递数据、获取数据有冲突，
加上组件刷新数据没有采取统一刷新数据的方式，结构混乱，需要进行统一处理
方法1：父组件传递数据至子组件方法
方法2：采用全局事件
多个组件公用同一套数据集，父组件传递数据至子组件来获取数据太繁琐，因此还是决定采用全局事件。
-->