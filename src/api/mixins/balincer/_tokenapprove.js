import {sleep} from "@/plugins/network"
import {MoonBaycc} from "@/api/imple/MoonBayCC."

export default {
    methods: {
        async allowx(detail, my_address, spender_address) {
            const link = MoonBaycc.Instance().getLinkBase()
            const gc = await link.getMyCoinDetail(detail.address)
            const contract = await link.getContractToken(detail.address)
            await gc.runAllowanceAmount(contract, my_address, spender_address)
            const c = gc.approvalStatus(my_address, spender_address)
            return {
                ok: c.k2,
                amount: c.k1,
                gc
            }
        },
        caught_fails_x() {
            this.withdrawalloading = false
            this.notyError(this.failed_payment_message)
            this._errHistory("payment", "trx", this.failed_payment_message)
        },
        async _errHistory(msg, whatsort, dat) {
            await this.$store.dispatch("wallet/newEventTransaction", {
                msg,
                whatsort,
                dat
            })
        },
        is_approval_correct(coin_detail, state_amount) {
            const me = this.$store.getters["wallet/user_account"]
            const link = MoonBaycc.Instance().getLinkBase()
            if (link.isAddress(me)) {
                const c = coin_detail.approvalStatus(me, process.env.mark_six)
                return parseInt(c.k1) >= state_amount || c.k2
            } else {
                return false
            }
        },
        async update_approval(erc20_address) {
            const me = this.$store.getters["wallet/user_account"]
            const link = MoonBaycc.Instance().getLinkBase()
            const gc = await link.getMyCoinDetail(erc20_address)
            const contract = await link.getContractToken(erc20_address)
            if (link.isAddress(me)) {
                await gc.runAllowanceAmount(contract, me, process.env.mark_six)
            }
        },
        action_loading(on, e) {

        },
        async approve_usdt() {
            const link = MoonBaycc.Instance().getLinkBase()
            await this.approve_unlimited(link, process.env.currency, process.env.mark_six)
        },
        async approve_mine() {
            const link = MoonBaycc.Instance().getLinkBase()
            await this.approve_unlimited(link, process.env.mine, process.env.mark_six)
        },
        async approve_unlimited(block_link, coin_address, contract_address) {
            const unlimited = "1000000000000000000000000000000000000"
            try {
                this.action_loading(true, coin_address)
                await block_link.approveToken(coin_address, contract_address, unlimited)
                this.action_loading(false, coin_address)
            } catch (e) {
                console.log("e happens", e)
                this.action_loading(false, coin_address)
                this.$handleErrorEvm(e)
                this.caught_fails_x()
            }
        },
        async approve_limited(block_link, coin_address, contract_address, coin_amount) {
            const x = await block_link.getCoinDetail(coin_address)
            if (x.balance(block_link.getAccountAddress()) < coin_amount) {
                this.failed_payment_message = "not able to make it."
            }
            try {
                this.action_loading(true, coin_address)
                await block_link.approveToken(coin_address, contract_address, coin_amount)
                this.action_loading(false, coin_address)
            } catch (e) {
                this.action_loading(false, coin_address)
                this.$handleErrorEvm(e)
                this.caught_fails_x()
            }
        }
        /**
         * okoko
         */
    }
}
