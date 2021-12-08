<template>
  <sticky class="mb-4">
    <nav id="topnav" class="border-bottom width-full bg-black">
      <dao-container>
        <div class="d-flex flex-items-center" style="height: 78px;">
          <div class="flex-auto d-flex flex-items-center">
            <router-link
                :to="{ name: 'home' }"
                class="d-inline-block d-flex flex-items-center"
                style="font-size: 24px; padding-top: 4px;"
            >
              <span
                  :class="namespaceraw && 'hide-sm'"
                  class="mr-1"
                  v-text="'snapshot'"
              />
              <template v-if="namespaceraw">
                <span class="pl-1 pr-2 text-gray" v-text="'/'"/>
                <dao-token :address="namespaceraw.image" size="28"/>
                <span class="ml-2" v-text="namespaceraw.symbol"/>
              </template>
            </router-link>
          </div>
          <div :key="web3.account">
            <template v-if="web3.account && !wrongNetwork">
              <ui-button
                  @click="modalOpen = true"
                  class="button-outline"
                  :loading="loading">
                <avatar :address="web3.account" size="16" class="mr-2 ml-n1"/>
                <span v-if="web3.name" v-text="web3.name"/>
                <span v-else v-text="_shorten(web3.account)"/>
              </ui-button>
            </template>
            <ui-button
                v-if="web3.injectedLoaded && wrongNetwork"
                class="text-red">
              <icon name="warning" class="ml-n1 mr-1 v-align-middle"/>
              Wrong network
            </ui-button>
            <ui-button
                v-if="showLogin"
                @click="modalOpen = true"
                :loading="loading">
              Connect wallet
            </ui-button>
            <ui-button @click="modalAboutOpen = true" class="ml-2">
              <span v-text="'?'" class="ml-n1 mr-n1"/>
            </ui-button>
          </div>
        </div>
        <account-modal
            :open="modalOpen"
            @close="modalOpen = false"
            @login="handleLogin"
        />
        <about-modal :open="modalAboutOpen" @close="modalAboutOpen = false"/>
      </dao-container>
    </nav>
  </sticky>
</template>

<script>
import {mapActions} from 'vuex';
import namespaces from '@/namespaces.json';
import UiButton from "./Ui/Button";
import Sticky from "./Sticky";
import AccountModal from "./Modal/Account";
import AboutModal from "./Modal/About";
import Icon from "./Icon";
import Avatar from "./Avatar";
import Token from "./Token";
import {shorten} from "vue-blocklink"
import DaoContainer from "./Container";
import lo_dao from "../api/mixins/dao/lo_dao";
import string_tx from "../api/mixins/string_tx";
import DaoToken from "./Token";

export default {
  components: {DaoToken, DaoContainer, Token, Avatar, Icon, AboutModal, AccountModal, Sticky, UiButton},
  mixins: [lo_dao, string_tx],
  data() {
    return {
      loading: false,
      modalOpen: false,
      modalAboutOpen: false,
      key: this.$route.params.key
    };
  },
  computed: {
    wrongNetwork() {
      return this.config.chainId !== this.web3.injectedChainId;
    },
    showLogin() {
      return (
          (!this.web3.account && !this.web3.injectedLoaded) ||
          (!this.web3.account && !this.wrongNetwork)
      );
    }
  },
  methods: {
    ...mapActions(['login']),

    async handleLogin(connector) {
      this.modalOpen = false;
      this.loading = true;
      await this.login(connector);
      this.loading = false;
    }
  }
};
</script>
