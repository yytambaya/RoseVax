import {
  faComment,
  faArrowAltCircleUp as faArrowAltCircleUpRegular,
  faBookmark as faBookmarkRegular,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons"
import { faShare } from "@fortawesome/free-solid-svg-icons"
import {
  faArrowAltCircleUp as faArrowAltCircleUpSolid,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Fade,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import Moment from "react-moment"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import { AuthContext } from "../../../../context/authContext/authContext"
import { ResourceModal } from "../../Modals/ResourceModal"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../../../context/userContext/UserContext"
import { API } from "../../../../utils/proxy"
import { ResourceContext } from "../../../../context/resourcesContext/ResourceContext"

export const ResourceCard = ({ resource }) => {
  const userContext = useContext(UserContext)
  const history = useHistory()
  const authContext = useContext(AuthContext)
  const resourceContext = useContext(ResourceContext)
  const [vote, setVote] = useState(false)
  const [comment, setComment] = useState("")
  const [shareCount, setShareCount] = useState(resource.shareCount)
  const [countVote, setCountVote] = useState(resource.upvotes.length)
  const [moreOption, setMoreOption] = useState(null)
  const handleMoreOption = (e) => {
    setMoreOption(e.currentTarget)
  }
  const [bookmarkStatus, setBookmarkStatus] = useState(false)
  const [sendBtnColor, setSendBtnColor] = useState("grey")
  useEffect(() => {
    resource.upvotes.filter((likeId) => {
      if (likeId === authContext.user._id) {
        setVote(true)
      } else {
        setVote(false)
      }
      return 0
    })
  }, [authContext.user._id, resource.upvotes])
  const handleVote = () => {
    if (!vote) {
      resourceContext.upVoteResource(resource._id, authContext.user._id)
      setCountVote(countVote + 1)
      setVote(true)
    } else {
      resourceContext.downVoteResource(resource._id, authContext.user._id)
      setCountVote(countVote - 1)
      setVote(false)
    }
  }
  useEffect(() => {
    if (!userContext.loading) {
      // console.log(userContext.user.bookmark.resource)

      userContext.user.bookmark.resource.map((item) => {
        if (item._id === resource._id) {
          setBookmarkStatus(true)
        } else {
          setBookmarkStatus(false)
        }
        return 0
      })
    }
  }, [resource._id, userContext.loading, userContext.user.bookmark.resource])

  const handleBookmarkBtn = () => {
    const formData = {
      type: resource.objType,
      typeId: resource._id,
    }
    if (!bookmarkStatus) {
      userContext.bookmarkItem(authContext.user._id, formData)
      setBookmarkStatus(true)
    } else {
      userContext.unBookmarkItem(authContext.user._id, formData)
      setBookmarkStatus(false)
    }
  }

  const open = Boolean(moreOption)
  const handleClose = () => {
    setMoreOption(null)
  }
  const [showResource, setShowResource] = useState(false)

  const handleModalResource = () => {
    handleClose()
    setShowResource(!showResource)
  }
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleCommentSend = async () => {
    if (comment.length > 0) {
      await resourceContext.addComment(resource._id, authContext.user._id, comment)
    }
  }

  const handleShareBtn = async () => {
    const response = await resourceContext.countShare(resource._id)
    setShareCount(response.shareCount)
    console.log(response)
  }
  return (
    <>
      {showResource && (
        <ResourceModal
          show={showResource}
          handleModal={handleModalResource}
          resourceFunction={resourceContext.updateResource}
          modalTitle="Update resource"
          resource={resource}
        />
      )}
      <Card variant="elevation" elevation={3} className="mb-3">
        <CardHeader
          className="pt-3 pb-0"
          avatar={
            <Avatar
              alt={resource.user.name}
              src={`${API}/pic/user/${resource.user._id}`}
            />
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMoreOption}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="fade-menu"
                anchorEl={moreOption}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                {authContext.user._id === resource.user._id ? (
                  <MenuItem onClick={handleModalResource}>Edit</MenuItem>
                ) : null}
                {authContext.user._id === resource.user._id ? (
                  <MenuItem
                    onClick={() => {
                      resourceContext.deleteResource(authContext.user._id, resource._id)
                      handleClose()
                    }}
                  >
                    Delete
                  </MenuItem>
                ) : null}
                <MenuItem onClick={handleClose}>Share</MenuItem>
                <MenuItem onClick={handleClose}>Bookmark</MenuItem>

                <MenuItem onClick={handleClose}>Report resource</MenuItem>
              </Menu>
            </>
          }
          title={
            <b
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push(`/profile/${resource.user._id}`)
              }}
            >
              {resource.user.name}
            </b>
          }
          subheader={<Moment fromNow>{resource.createdAt}</Moment>}
        />

        <CardContent>
          <Typography variant="subtitle2" component="p">
            <b>{resource.title}</b>
          </Typography>
          <Typography variant="subtitle2" component="p">
            {resource.link}
          </Typography>
        </CardContent>
        {resource.picture && (
          <img width="100%" src={`/${resource.picture}`} alt={resource.picture} />
        )}
        {/*<CardActions disableSpacing>
          <Grid container justify="space-between">
            <Grid item>
              <IconButton onClick={handleVote}>
                {vote ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUpSolid}
                    color="#03DAC6"
                  />
                ) : (
                  <FontAwesomeIcon icon={faArrowAltCircleUpRegular} />
                )}
              </IconButton>
              <span>
                <Typography variant="overline">{countVote}</Typography>
              </span>
              <IconButton onClick={handleExpandClick}>
                <FontAwesomeIcon icon={faComment} />
              </IconButton>
              <span>
                <Typography variant="overline">
                  {resource.comments.length}
                </Typography>
              </span>
              <IconButton onClick={handleShareBtn}>
                <FontAwesomeIcon icon={faShare} />
              </IconButton>
              <span>
                <Typography variant="overline">{shareCount}</Typography>
              </span>
            </Grid>
            <Grid item>
              <IconButton onClick={handleBookmarkBtn}>
                {bookmarkStatus ? (
                  <FontAwesomeIcon icon={faBookmarkSolid} />
                ) : (
                  <FontAwesomeIcon icon={faBookmarkRegular} />
                )}
              </IconButton>
            </Grid>
          </Grid>
          </CardActions>*/}
        {/*<Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                {resource.comments.map((comment) => {
                  return (
                    <span style={{ display: "flex" }} key={comment._id}>
                      <Typography variant="body2" className="pr-3">
                        <b>{comment.user.name}</b>
                      </Typography>
                      <Typography variant="subtitle2">
                        {comment.text}
                      </Typography>
                    </span>
                  )
                })}
              </Grid>
              <Grid item>
                <FormControl fullWidth size="small">
                  <InputLabel>Add a comment...</InputLabel>
                  <Input
                    value={comment}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setSendBtnColor("grey")
                        console.log(e.target.value)
                      } else {
                        setSendBtnColor("white")
                        console.log(e.target.value)
                      }
                      setComment(e.target.value)
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton type="submit" onClick={handleCommentSend}>
                          <FontAwesomeIcon
                            color={sendBtnColor}
                            icon={faPaperPlane}
                            size="sm"
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          </Collapse>*/}
      </Card>
    </>
  )
}
