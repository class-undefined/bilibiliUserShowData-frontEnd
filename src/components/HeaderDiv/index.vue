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
import query from "@/api/config/query";
import signal from "@/SignalConfig";

export default {
  name: "HeaderDiv",
  data() {
    return {
      form: {
        mid: ""
      },
      requestCount:0,
      userInfo:{},
      navNumInfo:{}
    }
  },
  methods:{
    onSubmit(){
      this.getNumInfo()
      this.getUserInfo()
    },
    getNumInfo(){
      let self = this
      request.post(query.numInfo,{"mid":self.form.mid})
          .then(res=>{
            // console.log(res);
            self.navNumInfo = res.data
            self.requestCount++
            if(self.requestCount==2){
              self.$emit("updateInfo",{"navNumInfo":self.navNumInfo,"userInfo":self.userInfo})
              this.globalEmit.$emit(signal.UPDATA,{navNumInfo:self.navNumInfo,userInfo:self.userInfo})
              self.requestCount = 0
            }
          })
    },
    getUserInfo(){
      let self = this
      request.post(query.userInfo,{"mid":self.form.mid})
          .then(res=>{
            self.userInfo = res.data
            self.requestCount++
            if(self.requestCount==2){
              self.loading = false
              self.$emit("updateInfo",{"navNumInfo":self.navNumInfo,"userInfo":self.userInfo})
              this.globalEmit.$emit(signal.UPDATA,{navNumInfo:self.navNumInfo,userInfo:self.userInfo})
              self.requestCount = 0
            }
          })
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