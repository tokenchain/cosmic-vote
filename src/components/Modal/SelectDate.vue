<template>
  <ui-modal :open="open" @close="$emit('close')">
    <form @submit.prevent="handleSubmit" class="modal-body">
      <div v-if="step === 0">
        <h3 class="m-4 text-center">Select {{ selectedDate }} date UTC</h3>
        <div class="modal-body m-4">
          <ui-calendar v-model="input" class="mx-auto mb-2"/>
        </div>
      </div>
      <div v-else>
        <h3 class="m-4 mb-0 text-center">Select {{ selectedDate }} time UTC</h3>
        <div class="d-flex m-4 mx-auto" style="max-width: 160px;">
          <ui-button class="px-0 width-fit">
            <input v-model="form.h" max="24" class="input text-center col-5"/>
            <span class="col-2">:</span>
            <input v-model="form.m" max="60" class="input text-center col-5"/>
          </ui-button>
        </div>
      </div>
      <div class="p-4 overflow-hidden text-center border-top">
        <div class="col-6 float-left pr-2">
          <ui-button @click="$emit('close')" type="button" class="width-full">
            Cancel
          </ui-button>
        </div>
        <div class="col-6 float-left pl-2">
          <ui-button type="submit" class="width-full button--submit">
            <span v-if="step === 0">Next</span>
            <span v-else>Select</span>
          </ui-button>
        </div>
      </div>
    </form>
  </ui-modal>
</template>
<script>
import UiModal from "../Ui/Modal";
import UiButton from "../Ui/Button";
import UiCalendar from "../Ui/Calendar";

export default {
  name: "selectDate",
  components: {UiCalendar, UiButton, UiModal},
  props: {
    open: {
      type: Boolean,
      required: true,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: false
    },

    value: {
      type: String,
      required: true,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: ""
    },

    selectedDate: {
      type: String,
      required: true,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: false
    }
  },
  data() {
    return {
      input: '',
      step: 0,
      form: {
        h: '12',
        m: '00'
      }
    };
  },
  watch: {
    open() {
      this.step = 0;
      this.form = {h: '12', m: '00'};
      this.input = this.value;
    }
  },
  methods: {
    handleSubmit() {
      if (this.step === 0) return (this.step = 1);
      const [year, month, day] = this.input.split('-');
      let input = Date.UTC(year, month - 1, day, this.form.h, this.form.m, 0);
      input = new Date(input).getTime() / (1e3).toFixed();
      this.$emit('input', input);
      this.$emit('close');
    }
  }
};
</script>
