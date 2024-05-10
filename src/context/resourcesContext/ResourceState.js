import axios from "axios"
import React, { useReducer } from "react"
import { API } from "../../utils/proxy"
import {
  RESOURCE_CREATE,
  RESOURCE_ERROR,
  RESOURCE_GET_ALL,
  RESOURCE_LOADING,
  RESOURCE_SUCCESS,
} from "../types"
import ResourceReducer from "./ResourceReducer"
import { ResourceContext } from "./ResourceContext"

export const ResourceState = ({ children }) => {
  const initialState = {
    resource: [],
    error: "",
    success: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(ResourceReducer, initialState)

  const getAllResources = async () => {
    try {
      dispatch({
        type: RESOURCE_LOADING,
        payload: true,
      })
      // console.log(state)
      const response = await axios.get(`${API}/resources`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      // console.log(response.data)
      dispatch({
        type: RESOURCE_GET_ALL,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: RESOURCE_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const createResource = async (formData, userId) => {
    try {
      dispatch({
        type: RESOURCE_LOADING,
        payload: true,
      })

      const response = await axios.post(
        `${API}/create/resource/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        alert(response)
        dispatch({
          type: RESOURCE_CREATE,
          payload: "Successfully created!",
        })
        getAllResources()
        // console.log(response.data)
      }
    } catch (error) {
      // console.log(error.response)
      alert(error)
      dispatch({
        type: RESOURCE_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const deleteResource = async (userID, resourceId) => {
    try {
      const response = await axios.delete(
        `${API}/delete/resource/${userID}/${resourceId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        dispatch({
          type: RESOURCE_SUCCESS,
          payload: response.data.message,
        })
        getAllResources()
      }
    } catch (error) {
      dispatch({
        type: RESOURCE_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const updateResource = async (formData, userId, resourceId) => {
    try {
      const response = await axios.put(
        `${API}/update/resource/${userId}/${resourceId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        dispatch({
          type: RESOURCE_CREATE,
          payload: "Updated Successfully!",
        })
        getAllResources()
      }
    } catch (error) {
      dispatch({
        type: RESOURCE_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const getAllResourcesByUserId = async (userId) => {
    try {
      const response = await axios.get(`${API}/${userId}/resources`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      dispatch({
        type: RESOURCE_SUCCESS,
      })
      const { data } = response
      return data
    } catch (error) {
      dispatch({
        type: RESOURCE_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const upVoteResource = async (resourceId, userId) => {
    await axios.put(
      `${API}/resource/upvote/${userId}/${resourceId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      }
    )
    try {
    } catch (error) {
      dispatch({
        type: RESOURCE_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const downVoteResource = async (resourceId, userId) => {
    try {
      await axios.put(
        `${API}/resource/downvote/${userId}/${resourceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
    } catch (error) {
      dispatch({
        type: RESOURCE_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const addComment = async (resourceId, userId, comment) => {
    try {
      const response = await axios.put(
        `${API}/resource/comment/${userId}/${resourceId}`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      if (response) {
        getAllResources()
      }
    } catch (error) {
      dispatch({
        type: RESOURCE_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const countShare = async (resourceId) => {
    try {
      const response = await axios.get(`${API}/share/resource/${resourceId}`)
      if (response) {
        return response.data
      }
    } catch (error) {
      dispatch({
        type: RESOURCE_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  return (
    <ResourceContext.Provider
      value={{
        resource: state.resource,
        loading: state.loading,
        error: state.error,
        success: state.success,
        getAllResources,
        createResource,
        updateResource,
        deleteResource,
        getAllResourcesByUserId,
        upVoteResource,
        downVoteResource,
        addComment,
        countShare,
      }}
    >
      {children}
    </ResourceContext.Provider>
  )
}
