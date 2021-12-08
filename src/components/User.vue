<template>
  <span>
    <a @click="modalOpen = true" target="_blank">
      <avatar :address="address" size="16" class="mr-1"/>
      {{ name }}
      <icon v-if="isVerified" name="check" class="ml-1" title="Verified"/>
    </a>
    <user-modal
        :open="modalOpen"
        @close="modalOpen = false"
        :address="address"
    />
  </span>
</template>

<script>
import UserModal from "./Modal/User";
import Icon from "./Icon";
import Avatar from "./Avatar";
export default {
  name: "daoUser",
  components: {Avatar, Icon, UserModal},
  props: {
    address: String,
    verified: Array
  },
  data() {
    return {
      modalOpen: false
    };
  },
  computed: {
    name() {
      return this.web3.account &&
      this.address.toLowerCase() === this.web3.account.toLowerCase()
          ? 'You'
          : this._shorten(this.address);
    },
    isVerified() {
      return (
          Array.isArray(this.verified) &&
          this.verified.length > 0 &&
          this.verified.includes(this.address)
      );
    }
  }
};
</script>
