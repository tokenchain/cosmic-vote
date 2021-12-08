<template>
  <div :class="slim ? 'px-0 px-md-4' : 'px-4'" class="container-lg mx-auto">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "daoContainer",
  props: {
    slim: {
      type: Boolean,
      default: true,
      required: false
    }

  }
};
</script>
