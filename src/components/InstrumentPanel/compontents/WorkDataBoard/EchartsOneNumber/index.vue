<template>
  <el-col v-if="title!='days'" class="one-item">
    <div class="p-name" :style="{color}">{{title}}</div>
    <div class="p-value" :style="{color}">{{this.val}}</div>
  </el-col>
</template>

<script>
export default {
  name: "index",
  props:{
    title:{
      type:String,
      required:true,
    },
    value:{
      type:Number,
      default:0,
      required:true,
    },
    color:{
      type:String,
      required:false
    }
  },
  data(){
    return{

    }
  },
  computed:{
    val(){
      let v = this.value
      if(v<10000){
        return parseInt(v)
      }
      v = this.value/10000
      v = v.toFixed(2)
      return v + ' 万'
    }
  }
}
</script>

<style scoped>
.p-name {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  margin-bottom: 10px;
}
.p-value{
  font-size: 25px;
}

</style>