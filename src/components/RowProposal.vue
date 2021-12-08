<template>
  <router-link
      class="px-4 py-3 border-top d-block text-gray"
      :to="{ name: 'proposal', params: { key: token, id: i } }">
    <div>
      <state :proposal="proposal" class="d-inline-block mr-2 mb-2"/>
      <h3 v-text="proposal.msg.payload.name" class="d-inline-block mb-1"/>
    </div>
    <div>
      <span v-text="`#${i.slice(0, 7)}`"/>
      By {{ _shorten(proposal.address) }} {{ proposal.balance }}
      {{ namespace.symbol }}
      <icon v-if="isVerified" name="check" title="Verified"/>
      start
      <span v-text="$d(proposal.msg.payload.start * 1e3)"/>
      end
      <span v-text="$d(proposal.msg.payload.end * 1e3)"/>
    </div>
  </router-link>
</template>

<script>
import Icon from "./Icon";
import State from "./State";
import string_tx from "../api/mixins/string_tx";

export default {
  name: "RowProposal",
  mixins: [string_tx],
  components: {State, Icon},
  props: {
    namespace: {
      type: Object,
      default: "",
      required: false
    },
    token: {
      type: String,
      default: 0,
      required: false
    },
    proposal: {
      type: Object,
      default: 0,
      required: false
    },
    verified: {
      type: Array,
      default: 0,
      required: false
    },
    i: {
      type: String,
      default: 0,
      required: false
    },
  },
  computed: {
    isVerified() {
      return (
          Array.isArray(this.verified) &&
          this.verified.length > 0 &&
          this.verified.includes(this.proposal.address)
      );
    }
  },
};
</script>
