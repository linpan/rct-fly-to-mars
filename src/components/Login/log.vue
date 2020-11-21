<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center" class="mt-12">
      <v-col cols="12" sm="8" md="4">
        <v-card class="mt-n12 py-12 px-12">
          <v-form ref="form">
            <v-text-field
              label="用户名"
              v-model="username"
              background-color="#131313"
              solo
            ></v-text-field>

            <v-text-field
              label="密码"
              min="8"
              v-model="password"
              required
              :type="showEye ? 'text' : 'password'"
              :append-icon="showEye ? 'fa-eye' : 'fa-eye-slash'"
              background-color="#131313"
              @click:append="showEye = !showEye"
              solo
              :messages="msg"
            ></v-text-field>
            <v-checkbox label="记住密码"></v-checkbox>
            <v-btn class="primary"  large block @click="userLogin">登陆</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Login',
  components: {},
  data: () => ({
    showEye: false,
    msg: '',
    username: '',
    password: '',
  }),
  computed: {
    ...mapGetters(['isLoggedIn'])
  },

  methods: {
    ...mapActions(['auth_Success', 'userOut']),
    switchLang() {
    },
    userLogin() {
      let payload = {username: this.username, password: this.password}
      this.axios.post('user/token/', payload).then(res => {
        const access_token = res.data.access
        const refresh_token = res.data.refresh
        const user = res.data.username
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('rct', user)
        this.axios.defaults.headers.common[
          'Authorization'
          ] = `JWT ${access_token}`
        this.auth_Success(access_token, user)
        this.$router.push('/')
      }).catch(err=>{
        this.msg= '检查用户名和密码是否正确'
        console.log(err)
      })
    }
  }
}
</script>
