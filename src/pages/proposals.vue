<template>
  <div>
    <dao-container>
      <div class="mb-3 d-flex">
        <div class="flex-auto">
          <div>
            <a
                :href="_etherscanLink(namespace.address)"
                target="_blank"
                class="text-gray"
            >
              {{ namespace.name || _shorten(key) }}
              <icon name="external-link" class="ml-1"/>
            </a>
          </div>
          <div class="d-flex flex-items-center flex-auto">
            <h2 class="mr-2">
              Proposals
              <counter :counter="totalProposals" class="ml-1"/>
            </h2>
          </div>
        </div>
        <router-link v-if="web3.account" :to="{ name: 'create' }">
          <ui-button>New proposal</ui-button>
        </router-link>
      </div>
    </dao-container>
    <dao-container :slim="true">
      <block :slim="true">
        <div class="px-4 py-3 bg-gray-dark">
          <a
              v-for="state in ['All', 'Core devs', 'Community', 'Active', 'Pending', 'Closed']"
              :key="state"
              v-text="state"
              @click="selectedState = state"
              :class="selectedState !== state && 'text-gray'"
              class="mr-3"
          />
        </div>
        <row-loading v-if="loading"/>
        <div v-if="loaded">
          <row-proposal
              v-for="(proposal, i) in proposalsWithFilter"
              :key="i"
              :proposal="proposal"
              :namespace="namespace"
              :token="key"
              :verified="namespace.verified"
              :i="i"
          />
        </div>
        <p
            v-if="loaded && Object.keys(proposalsWithFilter).length === 0"
            class="p-4 m-0 border-top d-block"
        >
          There isn't any proposal here yet!
        </p>
      </block>
    </dao-container>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import namespaces from '@/namespaces.json';
import lo_dao from "../api/mixins/dao/lo_dao";
import string_tx from "../api/mixins/string_tx";
import RowLoading from "../components/RowLoading";
import RowProposal from "../components/RowProposal";
import DaoContainer from "../components/Container";
import Block from "../components/Block";
import Counter from "../components/Ui/Counter";
import UiButton from "../components/Ui/Button";
import Icon from "../components/Icon";

export default {
  name: "proposals",
  components: {Icon, UiButton, Counter, Block, DaoContainer, RowProposal, RowLoading},
  mixins: [lo_dao, string_tx],
  data() {
    return {
      loading: false,
      loaded: false,
      proposals: {},
      selectedState: 'All'
    };
  },
  computed: {
    key() {
      return this.$route.params.key;
    },
    namespace() {
      return namespaces[this.key]
          ? namespaces[this.key]
          : {token: this.key, verified: []};
    },
    totalProposals() {
      return Object.keys(this.proposals).length;
    },
    proposalsWithFilter() {
      const ts = (Date.now() / 1e3).toFixed();
      if (this.totalProposals === 0) return {};
      return Object.fromEntries(
          Object.entries(this.proposals)
              .filter(proposal => {
                if (proposal[1].balance < this.namespace.min) return false;
                if (this.selectedState === 'All') return true;
                if (
                    this.selectedState === 'Active' &&
                    proposal[1].msg.payload.start <= ts &&
                    proposal[1].msg.payload.end > ts
                ) {
                  return true;
                }
                if (
                    this.selectedState === 'Core devs' &&
                    proposal[1].address.includes(this.namespace.coreDevs)
                ) {
                  return true;
                }
                if (
                    this.selectedState === 'Community' &&
                    !proposal[1].address.includes(this.namespace.coreDevs)
                ) {
                  return true;
                }
                if (
                    this.selectedState === 'Closed' &&
                    proposal[1].msg.payload.end <= ts
                ) {
                  return true;
                }
                if (
                    this.selectedState === 'Pending' &&
                    proposal[1].msg.payload.start > ts
                ) {
                  return true;
                }
              })
              .sort((a, b) => b[1].msg.payload.end - a[1].msg.payload.end, 0)
      );
    }
  },
  methods: {
    ...mapActions(['getProposals'])
  },
  async created() {
    this.loading = true;
    this.proposals = await this.getProposals(this.namespace.address);
    this.loading = false;
    this.loaded = true;
  }
};
</script>
