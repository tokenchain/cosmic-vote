<template>
  <dao-container :slim="true">
    <div class="px-4 px-md-0 mb-3">
      <router-link
          :to="{ name: 'proposals', params: { key } }"
          class="text-gray"
      >
        <Icon name="back" size="22" class="v-align-middle"/>
        {{ namespace.name || _shorten(namespace.address) }}
      </router-link>
    </div>
    <div>
      <div class="col-12 col-lg-8 float-left pr-0 pr-lg-5">
        <div class="px-4 px-md-0">
          <div class="d-flex flex-column mb-6">
            <input
                v-autofocus
                v-model="form.name"
                maxlength="128"
                class="h1 mb-2 input"
                placeholder="Question"
            />
            <textarea-autosize
                v-model="form.body"
                maxlength="10240"
                class="input mb-6"
                placeholder="What is your proposal?"
            />
            <div v-if="form.body">
              <h4 class="mb-4">Preview</h4>
              <markdown :body="form.body"/>
            </div>
          </div>
        </div>
        <block title="Choices">
          <div v-if="form.choices.length > 0" class="overflow-hidden mb-2">
            <div
                v-for="(choice, i) in form.choices"
                :key="i"
                class="d-flex mb-2"
            >
              <ui-button class="d-flex width-full">
                <span class="mr-4">{{ i + 1 }}</span>
                <input
                    v-model="form.choices[i]"
                    class="input height-full flex-auto text-center"
                />
                <span @click="removeChoice(i)" class="ml-4">
                  <icon name="close" size="12"/>
                </span>
              </ui-button>
            </div>
          </div>
          <ui-button @click="addChoice" class="d-block width-full">
            Add choice
          </ui-button>
        </block>
      </div>
      <div class="col-12 col-lg-4 float-left">
        <block title="Actions">
          <div class="mb-2">
            <ui-button
                @click="[(modalOpen = true), (selectedDate = 'start')]"
                class="width-full mb-2"
            >
              <span v-if="!form.start">Select start date</span>
              <span v-else v-text="$d(form.start * 1e3, 'long')"/>
            </ui-button>
            <ui-button
                @click="[(modalOpen = true), (selectedDate = 'end')]"
                class="width-full mb-2"
            >
              <span v-if="!form.end">Select end date</span>
              <span v-else v-text="$d(form.end * 1e3, 'long')"/>
            </ui-button>
            <ui-button class="width-full mb-2">
              <input
                  v-model="form.snapshot"
                  type="number"
                  class="input width-full text-center"
                  placeholder="Snapshot block number"
              />
            </ui-button>
          </div>
          <ui-button
              @click="handleSubmit"
              :disabled="!isValid"
              :loading="loading"
              class="d-block width-full button--submit"
          >
            Publish
          </ui-button>
        </block>
      </div>
    </div>
    <select-date
        :value="form[selectedDate]"
        :selectedDate="selectedDate"
        :open="modalOpen"
        @close="modalOpen = false"
        @input="setDate"
    />
  </dao-container>
</template>

<script>
import {mapActions} from 'vuex';
import UiButton from "../components/Ui/Button";
import Block from "../components/Block";
import Icon from "../components/Icon";
import Markdown from "../components/Ui/Markdown";
import SelectDate from "../components/Modal/SelectDate";
import DaoContainer from "../components/Container";
import lo_dao from "../api/mixins/dao/lo_dao";

export default {
  name: "create",
  components: {DaoContainer, SelectDate, Markdown, Icon, Block, UiButton},
  mixins: [lo_dao],
  data() {
    return {
      key: this.$route.params.key,
      loading: false,
      form: {
        name: '',
        body: '',
        choices: ['', ''],
        start: '',
        end: '',
        snapshot: ''
      },
      modalOpen: false,
      selectedDate: ''
    };
  },
  computed: {

    isValid() {
      // const ts = (Date.now() / 1e3).toFixed();
      return (
          !this.loading &&
          this.web3.account &&
          this.form.name &&
          this.form.body &&
          this.form.start &&
          // this.form.start >= ts &&
          this.form.end &&
          this.form.end > this.form.start &&
          this.form.choices.length >= 2 &&
          this.form.choices.reduce((a, b) => (!a ? false : b), true)
      );
    }
  },
  methods: {
    ...mapActions(['send']),
    addChoice() {
      this.form.choices.push('');
    },
    removeChoice(i) {
      delete this.form.choices[i];
      this.form.choices = this.form.choices.filter(String);
    },
    setDate(ts) {
      if (this.selectedDate) {
        this.form[this.selectedDate] = ts;
      }
    },
    async handleSubmit() {
      this.loading = true;
      try {
        const {ipfsHash} = await this.send({
          token: this.namespace.address,
          type: 'proposal',
          payload: this.form
        });
        await this.$router.push({
          name: 'proposal',
          params: {
            key: this.key,
            id: ipfsHash
          }
        });
      } catch (e) {
        console.error(e);
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>

</style>
