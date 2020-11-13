<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="mt-n12 py-12 px-12">
          <v-form v-model="valid" ref="form">
            <v-text-field
              label="用户名"
              background-color="#131313"
              solo
            ></v-text-field>

            <v-text-field
              label="密码"
              min="8"
              required
              :type="show4 ? 'text' : 'password'"
              :append-icon="show4 ? 'fa-eye' : 'fa-eye-slash'"
              background-color="#131313"
              @click:append="show4 = !show4"
              solo
            ></v-text-field>
            <v-checkbox label="记住密码"></v-checkbox>
            <v-btn class="primary col-12">登陆</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  components: {},

  data: () => ({
    show4: false,
    password: 'Password'
  }),
  methods: {
    switchLang() {}
  }
}
</script>
