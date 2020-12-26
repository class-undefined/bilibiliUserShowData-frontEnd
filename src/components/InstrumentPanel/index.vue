<template>
  <div class="instrument-panel-container">
    <div class="rank-data-container">
      <fans-global-rank style="flex: 1" :title="'粉丝全球排名'">
        <template v-slot:echarts >
          <echarts-global-rank style="flex: 5" :option="userInfo.rankinfo"></echarts-global-rank>
        </template>
      </fans-global-rank>
      <fans-global-rank style="flex: 1" :title="'作品类别'">
        <template v-slot:echarts >
          <echarts-work-type style="flex: 5" :option="userInfo.notecount"></echarts-work-type>
        </template>
      </fans-global-rank>
      <fans-global-rank style="flex: 1" :title="'发布作品比'">
        <template v-slot:echarts >
          <echarts-pie style="flex: 5" :option="navNumInfo"></echarts-pie>
        </template>
      </fans-global-rank>
      <fans-global-rank style="flex: 2" :showH2="false">
        <template v-slot:echarts >
          <work-data-board style="flex: 4" :noteData="userInfo.notedata"></work-data-board>
        </template>
      </fans-global-rank>
    </div>

  </div>
</template>

<script>
import FansGlobalRank from "@/components/InstrumentPanel/FansGlobalRank";
import EchartsGlobalRank from "@/components/InstrumentPanel/FansGlobalRank/EchartsGlobalRank";
import EchartsWorkType from "@/components/InstrumentPanel/FansGlobalRank/EchartsWorkType";
import EchartsPie from "@/components/InstrumentPanel/FansGlobalRank/EchartsPie";
import WorkDataBoard from "@/components/InstrumentPanel/FansGlobalRank/WorkDataBoard";
export default {
name: "InstrumentPanel",
  components: {WorkDataBoard, EchartsPie, EchartsWorkType, EchartsGlobalRank, FansGlobalRank},
  props:{
    userInfo:{
      type:Object,
      required:true
    },
    navNumInfo:{
      type:Object,
      required:true
    },

  }
}
</script>

<style scoped>
.instrument-panel-container{

}
.rank-data-container{
  display: flex;
}
.work-data-board-container{

}
</style>