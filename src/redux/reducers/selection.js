const selectionReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_SELECTION":
      return [...state, action.asset];
    case "ADD_ALL_TO_SELECTION":
      return [...state, ...action.assets];
    case "REMOVE_FROM_SELECTION":
      return state.filter((asset) => {
        return !action.assets.some(({ id }) => id === asset.id);
      });
    case "REMOVE_ALL_FROM_SELECTION":
      return [];
    default:
      return state;
  }
};

export default selectionReducer;
