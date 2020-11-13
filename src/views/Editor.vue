<template>
  <v-navigation-drawer absolute permanent right>
    <template v-slot:prepend>
      <v-list-item class="primary">
        <v-list-item-title class="font-weight-bold justify-center text-center">
          人物编辑
        </v-list-item-title>
      </v-list-item>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-subtitle>项目一</v-list-item-subtitle>
        </template>
        <v-list-item two-line link v-for="index of 4" :key="index">
          <v-list-item-content>
            <v-list-item-subtitle class="mb-1">位置</v-list-item-subtitle>
            <v-select
              :items="selectVal"
              label="Solo field"
              solo
              hide-details
            ></v-select>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-group>
        <template v-slot:activator>
          <v-list-item-subtitle>自定义属性</v-list-item-subtitle>
        </template>
        <v-list-item v-for="index of dynamicInput" :key="index" class="pt-2">
          <v-text-field label="属性" solo hide-details></v-text-field>
          <v-text-field
            label="属性值"
            class="ml-2"
            solo
            hide-details
          ></v-text-field>
          <v-list-item-action>
            <v-btn text>
              <v-icon left>fa-minus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-btn text @click="dynamicInput += 1">
              <v-icon left>fa-plus-circle</v-icon>
              新建参数
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
    </template>

    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'editor',
  data() {
    return {
      items: [
        { title: 'Home', icon: 'fa-home' },
        { title: 'My Account', icon: 'fa-water' },
        { title: 'Users', icon: 'fa-play' }
      ],
      selectVal: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      dynamicInput: 3
    }
  }
}
</script>

<style scoped></style>

<!--<v-row-->
<!--  class="fill-height"-->
<!--  no-gutters-->
<!--&gt;-->
