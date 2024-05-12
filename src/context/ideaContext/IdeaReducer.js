import {
    IDEA_CREATE,
    IDEA_ERROR,
    IDEA_GET_ALL,
    IDEA_LOADING,
    IDEA_SUCCESS,
  } from "../types"
  
  /* eslint-disable import/no-anonymous-default-export */
  export default (state, action) => {
    switch (action.type) {
      case IDEA_CREATE:
        return {
          ...state,
          success: action.payload,
          loading: false,
          error: "",
        }
      case IDEA_LOADING:
        return {
          ...state,
          loading: true,
          error: "",
          success: "",
        }
      case IDEA_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
          success: "",
        }
      case IDEA_GET_ALL:
        return {
          ...state,
          idea: action.payload,
          loading: false,
          error: "",
          success: "",
        }
      case IDEA_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload,
          error: "",
        }
      default:
        return state
    }
  }
  