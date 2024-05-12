import axios from "axios"
import React, { useReducer } from "react"
import { API } from "../../utils/proxy"
import {
  IDEA_CREATE,
  IDEA_ERROR,
  IDEA_GET_ALL,
  IDEA_LOADING,
  IDEA_SUCCESS,
} from "../types"
import IdeaReducer from "./IdeaReducer"
import { IdeaContext } from "./IdeaContext"

export const IdeaState = ({ children }) => {
  const initialState = {
    idea: [],
    error: "",
    success: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(IdeaReducer, initialState)

  const getAllIdeas = async () => {
    try {
      dispatch({
        type: IDEA_LOADING,
        payload: true,
      })
      // console.log(state)
      const response = await axios.get(`${API}/ideas`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      //console.log(response.data)
      //alert(JSON.stringify(response.data))
      dispatch({
        type: IDEA_GET_ALL,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: IDEA_ERROR,
        payload: error.response?.data.errorMsg,
      })
    }
  }

  const createIdea = async (formData, userId) => {
    try {
      dispatch({
        type: IDEA_LOADING,
        payload: true,
      })

      const response = await axios.post(
        `${API}/create/idea/${userId}`,
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
        //alert(response)
        dispatch({
          type: IDEA_CREATE,
          payload: "Successfully created!",
        })
        getAllIdeas()
        // console.log(response.data)
      }
    } catch (error) {
      // console.log(error.response)
      //alert(error)
      dispatch({
        type: IDEA_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const deleteIdea = async (userID, ideaId) => {
    try {
      const response = await axios.delete(
        `${API}/delete/idea/${userID}/${ideaId}`,
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
          type: IDEA_SUCCESS,
          payload: response.data.message,
        })
        getAllIdeas()
      }
    } catch (error) {
      dispatch({
        type: IDEA_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const updateIdea = async (formData, userId, ideaId) => {
    try {
      const response = await axios.put(
        `${API}/update/idea/${userId}/${ideaId}`,
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
          type: IDEA_CREATE,
          payload: "Updated Successfully!",
        })
        getAllIdeas()
      }
    } catch (error) {
      dispatch({
        type: IDEA_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const getAllIdeasByUserId = async (userId) => {
    try {
      const response = await axios.get(`${API}/${userId}/ideas`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      dispatch({
        type: IDEA_SUCCESS,
      })
      const { data } = response
      return data
    } catch (error) {
      dispatch({
        type: IDEA_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const upVoteIdea = async (ideaId, userId) => {
    await axios.put(
      `${API}/idea/upvote/${userId}/${ideaId}`,
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
        type: IDEA_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const downVoteIdea = async (ideaId, userId) => {
    try {
      await axios.put(
        `${API}/idea/downvote/${userId}/${ideaId}`,
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
        type: IDEA_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }
  const addComment = async (ideaId, userId, comment) => {
    try {
      const response = await axios.put(
        `${API}/idea/comment/${userId}/${ideaId}`,
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
        getAllIdeas()
      }
    } catch (error) {
      dispatch({
        type: IDEA_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const countShare = async (ideaId) => {
    try {
      const response = await axios.get(`${API}/share/idea/${ideaId}`)
      if (response) {
        return response.data
      }
    } catch (error) {
      dispatch({
        type: IDEA_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  return (
    <IdeaContext.Provider
      value={{
        idea: state.idea,
        loading: state.loading,
        error: state.error,
        success: state.success,
        getAllIdeas,
        createIdea,
        updateIdea,
        deleteIdea,
        getAllIdeasByUserId,
        upVoteIdea,
        downVoteIdea,
        addComment,
        countShare,
      }}
    >
      {children}
    </IdeaContext.Provider>
  )
}
