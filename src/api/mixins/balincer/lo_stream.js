import {EventBus} from "vue-backgrounds"

export default {
    computed: {
        pool_revision() {
            return this.$store.getters["b/margin_pool_revision"]
        },
        max_reserves() {
            return this.$store.getters["b/max_resrv"]
        },
        total_collateral_eth() {
            return this.$store.getters["b/total_collateral_eth"]
        },
        total_debt_eth() {
            return this.$store.getters["b/total_debt_eth"]
        },
        available_borrow_eth() {
            return this.$store.getters["b/available_borrow_eth"]
        },
        health_factor() {
            return this.$store.getters["b/health_factor"]
        },
        tvl_usd() {
            return this.$store.getters["b/tvl_usd"]
        },
        user_account() {
            return this.$store.getters["b/marginpoolrevision"]
        },
    },
    data() {
        return {}
    }
}
