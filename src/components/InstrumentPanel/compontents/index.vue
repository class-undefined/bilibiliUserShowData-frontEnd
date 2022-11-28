<template>
  <div class="fans-global-rank-flex-container">
    <h2 class="title-card" style="" v-show="showH2">{{title}}</h2>
    <slot name="echarts"></slot>
  </div>
</template>

<script>

export default {
  name: "fansGlobalRank",
  components: {},
  props:{
    title:{
      type:String,
      required: false
    },
    showH2:{
      type:Boolean,
      default:true,
      required: false
    }
  },
  data(){
    return{

    }
  },
  mounted() {
    // console.log(this.rankInfo);
  }
}
</script>

<style scoped>
.fans-global-rank-flex-container{
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 340px;
  height: 240px;
}
.title-card{
  padding: 0 15px;
  flex: 1;
  border-bottom: 1px solid #e6e6e6;
  align-content: center;
  text-align: left;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 15px;
  font-weight: 300;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
</style>