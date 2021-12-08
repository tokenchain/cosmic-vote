import string_tx from "@/api/mixins/string_tx"
import walletr from "@/api/mixins/tron/walletx"

export default {
  mixins: [walletr, string_tx],
  data() {
    return {
      cells: [
      ]
    }
  },
  methods: {
    update_price_plan() {
      const list = this.$store.getters["trc913/get_price_plan"]
      if (list.length > 0) {
        list.forEach((numberX, index) => {

        })
      }
    },
    eval_price_level(amount_in_trx) {
      const amount = parseInt(amount_in_trx)
      const list = this.$store.getters["trc913/get_price_plan"]

      return false
    },
    eval_over_cap(amount) {
      // console.log(this.slotMax)
      return false
    }
  }
}
