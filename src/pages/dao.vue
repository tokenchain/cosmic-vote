<template>
  <div>
    <dao-container>
      <h2 class="mb-3">Dashboard</h2>
    </dao-container>
    <dao-container :slim="true">
      <router-link
          v-for="namespace in getNameSpaces()"
          :key="namespace.address"
          :to="{ name: 'proposals', params: { key: namespace.key } }">
        <block class="text-center">
          <dao-token :address="namespace.image" size="128" class="mb-4"/>
          <div>
            <h2>
              {{ namespace.name }}
              <span class="text-gray">{{ namespace.symbol }}</span>
            </h2>
          </div>
        </block>
      </router-link>
    </dao-container>
  </div>
</template>
<script>
import DaoToken from "../components/Token";
import Block from "../components/Block";
import DaoContainer from "../components/Container";
import lo_dao from "../api/mixins/dao/lo_dao";

export default {
  name: "dao",
  mixins: [lo_dao],
  components: {DaoContainer, Block, DaoToken},
  created() {
    // if (Object.keys(this.namespaces).length === 1)
    this.$router.push({
      name: 'proposals',
      params: {
        key: Object.keys(this.getNameSpaces())[0]
      }
    });
  }
};
</script>

<style scoped>

</style>
