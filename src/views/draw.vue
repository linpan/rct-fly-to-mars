<template>
  <div id="drawflow">
    <v-btn @click="updateCharacter"> 单机创建</v-btn>
    <div class="pa-0 ma-0" v-if="drawer">
      <v-navigation-drawer v-model="drawer" absolute permanent right>
        <template v-slot:prepend>
          <v-list-item class="primary">
            <v-list-item-title
              class="font-weight-bold justify-center text-center"
            >
              人物编辑
            </v-list-item-title>
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
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-subtitle>自定义属性</v-list-item-subtitle>
            </template>
            <v-list-item
              v-for="index of dynamicInput"
              :key="index"
              class="pt-2"
            >
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
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Vue from 'vue'
import Drawflow from 'drawflow'
import Action from '@/components/Action'
import Character from '@/components/Character'
import Objects from '@/components/Objects'

export default {
  name: 'draw',
  data() {
    return {
      editor: null,
      storgeNode: {} /*保存节点信息及关联*/,
      currentNodeId: 0,
      drawer: true,
      npcs: [],
      selectedTeam: null,
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
    const options = {draggable_inputs: true}
    this.editor.registerNode('Action', Action, props, options)
    this.editor.registerNode('Character', Character, props, options)
    this.editor.registerNode('Objects', Objects, props, options)
    /*drawflow events*/
    this.editor.on('nodeSelected', this.asyncState)
    // this.editor.addNode('action', 1, 1, 200, 200, 'action', data, 'Action', 'vue');
    // this.editor.addNode('character', 1, 1, 200, 300, 'character', data, 'Character', 'vue');
    // this.editor.addNode('objects', 1, 1, 200, 400, 'objects', data, 'Objects', 'vue');
    /* 获得后台数据*/
  },
  methods: {
    ...mapActions(['setNode', 'setSelected', 'setCreated']),
    /*获得数据*/
    asyncState(id) {
      const node = this.nodes.filter((word) => word.nodeId === parseInt(id))[0]
      /*第一步根据db_id是否存在来取得数据*/
      this.setSelected(node)
      if (!node.db_id) {
        /*创建*/
        this.fetchScene(node)
      } else {
        /* 根据id 来更新*/
        console.log("i have node db_id")
        this.updateNPC(node)

      }
    },
    updateNPC(node){
      this.axios.get(`?id=${node.db_id}`, {headers: {'api_id': '3'}}).then(res=>{
        console.log('npc detail', res.data)
        this.selectedTeam = res.data.alignment
        this.selectedTypes = res.data.npc_type
        this.selectedOccupations = res.data.occupation
        this.selectedGenders = res.data.gender
      })
    },
    drawNode(nodeType) {
      let nodeLabel = nodeType.nodeType
      switch (nodeLabel) {
        case 'Character': {
          const data = {api_id: 3}
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
          this.setNode({nodeId: nodeId, api_id: 3, db_id: null})
          console.log(this.storgeNode)
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
          this.setNode({nodeId: nodeId, api_id: 4, db_id: null})
          console.log('物体')
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
          this.setNode({nodeId: nodeId, api_id: 5, db_id: null})
          console.log('动作')
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
        name: "老王",
        id: id,
        alignment_id: this.selectedTeam.id,
        type_id: this.selectedTypes.id,
        occupation_id: this.selectedOccupations.id,
        gender_id: this.selectedGenders.id
      }
      this.axios.post('/', payload, {headers: {'api_id': '3'}}).then(res => {
        this.setNode({nodeId: node.nodeId, api_id: node.api_id, db_id: res.data.id})
        console.log('乐山', res.data)
      })
    },
    fetchScene(node) {
      this.axios.get('/?id=1', {headers: {api_id: '2'}}).then((res) => {
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
