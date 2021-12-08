import _ from "lodash"

// import { web3utils, core } from "../plugins/staticweb3";
// import instance from "../plugins/web3";
// documentation for web3-ss
// https://second-state.github.io/web3-ss.js/api/ss.html#web3-ss-syncing

const state = {
    user_account: "",
    network_name: "",
    contract_balance: 0,
    network_balance: 0,
    tvl_usd: 0,
    tvl_btc: 0,
    margin_revision: 0,
    max_number_reserve: 0,
    relative_price_tvl_usd: 0,
    relative_price_percent: 0,
    total_collateral_ETH: 0,
    total_debt_ETH: 0,
    available_borrows_ETH: 0,
    health_factor: 0,
    user_conf: 0,
    market: [],
    rank_pnl: [],
    farm_balance: 0,
    farm_dec: 0,
    install_state: 0,
    isPermissioned: false,
    islogin: false,
    isPasteBinInit: false,
    health: false,
    sync_count: 0,
    decimals: 0,
    tokenConf: {},
    tokenlist: {},
    tokenResveList: {},
    tokenFlatList: [],
    console_items: []
}

const mutations = {
    PASTE_BIN_INIT(state, payload) {
        state.isPasteBinInit = true
    },
    USER_ACCOUNT_INIT(state, payload) {
        // store web3 user account
        state.user_account = payload
        state.islogin = true
    },
    PERMISSION(state, b) {
        state.isPermissioned = b
    },
    FARMING_BAL_STORE(state, detail) {
        // store web3 user account
        state.farm_balance = detail.balance(state.user_account)
        state.farm_dec = detail.decimal
    },
    _BAL_STORE(state, payload) {
        // store web3 user account
        state.network_balance = payload
    },
    PUSH_ITEM(state, payload) {
        state.console_items.unshift({
            message: payload.msg,
            type: payload.whatsort,
            data: payload.dat,
            time: new Date().getTime()
        })
    },
    CLEAR_ITEM(state) {
        state.console_items = []
    },
    REVISION(state, p) {
        state.margin_revision = p
    },
    MAX_NUMBER_RESERVES(state, p) {
        state.max_number_reserve = p
    },
    COIN_CONF(state, {coin, data}) {
        //bit 0-15: LTV
        //bit 16-31: Liq. threshold
        //bit 32-47: Liq. bonus
        //bit 48-55: Decimals
        //bit 56: Reserve is active
        //bit 57: reserve is frozen
        //bit 58: borrowing is enabled
        //bit 60-63: reserved
        //bit 64-79: reserve factor
        state.tokenConf[coin] = data
    },
    USER_CONF(state, g) {
        //data
        state.user_conf = g
    },
    //tokenResveList
    RESERVE_LIST(state, g) {
        //data
        _.forEach(g, (address_d) => {
            state.tokenResveList[address_d] = true
        })
    },
    USER_DAT(state, {totalCollateralETH, totalDebtETH, availableBorrowsETH, ltv, healthFactor}) {
        //getUserAccountData(user: string,):Promise<[BN, BN, BN, BN, BN, BN]>
        //totalCollateralETH
        //totalDebtETH
        //availableBorrowsETH
        //ltv
        //healthFactor
        state.total_collateral_ETH = totalCollateralETH
        state.total_debt_ETH = totalDebtETH
        state.available_borrows_ETH = availableBorrowsETH
        state.tvl_usd = ltv
        state.health_factor = healthFactor
    },
    TOKEN_LIST(state, payload) {
        state.tokenFlatList = []
        state.tokenFlatList.push({
            name: "TRON",
            sym: "TRX",
            add: "0x0",
            deci: 6,
            network_balance: state.network_balance
        })
        _.forEach(payload, (val) => {
            const hj = {
                name: val.name,
                sym: val.symbol,
                add: val.contractAddress,
                network_balance: val.balance,
                deci: parseInt(val.decimals)
            }
            state.tokenlist[val.symbol] = hj
            state.tokenFlatList.push(hj)
        })
    }
}
const actions = {
    save_balance({commit}, val) {
        commit("_BAL_STORE", val)
    },
    syncdata({commit, state}, health) {
        state.sync_count = state.sync_count + 1
        state.health = health
    },
    save_address({commit}, va) {
        commit("USER_ACCOUNT_INIT", va)
    },
    save_balance_fam({commit}, coindetail) {
        // server request ....
        commit("FARMING_BAL_STORE", coindetail)
    },
    save_cbal({commit}, payload) {
        commit("CONTRACT_BALANCE", payload)
    },
    clearEvents({commit}) {
        commit("CLEAR_ITEM")
    },
    newEventTransaction({commit}, payload) {
        commit("PUSH_ITEM", payload)
    },
    storePasteBin({commit, state}, lis) {
        commit("PASTE_BIN_INIT", lis)
    },
    keepTokenList({commit, state}, list) {
        commit("TOKEN_LIST", list)
    },
    getName({commit, state}) {
        console.log("test now")
    },
    setPermisssion({commit}, b) {
        commit("PERMISSION", b)
    },
    updateDecimal({commit}, t) {
        commit("CONTRACT_DECIMAL", parseInt(t.deci))
    },
    storeCoinConf({commit}, t) {
        commit("COIN_CONF", t)
    },
    useraccount({commit}, t) {
        commit("USER_DAT", t)
    },
    userconfiguration({commit}, t) {
        commit("USER_CONF", t)
    },
    storeReserveList({commit}, t) {
        commit("RESERVE_LIST", t)
    },
    storeReserves({commit}, t) {
        commit("MAX_NUMBER_RESERVES", t)
    },
    storeRevision({commit}, t) {
        commit("REVISION", t)
    }
}

const getters = {
    margin_pool_revision(state) {
        return state.margin_revision
    },
    max_resrv(state) {
        return state.max_number_reserve
    },
    isLoginWeb3(state) {
        return state.islogin
    },
    farm_dec(state) {
        return state.farm_dec
    },
    wallet_setup(state) {
        return state.install_state
    },
    addressContract(state) {
        return state.USER_DAT
    },
    user_account(state) {
        return state.user_account
    },
    farming_coin_account(state) {
        return state.farm_balance
    },
    QueryNowSymbol(state) {
        return "ETH"
    },
    QueryNowBalance(state) {
        return state.network_balance
    },
    QueryContractBalance(state) {
        return state.contract_balance
    },
    network(state) {
        return state.network_name
    },
    get_dec(state) {
        return state.decimals
    },
    isPermissioned(state) {
        return state.isPermissioned
    },
    isPasteBinInit(state) {
        return state.isPasteBinInit
    },
    inSyncs(state) {
        return state.sync_count
    },
    sync_health(state) {
        return state.health
    },
    list_events(state) {
        return state.console_items
    },
    total_collateral_eth(state) {
        return state.total_collateral_ETH
    },
    total_debt_eth(state) {
        return state.total_debt_ETH
    },
    available_borrow_eth(state) {
        return state.available_borrows_ETH
    },
    health_factor(state) {
        return state.health_factor
    },
    tvl_usd(state) {
        return state.tvl_usd
    },
    user_tokens(state) {
        return state.tokenFlatList
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
