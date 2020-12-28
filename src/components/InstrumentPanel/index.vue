<template>
  <div class="instrument-panel-container">
    <div class="rank-data-container">
      <fans-global-rank style="flex: 1" :title="'粉丝全球排名'">
        <template v-slot:echarts>
          <echarts-global-rank style="flex: 5" :option="userInfo.rankinfo"></echarts-global-rank>
        </template>
      </fans-global-rank>

      <fans-global-rank style="flex: 1" :title="'作品类别'">
        <template v-slot:echarts>
          <echarts-work-type style="flex: 5" :option="userInfo.notecount"></echarts-work-type>
        </template>
      </fans-global-rank>

      <fans-global-rank style="flex: 1" :title="'发布作品比'">
        <template v-slot:echarts>
          <echarts-pie style="flex: 5" :v_ref="v_ref.echartsPie" @echartsPipInit="upDataEchartsPie"></echarts-pie>
        </template>
      </fans-global-rank>
      <fans-global-rank style="flex: 2" :showH2="false">
        <template v-slot:echarts>
          <work-data-board style="flex: 4" :noteData="userInfo.notedata"></work-data-board>
        </template>
      </fans-global-rank>
    </div>
  </div>
</template>

<script>
import FansGlobalRank from "@/components/InstrumentPanel/compontents";
import EchartsGlobalRank from "@/components/InstrumentPanel/compontents/EchartsGlobalRank";
import EchartsWorkType from "@/components/InstrumentPanel/compontents/EchartsWorkType";
import EchartsPie from "@/components/InstrumentPanel/compontents/EchartsPie";
import WorkDataBoard from "@/components/InstrumentPanel/compontents/WorkDataBoard";
import {getOption} from "@/components/InstrumentPanel/compontents/EchartsOptions/echartsPie";
import signal from "@/SignalConfig";
export default {
  name: "InstrumentPanel",
  components: {WorkDataBoard, EchartsPie, EchartsWorkType, EchartsGlobalRank, FansGlobalRank},
  props: {
    userInfo: {
      type: Object,
      required: true
    },
    navNumInfo: {
      type: Object,
      required: true
    },
  },
  data(){
    return{
      v_ref: {echartsPie:'echarts-pie'}
    }
  },
  mounted() {
    this.upDataEchartsPie(this.navNumInfo)
    let self = this
    this.globalEmit.$on(signal.UPDATA,data=>{
      // if(data===undefined) return undefined
      // console.log(data,1);
      let navNumInfo = data.navNumInfo
      self.upDataEchartsPie(navNumInfo)
    })
  },
  watch:{
  },
  methods:{
    /*更新饼图*/
    upDataEchartsPie(navNumInfo){
      let option = getOption(navNumInfo,null)
      this.vueCompontent[this.v_ref.echartsPie].setOption(option)
    }
  }
}
</script>

<style scoped>
.instrument-panel-container {
  margin-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  padding: 15px;
  background-color:#ffffff;
}

.rank-data-container {
  display: flex;
}

.work-data-board-container {

}
</style>