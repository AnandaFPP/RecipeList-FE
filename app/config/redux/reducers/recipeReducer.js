const initialState = {
    recipe: [],
    recipeDetail: [],
    recipeById: [],
  };
  
  const recipeReducer = (state = initialState, action) => {
    if (action.type === "GET_ALL_RECIPE") {
      return {
        ...state,
        recipe: action.payload,
      };
    } else if (action.type === "GET_DETAIL_RECIPE") {
      return {
        ...state,
        recipeDetail: action.payload,
      };
    } else if (action.type === "GET_RECIPE_BY_ID") {
      return {
        ...state,
        recipeById: action.payload,
      };
    } else if (action.type === "CREATE_RECIPE") {
      return state;
    } else if (action.type === "UPDATE_RECIPE") {
      return state;
    } else if (action.type === "DELETE_RECIPE") {
      return state;
    } else {
      return state;
    }
  };
  
  export default recipeReducer;