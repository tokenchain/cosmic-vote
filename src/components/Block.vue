<template>
  <div
      class="border-top border-bottom border-md rounded-0 rounded-md-2 mb-4 overflow-hidden"
  >
    <h4 v-if="title" class="px-4 py-3 border-bottom d-block bg-gray-dark">
      {{ title }}
      <counter v-if="counter" :counter="counter" class="ml-1"/>
    </h4>
    <div :class="!slim && 'p-4'">
      <slot/>
    </div>
  </div>
</template>

<script>
import Counter from "./Ui/Counter";

export default {
  components: {Counter},
  props: {
    title: {
      type: String,
      default: "",
      required: false
    },
    counter: {
      type: Number,
      default: 0,
      required: false
    },
    slim: {
      type: Boolean,
      default: true,
      required: false
    }

  },
  name: "block"
};
</script>
