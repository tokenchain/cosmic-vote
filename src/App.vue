<template>
  <div :class="space && space.skin" id="app" class="overflow-hidden">
    <UiLoading v-if="app.loading || !app.init" class="overlay big" />
    <div v-else>
      <Topnav />
      <div class="pb-6 overflow-hidden">
        <router-view :key="$route.path" class="flex-auto" />
      </div>
    </div>
    <div id="modal" />
    <Notifications />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Bee, Utils } from '@ethersphere/bee-js/src';

export default {
  watch: {
    'app.modalOpen': function(val) {
      const el = document.body;
      el.classList[val ? 'add' : 'remove']('overflow-hidden');
    }
  },
  computed: {
    space() {
      try {
        const key = this.domain || this.$route.params.key;
        return this.app.spaces[key];
      } catch (e) {
        return {};
      }
    }
  },
  async mounted() {
    await this.init();

    setTimeout(async () => {
      const bee = new Bee('https://gateway.ethswarm.org/');

      // const signer = '0x634fb5a872396d9693e5c9f9d7233cfa93f395c093371017ff44aa9ae6564cdd';
      const signer = await Utils.Eth.makeEthereumWalletSigner(this.$auth.provider.value);
      console.log(signer.address);

      const socWriter = bee.makeSOCWriter(signer);
      const identifier = '0000000000000000000000000000000000000000000000000000000000000000';
      const data = new Uint8Array([1, 2, 3, 4, 5]);
      try {
        const response = await socWriter.upload(identifier, data);
        console.log('Response', response);
      } catch (e) {
        console.log(e);
      }

      const fileHash = await bee.uploadData('Snapshot is great');
      const data1 = await bee.downloadData(fileHash);
      console.log(fileHash, data1.text()); // prints 'Bee is awesome!'
    }, 3e3);
  },
  methods: {
    ...mapActions(['init'])
  }
};
</script>
