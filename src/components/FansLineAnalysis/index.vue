<template>
  <div class="fans-line-analysis-container">
    <echarts-card title="粉丝数据统计(近90天)">
      <template slot="echarts">
        <echarts-line :v_ref="v_ref[0]">
          <template slot="left-btn">
            <el-radio-group style="float: left"
                            v-model="model1"
                            @change="selectFansData(v_ref[0])"
                            size="mini">
              <el-radio-button label="粉丝">
              </el-radio-button>>
            </el-radio-group>
            <el-radio-group style="float: right"
                            v-model="model2"
                            @change="selectFansData(v_ref[0])"
                            size="mini">
              <el-radio-button label="增量"></el-radio-button>
              <el-radio-button label="总量"></el-radio-button>
            </el-radio-group>
          </template>
        </echarts-line>
      </template>
    </echarts-card>

    <echarts-card title="视频点赞收藏评论统计(近90天)">
      <template slot="echarts">
        <echarts-line :v_ref="v_ref[1]">
          <template slot="left-btn">
            <el-radio-group style="float: left"
                            v-model="model3"
                            @change="selectVideoData(v_ref[1])"
                            size="mini">
              <el-radio-button label="点赞"></el-radio-button>>
              <el-radio-button label="收藏"></el-radio-button>>
              <el-radio-button label="评论"></el-radio-button>>
            </el-radio-group>
            <el-radio-group style="float: right"
                            v-model="model4"
                            @change="selectVideoData(v_ref[1])"
                            size="mini">
              <el-radio-button label="增量"></el-radio-button>
              <el-radio-button label="总量"></el-radio-button>
            </el-radio-group>
          </template>
        </echarts-line>
      </template>
    </echarts-card>
  </div>
</template>

<script>
import EchartsCard from "@/components/FansLineAnalysis/compontents/EchartsCard";
import EchartsLine from "@/components/FansLineAnalysis/compontents/EchartsLine";
import getOption from "@/components/FansLineAnalysis/compontents/EchartsLine/EchartsOptions/echartsLine";
import signal from "@/SignalConfig";

export default {
  name: "FansLineAnalysis",
  components: {EchartsLine, EchartsCard},
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      v_ref: ['echarts-fans-line', 'echarts-video-line'],
      model1: "粉丝",//粉丝折线图，左侧单选框value
      model2: "增量",//右侧单选框value
      model3:"点赞",//视频折线图，左侧单选框value
      model4:"增量",//右侧单选框value
      type1: {//对选中的值进行一个key-value映射，方便提取json数据，下同，粉丝折线左侧单选框映射
        "粉丝": "fansdaysinfo",
      },
      type2: {
        "增量": "increment",//右侧左侧单选框映射
        "总量": "total"
      },
      type3:{//视频折线右侧单选框映射
        "增量": "_inc",
        "总量": "_total"
      },
      type4:{//视频折线左侧单选框映射-此外，computed中还对一个不符规律的key进行了一个处理 => 不符合type3的规律
        "点赞":"like",
        "收藏":"favorite",
        "评论":"reply",
      }

    }
  },
  computed: {
    /*{xData,yData:{total,increment}}*/
    /*粉丝折线图数据*/
    fansDaysInfo() {
      let type1 = this.type1[this.model1]//大类选择
      let type2 = this.type2[this.model2]//小类选择
      let info = this.userInfo[type1]
      let xData = info.date
      let yData = info[type2]
      return {xData, yData}
    },
    /*视频折线图数据*/
    videoInfo(){
      let type = this.type4[this.model3] + this.type3[this.model4]
      if(type==="reply_total"){
        type = "reply_toal"//这个key居然与其他的key命名不一致
      }
      let info = this.userInfo["likeCollectReply"]
      let xData = info.date
      let yData = info[type]
      return {xData, yData}
    }
  },
  mounted() {
    this.globalEmit.$on(signal.UPDATE,data=>{
      // let navNumInfo = data.navNumInfo
      let userInfo = data.userInfo
      // console.log(data);
      // let typeInfo = data.typeInfo
      // console.log(data,2);//TODO
      // self.upDataEchartsPie(navNumInfo)
      this.userInfo = userInfo
      this.selectFansData(this.v_ref[0])
      this.selectVideoData(this.v_ref[1])
    })
  },
  methods: {
    selectFansData(compontent) {
      let self = this
      let option = {}
      let config = {text: "粉丝增量", color: "#ff6666"}
      config.text = this.model1 + this.model2
      option = getOption({"xData": self.fansDaysInfo.xData, "yData": self.fansDaysInfo.yData},
          config)
      this.vueCompontent[compontent].setOption(option)
    },
    selectVideoData(compontent){
      let self = this
      let option = {}
      let config = {text: "点赞增量", color: "#0099ff"}
      config.text = this.model3 + this.model4
      option = getOption({"xData": self.videoInfo.xData, "yData": self.videoInfo.yData},
          config)
      this.vueCompontent[compontent].setOption(option)
    }
  }
}
</script>

<style scoped>
.fans-line-analysis-container {
  /*float: left;*/
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /*min-height: 300px;*/
  margin-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  background-color: #FFFFFF;
  /*padding: 20px;*/
}
</style>