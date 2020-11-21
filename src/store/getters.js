const film = {
  nodes: (state) => state.caption.nodes,
  currentSelected: (state) => state.caption.currentSelected,
  created: (state) => state.caption.created,
  globalScene:(state) => state.caption.scene,
  isLoggedIn: (state) => !!state.caption.token,
  isAppBar: (state) => state.caption.appBar,
  authStatus: (state) => state.caption.status
}

export default film
