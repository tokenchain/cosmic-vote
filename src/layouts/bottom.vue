<template>
  <v-app>
    <nuxt/>
    <v-footer absolute padless>
      <v-bottom-navigation :background-color="c5_primary" v-model="bottomNav" shift dark>
        <!--
        <div class="nav_rr_container">
          <div class="rr_layer"></div>
          <div class="rose_dark_nav"></div>
        </div>
        -->
        <v-btn
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          :value="item.key"
          :disabled="nav_bar_dis"
          nuxt
        >
          <span :style="`color:${c9_primary}`" style="alignment: center; display: inline-table;">{{
            $t(item.title)
          }}</span>
          <v-icon :color="c9_primary">{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
    <v-bottom-sheet v-model="sheet_4" :retain-focus="false" inset persistent>
      <debug ref="debug_console" @close="sheet_4=false"/>
    </v-bottom-sheet>
    <v-bottom-sheet v-model="sheet_1" inset persistent>

    </v-bottom-sheet>
    <v-bottom-sheet v-model="sheet_2" inset persistent>

    </v-bottom-sheet>
    <v-bottom-sheet v-model="sheet_3" :retain-focus="false" inset persistent>
      <v-sheet class="text-center" height="90vh">
        <v-btn class="mt-6" text color="error" @click="sheet_3=false">{{ $t("p_close") }}</v-btn>
        <terms/>
      </v-sheet>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
import { EventBus } from "vue-backgrounds/src/engines/EventBus"
// import Referralpad from "@/components/sheet/referralpad"
// import PriceBoxEnter from "@/components/sheet/pricebox"
import nav from "@/api/mixins/tron/nav"
import { MoonBaycc } from "@/api/imple/MoonBayCC."
import terms from "@/components/sheet/terms"
import string_tx from "@/api/mixins/string_tx"
import Debug from "@/components/sheet/debug"

/**
 * hb-save-battery - update blockchain data in 20 seconds
 * hb-high-precision - update blockchain data in 2 seconds
 * hb-normal - update blockchain data in 9 seconds
 * hb-custom - allow custom update internals

 const TITLE = {
  p1: "Welcome",
  p2: "Share",
  p3: "Price Plan"
}

 */

export default {
  components: {
    Debug,
    terms
  },
  mixins: [nav, string_tx],
  data() {
    return {
      heartbeat: false,
      heartbeatrate: 9000,
      bottomNav: "home",
      sheet_1: false,
      sheet_2: false,
      sheet_3: false,
      sheet_4: false,
      nav_bar_dis: true,
      query_code: "",
      items: [
        {
          icon: "mdi-nintendo-game-boy",
          title: "bnt_welcome",
          key: "home",
          to: "/main"
        },
        {
          icon: "mdi-qrcode",
          title: "bnt_share",
          key: "qr",
          to: "/qr"
        },
        {
          icon: "mdi-tag",
          title: "bnt_price_plan",
          key: "priceplan",
          to: "/priceplan"
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      MoonBaycc.Instance()
      EventBus.$on("loading_work_process_nav", (enable) => {
        this.nav_bar_dis = enable
      })
      EventBus.$on("bottom_sheet_refer", (enter_code) => {
        if (enter_code.match(/^[a-zA-Z]{5}$/)) {
          this.sheet_1 = true
          this.query_code = enter_code
        } else {
          console.log("entered code is invalid:", enter_code)
        }
      })
      /**
       * display the sheet for entering referral code
       */
      EventBus.$on("bottom_sheet_manual_enter", () => {
        this.sheet_off()
        this.sheet_1 = true
      })
      /**
       *
       */
      EventBus.$on("bottom_sheet_about", () => {
        this.sheet_off()
        this.sheet_3 = true
      })

      EventBus.$on("bottom_sheet_debug", () => {
        this.sheet_off()
        this.sheet_4 = true
      })

      /**
       * check price plan
       */
      EventBus.$on("check_price_plan_action", () => {
        this.sheet_off()
        this.straightInto("priceplan")
        this.bottomNav = "priceplan"
      })
      /**
       * contract specific actions
       */
      EventBus.$on("price_plan_enter_deal", (key, amount) => {
        this.sheet_off()
        this.sheet_2 = true
        setTimeout(() => {
          /* const priceBoxElx = this.$refs.price_box_elx
           priceBoxElx.setBetAmount(amount) */
        }, 500)
      })
      EventBus.$on("debug_info", this.appendItem)
      EventBus.$on("event_lineDepositMessage", this.line_deposit_event)
      EventBus.$on("event_EndTimeMining", this.end_time_mining)
      EventBus.$on("event_OfferMade", this.account_listing)
    })
  },
  methods: {
    sheet_off() {
      this.sheet_2 = false
      this.sheet_1 = false
      this.sheet_3 = false
      this.sheet_4 = false
    },
    line_deposit_event(result) {
      //  console.log(result)
      this.notyInfo(this.$t("msg_new_ticket"))
      this.appendItem("line", "depo", result)
    },
    end_time_mining(result) {
      // console.log(result)
      this.notyInfo(this.$t("msg_end_mining"))
      this.appendItem("Emining", "prize", result)
    },
    account_listing(result) {
      // console.log(result)
      this.notyInfo(this.$t("msg_listing"))
      this.appendItem("Listing", "e", result)
    },
    appendItem(msg, whatsort, dat) {
      this.$store.dispatch("wallet/newEventTransaction", {
        msg,
        whatsort,
        dat
      })
    }
  }
}
</script>

<style scoped lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

</style>
