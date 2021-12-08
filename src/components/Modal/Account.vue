<template>
  <ui-modal :open="open" @close="$emit('close')">
    <div v-if="!web3.account || step === 'connect'">
      <h3 class="m-4 mb-0 text-center">Connect wallet</h3>
      <div class="m-4 mb-5">
        <a
            v-for="(connector, id, i) in config.connectors"
            :key="i"
            @click="$emit('login', connector.id)"
            target="_blank"
            class="mb-2 d-block"
        >
          <ui-button class="button-outline width-full v-align-middle">
            <img
                :src="
                `https://raw.githubusercontent.com/bonustrack/lock/master/connectors/assets/${connector.id}.png`
              "
                height="28"
                width="28"
                class="mr-1 v-align-middle"
            />
            {{ connector.name }}
          </ui-button>
        </a>
      </div>
    </div>
    <div v-else>
      <h3 class="m-4 mb-0 text-center">Account</h3>
      <div v-if="web3.account" class="m-4">
        <a
            :href="_etherscanLink(web3.account)"
            target="_blank"
            class="mb-2 d-block"
        >
          <ui-button class="button-outline width-full">
            <avatar :address="web3.account" size="16" class="mr-2 ml-n1"/>
            <span v-if="web3.name" v-text="web3.name"/>
            <span v-else v-text="_shorten(web3.account)"/>
            <icon name="external-link" class="ml-1"/>
          </ui-button>
        </a>
        <ui-button
            @click="step = 'connect'"
            class="button-outline width-full mb-2"
        >
          Connect wallet
        </ui-button>
        <ui-button
            @click="handleLogout"
            class="button-outline width-full text-red mb-2"
        >
          Log out
        </ui-button>
      </div>
    </div>
  </ui-modal>
</template>

<script>
import {mapActions} from 'vuex';
import UiModal from "../Ui/Modal";
import UiButton from "../Ui/Button";
import Icon from "../Icon";
import Avatar from "../Avatar";
import string_tx from "../../api/mixins/string_tx";

export default {
  name: "accountModal",
  components: {Avatar, Icon, UiButton, UiModal},
  mixins: [string_tx],
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      step: null
    };
  },
  watch: {
    open() {
      this.step = null;
    }
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      await this.logout();
      this.$emit('close');
    }
  }
};
</script>
