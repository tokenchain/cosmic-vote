<template>
  <block
      v-if="Object.keys(votes).length > 0"
      title="Votes"
      :counter="Object.keys(votes).length"
      :slim="true">
    <div
        v-for="(vote, address, i) in visibleVotes"
        :key="i"
        :style="i === 0 && 'border: 0 !important;'"
        class="px-4 py-3 border-top d-flex">
      <dao-user :address="address" :verified="namespace.verified" class="column"/>
      <div
          v-text="proposal.msg.payload.choices[vote.msg.payload.choice - 1]"
          class="flex-auto text-center text-white"
      />
      <div class="column text-right">
        <span
            v-text="
            `${_numeral(vote.balance)} ${namespace.symbol ||
              _shorten(namespace.token)}`"
            class="text-white"/>
        <a
            @click="openReceiptModal(vote)"
            target="_blank"
            class="ml-3 text-gray"
            title="Receipt">
          <icon name="signature"/>
        </a>
      </div>
    </div>
    <a
        v-if="!showAllVotes && Object.keys(votes).length > 10"
        @click="showAllVotes = true"
        class="px-4 py-3 border-top text-center d-block bg-gray-dark">
      See more
    </a>
    <receipt-modal
        :open="modalReceiptOpen"
        @close="modalReceiptOpen = false"
        :authorIpfsHash="authorIpfsHash"
        :relayerIpfsHash="relayerIpfsHash"
    />
  </block>
</template>

<script>
import Block from "../Block";
import Container from "../Container";
import Icon from "../Icon";
import DaoUser from "../User";
import ReceiptModal from "../Modal/Receipt";
import string_tx from "../../api/mixins/string_tx";

export default {
  name: "daoVote",
  mixins: [string_tx],
  components: {ReceiptModal, DaoUser, Icon, Block, Container},
  props: {
    votes: {
      type: Array,
      required: false,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    proposal: {
      type: Object,
      required: true
    },
    namespace: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showAllVotes: false,
      authorIpfsHash: '',
      relayerIpfsHash: '',
      modalReceiptOpen: false
    };
  },
  computed: {
    visibleVotes() {
      return Object.fromEntries(
          Object.entries(this.votes).slice(0, this.showAllVotes ? -1 : 10)
      );
    }
  },
  methods: {
    openReceiptModal(vote) {
      this.authorIpfsHash = vote.authorIpfsHash;
      this.relayerIpfsHash = vote.relayerIpfsHash;
      this.modalReceiptOpen = true;
    }
  }
};
</script>
