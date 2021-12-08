import string_tx from "@/api/mixins/string_tx"
import { EventBus } from "vue-backgrounds/src/engines/EventBus"

export default {
  mixins: [string_tx],
  data() {
    return {
      withdrawalloading: false,
      failed_payment_message: ""
    }
  },
  methods: {
    CheckInstance() {
      return false
    },
    appendTransactionHistoryItem(msg, whatsort, dat) {
      this.$store.dispatch("wallet/newEventTransaction", {
        msg,
        whatsort,
        dat
      })
    },
    caught_fails() {
      this.withdrawalloading = false
      this.notyError(this.failed_payment_message)
      this.appendTransactionHistoryItem("payment", "trx", this.failed_payment_message)
    },
    straightInto(pid) {
      this.$router.push(pid)
    },
    gotoHome() {
      this.$router.push("/")
      this.notyAlert("this contract requires network nile")
    },
    open_sheet_about(e) {
      e.preventDefault()
      EventBus.$emit("bottom_sheet_about")
    },
    open_sheet_referral(e) {
      e.preventDefault()
      EventBus.$emit("bottom_sheet_manual_enter")
    },
    open_sheet_console(e) {
      e.preventDefault()
      EventBus.$emit("bottom_sheet_debug")
    },
    switch_account(e) {
      e.preventDefault()
      EventBus.$emit("switch_account")
    },
    /**
     * Contract related operations with independent instance
     *
     * @returns {Promise<void>}
     */
    async reinvestment() {
      if (this.CheckInstance()) {
        return
      }
      try {
        const result = await TRC913.Instance().reinvestment()
        if (result) {
          this.notySuccess("Reinvest success!\nBlock confirmed.")
        } else {
          this.failed_payment_message = "Fail to reinvest"
          this.caught_fails()
        }
      } catch (e) {
        this.failed_payment_message = e.toString()
        this.caught_fails()
      }
    },
    /**
     * Contract related operations with independent instance
     * @param amount_sun
     * @returns {Promise<void>}
     */
    async stakingTrx(amount_sun) {
      if (this.CheckInstance()) {
        return
      }
      try {
        await TRC913.Instance().vegasStaking(amount_sun)
        this.notySuccess("Staking Success\nBlock confirmed.")
      } catch (e) {
        if (typeof e === "string") {
          this.failed_payment_message = `${e.toString()} with amount ${amount_sun}`
        } else {
          this.failed_payment_message = `${JSON.stringify(e)} with amount ${amount_sun}`
        }
        this.caught_fails()
      }
    },
    /**
     * the long payment process
     * @returns {Promise<boolean>}
     */
    async getMoneyLiq(amount_sun) {
      if (this.CheckInstance()) {
        return
      }
      try {
        const result = await TRC913.Instance().seattleLiq(amount_sun)
        if (result) {
          this.notySuccess(this.$t("msg_wsuccess"))
        } else {
          this.failed_payment_message = this.$t("msg_wfailure")
          this.caught_fails()
        }
      } catch (e) {
        if (typeof e === "string") {
          this.failed_payment_message = `${e.toString()} with amount ${amount_sun}`
        } else {
          this.failed_payment_message = `${JSON.stringify(e)} with amount ${amount_sun}`
        }

        this.caught_fails()
      }
    },
    /**
     * Contract related operations with independent instance
     * take-out all of them as a part...
     * @returns {Promise<void>}
     */
    async getMoneyUnlock() {
      if (this.CheckInstance()) {
        return
      }
      try {
        const result = await TRC913.Instance().seattle()
        if (result) {
          this.notySuccess(this.$t("msg_wsuccess"))
        } else {
          this.failed_payment_message = this.$t("msg_wfailure")
          this.caught_fails()
        }
      } catch (e) {
        if (typeof e === "string") {
          this.failed_payment_message = `${e.toString()} with amount-`
        } else {
          this.failed_payment_message = `${JSON.stringify(e)} with amount-`
        }
        this.caught_fails()
      }
    }
  }
}
