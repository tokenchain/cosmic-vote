<template>
  <section id="indexbox" class="container indexcolor">
    <div class="backee home">
      <slot name="background"> background image here</slot>
    </div>
    <div class="toplayer">
      <div v-if="step===0" class="box-wrap">
        <nuxt-link to="#whitepaper" class="box" @click.native="login">
          <p>LOGIN</p>
        </nuxt-link>
        <nuxt-link to="#instructions" class="box" @click.native="instr">
          <p>Help About</p>
        </nuxt-link>
      </div>
      <div v-else-if="step===1" class="box-wrap">
      </div>
      <div v-else-if="step===2" class="box-wrap">
      </div>
      <div v-else-if="step===4" class="box-wrap">
      </div>
      <div class="box-wrap topmessage">
        {{ top_message }}
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      top_message: ""
    }
  },
  methods: {
    login() {
    },
    instr() {
    }
  }
}
</script>
<style lang="scss">
</style>
