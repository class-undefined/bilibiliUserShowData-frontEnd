<template>
  <div class="home">
    <top-back-div :user-info="userInfo"></top-back-div>
    <instrument-panel :user-info="userInfo" :navNumInfo="navNumInfo"></instrument-panel>
    <fans-line-analysis :user-info="userInfo"></fans-line-analysis>
  </div>
</template>

<script>
// @ is an alias to /src

import TopBackDiv from "@/components/TopBackDiv/TopBackDiv";
import InstrumentPanel from "@/components/InstrumentPanel";
import FansLineAnalysis from "@/components/FansLineAnalysis";
export default {
  name: 'Home',
  props:{
    userInfo:{
      type:Object,
      required:true
    },
    navNumInfo:{
      type:Object,
      required:true
    },

  },
  components: {
    FansLineAnalysis,
    InstrumentPanel,
    TopBackDiv
  }
}
</script>
