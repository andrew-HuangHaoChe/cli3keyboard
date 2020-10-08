<template>
  <div class="message-alert">
    <div class="alert alert-dismissible" :class="'alert-' + item.status" v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  },
  methods: {
    removeMessage (num) {
      this.$store.dispatch('removeMessage', num)
    }
  },
  computed: {
    messages () {
      return this.$store.state.messages
    }
  }
}
</script>
<style scope>
  .message-alert {
    position: fixed;
    max-width: 50%;
    top: 56px;
    right: 45%;
    z-index: 1100;
  }
  .alert-dismissible {
    min-height: 60px;
    padding-right: 50px;
    padding-top: 15px;
  }
</style>
