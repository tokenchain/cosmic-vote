<template>
  <div class="index_body">
    <div class="mask_wallet" v-if="wallet">
      <div class="content_pop">
        <p class="wallet_box_title">Connect Wallet</p>
        <div class="footer_close">
          <v-btn @click.prevent="pop_connect_wallet">Close</v-btn>
        </div>
      </div>
    </div>
    <div class="coin_search" v-if="coin_search">
      <div class="content_pop">
        <p class="wallet_box_title">Coin Search</p>
        <div class="footer_close">
          <v-btn @click.prevent="pop_search_coin">Close</v-btn>
        </div>
      </div>
    </div>
    <div class="dapp_settings" v-if="dappsettings">
      <div class="content_pop">
        <p class="title">Skin</p>
        <ul class="skin">
          <a class="skin_light" @click="ChangeSkin(0)">🌞</a>
          <a class="skin_dark" @click="ChangeSkin(1)">🌛</a>
        </ul>
        <p class="title">Language Setting</p>
        <ul class="skin">
          <a class="skin_light" @click.prevent="ChangeLanguage('en')">EN</a>
          <a class="skin_dark" @click.prevent="ChangeLanguage('cn')">CN</a>
        </ul>
        <p class="title">Slippage Setting</p>
        <ul class="skin">
          <a class="skin_light" @click.prevent="ChangeLanguage('en')">EN</a>
          <a class="skin_dark" @click.prevent="ChangeLanguage('cn')">CN</a>
        </ul>
        <div class="footer_close">
          <v-btn @click.prevent="pop_dapp_settings">Close</v-btn>
        </div>
      </div>
    </div>
    <bal-header/>
    <nuxt/>
    <footer class="footer">
      <div class="coin_price">$3.11 / BLCR</div>
      <div class="new">Airdrop start in the wed.23:33.</div>
    </footer>
  </div>
</template>

<script>
import BalHeader from "@/components/header";
import {EventBus} from "vue-backgrounds";
import string_tx from "@/api/mixins/string_tx";

export default {
  mixins: [string_tx],
  components: {BalHeader},
  data() {
    return {
      wallet: false,
      coin_search: false,
      dappsettings: false,
      wallet_value: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.LanguageStart()
    })
  },
  created() {
    EventBus.$on("pop_search_coin", this.pop_search_coin)
    EventBus.$on("pop_connect_wallet", this.pop_connect_wallet)
    EventBus.$on("pop_dapp_settings", this.pop_dapp_settings)
  },
  beforeDestroy() {
    EventBus.$off("pop_search_coin", this.pop_search_coin)
    EventBus.$off("pop_connect_wallet", this.pop_connect_wallet)
    EventBus.$off("pop_dapp_settings", this.pop_dapp_settings)
  },
  methods: {
    pop_search_coin() {
      this.coin_search = !this.coin_search
    },
    pop_connect_wallet() {
      this.wallet = !this.wallet
    },
    pop_dapp_settings() {
      this.dappsettings = !this.dappsettings
    },
  },
};
</script>

<style lang="scss">
@import "~assets/styles/patch/_customvar.scss";
@import "~assets/styles/patch/_materials.scss";

.mask_wallet, .dapp_settings, {
  @extend .balincer_dialog;

  .content_pop {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    right: 50%;
    top: 50%;
    bottom: 50%;
    margin-top: -230px;
    margin-left: -180px;
    color: $bal_white_color;
  }
}

.coin_search {
  @extend .balincer_dialog;
  .content_pop {
    width: 600px;
    height: 200px;
    position: absolute;
    left: 50%;
    right: 50%;
    top: 10vh;
    margin-top: 0px;
    margin-left: -180px;
    color: $bal_white_color;
  }
}
</style>
