<template>
  <el-row :gutter="2" style="border-left: 1px solid #666666; padding: 10px 30px">
    <p class="number" :style="{color}">{{ val }}万</p>
    <p class="label" :style="{color}">{{ label }}</p>
  </el-row>

</template>

<script>
export default {
  name: "OneNumber",
  props: {
    value: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    color:{
      type:String,
      required:false
    }
  },
  computed:{
    val(){
      let val = this.value / 10000
      return val.toFixed(1)
    }
  }
}
</script>

<style scoped>
.number {
  font-size: 1.5em;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: right;
}

.label {
  text-align: right;
}
</style>