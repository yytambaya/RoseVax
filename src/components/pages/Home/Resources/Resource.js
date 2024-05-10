import React, { useContext, useEffect } from "react"
import { Home } from "../../../common/Base/Home"
import { LoadingResource } from "./LoadingResource"
import { ResourceCard } from "./ResourceCard"
import { Grid } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../../../../context/userContext/UserContext"
import { ResourceContext } from "../../../../context/resourcesContext/ResourceContext"

export const Resource = () => {
  const resourceContext = useContext(ResourceContext)
  const userContext = useContext(UserContext)
  useEffect(() => {
    resourceContext.getAllResources()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Home>
      <div className="px-2">
        {resourceContext.loading || userContext.loading ? (
          <LoadingResource />
        ) : resourceContext.resource.length > 0 ? (
          resourceContext.resource.map((resource) => {
            //console.log(resourceContext.resource)
            return (
              <div key={resource._id}>
                <ResourceCard resource={resource} />
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
            <Grid
              container
              spacing={3}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <FontAwesomeIcon icon={faPencilAlt} fontSize="large" />
              <h6 className="mt-2">No resource out there</h6>
            </Grid>
          </div>
        )}
      </div>
    </Home>
  )
}
