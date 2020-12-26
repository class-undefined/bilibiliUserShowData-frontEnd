<template>
  <div class="top-back-div-container">
    <div style="flex: 1">
      <TopRankTag :type-text="'游戏'" :rank="'1'" :color="'#ff7e00'">
      </TopRankTag>
      <user-desc :base-info="userInfo.baseinfo"></user-desc>
    </div>
    <div style="flex: 3">
      <div class="one-number-container">
        <one-number class="number-item" :value="userInfo.baseinfo.follower" label="粉丝数"></one-number>
        <one-number class="number-item" :value="userInfo.baseinfo.likes" label="点赞数"></one-number>
        <one-number class="number-item" :value="userInfo.baseinfo.archive_view" label="播放量"></one-number>
        <one-number class="number-item" :value="userInfo.baseinfo.total_charge_count" label="充电数"></one-number>
        <one-number class="number-item" :value="userInfo.baseinfo.sumfavorite" label="收藏数"></one-number>
        <one-number class="number-item" :value="userInfo.baseinfo.sumreply" label="评论数"></one-number>
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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  color: white;
}
.number-item{
  flex: 1;
}
.one-number-container{
  display: flex;
  justify-content: space-between;
  padding: 5% 0;
}
</style>