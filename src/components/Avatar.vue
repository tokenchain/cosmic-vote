<template>
  <Jazzicon
      :address="address"
      :diameter="parseInt(size) || 22"
      class="d-inline-block v-align-middle line-height-0"
  />
</template>

<script>
import Jazzicon from "vue-jazzicon/src/components/Jazzicon"

export default {
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
  components: {Jazzicon},
  name: "avatar"
};
</script>
