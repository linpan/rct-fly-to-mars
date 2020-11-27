const index = {
  state: {
    currentSelected: null,
    scene:null,
    nodes: [],
    created: false,
    token: localStorage.getItem('access_token') || '',
    status: '',
    appBar: true,
  },
  mutations: {
    SET_appBar(state, bar){
      state.appBar = bar
    },

    auth_success(state, token) {
      state.status = 'success'
      state.token = token
    },
    logout(state) {
      state.status = ''
      state.token = ''
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('rct')
    },

    SET_Scene: (state, scene)=>{
      state.scene = scene
    },
    SET_Nodes: (state, node) => {
      /*如果存在 更新*/
      let foundIndex = state.nodes.findIndex((item) => {
        return item.nodeId === node.nodeId
      })
      //存在更新
      if (foundIndex !== -1) {
        console.log('更新节点名字')
        state.nodes[foundIndex]['label'] = node.label
      } else {
        state.nodes.push(node)
      }
    },
    SET_ClearNode:(state) =>{
      state.nodes = []
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
