<template>
  <div class="fans-line-analysis-container">
    <echarts-card title="粉丝数据统计(近90天)">
      <template slot="echarts">
        <echarts-line/>
      </template>
    </echarts-card>

    <echarts-card title="视频点赞收藏评论统计(近90天)">
      <template slot="echarts">
        <echarts-line/>
      </template>
    </echarts-card>

    <echarts-card>
      <template slot="echarts">
        <echarts-line/>
      </template>
    </echarts-card>

    <echarts-card>
      <template slot="echarts">
        <echarts-line/>
      </template>
    </echarts-card>
  </div>
</template>

<script>
import EchartsCard from "@/components/FansLineAnalysis/compontents/EchartsCard";
import EchartsLine from "@/components/FansLineAnalysis/compontents/EchartsLine";
export default {
  name: "FansLineAnalysis",
  components: {EchartsLine, EchartsCard}
}
</script>

<style scoped>
.fans-line-analysis-container{
  /*float: left;*/
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
}
</style>