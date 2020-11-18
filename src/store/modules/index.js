const index = {
  state: {
    currentSelected: null,
    scene:null,
    nodes: [],
    created: false
  },
  mutations: {
    SET_Scene: (state, scene)=>{
      state.scene = scene
    },
    SET_Nodes: (state, node) => {
      /*如果存在 更新*/
      let item = state.nodes.findIndex((item) => {
        return item.nodeId === node.nodeId
      })
      if (item !== -1) {
        console.log('okay...')
        state.nodes[item]['db_id'] = node.db_id
      } else {
        state.nodes.push(node)
      }
    },
    SET_Selected: (state, node) => {
      state.currentSelected = node
    },
    SET_Created: (state, created) => {
      state.created = created
    }
  }
}

export default index
