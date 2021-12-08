import {EventBus} from "vue-backgrounds"
import walletvx from "@/api/mixins/tron/walletx"
import {MarginPoolContract} from "@/api/abi/margin_pool.";
import {BalincerPriceOracleContract} from "@/api/abi/balincer_price_oracle.";
import {MarginPoolAddressesProviderContract} from "@/api/abi/margin_pool_addresses_provider.";
import {XTokenContract} from "@/api/abi/x_token.";
import {VariableDebtTokenContract} from "@/api/abi/variable_debt_token.";
import {UniswapV2Router02Contract} from "@/api/abi/uniswap_v2_router02.";

export default {
    mixins: [walletvx],
    methods: {
        debug(bool) {
            this._debug = bool
        },
        async contract_init(extra_cb) {
            if (!MarginPoolContract.Instance()) {
                const defined_contract = MarginPoolContract.init(process.env.MarginPool, this.ethereum, this.w3)
                defined_contract.setBlockLink(this.blockLink)
                defined_contract.setResource(this.gas, this.gasPrice)
                defined_contract.setDebug(false)
            }
            if (!BalincerPriceOracleContract.Instance()) {
                const defined_contract = BalincerPriceOracleContract.init(process.env.BalincerPriceOracle, this.ethereum, this.w3)
                defined_contract.setBlockLink(this.blockLink)
                defined_contract.setResource(this.gas, this.gasPrice)
                defined_contract.setDebug(false)
            }
            if (!MarginPoolAddressesProviderContract.Instance()) {
                const defined_contract = MarginPoolAddressesProviderContract.init(process.env.MarginPoolAddressesProvider, this.ethereum, this.w3)
                defined_contract.setBlockLink(this.blockLink)
                defined_contract.setResource(this.gas, this.gasPrice)
                defined_contract.setDebug(false)
            }
            if (!XTokenContract.Instance()) {
                const defined_contract = XTokenContract.init(process.env.XToken, this.ethereum, this.w3)
                defined_contract.setBlockLink(this.blockLink)
                defined_contract.setResource(this.gas, this.gasPrice)
                defined_contract.setDebug(false)
            }
            if (!VariableDebtTokenContract.Instance()) {
                const defined_contract = VariableDebtTokenContract.init(process.env.VariableDebtToken, this.ethereum, this.w3)
                defined_contract.setBlockLink(this.blockLink)
                defined_contract.setResource(this.gas, this.gasPrice)
                defined_contract.setDebug(false)
            }
            if (!UniswapV2Router02Contract.Instance()) {
                const defined_contract = UniswapV2Router02Contract.init(process.env.UniswapV2Router02, this.ethereum, this.w3)
                defined_contract.setBlockLink(this.blockLink)
                defined_contract.setResource(this.gas, this.gasPrice)
                defined_contract.setDebug(false)
            }
            if (!UniswapV2Router02Contract.Instance()) {
                const defined_contract = UniswapV2Router02Contract.init(process.env.CherrySwapRouter, this.ethereum, this.w3)
                defined_contract.setBlockLink(this.blockLink)
                defined_contract.setResource(this.gas, this.gasPrice)
                defined_contract.setDebug(false)
            }
            /**
             *
             *
             * you code in here to connect all the contracts and activate them
             */
            await this.queryUserStatus()
        },
        /**
         * info basic contracts
         * @returns {Promise<void>}
         */
        async contract_scan() {
            this.event_loading_process(true)
            if (this.is_contract_ready()) {
                await this.globalData()
                await this.queryUserStatus()
                await this.systemStatus()
            } else {
                this.report_error("contract is not init")
            }
            this.event_loading_process(false)
        },
        async userSys() {
            await this.queryUserStatus()
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
            try {
                // const { sysInfod } = await TRC913.Instance().shenzhen()
                // const { flags } = await TRC913.Instance().shenFlags()
                const sysInfod = ""
                const flags = []
                // if (this._debug) {
                /**  console.group("sys update data ==> ")
                 console.log(flags)
                 console.groupEnd()
                 **/
                // console.log(sysInfod, flags)
                // }
                await this.$store.dispatch("b/save_balance", sysInfod)
                await this.$store.dispatch("b/syncdata", flags)
                await this.$store.dispatch("b/save_address", flags)
                await this.$store.dispatch("b/save_balance_fam", flags)
                await this.$store.dispatch("b/save_cbal", flags)
                await this.$store.dispatch("b/keepTokenList", flags)
            } catch (e) {
                this.report_error_trn(e, "shen zhen")
            }
        },
        /**
         * get my capital
         * @returns {Promise<void>}
         */
        async node_count_get() {
            try {
                const node_flash = this.$store.getters["b/get_round"]
                if (node_flash) {


                } else {
                    this.report_error("round id not found")
                }
            } catch (e) {
                console.log(e)
                this.report_error_trn(e, "node count not right")
            }
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
                // const customer_data = await this.blockLink.getAccountAddress()
                // console.log(address, toNumber(round))
                // console.log(customer_data, r)
                // this.saveLocal("b/user_info", customer_data)
                //await this.$store.dispatch("b/user_info", customer_data)
                await this.$store.dispatch("wallet/save_address", address)
            } catch (e) {
                this.report_error_trn(e, "get acc address")
            }
        },
        async globalData() {
            if (!this.blockLink.isLoggedIn()) {
                return
            }
            try {
                const address = this.blockLink.getAccountAddress()
                const contractmargin = MarginPoolContract.Instance()
                const revision = await contractmargin.MARGINPOOL_REVISION()
                const reserves = await contractmargin.MAX_NUMBER_RESERVES()
                const payload_dat = await contractmargin.getUserAccountData(address)
                const payload_conf = await contractmargin.getUserConfiguration(address)
                const resereved_tokens = await contractmargin.getReservesList()
                // const payload_conf = await contractmargin.getConfiguration(address)
                await this.$store.dispatch("b/storeRevision", revision)
                await this.$store.dispatch("b/storeReserves", reserves)
                await this.$store.dispatch("b/useraccount", payload_dat)
                await this.$store.dispatch("b/userconfiguration", payload_conf)
                await this.$store.dispatch("b/storeReserveList", resereved_tokens)
                // const customer_data = await this.blockLink.getAccountAddress()
                // console.log(address, toNumber(round))
                // console.log(customer_data, r)
                // this.saveLocal("b/user_info", customer_data)
                //await this.$store.dispatch("b/user_info", customer_data)
                await this.$store.dispatch("wallet/save_address", address)
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
            await this.$store.dispatch("b/price_entry_info", price_level)
        },
        getReferText() {
            return this.myinvitationcode
        }
    }
}
