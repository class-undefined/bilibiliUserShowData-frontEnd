<template>
  <div class="top-back-div-container">
    <div style="flex: 1">
      <TopRankTag :type-text="userInfo.baseinfo.category1" :rank="userInfo.catrank[userInfo.baseinfo.category1][0]" :color="'#ff7e00'">
      </TopRankTag>
      <user-desc :base-info="userInfo.baseinfo"></user-desc>
    </div>
    <div style="flex: 3">
      <div class="one-number-container">
        <one-number class="number-item" :value="userInfo.baseinfo.follower" color="#FF9999" label="粉丝"></one-number>
        <one-number class="number-item" :value="userInfo.baseinfo.likes" color="#FFCC99" label="点赞"></one-number>
        <one-number class="number-item" :value="userInfo.baseinfo.archive_view" color="#99CCCC" label="播放"></one-number>
        <one-number class="number-item" :value="userInfo.baseinfo.total_charge_count" color="#FFFFCC" label="充电"></one-number>
        <one-number class="number-item" :value="userInfo.baseinfo.sumfavorite" color="#66CCCC" label="收藏"></one-number>
        <one-number class="number-item" :value="userInfo.baseinfo.sumreply" color="#66CCFF" label="评论"></one-number>
      </div>
    </div>
  </div>
</template>

<script>
import TopRankTag from "@/components/TopBackDiv/compontents/TopRankTag";
import UserDesc from "@/components/TopBackDiv/compontents/UserDesc/UserDesc";
import OneNumber from "@/components/TopBackDiv/compontents/OneNumber/OneNumber";
export default {
  name: "TopBackDiv",
  components:{
    OneNumber,
    UserDesc,
    TopRankTag
  },
  props: {
    userInfo: {
      default: Object,
      required:true
    }
  }
}
</script>

<style scoped>
.top-back-div-container{
  display: flex;
  max-height: 276px;
  background-color: rgba(41,46,56,0.8);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  color: white;
}
.number-item{
  flex: 1;
}
.one-number-container{
  display: flex;
  justify-content: space-between;
  padding: 5% 2% 5% 2%;
}
</style>