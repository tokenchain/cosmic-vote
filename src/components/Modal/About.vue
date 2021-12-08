<template>
  <ui-modal :open="open" @close="$emit('close')">
    <h3 class="m-4 mb-0 text-center">About</h3>
    <div class="m-4 mb-0 p-4 border rounded-2 text-white">
      <div class="d-flex">
        <span v-text="'Twitter'" class="flex-auto text-gray mr-1"/>
        <a href="https://twitter.com/SnapshotLabs" target="_blank">
          @SnapshotLabs
        </a>
      </div>
      <div class="d-flex">
        <span v-text="'Discord'" class="flex-auto text-gray mr-1"/>
        <a href="https://discord.snapshot.page" target="_blank">
          Join Discord
        </a>
      </div>
      <div class="d-flex">
        <span v-text="'Version'" class="flex-auto text-gray mr-1"/>
        {{ pkg.version }}
      </div>
      <div class="d-flex">
        <span v-text="'License'" class="flex-auto text-gray mr-1"/>
        {{ pkg.license }}
      </div>
      <div class="d-flex">
        <span v-text="'Network'" class="flex-auto text-gray mr-1"/>
        {{ config.network === 'homestead' ? 'mainnet' : config.network }}
      </div>
      <div class="d-flex">
        <span v-text="'Block number'" class="flex-auto text-gray mr-1"/>
        <a
            :href="_etherscanLink(web3.blockNumber, 'block')"
            target="_blank"
            class="float-right"
        >
          {{ $n(web3.blockNumber) }}
          <Icon name="external-link" class="ml-1"/>
        </a>
      </div>
      <div class="d-flex">
        <span v-text="'IPFS server'" class="flex-auto text-gray mr-1"/>
        {{ ipfsNode }}
      </div>
      <div class="d-flex">
        <span v-text="'Hub'" class="flex-auto text-gray mr-1"/>
        {{ config.hubUrl }}
      </div>
    </div>
    <div class="m-4">
      <a
          :href="`https://github.com/${pkg.repository}`"
          target="_blank"
          class="mb-2 d-block"
      >
        <ui-button class="button-outline width-full">
          <icon name="github" class="mr-1"/>
          github.com/{{ pkg.repository }}
          <icon name="external-link" class="ml-1"/>
        </ui-button>
      </a>
    </div>
  </ui-modal>
</template>

<script>
import pkg from '@/../package.json';
import UiModal from "../Ui/Modal";
import UiButton from "../Ui/Button";
import Icon from "../Icon";
import string_tx from "../../api/mixins/string_tx";

export default {
  name: "aboutModal",
  components: {Icon, UiButton, UiModal},
  mixins: [string_tx],
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      pkg,
      ipfsNode: process.env.VUE_APP_IPFS_NODE
    };
  }
};
</script>
