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
    <div style="flex: 2"></div>
    <div style="flex: 1;">
      <span style="padding: 10px;">野漫横江 —— 人海浮沉几万里，此心安处是吾乡。</span>
    </div>
  </div>

</template>

<script>
import request from "@/api/request/request";
import {query, queryNum} from "@/api/config/query";
import signal from "@/SignalConfig";
import {status} from "@/api/config/status";

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
    onSubmit() {
      this.getAllInfo(this.form.mid)
    },
    getNumInfo(mid) {
      let self = this
      request.post(query.numInfo, {mid})
          .then(res => {
            // console.log(res);
            if (res.status === status.NoFind.state) {
              this.$notify.error({
                title: '啊哦！',
                message: res.data,
                position: "bottom-left"
              })
              self.requestCount = 0
              return
            }
            self.navNumInfo = res.data
            self.requestCount++
            if (self.requestCount === queryNum) {
              // self.$emit("updateInfo",{"navNumInfo":self.navNumInfo,"userInfo":self.userInfo,"typeInfo":self.typeInfo})
              this.globalEmit.$emit(signal.UPDATA, {
                navNumInfo: self.navNumInfo,
                userInfo: self.userInfo,
                typeInfo: self.typeInfo
              })
              self.requestCount = 0
            }
          })
    },
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
              self.requestCount = 0
              return
            } else if (res.data.baseinfo.length === 0) {
              this.$notify.error({
                title: '啊哦！',
                message: status.NoFind.tips,
                position: "bottom-left"
              })
              this.requestCount = 0
              return
            }
            self.userInfo = res.data
            self.requestCount++
            if (self.requestCount === queryNum) {
              self.loading = false
              // self.$emit("updateInfo",{"navNumInfo":self.navNumInfo,"userInfo":self.userInfo})
              this.globalEmit.$emit(signal.UPDATA, {
                navNumInfo: self.navNumInfo,
                userInfo: self.userInfo,
                typeInfo: self.typeInfo
              })
              self.requestCount = 0
            }
          })
    },
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
              return
            } else if (res.data.tlist === null) {
              this.$notify.error({
                title: '啊哦！',
                message: status.NoFind.tips,
                position: "bottom-left"
              })
              this.requestCount = 0
              return
            }
            // console.log(res);
            self.typeInfo = res.data
            self.requestCount++
            if (self.requestCount === queryNum) {
              // self.$emit("updateInfo",{"navNumInfo":self.navNumInfo,"userInfo":self.userInfo,"typeInfo":self.typeInfo})
              this.globalEmit.$emit(signal.UPDATA, {
                navNumInfo: self.navNumInfo,
                userInfo: self.userInfo,
                typeInfo: self.typeInfo
              })
              self.requestCount = 0
            }
          })

    },
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