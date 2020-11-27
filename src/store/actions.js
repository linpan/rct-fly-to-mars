const actions = {
  setNode: ({commit}, Node) => {
    return commit('SET_Nodes', Node)
  },
  setSelected: ({commit}, node) => {
    return commit('SET_Selected', node)
  },
  setCreated: ({commit}, created) => {
    return commit('SET_Created', created)
  },
  setScene: ({commit}, scene) => {
    return commit('SET_Scene', scene)
  },
  auth_Success: ({commit}, token, user) => {
    return commit('auth_success', token, user)
  },
  userOut: ({commit}) => {
    return commit('logout')
  },
  setAppBar: ({commit}, bar) => {
    return commit('SET_appBar', bar)
  },
  setClearNodes: ({commit}) => {
    return commit('SET_ClearNode')
  }
}

export default actions
