import _ from "lodash"

// import { web3utils, core } from "../plugins/staticweb3";
// import instance from "../plugins/web3";
// documentation for web3-ss
// https://second-state.github.io/web3-ss.js/api/ss.html#web3-ss-syncing

const state = {
  user_account: "",
  network_name: "",
  contract_address: "",
  contract_balance: 0,
  network_balance: 0,
  farm_balance: 0,
  farm_dec: 0,
  install_state: 0,
  isPermissioned: false,
  islogin: false,
  isPasteBinInit: false,
  health: false,
  sync_count: 0,
  decimals: 0,
  tokenlist: {},
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
  save_balance({ commit }, val) {
    commit("_BAL_STORE", val)
  },
  syncdata({ commit, state }, health) {
    state.sync_count = state.sync_count + 1
    state.health = health
  },
  save_address({ commit }, va) {
    commit("USER_ACCOUNT_INIT", va)
  },
  save_balance_fam({ commit }, coindetail) {
    commit("FARMING_BAL_STORE", coindetail)
  },
  getContractBalance({ commit }, payload) {
    commit("CONTRACT_BALANCE", payload)
  },
  clearEvents({ commit }) {
    commit("CLEAR_ITEM")
  },
  newEventTransaction({ commit }, payload) {
    commit("PUSH_ITEM", payload)
  },
  storePasteBin({ commit, state }, lis) {
    commit("PASTE_BIN_INIT", lis)
  },
  keepTokenList({ commit, state }, list) {
    commit("TOKEN_LIST", list)
  },
  getName({ commit, state }) {
    console.log("test now")
  },
  setPermisssion({ commit }, b) {
    commit("PERMISSION", b)
  },
  updateDecimal({ commit }, t) {
    commit("CONTRACT_DECIMAL", parseInt(t.deci))
  },
  storeContract({ commit }, t) {
    commit("CONTRACT_ADDRESS", t)
  }
}

const getters = {
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
    return state.contract_address
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
