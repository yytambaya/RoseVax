import {
    RESOURCE_CREATE,
    RESOURCE_ERROR,
    RESOURCE_GET_ALL,
    RESOURCE_LOADING,
    RESOURCE_SUCCESS,
  } from "../types"
  
  /* eslint-disable import/no-anonymous-default-export */
  export default (state, action) => {
    switch (action.type) {
      case RESOURCE_CREATE:
        return {
          ...state,
          success: action.payload,
          loading: false,
          error: "",
        }
      case RESOURCE_LOADING:
        return {
          ...state,
          loading: true,
          error: "",
          success: "",
        }
      case RESOURCE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
          success: "",
        }
      case RESOURCE_GET_ALL:
        return {
          ...state,
          Resource: action.payload,
          loading: false,
          error: "",
          success: "",
        }
      case RESOURCE_SUCCESS:
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
  