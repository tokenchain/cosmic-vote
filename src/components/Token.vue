<template>
  <img
      :src="icon_image"
      class="d-inline-block bg-gray-9 v-align-middle line-height-0 circle border"
      :style="{
      width: `${size || 22}px`,
      height: `${size || 22}px`
    }"
  />
</template>

<script>
export default {
  name: "daoToken",
  props: {
    address: {
      type: String,
      default: "",
      required: false
    },
    size: {
      type: Number | String,
      default: 0,
      required: false
    }
  },
  computed: {
    icon_image() {
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${this.address}/logo.png`
    }
  }

};
</script>
