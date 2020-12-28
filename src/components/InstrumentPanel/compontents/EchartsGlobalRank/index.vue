<template>
  <div ref="global-rank"></div>
</template>

<script>
export default {
  name: "EchartsGlobalRank",
  props:{
    option:{type:Object,required:true}
  },
  data() {
    return {
      xData:[],
      yData:[],
    }
  },
  watch:{
    option(){
      this.drawLine()
    }
  },
  mounted() {
    this.drawLine();
  },
  computed:{
    Axis(){
      let self = this
      self.xData = []
      self.yData = []
      for(let i = 0; i<this.option.rank_info.length;i++){
        let rankInfoItem = self.option.rank_info[i]
        self.xData.push(rankInfoItem.ddate)
        self.yData.push(rankInfoItem.count)
      }
      return {'xData':self.xData.reverse(),'yData':this.yData}
    },
    rank(){
      return this.option.rank_info[0].count
    },
    followerpercent(){
      return this.option.rank_info[0].followerpercent
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      // let echarts = require('echarts/lib/echarts')
      let self = this
      let myChart = this.echarts.init(this.$refs['global-rank'])
      // 绘制图表
      myChart.setOption({
        title: {
          text: '第' + self.rank +'名（超过 '+ self.followerpercent +'% 达人）',
          textStyle:{
            fontWeight:300,
            fontSize:15
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid:{
          left:0,
          bottom:0
        },
        xAxis: {
          data: this.Axis.xData,
          show:false
        },
        yAxis: {
        },
        series: [{
          name: '排名',
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize: 1,
          data: this.Axis.yData
        }]
      });
    }
  }
}
</script>

<style scoped>

</style>