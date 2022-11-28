<template>
  <div class="user-desc-container">
    <el-avatar :src="baseInfo.face" :size="140" style="margin-right: 20px;" shape="square"></el-avatar>
    <div style="flex: 1;line-height: normal;">
      <div style="display: flex;flex-direction: column;">
        <div style="flex: 1" class="flex-column">
          <el-link style="font-size: 20px"
                   :underline="false"
                   type="danger"
                   target="_blank"
                   :href="baseInfo.url">{{baseInfo.name}}</el-link>
        </div>
        <div style="flex: 1" class="flex-column">
          <p class="info-p">UP主属性：{{baseInfo.attribute}}</p>
          <p class="info-p">{{baseInfo.sign}}</p>
        </div>

    </div></div>
  </div>
</template>

<script>
export default {
  name: "UserDesc",
  props: {
    url: {
      type: String,
      default: "https://i2.xxkol.cn/bfs/face/bc5ca101313d4db223c395d64779e76eb3482d60.jpg"
    },
    baseInfo: {
      type: Object
    }
  }
}
</script>

<style scoped>
div{
  display: block;
}
.info-p{
  font-size: 16px;
  margin-bottom: 10px;
}
.flex-column{
  text-align: left;
  margin-bottom: 15px;
}
.user-desc-container {
  display: flex;
  width: 540px;
  height: 100%;
  padding: 0px 50px;
  flex-direction: row;
  justify-content: space-between;
}

.all-flex-1-div {
  -webkit-box-flex: 1;
  flex: 1;
}

.all-flex-end-div, .all-flex-start-div {
  width: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.kolname-div {
  max-width: 200px;
  height: 46px;
}

.all-font-16 {
  font-size: 16px;
}

.all-long-span-a {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
</style>