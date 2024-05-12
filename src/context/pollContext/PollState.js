import React, { useReducer } from "react"
import { PollContext } from "./PollContext"
import axios from "axios"
import { API } from "../../utils/proxy"
import { POLL_CREATE, POLL_ERROR, POLL_GET_ALL, POLL_LOADING, POLL_SUCCESS } from "../types"
import Pollreducer from "./Pollreducer"

export const PollState = ({ children }) => {
  const initialState = {
    polls: [],
    error: "",
    loading: true,
  }
  const [state, dispatch] = useReducer(Pollreducer, initialState)

  const getAllPolls = async () => {
    try {
      dispatch({
        type: POLL_LOADING,
        payload: true,
      })
      const response = await axios.get(`${API}/polls`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
        },
      })
      console.log(response)
      dispatch({
        type: POLL_GET_ALL,
        payload: response.data,
      })
    } catch (error) {
      // console.log(error)
      dispatch({
        type: POLL_ERROR,
        payload: "error.response.data.errorMsg",
      })
    }
  }

  const createPoll = async (userId, pollData) => {
    try {
      dispatch({
        type: POLL_LOADING,
        payload: true,
      })
      const response = await axios.post(
        `${API}/create/poll/${userId}`,
        pollData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      dispatch({
        type: POLL_CREATE,
        payload: "Successfully created!",
      })
      getAllPolls()
      //alert(response)
    } catch (error) {
      // console.log(error)
      //alert(error)
      dispatch({
        type: POLL_ERROR,
        payload: error.response.data.errorMsg,
      })
    }
  }

  const markPollYes = async (userId, pollId) => {
    try {
      const response = await axios.put(
        `${API}/poll/agree/${userId}`,
        { pollId },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  const markPollNo = async (userId, pollId) => {
    try {
      const response = await axios.put(
        `${API}/poll/disagree/${userId}`,
        { pollId },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  const skipPoll = async (userId, pollId) => {
    try {
      const response = await axios.put(
        `${API}/poll/skip/${userId}`,
        { pollId },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("_token")
            )}`,
          },
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }




const deletePoll = async (userID, pollId) => {
  try {
    const response = await axios.delete(
      `${API}/delete/poll/${userID}/${pollId}`,
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
        type: POLL_SUCCESS,
        payload: response.data.message,
      })
      getAllPolls()
    }
  } catch (error) {
    dispatch({
      type: POLL_ERROR,
      payload: error.response.data.errorMsg,
    })
  }
}

const updatePoll = async (userId, pollId, formData) => {
  try {
    const response = await axios.put(
      `${API}/update/poll/${userId}/${pollId}`,
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
        type: POLL_CREATE,
        payload: "Updated Successfully!",
      })
      getAllPolls()
    }
  } catch (error) {
    dispatch({
      type: POLL_ERROR,
      payload: error.response.data.errorMsg,
    })
  }
}

return (
  <PollContext.Provider
    value={{
      polls: state.polls,
      error: state.error,
      loading: state.loading,
      getAllPolls,
      markPollNo,
      markPollYes,
      skipPoll,
      createPoll,
      updatePoll,
      deletePoll
    }}
  >
    {children}
  </PollContext.Provider>
)

}