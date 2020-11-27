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
        <v-list subheader>
          <v-list-item dense  link>
            <v-list-item-title @click="changeLocale('en')">{{$t('locale.en')}}</v-list-item-title>
          </v-list-item>
          <v-list-item dense  link>
            <v-list-item-title @click="changeLocale('zhHans')">{{$t('locale.zhHans')}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    </template>
    <template v-else>
    <v-app-bar  app dark height="48" absolute >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn-toggle  group color="primary">
      <v-btn large depressed @click="spawnNode('Character')">
        <v-icon left class="mr-2" size="28">mdi-account</v-icon> 角色
      </v-btn>

      <v-btn depressed large @click="spawnNode('Objects')">
        <v-icon left  class="mr-2" size="28">mdi-cube-outline</v-icon> 物品
      </v-btn>
      <v-btn depressed large @click="spawnNode('Action')">
        <v-icon left class="mr-2" size="28">mdi-flash</v-icon> 动作
      </v-btn>
      <v-btn depressed large  @click="spawnNode('AF')">
        <v-icon left  class="mr-2" size="28">mdi-function</v-icon> 效果
      </v-btn>
      </v-btn-toggle>
      <v-spacer/>
      <v-subheader class="white--text">{{ globalScene.name }}</v-subheader>
      <v-spacer/>
      <v-btn class="primary" depressed @click="saveNode"> 保存</v-btn>
      <v-btn class="ml-2 primary" depressed> 提交训练</v-btn>
    </v-app-bar>
<!--   坐抽屉-->
      <v-navigation-drawer
        v-model="drawer"
        temporary
        absolute
        dark
      >
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Elon Musk</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item link to="/">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>返回主页</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-supervisor-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>世界设置</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link >
            <v-list-item-icon>
              <v-icon>mdi-help-box</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>文档说明</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="logout">
              Logout
            </v-btn>
          </div>
        </template>

      </v-navigation-drawer>
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
    drawer: false,
  }),
  computed: {
   ...mapGetters(['isAppBar', 'isLoggedIn', 'globalScene'])
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
    changeLocale (index) {
        if (index ==='en')
        {this.$i18n.locale = 'en'}
        else {
          this.$i18n.locale = 'zhHans'
        }
    },
  }
}
</script>
