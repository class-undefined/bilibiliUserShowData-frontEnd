<template>
  <div ref="work-type"></div>
</template>

<script>
export default {
  name: "EchartsWorkType",
  props: {
    option: {type: Array, required: true}
  },
  data() {
    return {
      xData: [],
      yData: [],
    }
  },
  mounted() {
    this.drawLine();
  },
  computed: {
    Axis() {
      let self = this
      let sum = 0
      for (let i = 0; i < this.option.length; i++) {
        sum += self.option[i].count
      }
      for (let i = 0; i < this.option.length; i++) {
        let noteCountItem = self.option[i]
        self.xData.push(noteCountItem.name)//标签
        let value = noteCountItem.count/sum*100
        value = value.toFixed(2)
        self.yData.push({value})//占比
      }
      return {'xData': self.xData, 'yData': this.yData}
    },

  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      // let echarts = require('echarts/lib/echarts')
      let self = this
      let myChart = this.echarts.init(this.$refs['work-type'])
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#fff',
        yAxis: {
          type: 'category',
          axisLine: {
            show: false //坐标线
          },
          axisTick: {
            show: false //小横线
          },
          axisLabel: {
            color: '#999' //坐标轴字颜色
          },
          data: self.Axis.xData
        },

        xAxis: {
          show: false,
        },
        grid: {
          top: '40',
          right: '50',
          left: '80',
          bottom: '40' //图表尺寸大小
        },
        // animationDuration: function (idx) {
        //                 // 越往后的数据时长越大
        //                 return idx * 9000;
        //             },
        animationDuration: 5000,
        series: [{
          /* data: [120, 200, 150, 80, 70, 110, 130], */
          type: 'bar',
          barWidth: '10px',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.4)',
            barBorderRadius: [30, 30, 30, 30] //圆角大小
          },
          label: {
            show: true,
            position: 'right' //每一条的数据位置

          },
          itemStyle: {
            normal: {
              color: (params) => {
                let colors = ['#4956ff', '#2d82ff', '#2dc6ff', '#2fca95', '#4956ff', '#2d82ff', '#2dc6ff', '#2fca95']
                return colors[params.dataIndex]
              }, //每个数据的颜色
              barBorderRadius: [30, 30, 30, 30], //圆角大小
              shadowBlur: 10,
              shadowColor: 'rgba(0, 103, 255, 0.2)',
              shadowOffsetX: -5,
              shadowOffsetY: 5,

            },
          },
          data: self.Axis.yData
        }]
      });
    }
  }
}
</script>

<style scoped>

</style>