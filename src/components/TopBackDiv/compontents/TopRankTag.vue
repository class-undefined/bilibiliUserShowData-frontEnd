<template>
  <div class="top-rank-tag-div" :style="{backgroundColor:color}">
    <p>{{typeText}}</p>
    <p>第 {{rank}} 名</p>
  </div>
</template>

<script>
export default {
  name: "TopRankTag",
  props: {
    color: {
      type: String,
      default(){
        return '#ff7e00;'
      }
    },
    typeText:{
      type:String,
      default: "null"
    },
    rank:{
      type:Number,
      default:0
    }
  }
}
</script>

<style scoped>
.top-rank-tag-div {
  padding: 0px 15px;
  width: 200px;
  max-height: 41px;
  margin-right: 20px;
  border-radius: 2px;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 30px;
}
 p{
   display: block;
   color: #ffffff;
   margin-block-start: 1em;
   margin-block-end: 1em;
   margin-inline-start: 0px;
   margin-inline-end: 0px;
 }

</style>