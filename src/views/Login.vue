<template>
  <v-main>
    <log></log>
  </v-main>
</template>

<script>
import log from '@/components/Login/log'
import {mapActions} from "vuex";

export default {
  name: 'Login',
  components: { log },
  methods: {
    ...mapActions(['setAppBar']),
  },
  mounted() {
    this.setAppBar(true)
  }
}
</script>

<style scoped></style>
