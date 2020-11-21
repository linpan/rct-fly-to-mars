<template>
  <v-app >
    <template v-if="isAppBar">
    <v-app-bar app dark absolute  height="48">
      <div class="d-flex align-center flex-nowrap">
        <v-img
          alt="rct Logo"
          class="shrink mr-2"
          contain
          src="./assets/m-log.svg"
          transition="scale-transition"
          width="30"
        />

        <v-img
          alt="Morpheus Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/morpheus.svg"
          width="100"
        />
      </div>
      <v-spacer></v-spacer>
      <v-menu offset-y open-on-hover v-if="isLoggedIn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            depressed
            v-bind="attrs"
            v-on="on"
          >
            <span class="text-lowercase">{{getUsername()}}</span>
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list v-for="i of 2" :key="i" subheader>
          <v-list-item dense  link>
            <v-list-item-title>中文</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!--global language-->
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            depressed
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list v-for="(lang, index) of locals" :key="index" subheader>
          <v-list-item dense  link>
            <v-list-item-title @click="changeLocale">{{lang.label}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    </template>
    <template v-else>
    <v-app-bar  app dark height="48" absolute >
      <v-btn large depressed @click="spawnNode('Character')">
        <v-icon left class="mr-2" size="28">mdi-account</v-icon> 角色
      </v-btn>

      <v-btn depressed large @click="spawnNode('Objects')">
        <v-icon left  class="mr-2" size="28">mdi-cube-outline</v-icon> 物品
      </v-btn>
      <v-btn depressed large @click="spawnNode('Action')">
        <v-icon left class="mr-2" size="28">mdi-flash</v-icon> 动作
      </v-btn>
      <v-btn depressed large @click="spawnNode('AF')">
        <v-icon left  class="mr-2" size="28">mdi-function</v-icon> 动作效果
      </v-btn>
      <v-spacer/>
      <v-btn class="primary" depressed @click="saveNode"> 保存</v-btn>
      <v-btn class="ml-2 primary" depressed> 提交训练</v-btn>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark depressed  v-bind="attrs" v-on="on">
            <v-icon >mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/">
            <v-list-item-title>返回主页</v-list-item-title>
          </v-list-item>
          <v-list-item @click="1">
            <v-list-item-title>世界设置</v-list-item-title>
          </v-list-item>
          <v-list-item @click="2">
            <v-list-item-title>说明文档</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>退出登陆</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    </template>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app >
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',

  components: {},

  data: () => ({
    passwordt: 'Password',
    locals: [{'label': 'Chinese'}, {'label':'English'}]
  }),
  computed: {
   ...mapGetters(['isAppBar', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(['userOut']),
    logout() {
      this.userOut()
      this.$router.push('/login')
    },
    getUsername(){
        return localStorage.getItem('rct')
    },

    spawnNode(nodeType) {
      this.$bus.emit('spawnNode', { nodeType: nodeType })
    },
    saveNode(){
      this.$bus.emit('saveNode')
    },
    changeLocale () {
      this.$vuetify.lang.current = 'zhHans'
    },
  }
}
</script>
