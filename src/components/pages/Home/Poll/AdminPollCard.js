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
  import { BlogContext } from "../../../../context/blogContext/BlogContext"
  import { BlogModal } from "../../Modals/BlogModal"
  import { useHistory } from "react-router-dom"
  import { UserContext } from "../../../../context/userContext/UserContext"
  import { API } from "../../../../utils/proxy"
import { PollModal } from "../../Modals/PollModal"
import { PollContext } from "../../../../context/pollContext/PollContext"
  
  export const AdminPollCard = ({ poll }) => {
    const userContext = useContext(UserContext)
    const history = useHistory()
    const authContext = useContext(AuthContext)
    const blogContext = useContext(BlogContext)
    const pollContext = useContext(PollContext) 
    //const [vote, setVote] = useState(false)
    const [comment, setComment] = useState("")  
    const [showBlog, setShowBlog] = useState(false)
    const [expanded, setExpanded] = React.useState(false)
    const [moreOption, setMoreOption] = useState(null)
    
    {/*useEffect(() => {
        alert(poll.user._id)
        //alert(JSON.stringify(authContext.user))
        
    }, [poll, authContext.user, showBlog])*/}
    
    const handleMoreOption = (e) => {
      setMoreOption(e.currentTarget)
    }

    const open = Boolean(moreOption)
    const handleClose = () => {
      setMoreOption(null)
    }
  
    const handleModalBlog = () => {
      handleClose()
      setShowBlog(!showBlog)
    }
  
    const handleExpandClick = () => {
      setExpanded(!expanded)
    }
  

    return (
      <>
        {showBlog && (
          <PollModal
            show={showBlog}
            handleModal={handleModalBlog}
            pollFunction={pollContext.updatePoll}
            modalTitle="Update poll"
            poll={poll}
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
                  {authContext.user._id === poll.user || true ? (
                    <MenuItem onClick={handleModalBlog}>Edit</MenuItem>
                  ) : null}
                  {authContext.user._id === poll.user || true ? (
                    <MenuItem
                      onClick={() => {
                        pollContext.deletePoll(authContext.user._id, poll._id)
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
                  history.push(`/profile/${poll.user._id}`)
                }}
              >
                {poll.title}
              </b>
            }
            subheader={poll.poll}
            
          />
  
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
                    {blog.comments.length}
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
          
        </Card>
      </>
    )
  }
  