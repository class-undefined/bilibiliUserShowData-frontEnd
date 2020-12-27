<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="right" >
    <el-tab-pane v-for="item in noteData"
                 :label="'近' + item.days.toString() + '天'"
                 :key="item.days"
                 :name="item.days.toString() ">
      <div class="work-data-board-container">
        <echarts-one-number v-for="(val,key,index) in item"
                            class="one-number-item"
                            :title="obj_key[key]"
                            :key="key"
                            :color="colors[index]"
                            :value="parseFloat(val)" >
        </echarts-one-number>
      </div>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
import EchartsOneNumber from '@/components/InstrumentPanel/compontents/WorkDataBoard/EchartsOneNumber'
export default {
  name: "WorkDataBoard",
  components:{
    EchartsOneNumber
  },
  props:{
    noteData:{
      type:Array,
      required:true
    }
  },
  data() {
    return {
      activeName: "90",
      obj_key:{
        "ave_viewcount":"平均播放",
        "ave_likecount":"平均点赞",
        "ave_favoritecount":"作品平均收藏",
        "ave_replycount":"作品平均评论",
        "ave_articleviewcount":"专栏平均阅读",
        "maxlikecount":"最高点赞",
        "maxfavoritecount":"最高收藏",
        "maxreplycount":"最高评论",
        "days":"days"
      },
      //传入9个是因为有一个days也进入了循环 但是没有被显示
      colors:['#FF9999','#66CCFF','#66CC99','#99CCCC','#FF6666','#66CCCC','#666699','#6699CC','#6699CC']
    };
  },
  computed:{
    getItems(){
      let nd = []
      for(let i in this.noteData){
        let item = this.noteData[i]
        let tempObj = {}
        for(let obj_key in item){
          if(obj_key!="days"){
            tempObj[this.key[obj_key]] = item[obj_key]
          }
        }
        nd.push(tempObj)
      }
      return nd
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
.work-data-board-container{
  align-content: flex-start;

}
.one-number-item{
  width: 25%;
  margin-top: 40px;
}
</style>