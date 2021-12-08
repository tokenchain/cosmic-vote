<template>
  <ui-modal :open="open" @close="$emit('close')">
    <h3 class="m-4 mb-0 text-center">Receipt</h3>
    <div class="m-4 mb-0 p-4 border rounded-2 text-white">
      <div class="d-flex">
        <span v-text="'Author'" class="flex-auto text-gray mr-1"/>
        <a :href="_ipfsUrl(authorIpfsHash)" target="_blank" class="text-white">
          #{{ authorIpfsHash.slice(0, 7) }}
          <Icon name="external-link" class="ml-1"/>
        </a>
      </div>
      <div v-if="relayerIpfsHash" class="d-flex">
        <span v-text="'Relayer'" class="flex-auto text-gray mr-1"/>
        <a :href="_ipfsUrl(relayerIpfsHash)" target="_blank" class="text-white">
          #{{ relayerIpfsHash.slice(0, 7) }}
          <icon name="external-link" class="ml-1"/>
        </a>
      </div>
    </div>
    <div class="m-4">
      <a
          href="https://mycrypto.com/sign-and-verify-message/verify"
          target="_blank"
          class="mb-2 d-block"
      >
        <ui-button class="button-outline width-full">
          Verify receipt on MyCrypto
          <icon name="external-link" class="ml-1"/>
        </ui-button>
      </a>
    </div>
  </ui-modal>
</template>

<script>
import UiButton from "../Ui/Button";
import Icon from "../Icon";
import UiModal from "../Ui/Modal";
import string_tx from "../../api/mixins/string_tx";

export default {
  name: "receiptModal",
  mixins: [string_tx],
  components: {UiModal, Icon, UiButton},
  props: {
    open: {
      type: Boolean,
      required: true
    },
    authorIpfsHash: {
      type: String,
      required: true
    },
    relayerIpfsHash: {
      type: String,
      required: true
    }
  }
};
</script>
