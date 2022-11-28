<template>
  <div :ref="v_ref"></div>
</template>

<script>
export default {
  name: "EchartsGlobalRank",
  props:{
    v_ref:{
      type:String,
      required: true
    }
  },
  data() {
    return {
      echartsTarget:undefined
    }
  },
  mounted() {
    this.echartsTarget = this.echarts.init(this.$refs[this.v_ref]);
    this.$set(this.vueCompontent,this.v_ref,this)//将echartsLine添加至组件库，方便调用该组件的实例方法
  },
  methods: {
    setOption(option){
      this.echartsTarget.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>