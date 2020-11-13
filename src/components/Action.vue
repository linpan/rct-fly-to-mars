<template>
  <div>
    <v-icon @click="fetchNPC" color="#FFA95A">fa-bolt</v-icon
    ><span class="px-2 font-weight-bold white--text">Action</span>
  </div>
</template>

<script>
export default {
  props: ['name'],
  methods: {
    fetchNPC() {
      alert(333)
      this.axios.get('?id=2', { headers: { api_id: '3' } }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style></style>
