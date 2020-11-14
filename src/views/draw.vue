<template>
  <div id="drawflow">
    <div
      class="pa-0 ma-0"
      v-if="drawerForCharacter && currentSelected.class === 'Character'"
    >
      <v-navigation-drawer
        v-model="drawerForCharacter"
        absolute
        permanent
        right
      >
        <template v-slot:prepend>
          <v-list-item class="mx-0 px-0">
              <v-row align="center"  justify="center" class="primary">
                <v-col cols="6">
                  <v-text-field hide-details
                                class="font-weight-bold"
                                background-color="blue"
                                value="Character"
                                flat
                                solo
                                dense
                                @change="dynamicCharacterLabel"
                                ></v-text-field>
                </v-col>
              </v-row>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>基本属性</v-list-item-subtitle>
            </template>
            <v-list-item two-line link>
              <v-list-item-content>
                <v-list-item-subtitle class="mb-1">
                  人物阵营
                </v-list-item-subtitle>
                <v-select
                  :items="npc_alignments"
                  label=""
                  v-model="selectedTeam"
                  item-text="name"
                  solo
                  return-object
                  hide-details
                ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line link>
              <v-list-item-content>
                <v-list-item-subtitle class="mb-1">
                  人物类型
                </v-list-item-subtitle>
                <v-select
                  :items="npc_types"
                  label=""
                  v-model="selectedTypes"
                  item-text="name"
                  solo
                  return-object
                  hide-details
                ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line link>
              <v-list-item-content>
                <v-list-item-subtitle class="mb-1">
                  人物职业
                </v-list-item-subtitle>
                <v-select
                  :items="npc_occupations"
                  label=""
                  v-model="selectedOccupations"
                  item-text="name"
                  solo
                  return-object
                  hide-details
                ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line link>
              <v-list-item-content>
                <v-list-item-subtitle class="mb-1">
                  人物性别
                </v-list-item-subtitle>
                <v-select
                  :items="npc_genders"
                  label=""
                  v-model="selectedGenders"
                  item-text="name"
                  solo
                  return-object
                  hide-details
                ></v-select>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-divider/>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>自定义属性</v-list-item-subtitle>
            </template>
            <v-list-item
              v-for="(param, index) of wrappedCharacterParam"
              :key="index"
              class="pt-2"
            >
              <v-list-item-subtitle class="col-5">
                {{ param.name }}
              </v-list-item-subtitle>
              <v-text-field
                label="属性值"
                solo
                v-model="wrappedCharacterParam[index].value"
                dense
                hide-details
              ></v-text-field>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-btn text @click="objectCandidatedialog = !objectCandidatedialog">
                  <v-icon left>fa-plus-circle</v-icon>
                  新建参数
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </template>
        <v-divider></v-divider>
      </v-navigation-drawer>
    </div>

    <div
      class="pa-0 ma-0"
      v-if="drawerForObjects && currentSelected.class === 'Objects'"
    >
      <v-navigation-drawer v-model="drawerForObjects" absolute permanent right>
        <template v-slot:prepend>
          <v-list-item class="primary">
            <v-row align="center"  justify="center" class="primary">
              <v-col cols="6">
                <v-text-field hide-details
                              class="font-weight-bold"
                              background-color="blue"
                              label="对象编辑"
                              flat
                              solo
                              dense
                              @change="dynamicCharacterLabel"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>基本属性</v-list-item-subtitle>
            </template>
            <v-list-item two-line link>
              <v-list-item-content>
                <v-list-item-subtitle class="mb-1">
                  物品类型
                </v-list-item-subtitle>
                <v-select
                  :items="objectTypes"
                  label=""
                  v-model="objectSelect"
                  item-text="name"
                  solo
                  return-object
                  hide-details
                ></v-select>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-divider/>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>自定义属性</v-list-item-subtitle>
            </template>
            <v-list-item
              v-for="(param, index) of wrappedObjectParam"
              :key="index"
              class="pt-2"
            >
              <v-list-item-subtitle class="col-5">
                {{ param.name }}
              </v-list-item-subtitle>
              <v-text-field
                label="属性值"
                solo
                v-model="wrappedObjectParam[index].value"
                dense
                hide-details
              ></v-text-field>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-btn text @click="newParamsdialog = !newParamsdialog">
                  <v-icon left>fa-plus-circle</v-icon>
                  新建参数
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
          <v-divider/>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>搭配动作</v-list-item-subtitle>
            </template>
            <v-list-item
              v-for="(action, index) of multipleAction"
              :key="index"
              class="pt-2"
              @click="1"
            >
              <v-list-item-subtitle>{{ action.name }}</v-list-item-subtitle>
              <v-divider />
              <v-list-item-action>
                <v-btn text>
                  <v-icon left>fa-minus</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-btn text @click="candidateAction">
                  <v-icon left>fa-plus-circle</v-icon>
                  添加动作
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </template>
        <v-divider></v-divider>
      </v-navigation-drawer>
    </div>
    <div
      class="pa-0 ma-0"
      v-if="drawerForAction"
    >
      <v-navigation-drawer v-model="drawerForAction" absolute permanent right>
        <template v-slot:prepend>
          <v-list-item class="primary">
            <v-row align="center"  justify="center" class="primary">
              <v-col cols="6">
                <v-text-field hide-details
                              class="font-weight-bold"
                              background-color="blue"
                              label="动作编辑"
                              flat
                              solo
                              dense
                              @change="dynamicCharacterLabel"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>基本属性</v-list-item-subtitle>
            </template>
            <v-list-item>
                <v-list-item-subtitle class="mb-1">
                  及物动作
                </v-list-item-subtitle>
                <v-checkbox v-model="actionCheckbox">
                </v-checkbox>
            </v-list-item>
            <v-divider/>
            <v-list-item class="my-2">
              <v-list-item-subtitle>
                动作前摇
              </v-list-item-subtitle>
              <v-text-field solo
                            hide-details
                            v-model="preActionDuration"
              >
              </v-text-field>
            </v-list-item>
            <v-divider/>
            <v-list-item class="my-2">
              <v-list-item-subtitle>
                动作后摇
              </v-list-item-subtitle>
              <v-text-field solo
                            hide-details
                            v-model="postActionDuraiton"
              >
              </v-text-field>
            </v-list-item>
            <v-divider/>
            <v-list-item  class="my-2">
              <v-list-item-subtitle>
                动作持续
              </v-list-item-subtitle>
              <v-text-field solo
                            hide-details
                            v-model="actionDuration"
              >
              </v-text-field>
            </v-list-item>
            <v-divider/>
          </v-list-group>
          <v-divider/>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>自定义属性</v-list-item-subtitle>
            </template>
            <v-list-item
              v-for="(param, index) of wrappedActionParam"
              :key="index"
              class="pt-2"
            >
              <v-list-item-subtitle class="col-5">
                {{ param.name }}
              </v-list-item-subtitle>
              <v-text-field
                label="属性值"
                solo
                v-model="wrappedActionParam[index].value"
                dense
                hide-details
              ></v-text-field>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-btn text @click="actionParamsdialog = !actionParamsdialog">
                  <v-icon left>fa-plus-circle</v-icon>
                  新建参数
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
          <v-divider/>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>搭配物品</v-list-item-subtitle>
            </template>
            <v-list-item
              v-for="(obj, index) of actionAssociatedObject"
              :key="index"
              class="pt-2"
              @click="1"
            >
              <v-list-item-subtitle>{{ obj.name }}</v-list-item-subtitle>
              <v-divider />
              <v-list-item-action>
                <v-btn text>
                  <v-icon left>fa-minus</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider/>
            <v-list-item>
              <v-list-item-action>
                <v-btn text @click="objectCandidatedialog = !objectCandidatedialog">
                  <v-icon left>fa-plus-circle</v-icon>
                  添加物品
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </template>
        <v-divider></v-divider>
      </v-navigation-drawer>
    </div>
    <div
      class="pa-0 ma-0"
      v-if="drawerForAF"
    >
      <v-navigation-drawer v-model="drawerForAF" absolute permanent right>
        <template v-slot:prepend>
          <v-list-item class="primary">
            <v-list-item-title
              class="font-weight-bold justify-center text-center"
            >
              AF
            </v-list-item-title>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>动作效果</v-list-item-subtitle>
            </template>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-subtitle class="mb-1">
                  动作源
                </v-list-item-subtitle>
                <v-select
                  :items="afActionSource"
                  label=""
                  v-model="afActionSourceSelect"
                  item-text="name"
                  solo
                  return-object
                  hide-details
                ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item link class="my-2">
              <v-list-item-content>
                <v-list-item-subtitle class="mb-1">
                  目标
                </v-list-item-subtitle>
                <v-select
                  :items="afActionTarget"
                  v-model="afActionTargetSelect"
                  item-text="name"
                  solo
                  return-object
                  hide-details
                ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-subtitle class="mb-1">
                  条件
                </v-list-item-subtitle>
                <v-textarea
                  solo
                  dense
                  v-model="afCondition"
                  hide-details
                ></v-textarea>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-subtitle class="mb-1">
                  结果
                </v-list-item-subtitle>
                <v-textarea
                  solo
                  v-model="afEffects"
                  dense
                  hide-details
                ></v-textarea>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
          </v-list-group>
        </template>
        <v-divider></v-divider>
      </v-navigation-drawer>
    </div>
    <v-dialog
      v-model="objectdialog"
      persistent
      max-width="400px"
      @click="fetchActionSelect"
    >
      <v-card dark>
        <v-card-title class="justify-center opacity-25">
          <span class="subtitle-1">新建参数</span>
        </v-card-title>
        <v-divider/>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :items="actionSelect"
                  label="动作"
                  item-text="name"
                  return-object
                  multiple
                  filled
                  v-model="multipleActionSelect"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="objectdialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="appendCandiateAction">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!--    人物参数对话框-->
    <v-dialog
      v-model="characterParamsdialog"
      dark
      max-width="400px"
      @click="fetchActionSelect"
    >
      <v-card>
        <v-card-title class="justify-center opacity-25">
          <span class="subtitle-1">新建参数</span>
        </v-card-title>
        <v-divider/>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="grey--text mb-1">参数名</div>
                <v-text-field
                  dark
                  v-model="paramName"
                  required
                  solo
                  hide-details
                  background-color="#181818"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="grey--text mb-1">参数值</div>
                <v-text-field
                  background-color="#181818"
                  required
                  hide-details
                  solo
                  v-model="paramValue"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="grey--text mb-1">参数类型</div>
                <v-select
                  :items="['int', 'float', 'string']"
                  label="值类型"
                  required
                  solo
                  hide-details
                  background-color="#181818"
                  v-model="paramType"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  @click="characterParamsdialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1"  @click="wrappedCharacterToItems">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    object 自定义参数-->
    <v-dialog
      v-model="newParamsdialog"
      persistent
      max-width="400px"
      @click="fetchActionSelect"
    >
      <v-card>
        <v-card-title class="justify-center opacity-25">
          <span class="subtitle-1">新建参数</span>
        </v-card-title>
        <v-divider/>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="grey--text mb-1">参数名</div>
                <v-text-field
                  v-model="paramName"
                  required
                  solo
                  hide-details
                  background-color="#181818"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="grey--text mb-1">参数值</div>
                <v-text-field
                  required
                  v-model="paramValue"
                  solo
                  hide-details
                  background-color="#181818"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="grey--text mb-1">参数类型</div>
                <v-select
                  :items="['int', 'float', 'string']"
                  required
                  v-model="paramType"
                  solo
                  hide-details
                  background-color="#181818"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  @click="newParamsdialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1"  @click="wrappedObjectParam">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!--    动作自定义参数-->
    <v-dialog
      v-model="actionParamsdialog"
      persistent
      max-width="400px"
      @click="fetchActionSelect"
    >
      <v-card>
        <v-card-title class="justify-center opacity-25">
          <span class="subtitle-1">新建参数</span>
        </v-card-title>
        <v-divider/>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="grey--text mb-1">参数名</div>
                <v-text-field
                  v-model="actionParamName"
                  required
                  solo
                  hide-details
                  background-color="#181818"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="grey--text mb-1">参数值</div>
                <v-text-field
                  required
                  v-model="acitonParamValue"
                  hide-details
                  solo
                  background-color="#181818"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="grey--text mb-1">参数类型</div>
                <v-select
                  :items="['int', 'float', 'string']"
                  label="值类型"
                  required
                  v-model="actionParamType"
                  solo
                  hide-details
                  background-color="#181818"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  @click="actionParamsdialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1"  @click="wrappedParamToAction">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!--    候选物品-->
    <v-dialog
      v-model="objectCandidatedialog"
      persistent
      max-width="600px"
      @click="fetchActionSelect"
    >
      <v-card>
        <v-card-title>
          <span class="headline">候选物品</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :items="actionAssociatedObject"
                  label="物品"
                  item-text="name"
                  return-object
                  multiple
                  filled
                  dense
                  v-model="multipleObjectSelect"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="objectCandidatedialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="appendCandiateObjects">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import Drawflow from 'drawflow'
import Action from '@/components/Action'
import Character from '@/components/Character'
import Objects from '@/components/Objects'
import AF from '@/components/AF'

export default {
  name: 'draw',
  data() {
    return {
      drawerForAF:false,
      drawerForObjects: false,
      drawerForAction: false,
      drawerForCharacter: false,
      drawer: false,
      actionCheckbox:true,
      preActionDuration: 2000, /*action duration*/
      postActionDuraiton: 2000,
      actionDuration: 1000,
      wrappedActionParam:[],
      wrappedCharacterParam: [],
      actionParamsdialog: false,
      objectCandidatedialog:false,
      characterParamsdialog: false,
      actionParamType: 'int',
      acitonParamValue: 1,
      actionParamName: 'health',
      actionAssociatedObject:[],
      multipleObjectSelect:null,
      actionAssociatedObjectValue:[],
      paramType: 'int',
      paramValue: 0,
      paramName: 'height',
      objectdialog: false,
      newParamsdialog: false,
      wrappedObjectParam: [],
      //af
      afActionSource:[],
      afActionTarget:[],
      afCondition: '',
      afEffects: '',
      afActionSourceSelect:null,
      afActionTargetSelect:null,
      editor: null,
      storgeNode: {} /*保存节点信息及关联*/,
      currentNodeId: 0,
      npcs: [],
      selectedTeam: null,
      objectTypes: [] /*物品类型*/,
      multipleActionSelect: [],
      multipleAction: [],
      actionSelect: null,
      objectSelect: null,
      selectedTypes: null,
      selectedOccupations: null,
      selectedGenders: null,
      npcValues: [],
      selectVal: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      dynamicInput: 3,
      npc_alignments: [] /*阵营*/,
      npc_types: [] /*类型*/,
      npc_occupations: [] /*职业*/,
      npc_genders: [] /*性别*/
    }
  },
  computed: {
    ...mapGetters(['nodes', 'currentSelected', 'created'])
  },
  mounted() {
    console.log(this.nodes)
    const id = document.getElementById('drawflow')
    this.editor = new Drawflow(id, Vue)
    this.editor.start()
    const props = {}
    const options = { draggable_inputs: true }
    this.editor.registerNode('Action', Action, props, options)
    this.editor.registerNode('Character', Character, props, options)
    this.editor.registerNode('Objects', Objects, props, options)
    this.editor.registerNode('AF', AF, props, options)
    /*drawflow events*/
    // const data = {}
    // this.editor.addNode('character', 1, 1, 200, 300, 'character', data, 'Character', 'vue');
    // this.editor.addNode('objects', 1, 1, 200, 400, 'objects', data, 'Objects', 'vue');
    /* 获得后台数据*/
    this.editor.on('nodeSelected', this.asyncState)
    // this.editor.addNode('af', 1, 1, 440, 300, 'af', data, 'AF', 'vue')
  },
  methods: {
    ...mapActions(['setNode', 'setSelected', 'setCreated']),

    dynamicCharacterLabel(label){
      const node = this.currentSelected
      document.querySelector(`.drawflow .parent-node #node-${node.nodeId} span`).innerHTML=label;
    },
    wrappedParamToItems() {
      this.wrappedObjectParam.push({
        name: this.paramName,
        value: this.paramValue,
        type: this.paramType
      })
      this.newParamsdialog = false
    },
    wrappedCharacterToItems(){
      this.wrappedCharacterParam.push({
        name: this.paramName,
        value: this.paramValue,
        type: this.paramType
      })
      this.characterParamsdialog =false
    },
    wrappedParamToAction() {
      this.wrappedActionParam.push({
        name: this.actionParamName,
        value: this.acitonParamValue,
        type: this.actionParamType
      })
      this.actionParamsdialog = false
    },
    /*选中节点的处理*/
    asyncState(id) {
      const node = this.nodes.filter((word) => word.nodeId === parseInt(id))[0]
      /*第一步根据db_id是否存在来取得数据*/
      this.setSelected(node)
      const cls = node.class
      switch (cls) {
        case 'Character': {
          this.drawerForCharacter = true
          this.drawerForAction =false
          this.drawerForObjects = false
          this.drawerForAF = false
          if (!node.db_id) {
            /*创建*/
            this.fetchScene(node)
            break
          } else {
            /* 根据id 来更新*/
            console.log('i have node db_id')
            this.reloadingNPC(node)
            break
          }
        }
        case 'Objects': {
          this.drawerForObjects = true
          this.drawerForCharacter = false
          this.drawerForAction = false
          this.drawerForAF = false
          if (!node.db_id) {
            this.fetchObjectScence()
            break
          } else {
            this.reloadingObject(node)
            break
          }
        }
        case 'Action': {
          this.drawerForAction = true
          this.drawerForCharacter = false
          this.drawerForObjects = false
          this.drawerForAF = false
            this.reloadingAction(node)
            break

        }
        case 'AF': {
          this.drawerForAF = true
          this.drawerForCharacter = false
          this.drawerForAction = false
          this.drawerForObjects = false
          this.reloadingAF(node)
          break

        }
        default: {
          break
        }
      }
    },
    reloadingNPC(node) {
      this.axios
        .get(`?id=${node.db_id}`, { headers: { api_id: '3' } })
        .then((res) => {
          console.log('npc detail', res.data)
          this.selectedTeam = res.data.alignment
          this.selectedTypes = res.data.npc_type
          this.selectedOccupations = res.data.occupation
          this.selectedGenders = res.data.gender
        })
    },
    reloadingObject(node) {
      console.log(node)
      console.log('none...更新物品')
      this.axios.get(`?id=1`, { headers: { api_id: '4' } }).then((res) => {
        this.wrappedObjectParam = res.data.properties
        this.objectSelect = res.data.object_type
        this.multipleAction = res.data.actions
      })
    },
    reloadingAction(node){
      console.log(node)
      console.log('none...动作')

      this.axios.get(`?id=1`, { headers: { api_id: '5' } }).then((res) => {
        console.log(res.data, 'aciton post')
        this.actionAssociatedObject = res.data.objects
      })
    },
    reloadingAF(){
      this.axios.get(`?action_id=1&object_id=1`, { headers: { api_id: '6' } }).then((res) => {
        console.log(res.data, 'reloading af')
        //todo 过滤afActionSource
        this.afActionSourceSelect = { id: 'Florida', name: 'FL' }
        this.afActionTargetSelect ={ id: 'Florida', name: 'FL' }
        console.log(this.afActionTargetSelect)
        this.afCondition = res.data.condition
        this.afEffects = res.data.effect
      })
    },
    drawNode(nodeType) {
      let nodeLabel = nodeType.nodeType
      switch (nodeLabel) {
        case 'Character': {
          const data = { api_id: 3 }
          let nodeId = this.editor.addNode(
            'character',
            1,
            1,
            100,
            100,
            'character',
            data,
            'Character',
            'vue'
          )
          this.setNode({
            nodeId: nodeId,
            api_id: 3,
            db_id: null,
            class: 'Character'
          })
          console.log(this.storgeNode)
          break
        }

        case 'Objects': {
          const data = { api_id: 4 }
          let nodeId = this.editor.addNode(
            'objects',
            1,
            1,
            100,
            150,
            'objects',
            data,
            'Objects',
            'vue'
          )
          this.setNode({
            nodeId: nodeId,
            api_id: 4,
            db_id: null,
            class: 'Objects'
          })
          console.log('物体')
          break
        }
        case 'Action': {
          const data = { api_id: 5 }
          let nodeId = this.editor.addNode(
            'action',
            1,
            1,
            100,
            200,
            'action',
            data,
            'Action',
            'vue'
          )
          this.setNode({
            nodeId: nodeId,
            api_id: 5,
            db_id: null,
            class: 'Action'
          })
          console.log('动作')
          break
        }
        case 'AF': {
          const data = { api_id: 6 }
          let nodeId = this.editor.addNode(
            'af',
            1,
            1,
            300,
            300,
            'af',
            data,
            'AF',
            'vue'
          )
          this.setNode({
            nodeId: nodeId,
            api_id: 5,
            db_id: null,
            class: 'AF'
          })
          console.log('AF')
          break
        }
      }
    },
    updateCharacter() {
      /*更新和保存npc对象的创建*/
      let node = this.currentSelected
      let id = node.db_id || 0
      let payload = {
        scene_id: 1,
        name: '老王',
        id: id,
        alignment_id: this.selectedTeam.id,
        type_id: this.selectedTypes.id,
        occupation_id: this.selectedOccupations.id,
        gender_id: this.selectedGenders.id
      }
      this.axios
        .post('/', payload, { headers: { api_id: '3' } })
        .then((res) => {
          this.setNode({
            nodeId: node.nodeId,
            api_id: node.api_id,
            db_id: res.data.id,
            class: node.class
          })
          console.log('角色', res.data)
        })
    },
    updateObjects() {
      let node = this.currentSelected
      let actionId = this.multipleAction.map((action) => ({ id: action.id }))
      let payload = {
        scene_id: 1,
        name: '大炮',
        object_type_id: this.objectSelect.id,
        properties: this.wrappedObjectParam,
        action: actionId
      }
      this.axios
        .post('/', payload, { headers: { api_id: '4' } })
        .then((res) => {
          this.setNode({
            nodeId: node.nodeId,
            api_id: node.api_id,
            db_id: res.data.id,
            class: node.class
          })
          console.log('物品', res.data)
        })
    },
    updateAction(){
      let node = this.currentSelected
      let actionId = this.multipleAction.map((action) => ({ id: action.id }))
      let id = node.db_id || 0
      let payload = {
        scene_id: 1,
        id:id,
        attack_point:this.preActionDuration,
        attack_backswing:this.postActionDuraiton,
        attack_duration:this.actionDuration,
        name: '杀人哦啊',
        objects: this.actionAssociatedObject,
      }
      console.log(payload, actionId, '你丫的')
    },
    fetchScene(node) {
      this.axios.get('/?id=1', { headers: { api_id: '2' } }).then((res) => {
        this.npc_alignments = res.data['npc_alignments']
        this.npc_types = res.data['npc_types']
        this.npc_occupations = res.data['npc_occupations']
        this.npc_genders = res.data['npc_genders']
        const nameList = Object.values(this.npc_alignments).map(
          (item) => item.name
        )
        console.log(nameList, node)
        // this.setNode({nodeId: node.nodeId, api_id: node.api_id, db_id: 12})
      })
    },
    fetchObjectScence(node) {
      this.axios.get('/?id=1', { headers: { api_id: '2' } }).then((res) => {
        this.objectTypes = res.data['object_types']
        console.log(node)
      })
    },
    /*获得物品列表*/
    fetchActionScence(node) {
      this.axios.get('/?scene_id=1', { headers: { api_id: '4' } }).then((res) => {
        this.actionAssociatedObject = res.data
        console.log(node)
      })
    },
    fetchActionSelect() {
      this.axios
        .get('?scene_id=1', { headers: { api_id: '5' } })
        .then((res) => {
          this.actionSelect = res.data
        })
    },
    fetchAfScene(){
      /*抓取动作源和目标*/
      this.axios
        .get('?scene_id=1', { headers: { api_id: '5' } })
        .then((res) => {
          this.afActionSource = res.data
        })
      this.axios
        .get('?scene_id=1', { headers: { api_id: '4' } })
        .then((res) => {
          this.afActionTarget = res.data
        })
    },
    candidateAction() {
      this.fetchActionSelect()
      this.objectdialog = true
    },
    candidateObject(){
      this.fetchActionScence()
      this.objectCandidatedialog = true
    },
    appendCandiateAction() {
      const DuplicateArrary = this.multipleAction.concat(
        this.multipleActionSelect
      )
      this.multipleAction = [...new Set(DuplicateArrary)]
    },
    appendCandiateObjects() {
      const DuplicateArrary = this.actionAssociatedObject.concat(
        this.multipleObjectSelect
      )
      this.actionAssociatedObject = [...new Set(DuplicateArrary)]
      this.objectCandidatedialog = false
    }
  },
  created() {
    this.$bus.on('spawnNode', this.drawNode)
  }
}
</script>

<style>
@import '../assets/beautiful.css';
</style>
