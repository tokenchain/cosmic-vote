<template>
  <i
      class="iconfont"
      :class="`icon${name}`"
      :style="size ? `font-size: ${size}px; line-height: ${size}px;` : ''"
  />
</template>

<script>
export default {
  name: "icon",
  props: {
    name: {
      type: String,
      default: "",
      required: false
    },
    size: {
      type: Number | String,
      default: 0,
      required: false
    }

  }
};
</script>

<style scoped lang="scss">
.iconfont {
  font-size: 16px;
  line-height: 16px;
  vertical-align: baseline;
}
</style>
