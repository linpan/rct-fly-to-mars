const film = {
  nodes: (state) => state.caption.nodes,
  currentSelected: (state) => state.caption.currentSelected,
  created: (state) => state.caption.created,
  globalScene:(state) => state.caption.scene
}

export default film
