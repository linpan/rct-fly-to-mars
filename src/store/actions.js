const actions = {
  setNode: ({ commit }, Node) => {
    return commit('SET_Nodes', Node)
  },
  setSelected: ({ commit }, node) => {
    return commit('SET_Selected', node)
  },
  setCreated: ({ commit }, created) => {
    return commit('SET_Created', created)
  }
}

export default actions
