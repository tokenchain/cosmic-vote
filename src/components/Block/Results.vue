<template>
  <block :title="ts >= payload.end ? 'Results' : 'Current results'">
    <div v-for="(choice, i) in payload.choices" :key="i">
      <div class="text-white mb-1">
        <span v-text="choice" class="mr-1"/>
        <span v-if="results.totalBalances[i]" class="mr-1">
          {{ _numeral(results.totalBalances[i]) }}
          {{ namespace.symbol || _shorten(namespace.token) }}
        </span>
        <span
            class="float-right"
            v-text="
            $n(
              !results.totalVotesBalances
                ? 0
                : ((100 / results.totalVotesBalances) *
                    results.totalBalances[i]) /
                    1e2,
              'percent'
            )
          "
        />
      </div>
      <ui-progress
          :value="[results.totalWalletBalances[i], results.totalBptBalances[i]]"
          :max="results.totalVotesBalances"
          class="mb-3"
      />
    </div>
    <ui-button
        @click="downloadReport"
        v-if="ts >= payload.end"
        class="width-full mt-2"
    >
      Download report
    </ui-button>
  </block>
</template>

<script>
import * as jsonexport from 'jsonexport/dist';
import pkg from '@/../package.json';
import Block from "../Block";
import UiProgress from "../Ui/Progress";
import UiButton from "../Ui/Button";

export default {
  name: "blockResult",
  components: {UiButton, UiProgress, Block},
  props: {
    namespace: {
      type: String,
      required: true,
      default: ""
    },

    payload: {
      type: Object,
      required: true,
      default: ""
    },

    results: {
      type: Object,
      required: true,
      default: ""
    },

    votes: {
      type: Object,
      required: true,
      default: ""
    }
  },
  computed: {
    ts() {
      return (Date.now() / 1e3).toFixed();
    }
  },
  methods: {
    async downloadReport() {
      const obj = Object.entries(this.votes)
          .map(vote => {
            return {
              address: vote[0],
              choice: vote[1].msg.payload.choice,
              balance: vote[1].balance,
              timestamp: vote[1].msg.timestamp,
              dateUtc: new Date(
                  parseInt(vote[1].msg.timestamp) * 1e3
              ).toUTCString(),
              authorIpfsHash: vote[1].authorIpfsHash,
              relayerIpfsHash: vote[1].relayerIpfsHash
            };
          })
          .sort((a, b) => a.timestamp - b.timestamp, 0);
      try {
        const csv = await jsonexport(obj);
        const link = document.createElement('a');
        link.setAttribute('href', `data:text/csv;charset=utf-8,${csv}`);
        link.setAttribute('download', `${pkg.name}-report-${this.id}.csv`);
        document.body.appendChild(link);
        link.click();
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>
