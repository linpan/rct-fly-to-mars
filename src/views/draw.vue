<template>

    <div id="drawflow">
      <v-btn @click="showme"> 单机创建</v-btn>
  </div>
</template>

<script>
import Vue from 'vue'
import Drawflow from 'drawflow'
import Action from "@/components/Action";
import Character from "@/components/Character";
import Objects from "@/components/Objects";

export default {
  name: 'draw',
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    const id = document.getElementById('drawflow')
    this.editor = new Drawflow(id, Vue)
    this.editor.start()
    const props = {}
    const options = {draggable_inputs: true}
    this.editor.registerNode('Action', Action, props, options)
    this.editor.registerNode('Character', Character, props, options)
    this.editor.registerNode('Objects', Objects, props, options)
    const data = {};
    this.editor.addNode('action', 1, 1, 150, 300, 'action', data, 'Action', 'vue');
    this.editor.addNode('character', 1, 1, 150, 300, 'character', data, 'Character', 'vue');
    this.editor.addNode('objects', 1, 1, 150, 340, 'objects', data, 'Objects', 'vue');
  },
  methods: {
    showme() {
      const data = {};
      this.editor.addNode('objects', 1, 1, 150, 400, 'objects', data, 'Objects', 'vue');
    }
  },
}
</script>

<style>
@import "../assets/beautiful.css";

</style>
