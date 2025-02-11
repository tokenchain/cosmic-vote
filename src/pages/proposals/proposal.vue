<template>
  <dao-container :slim="true">
    <template v-if="loaded">
      <div class="px-4 px-md-0 mb-3">
        <router-link :to="{ name: 'proposals' }" class="text-gray">
          <icon name="back" size="22" class="v-align-middle"/>
          {{ namespace.name || _shorten(namespace.address) }}
        </router-link>
      </div>
      <div>
        <div class="col-12 col-lg-8 float-left pr-0 pr-lg-5">
          <div class="px-4 px-md-0">
            <h1 class="mb-2">
              {{ payload.name }}
              <span v-text="`#${id.slice(0, 7)}`" class="text-gray"/>
            </h1>
            <state :proposal="proposal" class="mb-4"/>
            <markdown :body="payload.body" class="mb-6"/>
          </div>
          <block
              v-if="ts >= payload.start && ts < payload.end"
              class="mb-4"
              title="Cast your vote"
          >
            <div class="mb-3">
              <ui-button
                  v-for="(choice, i) in payload.choices"
                  :key="i"
                  v-text="choice"
                  @click="selectedChoice = i + 1"
                  class="d-block width-full mb-2"
                  :class="selectedChoice === i + 1 && 'button--active'"
              />
            </div>
            <ui-button
                :disabled="voteLoading || !selectedChoice || !web3.account"
                :loading="voteLoading"
                @click="modalOpen = true"
                class="d-block width-full button--submit"
            >
              Vote
            </ui-button>
          </block>
          <dao-vote
              :namespace="namespace"
              :proposal="proposal"
              :votes="votes"
          />
        </div>
        <div class="col-12 col-lg-4 float-left">
          <Block title="Informations">
            <div class="mb-1">
              <b>Token</b>
              <span class="float-right text-white">
                <dao-token :address="namespace.image" class="mr-1"/>
                {{ namespace.symbol }}
              </span>
            </div>
            <div class="mb-1">
              <b>Author</b>
              <dao-user
                  :address="proposal.address"
                  :verified="namespace.verified"
                  class="float-right"
              />
            </div>
            <div class="mb-1">
              <b>IPFS</b>
              <a
                  :href="_ipfsUrl(proposal.ipfsHash)"
                  target="_blank"
                  class="float-right"
              >
                #{{ proposal.ipfsHash.slice(0, 7) }}
                <Icon name="external-link" class="ml-1"/>
              </a>
            </div>
            <div>
              <div class="mb-1">
                <b>Start date</b>
                <span
                    v-text="$d(payload.start * 1e3, 'long')"
                    class="float-right text-white"
                />
              </div>
              <div class="mb-1">
                <b>End date</b>
                <span
                    v-text="$d(payload.end * 1e3, 'long')"
                    class="float-right text-white"
                />
              </div>
              <div class="mb-1">
                <b>Snapshot</b>
                <a
                    :href="_etherscanLink(payload.snapshot, 'block')"
                    target="_blank"
                    class="float-right"
                >
                  {{ $n(payload.snapshot) }}
                  <Icon name="external-link" class="ml-1"/>
                </a>
              </div>
            </div>
          </Block>
          <block-result
              :namespace="namespace"
              :payload="payload"
              :results="results"
              :votes="votes"
          />
        </div>
      </div>
      <confirm
          :open="modalOpen"
          @close="modalOpen = false"
          @reload="loadProposal"
          :namespace="namespace"
          :proposal="proposal"
          :id="id"
          :selectedChoice="selectedChoice"
          :power="power"
          :snapshot="payload.snapshot"
      />
    </template>
    <div v-else class="text-center">
      <loading class="big"/>
    </div>
  </dao-container>
</template>

<script>
import {mapActions} from 'vuex';
import namespaces from '@/namespaces.json';
import lo_dao from "../../api/mixins/dao/lo_dao";
import string_tx from "../../api/mixins/string_tx";
import Confirm from "../../components/Modal/Confirm";
import Loading from "../../components/Ui/Loading";
import DaoContainer from "../../components/Container";
import Icon from "../../components/Icon";
import Block from "../../components/Block";
import State from "../../components/State";
import Markdown from "../../components/Ui/Markdown";
import UiButton from "../../components/Ui/Button";
import DaoVote from "../../components/Block/Votes";
import DaoUser from "../../components/User";
import Result from "../../components/Block/Results";
import BlockResult from "../../components/Block/Results";
import DaoToken from "../../components/Token";

export default {
  name: "proposal",
  components: {
    DaoToken,
    BlockResult,
    Result, DaoUser, DaoVote, UiButton, Markdown, State, Block, Icon, DaoContainer, Loading, Confirm
  },
  mixins: [lo_dao, string_tx],
  data() {
    return {
      key: this.$route.params.key,
      id: this.$route.params.id,
      loading: false,
      loaded: false,
      voteLoading: false,
      proposal: {},
      votes: {},
      results: [],
      modalOpen: false,
      selectedChoice: 0,
      power: 0
    };
  },
  computed: {
    namespace() {
      return namespaces[this.key]
          ? namespaces[this.key]
          : {token: this.key, verified: []};
    },
    payload() {
      return this.proposal.msg.payload;
    },
    ts() {
      return (Date.now() / 1e3).toFixed();
    }
  },
  methods: {
    ...mapActions(['getProposal', 'getPower']),
    async loadProposal() {
      const proposalObj = await this.getProposal({
        token: this.namespace.address,
        id: this.id
      });
      this.proposal = proposalObj.proposal;
      this.votes = proposalObj.votes;
      this.results = proposalObj.results;
    },
    async loadPower() {
      if (!this.web3.account) return;
      this.power = await this.getPower({
        token: this.namespace.address,
        address: this.web3.account,
        snapshot: this.payload.snapshot
      });
    }
  },
  async created() {
    this.loading = true;
    await this.loadProposal();
    await this.loadPower();
    this.loading = false;
    this.loaded = true;
  }
};
</script>
