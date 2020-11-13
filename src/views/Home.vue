<template>
  <v-container fluid>
    <v-row class="align-start">
      <v-col cols="3" v-for="(scene, index) of scenes" :key="index">
        <v-card style="height: 300px">
          <div class="d-flex justify-center align-center" style="height: 300px">
            <div>
              <div class="subtitle-1 text-center font-weight-bold">
                {{ scene.name }}
              </div>
              <div class="caption grey--text text-center text-wrap">
                修改时间{{ scene.update_time }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card style="height: 300px">
          <div
            class="d-flex justify-center align-center dark"
            style="height: 300px"
          >
            <div>
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark icon v-bind="attrs" v-on="on">
                    <v-icon x-large> fa-plus-circle</v-icon>
                  </v-btn>
                </template>
                <v-card dark max-height="600" elevation="2">
                  <v-card-title class="headline justify-center border--inner">
                    新建场景
                  </v-card-title>
                  <v-text-field
                    class="mx-6"
                    label="场景名"
                    v-model="scenceLabel"
                    hide-details
                    background-color="#131313"
                    solo
                  ></v-text-field>
                  <v-divider class="mt-4" />
                  <v-row style="height: 400px" class="py-0">
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
                                  {{ item.name }}</v-list-item-title
                                >
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
                          v-for="(item, index) of tabsMapping[types]"
                          :key="uniqueKey(index)"
                        >
                          <v-list-item>
                            <v-text-field
                              hide-details
                              class="yellow"
                              label="属性值"
                              :value="item.name"
                              background-color="#131313"
                              solo
                            ></v-text-field>
                            <v-list-item-action>
                              <v-btn icon @click="removeItem(index)">
                                <v-icon color="grey lighten-1"
                                  >fa-minus-circle</v-icon
                                >
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                        <v-list-item-action>
                          <v-btn text depressed @click="appendUserInput">
                            <v-icon class="">fa-plus-circle</v-icon>
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

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      dialog: false,
      scenes: [],
      scenceLabel: 'zia9j',
      types: 'positions',
      menus: [
        {
          key: 'positions',
          name: '场景地点'
        },
        {
          key: 'npc_alignments',
          name: '任务阵营'
        },
        {
          key: 'npc_types',
          name: '人物类型'
        },
        {
          key: 'npc_occupations',
          name: '人物职业'
        },
        {
          key: 'npc_genders',
          name: '人物性别'
        },
        {
          key: 'object_types',
          name: '物品类型'
        }
      ],
      tabsMapping: {
        positions: [{ name: '' }],
        npc_alignments: [{ name: '' }],
        npc_types: [{ name: '' }],
        npc_occupations: [{ name: '' }],
        npc_genders: [{ name: '' }],
        object_types: [{ name: '' }]
      }
    }
  },
  methods: {
    uniqueKey(index) {
      return `${this.types}-${index}`
    },
    fetchScenes() {
      this.axios
        .get('/?project_id=1', { headers: { api_id: '2' } })
        .then((res) => {
          this.scenes = res.data
        })
    },
    CreateScenes() {
      let payload = {
        id: 0,
        project_id: 1,
        name: this.scenceLabel,
        ...this.tabsMapping
      }
      this.dialog = false
      this.axios
        .post('/', payload, { headers: { api_id: '2' } })
        .then((res) => {
          console.log(res.data)
        })
    },
    switchTabs(key) {
      this.types = key
    },
    /*动态添加输入框*/
    appendUserInput() {
      this.tabsMapping[this.types].push({ name: '我是新来的' })
    },
    /*动态移除输入框*/
    removeItem(index) {
      if (this.tabsMapping[this.types].length > 1) {
        this.tabsMapping[this.types].splice(index, 1)
      }
    }
  },
  mounted() {
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
