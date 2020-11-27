<template>
  <div id="drawflow">
    <!--角色抽屉-->
    <div
      class="pa-0 ma-0"
      v-if="drawerForCharacter"
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
                  background-color="blue"
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
            <div class="overflow-y-auto" style="max-height: 450px">
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
                  clear-icon="mdi-close"
                  clearable
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
                  clear-icon="mdi-close"
                  clearable
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
                  clear-icon="mdi-close"
                  clearable
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
                  clear-icon="mdi-close"
                  clearable
                  solo
                  return-object
                  hide-details
                ></v-select>
              </v-list-item-content>
            </v-list-item>
            </div>
          </v-list-group>
          <v-divider/>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>自定义属性</v-list-item-subtitle>
            </template>
            <div class="overflow-y-auto" style="max-height: 450px">
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
            </div>
            <v-list-item>
              <v-list-item-action>
                <v-btn
                  text
                  @click="characterParamsdialog = !characterParamsdialog"
                >
                  <v-icon left>mdi-plus-circle-outline</v-icon>
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
      v-if="drawerForObjects"

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
                  label="请选择"
                  v-model="objectSelect"
                  item-text="name"
                  solo
                  clear-icon="mdi-close"
                  clearable
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
            <div class="overflow-y-auto" style="max-height: 350px">
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
            </div>
            <v-list-item>
              <v-list-item-action>
                <v-btn text @click="objectParamsdialog = !objectParamsdialog">
                  <v-icon left>mdi-plus-circle-outline</v-icon>
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
            <div class="overflow-y-auto" style="max-height: 450px">
            <v-list-item
              v-for="(action, index) of multipleAction"
              :key="index"
              class="pt-2"
              @click="1"
            >
              <v-list-item-subtitle>{{ action.name }}</v-list-item-subtitle>
              <v-divider/>
              <v-list-item-action>
                <v-btn text>
                  <v-icon left>mdi-minus</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            </div>
            <v-list-item>
              <v-list-item-action>
                <v-btn text @click="candidateAction">
                  <v-icon left>mdi-plus-circle-outline</v-icon>
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
          <v-list-item style="background-color: #b75b07">
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
              <v-checkbox v-model="actionTransitiveCheckbox"></v-checkbox>
            </v-list-item>
            <v-divider/>
            <v-list-item class="my-2">
              <v-list-item-subtitle>
                动作前摇
              </v-list-item-subtitle>
              <v-text-field solo hide-details v-model="preActionDuration">
              </v-text-field>
            </v-list-item>
            <v-divider/>
            <v-list-item class="my-2">
              <v-list-item-subtitle>
                动作后摇
              </v-list-item-subtitle>
              <v-text-field solo hide-details v-model="postActionDuraiton">
              </v-text-field>
            </v-list-item>
            <v-divider/>
            <v-list-item class="my-2">
              <v-list-item-subtitle>
                动作持续
              </v-list-item-subtitle>
              <v-text-field solo hide-details v-model="actionDuration">
              </v-text-field>
            </v-list-item>
            <v-divider/>
          </v-list-group>
          <v-divider/>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>自定义属性</v-list-item-subtitle>
            </template>
            <div class="overflow-y-auto" style="max-height: 450px">
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
            </div>
            <v-list-item>
              <v-list-item-action>
                <v-btn text @click="actionParamsdialog = !actionParamsdialog">
                  <v-icon left>mdi-plus-circle-outline</v-icon>
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
            <div class="overflow-y-auto" style="max-height: 450px">
            <v-list-item
              v-for="(obj, index) of multipleGoods"
              :key="index"
              class="pt-2"
              @click="1"
            >
              <v-list-item-subtitle>{{ obj.name }}</v-list-item-subtitle>
              <v-divider/>
              <v-list-item-action>
                <v-btn text>
                  <v-icon left>mdi-minus</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            </div>
            <v-divider/>
            <v-list-item>
              <v-list-item-action>
                <v-btn
                  text
                  @click="candidateObject"
                >
                  <v-icon left>mdi-plus-circle-outline</v-icon>
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
            <div class="overflow-y-auto" style="max-height: 450px">
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-subtitle class="mb-1">
                  动作实施者
                </v-list-item-subtitle>
                <v-select
                  :items="afActionSource"
                  label=""
                  v-model="afActionSourceSelect"
                  item-text="name"
                  solo
                  multiple
                  chips
                  deletable-chips
                  return-object
                  hide-details
                ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item link class="my-2">
              <v-list-item-content>
                <v-list-item-subtitle class="mb-1">
                  目标(角色+物件)
                </v-list-item-subtitle>
                <v-select
                  :items="afActionTarget"
                  v-model="afActionTargetSelect"
                  item-text="name"
                  solo
                  multiple
                  chips
                  deletable-chips
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
            </div>
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
          <v-btn color="blue darken-1" text @click="appendCandiateActionAndDrawNode">
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
                  filled
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
          <v-btn color="blue darken-1" text @click="appendCandiateActionAndDrawNode">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      width="100"
      bottom
      color="success"
      right
    >
      {{ msg }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Vue from 'vue'
import Drawflow from 'drawflow'
import Action from '@/components/Action'
import Character from '@/components/Character'
import Objects from '@/components/Objects'
import AF from '@/components/AF'

const uuid = require("uuid");
export default {
  name: 'draw',
  data() {
    return {
      snackbar: false,
      msg: null,
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
      characterLabel: '角色编辑',
      objectsLabel: '物品编辑',
      actionLabel: '动作编辑',
      actionParamsdialog: false,
      objectCandidatedialog: false,
      actionCandidatedialog: false,
      characterParamsdialog: false,
      actionParamType: 'int',
      acitonParamValue: 1,
      actionParamName: 'health',
      actionAssociatedObject: [],
      objectAssociatedAction: [],
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
      multipleAction: [], /*物品选中的动作列表*/
      multipleGoods: [],
      actionSelect: null,
      objectSelect: null,
      selectedTypes: null,
      selectedOccupations: null,
      selectedGenders: null,
      npcValues: [],
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
    this.setAppBar(false) /*切换appbar*/
    this.fetchGlobalScene()
    const id = document.getElementById('drawflow')
    this.editor = new Drawflow(id, Vue)
    const props = {}
    const options = {}
    this.editor.registerNode('Action', Action, props, options)
    this.editor.registerNode('Character', Character, props, options)
    this.editor.registerNode('Objects', Objects, props, options)
    this.editor.registerNode('AF', AF, props, options)
    this.editor.start()
    this.restoreSceneNode()
    /*drawflow events*/
    // const data = {}
    // this.editor.addNode('character', 1, 1, 200, 300, 'character', data, 'Character', 'vue');
    // this.editor.addNode('objects', 1, 1, 200, 400, 'objects', data, 'Objects', 'vue');
    /* 获得后台数据*/
    this.editor.on('nodeSelected', this.asyncState)
    // this.editor.on('import', this.renameLabel)

    // this.editor.addNode('af', 1, 1, 440, 300, 'af', data, 'AF', 'vue')

  },
  methods: {
    ...mapActions(['setNode', 'setSelected', 'setCreated', 'setScene', 'setAppBar']),

    connectNode() {
      const node = this.currentSelected
      let pos_x = node.pos_x
      let pos_y = node.pos_y
      const af = this.editor.addNode('af', 1, 1, pos_x + 200, pos_y + 50, 'af', {}, 'AF', 'vue')
      this.editor.addConnection(node.id, af, 'output_1', 'input_1')
      this.editor.addConnection(af, 2, 'output_1', 'input_1')
      console.log('fuckde', af)

    },
    backupSceneNode() {
      const parsed = this.editor.export();
      console.log(this.nodes)
      const payload = {scene: this.$route.query.id, node: JSON.stringify(parsed), info: JSON.stringify(this.nodes)}
      console.log('保存节点位置,', payload)
      this.axios.post('node', payload).then(() => {
        }
      )
    },
    restoreSceneNode() {
      this.axios.get(`node/${this.$route.query.id}`).then(res => {
          console.log(JSON.parse(res.data.node))
          this.editor.import(JSON.parse(res.data.node))
          if (res.data.info){
            const nodes = JSON.parse(res.data.info)
            console.log('fsssdx', nodes)
            nodes.forEach(node => {
              this.setNode(node)
              console.log(node)
              document.querySelector(
                `.drawflow .parent-node #node-${node.nodeId} span`
              ).textContent = node.label
            })
          }
        }
      )

    },
    /*进入页面加载scene*/
    fetchGlobalScene() {
      this.axios.get(`/scene/${this.$route.query.id}`).then(res => {
        this.setScene(res.data)
      })
    },

    dynamicCharacterLabel(label) {
      const node = this.currentSelected
      document.querySelector(
        `.drawflow .parent-node #node-${node.id} span`
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
      const node = this.editor.getNodeFromId(id)
      this.setSelected(node)
      /*第一步根据db_id是否存在来取得数据*/
      const cls = node.html
      switch (cls) {
        case 'Character': {
          this.drawerForCharacter = true
          this.drawerForAction = false
          this.drawerForObjects = false
          this.drawerForAF = false
          this.reloadingNPC(node)
          break
        }
        case 'Objects': {
          this.drawerForObjects = true
          this.drawerForCharacter = false
          this.drawerForAction = false
          this.drawerForAF = false
          this.reloadingObject(node)
          break
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
      this.initCharacterState()
      this.axios
        .get(`npc/${this.$route.query.id}/${node.id}/`)
        .then((res) => {
          console.log('npc detail', res.data)
          this.selectedTeam = res.data.team
          this.selectedTypes = res.data.role
          this.selectedOccupations = res.data.job
          this.selectedGenders = res.data.gender
          this.characterLabel = res.data.name
          this.wrappedCharacterParam = res.data.attrs
          this.dynamicCharacterLabel(res.data.name)
        }).catch((err) => {
        console.log(err)
        this.characterLabel = ''
        this.selectedTeam =  ''
        this.selectedTypes = ''
        this.selectedOccupations = ''
        this.selectedGenders =  ''
        this.wrappedCharacterParam = []
        this.dynamicCharacterLabel('Character')
        this.initCharacterState()
      })
    },
    reloadingObject(node) {
      console.log('none...更新物品')
      this.initObjectState()
      this.axios.get(`good/${this.$route.query.id}/${node.id}`).then((res) => {
        this.wrappedObjectParam = res.data.attrs
        this.objectSelect = res.data.item_type
        this.multipleAction = res.data.actions
        this.objectsLabel = res.data.name
        this.dynamicCharacterLabel(res.data.name)
      }).catch(() => {
        this.objectsLabel = ''
        this.wrappedObjectParam = []
        this.objectSelect = null
        this.multipleAction = []
        this.dynamicCharacterLabel('Object')
        this.initObjectState()
      })
    },

    reloadingAction(node) {
      console.log(node)
      console.log('none...动作')

      this.axios.get(`action/${this.$route.query.id}/${node.id}`).then((res) => {
        console.log(res.data, 'aciton post')
        this.wrappedActionParam = res.data.attrs
        this.actionTransitiveCheckbox = res.data.is_transitive_verb
        this.actionLabel = res.data.name
        this.preActionDuration = res.data.transitive
        this.postActionDuraiton = res.data.attack_backswing
        this.actionDuration = res.data.attack_duration
        this.multipleGoods = res.data.good
        this.dynamicCharacterLabel(res.data.name)
      }).catch(()=>{
        this.actionLabel = ''
        this.wrappedActionParam = []
        this.actionTransitiveCheckbox = true
        this.preActionDuration = 0
        this.postActionDuraiton = 0
        this.actionDuration = 0
        this.multipleAction = []
        this.dynamicCharacterLabel('Action')

      })
    },
    reloadingAF(node) {
      this.initAFState()
      this.axios
        .get(`af/${this.$route.query.id}/${node.id}`)
        .then((res) => {
          console.log(res.data, 'reloading af')
          //todo 过滤afActionSource
          this.afActionSourceSelect = res.data.source
          this.afActionTargetSelect = res.data.target
          this.afCondition = res.data.condition
          this.afEffects = res.data.effect
        }).catch(() => {
        this.afActionSourceSelect = []
        this.afActionTargetSelect = []
        this.afEffects = ''
        this.afCondition = ''
        this.initAFState()
      })
    },
    drawNode(nodeType) {
      let nodeLabel = nodeType.nodeType
      switch (nodeLabel) {
        case 'Character': {
          let nodeId = this.editor.addNode(
            'character',
            1,
            1,
            100,
            100,
            'character',
            {api_id: 3},
            'Character',
            'vue'
          )

          console.log(this.storgeNode, nodeId)
          break
        }

        case 'Objects': {
          const data = {api_id: 4}
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
          console.log('物体', nodeId)
          break
        }
        case 'Action': {
          const data = {api_id: 5}
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
          console.log('动作', nodeId)
          break
        }
        case 'AF': {
          const data = {api_id: 6}
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
          console.log('AF', nodeId)
          break
        }
      }
    },
    updateCharacter() {
      /*更新和保存npc对象的创建*/
      let node = this.currentSelected
      let nodeId = node.id
      let type_node = node.html
      let payload = {
        scene: this.globalScene.id,
        name: this.characterLabel,
        node: nodeId,
        type_node: type_node,
        team: this.selectedTeam ? this.selectedTeam.id : null,
        role: this.selectedTypes ? this.selectedTypes.id : null,
        job: this.selectedOccupations ? this.selectedOccupations.id : null,
        gender: this.selectedGenders ? this.selectedGenders.id : null,
        attrs: this.wrappedCharacterParam
      }
      console.log(JSON.stringify(payload), '??--char')
      this.axios
        .post('/npc', payload)
        .then((res) => {
          this.setNode({
            nodeId: node.id,
            label: res.data.name,
          })
          this.snackbar = true
          this.msg = '更新成功'
          this.backupSceneNode()
          console.log('角色', res.data)
        }).catch(() => {
        this.snackbar = true
        this.msg = '更新失败!'
      })
    },
    updateObjects() {
      let node = this.currentSelected

      let nodeId = node.id
      let type_node = node.class

      let payload = {
        scene: this.globalScene.id,
        name: this.objectsLabel,
        node: nodeId,
        type_node: type_node,
        item_type: this.objectSelect ? this.objectSelect.id: null,
        attrs: this.wrappedObjectParam,
        actions: this.multipleAction  //搭配动作
      }
      console.log('>>', JSON.stringify(payload))
      this.axios
        .post('good', payload)
        .then((res) => {
          this.setNode({
            nodeId: node.id,
            label: this.objectsLabel,
          })
          this.backupSceneNode()
          this.snackbar = true
          this.msg = '物品更新!'
          console.log('物品', res.data)
        }).catch(()=>{
          this.snackbar = true
          this.msg = '物品更新失败!'
      })
    },
    updateAction() {
      let node = this.currentSelected
      let nodeId = node.id
      let type_node = node.html

      let payload = {
        scene: this.globalScene.id,
        node: nodeId,
        name: this.actionLabel,
        type_node: type_node,
        is_transitive_verb: this.actionTransitiveCheckbox,
        transitive: this.preActionDuration,
        attack_backswing: this.postActionDuraiton,
        attack_duration: this.actionDuration,
        good: this.multipleGoods,
        attrs: this.wrappedActionParam
      }
      console.log(JSON.stringify(payload), '你丫的')
      this.axios
        .post('action', payload)
        .then((res) => {
          this.setNode({
            nodeId: node.id,
            label: this.actionLabel,
          })
          this.backupSceneNode()
          this.snackbar = true
          this.msg = '动作更新成功!'
          console.log('动作', res.data)
        }).catch((()=>{
        this.snackbar = true
        this.msg = '动作更新失败!'
      }))
    },
    updateAF() {
      let node = this.currentSelected
      let nodeId = node.id
      let type_node = node.html
      let unquie = uuid.v4()
      let payload = {
        scene: this.globalScene.id,
        node: nodeId,
        name: 'AF' + unquie.substring(1, 7),
        type_node: type_node,
        condition: this.afCondition,
        effect: this.afEffects,
        npc_source: this.afActionSourceSelect,
        npc_target: this.afActionTargetSelect,
      }
      console.log(JSON.stringify(this.afActionTargetSelect))
      console.log('111af的post数据', JSON.stringify(payload))
      this.axios
        .post('af', payload)
        .then((res) => {
          // this.setNode({
          //   nodeId: node.nodeId,
          //   label: 'AF',
          // })
          this.backupSceneNode()
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
    initAFState() {
      this.axios.get(`entry?scene=${this.$route.query.id}`).then(res => {
        this.afActionSource = res.data.source
        this.afActionTarget = res.data.target
      })
    },
    /*获得物品列表*/
    fetchObjectScence() {
      this.axios.get(`good?scene=${this.$route.query.id}`).then(res => {
      //  从候选列表移除
        console.log(res)
        this.actionAssociatedObject = res.data
      })
    },
    //fetch 物品挂在动作
    fetchActionScene() {
      this.axios.get(`action?scene=${this.$route.query.id}`).then(res => {
        this.objectAssociatedAction = res.data
        console.log(res)
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
    appendCandiateActionAndDrawNode() {
      let index = this.multipleAction.findIndex(x=>x.id == this.multipleActionSelect.id)
      if (index ===-1) {
        this.multipleAction.push(this.multipleActionSelect)
      }
      //  draw node by program 动作->f -> 物品
      console.log('show actions.....', this.multipleAction)
      let action_node_id = this.multipleActionSelect.node
      const start_node = this.editor.getNodeFromId(action_node_id)
      let pos_x = start_node.pos_x
      let pos_y = start_node.pos_y
      const af = this.editor.addNode('af', 1, 1, pos_x + 200, pos_y + 50, 'af', {}, 'AF', 'vue')
      this.editor.addConnection(action_node_id, af, 'output_1', 'input_1')
      console.log(this.multipleActionSelect, '节点信息')
      let end_node = this.currentSelected
      this.editor.addConnection(af, end_node.id, 'output_1', 'input_1')

    },
    appendCandiateObjects() {
      let index = this.multipleGoods.findIndex(x=>x.id ===this.multipleObjectSelect.id)
      if (index ===-1) {
        this.multipleGoods.push(this.multipleObjectSelect)
      }
      // 及物动词的时候 连接
      const node = this.currentSelected
      let pos_x = node.pos_x
      let pos_y = node.pos_y
      console.log(node)
      const af = this.editor.addNode('af', 1, 1, pos_x + 200, pos_y + 50, 'af', {}, 'AF', 'vue')
      this.editor.addConnection(node.id, af, 'output_1', 'input_1')
      let next_node_id = this.multipleObjectSelect.node
      this.editor.addConnection(af, next_node_id, 'output_1', 'input_1')


    },
    saveSingleNode() {
      /*人物保存*/
      let node = this.currentSelected
      let cls = node.html
      //保存节点状态

      if (cls === 'Character') {
        this.updateCharacter()
      } else if (cls === 'Objects') {
        this.updateObjects()
      } else if (cls === 'Action') {
        this.updateAction()
      } else if (cls === 'AF') {
        this.updateAF()
      }
    }
  },
  created() {
    this.$bus.on('spawnNode', this.drawNode)
    this.$bus.on('saveNode', this.saveSingleNode)
  },
}
</script>

<style>
@import '../assets/beautiful.css';
</style>
