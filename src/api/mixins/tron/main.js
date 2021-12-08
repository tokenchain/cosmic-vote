import {EventBus} from "vue-backgrounds/src/engines/EventBus"
export default {
    computed: {},
    data() {
        return {}
    },
    methods: {
        debug(bool) {
            this._debug = bool
        },
        async contract_init(extra_cb) {
        },
        /**
         * info basic contracts
         * @returns {Promise<void>}
         */
        async contract_scan() {
            this.event_loading_process(true)
            if (this.is_contract_ready()) {
                await this.queryUserStatus()
                await this.miscStatus()
                await this.GetPriceLimit()
                await this.systemStatus()
                // await this.node_count_get()
                await this.lined()
            } else {
                this.report_error("contract is not init")
            }
            this.event_loading_process(false)
        },
        async userSys() {
            await this.queryUserStatus()
            // this.InviteCodeGenerator()
        },
        event_loading_process(sw) {
            this._worker_process = sw
            EventBus.$emit("loading_work_process", sw)
        },
        /**
         * this is the system status
         * @returns {Promise<void>}
         */
        async systemStatus() {
            /*  try {
                const { sysInfod } = await b.Instance().shenzhen()
                const { flags } = await b.Instance().shenFlags()
                // if (this._debug) {
                /!**  console.group("sys update data ==> ")
                 console.log(flags)
                 console.groupEnd()
                 **!/
                // console.log(sysInfod, flags)
                // }
                this.$store.dispatch("b/shenzhen", sysInfod)
                this.$store.dispatch("b/shflg", flags)
              } catch (e) {
                this.report_error_trn(e, "shen zhen")
              } */
        },
        async miscStatus() {
            try {
                // const vegas = await b.Instance().canGoToVegas()
                const vegas = false
                await this.$store.dispatch("b/can_vegas", vegas)
            } catch (e) {
                this.report_error_trn(e, "can vegas")
            }
        },
        /**
         * get my capital
         * @returns {Promise<void>}
         */
        async node_count_get() {
            /**
             *
             *
             */
        },
        /**
         * update player info by the address
         * @returns {Promise<void>}
         */
        async queryUserStatus() {
            if (!this.blockLink.isLoggedIn()) {
                return
            }
            try {
                const address = this.blockLink.getAccountAddress()

                // console.log(address, toNumber(round))
                // console.log(customer_data, r)
                // this.saveLocal("b/user_info", customer_data)

            } catch (e) {
                this.report_error_trn(e, "get acc address")
            }
        },
        /**
         * get the price plan
         * @returns {Promise<void>}
         * @constructor
         */
        async GetPriceLimit() {
            // const price_level = await b.Instance().getPriceLevels()
            await this.$store.dispatch("b/price_entry_info", 990239)
        },
        async lined() {
            /*  const f = txtUnit(this.now_time_blockchain) - 15000
              const devents = await b.Instance().eventQ("LineIn", 0, f)
              const listpcx = devents.map(i => parseInt(i.result.amount))
              await  this.$store.dispatch("b/line_vol", listpcx) */
        },
        getReferText() {
            return this.myinvitationcode
        }
    }
}
