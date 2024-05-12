import React, { useContext, useEffect } from "react"
import { Home } from "../../../common/Base/Home"
import { IdeaContext } from "../../../../context/ideaContext/IdeaContext"
import { LoadingIdea } from "./LoadingIdea"
//import { IdeaCard } from "./IdeaCard"
import { Grid } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../../../../context/userContext/UserContext"

export const Idea = () => {
  const ideaContext = useContext(IdeaContext)
  const userContext = useContext(UserContext)
  useEffect(() => {
    ideaContext.getAllIdeas()
    //alert(IdeaContext.Idea)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Home>
      <div className="px-2">
        {ideaContext.loading || userContext.loading ? (
          <LoadingIdea />
        ) : ideaContext.idea.length > 0 ? (
          ideaContext.idea.map((idea) => {
            // console.log(IdeaContext.Idea)
            return (
              <div key={idea._id}>
                {/*<IdeaCard idea={idea} />*/}
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
              <h6 className="mt-2">No Idea out there</h6>
            </Grid>
          </div>
        )}
      </div>
    </Home>
  )
}
