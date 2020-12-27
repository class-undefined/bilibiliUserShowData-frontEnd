<!--折线图组件-->
<template>
  <div>
    <div style="height: 30px">
      <slot name="left-btn"></slot>
    </div>
    <div :ref="v_ref" style="min-height: 300px;">
    </div>
  </div>
</template>

<script>
// import EchartsCard from "@/components/FansLineAnalysis/compontents/EchartsCard"
export default {
  name: "EchartsLine",
  props:{
    v_ref:{
      type:String,
      required: true
    }
  },
  data(){
    return{
      echartsTarget:undefined,
    }
  },
  mounted() {
    // console.log(this.$refs[this.v_ref]);
    this.echartsTarget = this.echarts.init(this.$refs[this.v_ref]);
    this.$set(this.vueCompontent,this.v_ref,this)//将echartsLine添加至组件库，方便调用该组件的实例方法
  },
  created() {

  },
  methods:{
    setOption(option){
      this.echartsTarget.setOption(option)
    }
  }
  // components: {EchartsCard},

}
</script>

<style scoped>

</style>