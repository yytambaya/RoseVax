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
  import { IdeaContext } from "../../../../context/ideaContext/IdeaContext"
  import { IdeaModal } from "../../Modals/IdeaModal"
  import { useHistory } from "react-router-dom"
  import { UserContext } from "../../../../context/userContext/UserContext"
  import { API } from "../../../../utils/proxy"
  
  export const IdeaCard = ({ idea }) => {
    const userContext = useContext(UserContext)
    const history = useHistory()
    const authContext = useContext(AuthContext)
    const ideaContext = useContext(IdeaContext)
    const [vote, setVote] = useState(false)
    const [comment, setComment] = useState("")
    const [shareCount, setShareCount] = useState(idea.shareCount)
    const [countVote, setCountVote] = useState(idea.upvotes.length)
    const [moreOption, setMoreOption] = useState(null)
    const handleMoreOption = (e) => {
      setMoreOption(e.currentTarget)
    }
    const [bookmarkStatus, setBookmarkStatus] = useState(false)
    const [sendBtnColor, setSendBtnColor] = useState("grey")
    useEffect(() => {
      idea.upvotes.filter((likeId) => {
        if (likeId === authContext.user._id) {
          setVote(true)
        } else {
          setVote(false)
        }
        return 0
      })
    }, [authContext.user._id, idea.upvotes])
    const handleVote = () => {
      if (!vote) {
        ideaContext.upVoteIdea(idea._id, authContext.user._id)
        setCountVote(countVote + 1)
        setVote(true)
      } else {
        ideaContext.downVoteIdea(idea._id, authContext.user._id)
        setCountVote(countVote - 1)
        setVote(false)
      }
    }
    useEffect(() => {
      if (!userContext.loading) {
        // console.log(userContext.user.bookmark.idea)
  
        userContext.user.bookmark.idea.map((item) => {
          if (item._id === idea._id) {
            setBookmarkStatus(true)
          } else {
            setBookmarkStatus(false)
          }
          return 0
        })
      }
    }, [idea._id, userContext.loading, userContext.user.bookmark.idea])
  
    const handleBookmarkBtn = () => {
      const formData = {
        type: idea.objType,
        typeId: idea._id,
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
    const [showIdea, setShowIdea] = useState(false)
  
    const handleModalIdea = () => {
      handleClose()
      setShowIdea(!showIdea)
    }
    const [expanded, setExpanded] = React.useState(false)
  
    const handleExpandClick = () => {
      setExpanded(!expanded)
    }
  
    const handleCommentSend = async () => {
      if (comment.length > 0) {
        await ideaContext.addComment(idea._id, authContext.user._id, comment)
      }
    }
  
    const handleShareBtn = async () => {
      const response = await ideaContext.countShare(idea._id)
      setShareCount(response.shareCount)
      console.log(response)
    }
    return (
      <>
        {showIdea && (
          <IdeaModal
            show={showIdea}
            handleModal={handleModalIdea}
            ideaFunction={ideaContext.updateIdea}
            modalTitle="Update event"
            idea={idea}
          />
        )}
        <Card variant="elevation" elevation={3} className="mb-3">
          <CardHeader
            className="pt-3 pb-0"
            
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
                  {authContext.user._id === idea.user._id ? (
                    <MenuItem onClick={handleModalIdea}>Edit</MenuItem>
                  ) : null}
                  {authContext.user._id === idea.user._id ? (
                    <MenuItem
                      onClick={() => {
                        ideaContext.deleteIdea(authContext.user._id, idea._id)
                        handleClose()
                      }}
                    >
                      Delete
                    </MenuItem>
                  ) : null}
                  
                </Menu>
              </>
            }
            title={
              <b
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/profile/${idea.user._id}`)
                }}
              >
                {idea.title}
              </b>
            }
            subheader={idea.content}
            
          />
  
          <CardContent>
            <Typography variant="subtitle2" component="p">
              {"Date: " + idea.date?.substring(0,10)}
            </Typography>
            <Typography variant="subtitle2" component="p">
              {"Time: " + idea.time}
            </Typography><Typography variant="subtitle2" component="p">
              {"Location:" +  idea.location}
            </Typography>
  
          </CardContent>
          {idea.picture && (
            <img width="100%" src={`/${idea.picture}`} alt={idea.picture} />
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
                    {idea.comments.length}
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
                  {idea.comments.map((comment) => {
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
  