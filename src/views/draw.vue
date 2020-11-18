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
            <v-row align="center" justify="center" class="primary">
              <v-col cols="6">
                <v-text-field
                  hide-details
                  class="font-weight-bold"
                  background-color="blue"
                  value="Character"
                  flat
                  v-model="characterLabel"
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
                  :items="team"
                  label="请选择"
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
                  :items="role"
                  label="请选择"
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
                  :items="job"
                  label="请选择"
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
                  :items="gender"
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
          <v-divider />
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
                <v-btn
                  text
                  @click="characterParamsdialog = !characterParamsdialog"
                >
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
    <!--    物品抽屉-->
    <div
      class="pa-0 ma-0"
      v-if="drawerForObjects && currentSelected.class === 'Objects'"
    >
      <v-navigation-drawer v-model="drawerForObjects" absolute permanent right>
        <template v-slot:prepend>
          <v-list-item style="background-color: #018062">
            <v-row
              align="center"
              justify="center"
              style="background-color: #018062"
            >
              <v-col cols="6">
                <v-text-field
                  hide-details
                  class="font-weight-bold"
                  background-color="#018062"
                  label="对象编辑"
                  flat
                  solo
                  dense
                  v-model="objectsLabel"
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
          <v-divider />
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
                <v-btn text @click="objectParamsdialog = !objectParamsdialog">
                  <v-icon left>fa-plus-circle</v-icon>
                  新建参数
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
          <v-divider />
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
    <!--    动作抽屉-->
    <div class="pa-0 ma-0" v-if="drawerForAction">
      <v-navigation-drawer v-model="drawerForAction" absolute permanent right>
        <template v-slot:prepend>
          <v-list-item style="background-color: #B75B07">
            <v-row align="center" justify="center">
              <v-col cols="6">
                <v-text-field
                  hide-details
                  class="font-weight-bold"
                  background-color="#B75B07"
                  label="动作编辑"
                  v-model="actionLabel"
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
              <v-checkbox v-model="actionTransitiveCheckbox"> </v-checkbox>
            </v-list-item>
            <v-divider />
            <v-list-item class="my-2">
              <v-list-item-subtitle>
                动作前摇
              </v-list-item-subtitle>
              <v-text-field solo hide-details v-model="preActionDuration">
              </v-text-field>
            </v-list-item>
            <v-divider />
            <v-list-item class="my-2">
              <v-list-item-subtitle>
                动作后摇
              </v-list-item-subtitle>
              <v-text-field solo hide-details v-model="postActionDuraiton">
              </v-text-field>
            </v-list-item>
            <v-divider />
            <v-list-item class="my-2">
              <v-list-item-subtitle>
                动作持续
              </v-list-item-subtitle>
              <v-text-field solo hide-details v-model="actionDuration">
              </v-text-field>
            </v-list-item>
            <v-divider />
          </v-list-group>
          <v-divider />
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
          <v-divider />
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>搭配物品</v-list-item-subtitle>
            </template>
            <v-list-item
              v-for="(obj, index) of multipleGoods"
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
            <v-divider />
            <v-list-item>
              <v-list-item-action>
                <v-btn
                  text
                  @click="candidateObject"
                >
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
    <div class="pa-0 ma-0" v-if="drawerForAF">
      <v-navigation-drawer v-model="drawerForAF" absolute permanent right>
        <template v-slot:prepend>
          <v-list-item style="background-color: #B28F33">
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
            <v-divider />
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
            <v-divider />
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
            <v-divider />
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
            <v-divider />
          </v-list-group>
        </template>
        <v-divider></v-divider>
      </v-navigation-drawer>
    </div>
    <v-dialog
      v-model="objectdialog"
      persistent
      max-width="400px"
      @click="fetchActionScene"
    >
      <v-card dark>
        <v-card-title class="justify-center opacity-25">
          <span class="subtitle-1">新建参数</span>
        </v-card-title>
        <v-divider />
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
      @click="fetchActionScene"
    >
      <v-card>
        <v-card-title class="justify-center opacity-25">
          <span class="subtitle-1">新建参数</span>
        </v-card-title>
        <v-divider />
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
          <v-btn color="blue darken-1" @click="characterParamsdialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" @click="wrappedCharacterToItems">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    object 自定义参数-->
    <v-dialog
      v-model="objectParamsdialog"
      persistent
      max-width="400px"
      @click="fetchActionScene"
    >
      <v-card>
        <v-card-title class="justify-center opacity-25">
          <span class="subtitle-1">新建参数</span>
        </v-card-title>
        <v-divider />
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
          <v-btn color="blue darken-1" @click="objectParamsdialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" @click="wrappedObjectToItems">
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
      @click="fetchActionScene"
    >
      <v-card>
        <v-card-title class="justify-center opacity-25">
          <span class="subtitle-1">新建参数</span>
        </v-card-title>
        <v-divider />
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
          <v-btn color="blue darken-1" @click="actionParamsdialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" @click="wrappedParamToAction">
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
      @click="fetchActionScene"
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
          <v-btn
            color="blue darken-1"
            text
            @click="objectCandidatedialog = false"
          >
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="appendCandiateObjects">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!--   候选动作-->
    <v-dialog
      v-model="actionCandidatedialog"
      persistent
      max-width="600px"
      @click="fetchActionScene"
    >
      <v-card>
        <v-card-title>
          <span class="headline">候选动作</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :items="objectAssociatedAction"
                  label="动作"
                  item-text="name"
                  return-object
                  multiple
                  filled
                  dense
                  v-model="multipleActionSelect"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="actionCandidatedialog = false"
          >
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="appendCandiateAction">
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
const  uuid = require("uuid");
export default {
  name: 'draw',
  data() {
    return {
      drawerForAF: false,
      drawerForObjects: false,
      drawerForAction: false,
      drawerForCharacter: false,
      drawer: false,
      actionTransitiveCheckbox: true,
      preActionDuration: 2000 /*action duration*/,
      postActionDuraiton: 2000,
      actionDuration: 1000,
      wrappedActionParam: [],
      wrappedCharacterParam: [],
      characterLabel: '中国',
      objectsLabel: '大炮筒',
      actionLabel: '丢',
      actionParamsdialog: false,
      objectCandidatedialog: false,
      actionCandidatedialog:false,
      characterParamsdialog: false,
      actionParamType: 'int',
      acitonParamValue: 1,
      actionParamName: 'health',
      actionAssociatedObject: [],
      objectAssociatedAction:[],
      multipleObjectSelect: null,
      actionAssociatedObjectValue: [],
      paramType: 'int',
      paramValue: 0,
      paramName: 'height',
      objectdialog: false,
      objectParamsdialog: false,
      wrappedObjectParam: [],
      //af
      afActionSource: [],
      afActionTarget: [],
      afCondition: '',
      afEffects: '',
      afActionSourceSelect: null,
      afActionTargetSelect: null,
      editor: null,
      storgeNode: {} /*保存节点信息及关联*/,
      currentNodeId: 0,
      npcs: [],
      selectedTeam: null,
      objectTypes: [] /*物品类型*/,
      multipleActionSelect: [],
      multipleAction: [],
      multipleGoods: [],
      actionSelect: null,
      objectSelect: null,
      selectedTypes: null,
      selectedOccupations: null,
      selectedGenders: null,
      npcValues: [],
      selectVal: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      dynamicInput: 3,
      team: [] /*阵营*/,
      role: [] /*类型*/,
      job: [] /*职业*/,
      gender: [] /*性别*/
    }
  },
  computed: {
    ...mapGetters(['nodes', 'currentSelected', 'created', 'globalScene'])
  },
  mounted() {
    this.fetchGlobalScene()
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
    ...mapActions(['setNode', 'setSelected', 'setCreated', 'setScene']),

    /*进入页面加载scene*/
    fetchGlobalScene(){
      this.axios.get(`/scene/${this.$route.query.id}`).then(res=>{
        this.setScene(res.data)
      })
    },

    dynamicCharacterLabel(label) {
      const node = this.currentSelected
      document.querySelector(
        `.drawflow .parent-node #node-${node.nodeId} span`
      ).innerHTML = label
    },
    wrappedObjectToItems() {
      this.wrappedObjectParam.push({
        name: this.paramName,
        value: this.paramValue,
        type: this.paramType
      })
      this.objectParamsdialog = false
    },
    wrappedCharacterToItems() {
      this.wrappedCharacterParam.push({
        name: this.paramName,
        value: this.paramValue,
        type: this.paramType
      })
      this.characterParamsdialog = false
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
          this.drawerForAction = false
          this.drawerForObjects = false
          this.drawerForAF = false
          if (!node.db_id) {
            /*创建*/
            this.initCharacterState(node)
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
            this.initObjectState()
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
          if (!node.db_id) {
            this.initAFState()
            break
          } else {
            this.reloadingAF(node)
            break
          }
          break
        }
        default: {
          break
        }
      }
    },
    reloadingNPC(node) {
      this.axios
        .get(`npc/${node.db_id}`)
        .then((res) => {
          console.log('npc detail', res.data)
          this.selectedTeam = res.data.team
          this.selectedTypes = res.data.role
          this.selectedOccupations = res.data.job
          this.selectedGenders = res.data.gender
          this.characterLabel = res.data.name
          this.wrappedCharacterParam = res.data.attrs
        })
    },
    reloadingObject(node) {
      console.log(node)
      console.log('none...更新物品')
      this.axios.get(`good/${node.db_id}`).then((res) => {
        this.wrappedObjectParam = res.data.attrs
        this.objectSelect = res.data.item_type
        this.multipleAction = res.data.actions
      })
    },
    reloadingAction(node) {
      console.log(node)
      console.log('none...动作')

      this.axios.get(`action/${node.db_id}`).then((res) => {
        console.log(res.data, 'aciton post')
        this.wrappedActionParam = res.data.attrs
        this.actionTransitiveCheckbox = res.data.is_transitive_verb
        this.actionLabel = res.data.name
        this.preActionDuration = res.data.attack_point
        this.postActionDuraiton = res.data.attack_backswing
        this.actionDuration = res.data.attack_duration

      })
    },
    reloadingAF(node) {
      this.axios
        .get(`af/${node.db_id}`)
        .then((res) => {
          console.log(res.data, 'reloading af')
          //todo 过滤afActionSource
          this.afActionSourceSelect = res.data.action
          this.afActionTargetSelect = res.data.target
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
      let nodeId = node.nodeId
      let type_node = node.class
      let payload = {
        scene: this.globalScene.id,
        name: this.characterLabel,
        node: nodeId,
        type_node: type_node,
        team: this.selectedTeam.id,
        role: this.selectedTypes.id,
        job: this.selectedOccupations.id,
        gender: this.selectedGenders.id,
        item_type: 1, /*todo remove item_type*/
        attrs: this.wrappedCharacterParam
      }
      console.log(JSON.stringify(payload), '--')
      this.axios
        .post('/npc', payload)
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

      let nodeId = node.nodeId
      let type_node = node.class

      let payload = {
        scene: this.globalScene.id,
        name: this.objectsLabel,
        node: nodeId,
        type_node: type_node,
        item_type: this.objectSelect.id,
        attrs: this.wrappedObjectParam,
        actions: []
      }

      this.axios
        .post('good', payload)
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
    updateAction() {
      let node = this.currentSelected
      let nodeId = node.nodeId
      let type_node = node.class

      let payload = {
        scene: this.globalScene.id,
        node: nodeId,
        name: this.actionLabel,
        type_node: type_node,
        is_transitive_verb: this.actionTransitiveCheckbox,
        attack_point: this.preActionDuration,
        attack_backswing: this.postActionDuraiton,
        attack_duration: this.actionDuration,
        goods: this.actionAssociatedObject,
        attrs: this.wrappedActionParam
      }
      console.log(JSON.stringify(payload), '你丫的')
      this.axios
        .post('action', payload)
        .then((res) => {
          this.setNode({
            nodeId: node.nodeId,
            api_id: node.api_id,
            db_id: res.data.id,
            class: node.class
          })
          console.log('动作', res.data)
        })
    },
    updateAF() {
      let node = this.currentSelected
      let nodeId = node.nodeId
      let type_node = node.class
      let unquie = uuid.v4()
      let payload = {
        scene: this.globalScene.id,
        node: nodeId,
        name: 'AF' + unquie.substring(1,7),
        type_node: type_node,
        condition: this.afCondition,
        effect: this.afEffects,
        action: this.afActionSourceSelect.id,
        target: this.afActionTargetSelect.id,
        target_type: this.afActionTargetSelect.target_type
      }
      console.log(JSON.stringify(this.afActionTargetSelect))
      console.log('af的post数据', JSON.stringify(payload))
      this.axios
        .post('af', payload)
        .then((res) => {
          this.setNode({
            nodeId: node.nodeId,
            api_id: node.api_id,
            db_id: res.data.id,
            class: node.class
          })
          console.log('af', res.data)
        })
    },
    initCharacterState(node) {
      this.team = this.globalScene.team
      this.role = this.globalScene.role
      this.job = this.globalScene.job
      this.gender = this.globalScene.gender
      console.log(node)
    },
    initObjectState() {
      this.objectTypes = this.globalScene.item
    },
    initAFState(){
      this.axios.get('entry').then(res=>{
        this.afActionSource = res.data.source
        this.afActionTarget = res.data.target
      })
    },
    /*获得物品列表*/
    fetchObjectScence(node) {
      this.axios.get('entry').then(res=>{
        const good = res.data.target.filter(ele=>ele.target_type==='good')
        this.actionAssociatedObject = good

      })
    },
    fetchActionScene() {
      this.axios.get('entry').then(res=>{
        this.objectAssociatedAction = res.data.source
        console.log(res.data.source)
      })
    },
    fetchAfScene() {
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
    //候选动作
    candidateAction() {
      this.fetchActionScene()
      this.actionCandidatedialog = true
    },
    // 候选物品
    candidateObject() {
      this.fetchObjectScence()
      this.objectCandidatedialog = true

    },
    appendCandiateAction() {
      const DuplicateArrary = this.multipleAction.concat(
        this.multipleActionSelect
      )
      this.multipleAction = [...new Set(DuplicateArrary)]
    },
    appendCandiateObjects() {
      const DuplicateArrary = this.multipleGoods.concat(
        this.multipleObjectSelect
      )
      this.multipleGoods = [...new Set(DuplicateArrary)]
    },
    saveSingleNode(){
      /*人物保存*/
      let node = this.currentSelected
      let cls = node.class
      if (cls==='Character'){
        this.updateCharacter()
      } else  if(cls==='Objects'){
          this.updateObjects()
      } else  if(cls ==='Action')
      {
        this.updateAction()
      } else if (cls ==='AF'){
        this.updateAF()
      }


    }
  },
  created() {
    this.$bus.on('spawnNode', this.drawNode)
    this.$bus.on('saveNode', this.saveSingleNode)
  }
}
</script>

<style>
@import '../assets/beautiful.css';
</style>
