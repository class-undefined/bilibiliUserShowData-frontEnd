<template>
  <div class="header-container">
    <el-form class="from-container" ref="form" :model="form" label-width="80px">
      <el-form-item
          prop="mid"
          label="mid: "
          :rules="[{ required: true, message: '内容不能为空'},{ type: 'number', message: '内容必须为数字哦'}]">
        <el-input style="flex: 3"
                  type="mid"
                  placeholder="517327498"
                  clearable
                  autocomplete="off"
                  v-model.number="form.mid"></el-input>
      </el-form-item>
      <el-form-item style="">
        <el-button style="flex: 1;margin-left: -100%"
                   icon="el-icon-search"
                   type="primary"
                   ref="v-search"
                   @click="onSubmit">搜索
        </el-button>
      </el-form-item>
    </el-form>
<!--    <div style="flex: 1"></div>-->
    <div style="flex: 2;text-align: right">
      <span style="padding: 10px;">野漫横江 —— 人海浮沉几万里，此心安处是吾乡。</span>
    </div>
  </div>

</template>

<script>
import request from "@/api/request/request";
import {query, queryNum} from "@/api/config/query";
import {signal,LOAD} from "@/SignalConfig";
import {status} from "@/api/config/status";
import {loadSignal_SEARCH} from "@/SignalConfig/api";

export default {
  name: "HeaderDiv",
  data() {
    return {
      form: {
        mid: ""
      },
      requestCount: 0,
      userInfo: {},
      navNumInfo: {},
      typeInfo: {}
    }
  },
  mounted() {

    this.getAllInfo("517327498")
  },
  methods: {
    /*提交表单*/
    onSubmit() {
      if(this.form.mid===""){
        return
      }
      let load = {
        text:LOAD.SEARCHING,
        state:true
      }
      this.globalEmit.$emit(signal.SEARCH,load)
      this.getAllInfo(this.form.mid)
    },
    /*获取numInfo,若三个请求都成功 (此实现方式存在BUG, 仍需要使用axios.all方法解决此问题, 下同) 发送signal.SEARCH请求, 携带参数值false*/
    getNumInfo(mid) {
      let self = this
      request.post(query.numInfo, {mid})
          .then(res => {
            if (res.status === status.NoFind.state) {
              this.$notify.error({
                title: '啊哦！',
                message: res.data,
                position: "bottom-left"
              })
              self.requestCount = 0
              loadSignal_SEARCH(self,LOAD.SEARCHED_FAIL,LOAD.STATE_FAIL)
              return
            }
            self.navNumInfo = res.data
            self.requestCount++
            if (self.requestCount === queryNum) {
              this.globalEmit.$emit(signal.UPDATE, {
                navNumInfo: self.navNumInfo,
                userInfo: self.userInfo,
                typeInfo: self.typeInfo
              })
              self.requestCount = 0
              //成功获取信息后，发送搜索完成结果
              loadSignal_SEARCH(self,LOAD.SEARCHED,LOAD.STATE_SUC)
            }
          })
    },
    /*获取userInfo, 发送signal.SEARCH请求, 携带参数值false*/
    getUserInfo(mid) {
      let self = this
      request.post(query.userInfo, {mid})
          .then(res => {
            if (res.status === status.NoFind.state) {
              this.$notify.error({
                title: '啊哦！',
                message: res.data,
                position: "bottom-left"
              })
              loadSignal_SEARCH(self,LOAD.SEARCHED_FAIL,LOAD.STATE_FAIL)
              self.requestCount = 0
              return
            } else if (res.data.baseinfo.length === 0) {
              this.$notify.error({
                title: '啊哦！',
                message: status.NoFind.tips,
                position: "bottom-left"
              })
              this.requestCount = 0
              loadSignal_SEARCH(self,LOAD.SEARCHED_FAIL,LOAD.STATE_FAIL)
              return
            }
            self.userInfo = res.data
            self.requestCount++
            if (self.requestCount === queryNum) {
              self.loading = false
              // self.$emit("updateInfo",{"navNumInfo":self.navNumInfo,"userInfo":self.userInfo})
              this.globalEmit.$emit(signal.UPDATE, {
                navNumInfo: self.navNumInfo,
                userInfo: self.userInfo,
                typeInfo: self.typeInfo
              })
              self.requestCount = 0
              //成功获取信息后，发送搜索完成结果
              loadSignal_SEARCH(self,LOAD.SEARCHED,LOAD.STATE_SUC)
            }
          })
    },
    /*获取typeInfo, 发送signal.SEARCH请求, 携带参数值false*/
    getTypeInfo(mid) {
      let self = this
      request.post(query.typeInfo, {mid})
          .then(res => {
            if (res.status === status.NoFind.state) {
              this.$notify.error({
                title: '啊哦！',
                message: res.data,
                position: "bottom-left"
              })
              self.requestCount = 0
              loadSignal_SEARCH(self,LOAD.SEARCHED_FAIL,LOAD.STATE_FAIL)
              return
            } else if (res.data.tlist === null) {
              this.$notify.error({
                title: '啊哦！',
                message: status.NoFind.tips,
                position: "bottom-left"
              })
              this.requestCount = 0
              loadSignal_SEARCH(self,LOAD.SEARCHED_FAIL,LOAD.STATE_FAIL)
              return
            }
            // console.log(res);
            self.typeInfo = res.data
            self.requestCount++
            if (self.requestCount === queryNum) {
              // self.$emit("updateInfo",{"navNumInfo":self.navNumInfo,"userInfo":self.userInfo,"typeInfo":self.typeInfo})
              this.globalEmit.$emit(signal.UPDATE, {
                navNumInfo: self.navNumInfo,
                userInfo: self.userInfo,
                typeInfo: self.typeInfo
              })
              self.requestCount = 0
              //成功获取信息后，发送搜索完成结果
              loadSignal_SEARCH(self,LOAD.SEARCHED,LOAD.STATE_SUC)
            }
          })

    },
    /*调用获取信息全部方法，获取所有信息*/
    getAllInfo(mid) {
      this.getNumInfo(mid)
      this.getUserInfo(mid)
      this.getTypeInfo(mid)
    }
  }
}
</script>

<style scoped>
.header-container {
  display: flex;
}

.from-container {
  display: flex;
  padding: 5px 10px 0px 10px;
}
</style>