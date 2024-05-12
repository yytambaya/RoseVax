import React, { useContext, useEffect } from "react"
import { Home } from "../../../common/Base/Home"
import { PostContext } from "../../../../context/postContext/postContext"
import { PostCard } from "./PostCard"
import CameraIcon from "@material-ui/icons/Camera"
import { LoadingPost } from "./LoadingPost"
import { Grid } from "@material-ui/core"
import { UserContext } from "../../../../context/userContext/UserContext"
import Moment from "react-moment"

export const Post = () => {
  const postContext = useContext(PostContext)
  const userContext = useContext(UserContext)
  useEffect(() => {
    postContext.getAllPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Home>
      <div className="px-2">
        {postContext.loading || userContext.loading ? (
          <LoadingPost />
        ) : postContext.post.length > 0 ? (
          postContext.post.map((post) => {
            return (
              <div key={post._id}>
                {<PostCard post={post} />}
                {/*<div className=" bg-success py-2 px-2 mb-4">
                  <div>
                    <span className=" text-xl-left text-primary">{post.content}</span>
                    <span className=" text-sm-right text-secondary"><Moment fromNow>{post.createdAt}</Moment></span>
                  </div>
                  <div className=" text-sm-left font-italic text-secondary">Posted by {post.user.name}</div>
              </div>*/}
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
              <CameraIcon fontSize="large" />
              <h6 className="mt-2">No post out there</h6>
            </Grid>
          </div>
        )}
      </div>
    </Home>
  )
}
