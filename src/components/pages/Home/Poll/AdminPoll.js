import React, { useContext, useEffect } from "react"
import { Home } from "../../../common/Base/Home"
import { BlogContext } from "../../../../context/blogContext/BlogContext"
import { Grid } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../../../../context/userContext/UserContext"
import { LoadingPoll } from "./LoadingPoll"
import { PollContext } from "../../../../context/pollContext/PollContext"
import { AdminPollCard } from "./AdminPollCard"

export const AdminPoll = () => {
  const pollContext = useContext(PollContext)
  const userContext = useContext(UserContext)
  useEffect(() => {
    pollContext.getAllPolls()
    //alert(blogContext.blog)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Home>
      <div className="px-2">
        {pollContext.loading || userContext.loading ? (
          <LoadingPoll />
        ) : pollContext.polls.length > 0 ? (
          pollContext.polls.map((poll) => {
            // console.log(blogContext.blog)
            return (
              <div key={poll._id}>
                <AdminPollCard poll={poll} />
              </div>
            )
          })
        ) : (
          <div
            className="m-auto"
            style={{
              height: "30vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid className="bg-danger"
              container
              spacing={3}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <FontAwesomeIcon icon={faPencilAlt} fontSize="large" />
              <h6 className="mt-2">No blog out there</h6>
            </Grid>
          </div>
        )}
      </div>
    </Home>
  )
}
