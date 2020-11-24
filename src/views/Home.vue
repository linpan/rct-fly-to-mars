<template>
  <v-container fluid>
    <v-row class="align-start">
      <v-col cols="4" class="col-md-3" v-for="(scene, index) of scenes" :key="index">
        <v-card style="height: 300px" @click="fuck(scene.id)">
          <div style="position: absolute;" class="primary  rounded-r-xl pa-1">训练中...</div>
          <div class="d-flex justify-center align-center" style="height: 300px">
            <div>
              <div class="title text-center font-weight-bold">
                {{ scene.name }}
              </div>
              <div class="caption grey--text text-center text-wrap">
                修改时间{{ scene.updated_at }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <div
            class="d-flex justify-center align-center dark"
            style="height: 300px"
          >
            <div>
              <v-dialog v-model="dialog" persistent max-width="550px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark icon v-bind="attrs" v-on="on">
                    <v-icon x-large>mdi-plus-circle-outline</v-icon>
                  </v-btn>
                </template>
                <v-card max-height="680" elevation="1">
                  <v-card-title class="subtitle-1 justify-center border--inner">
                    新建场景
                  </v-card-title>
                  <div class="mx-6 caption py-1">场景名</div>
                  <v-text-field
                    class="mx-6"
                    v-model="sceneLabel"
                    hide-details
                    background-color="#131313"
                    solo
                  ></v-text-field>
                  <v-divider class="mt-4" />
                  <v-row style="height: 400px" class="py-1">
                    <v-col cols="5" class="pr-0">
                      <v-card class="mx-auto overflow-y-auto" tile height="380">
                        <v-list dense>
                          <v-list-item-group color="primary">
                            <v-list-item
                              v-for="(item, index) in menus"
                              :key="index"
                              @click="switchTabs(item.key)"
                            >
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ item.name }}
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-card>
                    </v-col>
                    <v-col cols="7" class="ml-0 pl-0">
                      <v-card class="mx-auto overflow-y-auto" height="380" tile>
                        <v-list
                          dark
                          v-for="(tab, index) of tabForm[types]"
                          :key="uniqueKey(index)"
                        >
                          <div class="mx-6 caption pb-1">
                            {{ findTabLabel(types) }}{{ index + 1 }}
                          </div>
                          <v-list-item>
                            <v-text-field
                              hide-details
                              class="yellow"
                              v-model="tab.name"
                              background-color="#131313"
                              solo
                            ></v-text-field>
                            <v-list-item-action>
                              <v-btn icon @click="removeItem(index)">
                                <v-icon color="grey lighten-1"
                                  >mdi-minus
                                </v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                        <v-list-item-action>
                          <v-btn text depressed @click="appendUserInput">
                            <v-icon class="mr-2">mdi-plus-circle-outline</v-icon>
                            新建
                          </v-btn>
                        </v-list-item-action>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn large @click="dialog = false">
                      取消
                    </v-btn>
                    <v-btn
                      large
                      color="primary darken-1"
                      @click="CreateScenes()"
                    >
                      保存
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

import {mapActions} from "vuex";

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      dialog: false,
      scenes: [],
      sceneLabel: '冰火世界 ',
      types: 'positions',
      menus: [
        {
          key: 'location',
          name: '场景地点'
        },
        {
          key: 'team',
          name: '任务阵营'
        },
        {
          key: 'role',
          name: '人物类型'
        },
        {
          key: 'job',
          name: '人物职业'
        },
        {
          key: 'gender',
          name: '人物性别'
        },
        {
          key: 'item',
          name: '物品类型'
        }
      ],
      tabForm: {
        location: [{ name: '' }],
        team: [{ name: '' }],
        role: [{ name: '' }],
        job: [{ name: '' }],
        gender: [{ name: '' }],
        item: [{ name: '' }]
      }
    }
  },
  methods: {
    ...mapActions(['setAppBar']),
    findTabLabel(key) {
      const label = this.menus.find((element) => element.key === key)
      return label.name
    },
    uniqueKey(index) {
      return `${this.types}-${index}`
    },
    fetchScenes() {
      this.axios.get('/scene').then((res) => {
        this.scenes = res.data
        console.log(this.scenes)
      })
    },
    CreateScenes() {
      let payload = {
        name: this.sceneLabel,
        ...this.tabForm
      }
      console.log(JSON.stringify(payload))
      this.axios.post('/scene', payload).then((res) => {
        this.scenes.push(res.data)
        this.dialog = false
      })
    },
    switchTabs(key) {
      this.types = key
    },
    /*动态添加输入框*/
    appendUserInput() {
      this.tabForm[this.types].push({ name: null })
    },
    /*动态移除输入框*/
    removeItem(index) {
      this.tabForm[this.types].splice(index, 1)
    },
    fuck(index){
      this.$router.push(`/draw?id=${index}`)
    }
  },
  mounted() {
    this.setAppBar(true)
    this.fetchScenes()
    // this.CreateScenes();
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
