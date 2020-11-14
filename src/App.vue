<template>
  <v-app>
    <v-app-bar app dark height="48">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark depressed v-bind="attrs" v-on="on">
            <v-icon>fa-bars</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item  to="/">
            <v-list-item-title>返回主页</v-list-item-title>
          </v-list-item>
          <v-list-item @click="1">
            <v-list-item-title>世界设置</v-list-item-title>
          </v-list-item>
          <v-list-item @click="2">
            <v-list-item-title>说明文档</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn large @click="spawnNode('Character')">
        <v-icon left size="26" class="mr-2">fa-user</v-icon> 添加人物
      </v-btn>

      <v-btn depressed large @click="spawnNode('Objects')">
        <v-icon left size="26" class="mr-2">fa-cubes</v-icon> 添加对象
      </v-btn>
      <v-btn depressed large @click="spawnNode('Action')">
        <v-icon left size="26" class="mr-2">fa-bolt</v-icon> 添加动作
      </v-btn>
      <v-btn depressed large @click="spawnNode('AF')">
        <v-icon left size="26" class="mr-2">fa-square-root-alt</v-icon> 动作效果
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="primary" depressed> 保存</v-btn>
      <v-btn class="ml-2 primary" depressed> 提交训练</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    show4: false,
    password: 'Password'
  }),
  methods: {
    switchLang() {},
    spawnNode(nodeType) {
      this.$bus.emit('spawnNode', { nodeType: nodeType })
    }
  }
}
</script>
