<template>
  <ui-modal :open="open" @close="$emit('close')">
    <div class="m-4 mb-0 text-center">
      <avatar :address="address" size="64" class="mb-4"/>
      <h3 v-text="_shorten(address)"/>
    </div>
    <div class="m-4">
      <a :href="_etherscanLink(address)" target="_blank" class="mb-2 d-block">
        <ui-button class="button-outline width-full">
          See on Etherscan
          <icon name="external-link" class="ml-1"/>
        </ui-button>
      </a>
    </div>
  </ui-modal>
</template>
<script>
import Avatar from "../Avatar";
import UiButton from "../Ui/Button";
import UiModal from "../Ui/Modal";
import Icon from "../Icon";
import string_tx from "../../api/mixins/string_tx";

export default {
  name: "userModal",
  components: {Icon, UiModal, UiButton, Avatar},
  mixins: [string_tx],
  props: {
    open: {
      type: Boolean,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  }
};
</script>
