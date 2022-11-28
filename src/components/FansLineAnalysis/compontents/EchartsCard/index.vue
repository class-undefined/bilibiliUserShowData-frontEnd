<template>
  <div class="line-card-item">
    <h2 class="title-card">{{title}}</h2>
    <slot name="echarts"></slot>
  </div>
</template>

<script>
export default {
  name: "EchartsCard",
  props: {
    // userInfo: {
    //   type: Object,
    //   required: true
    // },
    title:{
      type:String,
      required: false
    }
  }
}
</script>

<style scoped>
.line-card-item {
  flex: 1;
  padding: 10px 25px;
  /*width: 50%;*/
}

.title-card {
  padding: 0px 0px 15px 0px;
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