import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import Moment from "react-moment"
import { AuthContext } from "../../../../context/authContext/authContext"
import { PostContext } from "../../../../context/postContext/postContext"
import { PostModal } from "../../Modals/PostModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faComment,
  faHeart as faHeartRegualar,
  faShareSquare,
  faBookmark as faBookmarkRegular,
} from "@fortawesome/free-regular-svg-icons"
import {
  faHeart as faHeartSolid,
  faBookmark as faBookmarkSolid,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../../../context/userContext/UserContext"
import { API } from "../../../../utils/proxy"

export const PostCard = ({ post }) => {
  const history = useHistory()
  const authContext = useContext(AuthContext)
  const userContext = useContext(UserContext)
  const postContext = useContext(PostContext)
  const [bookmarkStatus, setBookmarkStatus] = useState(false)
  const [comment, setComment] = useState("")
  // const [bookmark, setBookmark] = useState("")
  const [likeStatus, setLikeStatus] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [moreOption, setMoreOption] = useState(null)
  const handleMoreOption = (e) => {
    setMoreOption(e.currentTarget)
  }
  const open = Boolean(moreOption)
  const handleClose = () => {
    setMoreOption(null)
  }
  const [sendBtnColor, setSendBtnColor] = useState("grey")

  const [showPost, setShowPost] = useState(false)

  const handleModalPost = () => {
    handleClose()
    setShowPost(!showPost)
  }
  useEffect(() => {
    if (!userContext.loading) {
      // console.log(userContext.user.bookmark.post)
      userContext.user.bookmark.post.forEach((element) => {
        if (element._id === post._id) {
          setBookmarkStatus(true)
        }
      })
      // if (userContext.user.bookmark.post.includes(post._id)) {
      //   setBookmarkStatus(true)
      // } else {
      //   setBookmarkStatus(false)
      // }
      // userContext.user.bookmark.post.map((item) => {
      //   if (item._id === post._id) {
      //     setBookmarkStatus(true)
      //   } else {
      //     setBookmarkStatus(false)
      //   }
      //   return 0
      // })
    }
  }, [post._id, userContext.loading, userContext.user.bookmark.post])
  useEffect(() => {
    // post.likes.filter((like) => {
    //   if (like === authContext.user._id) {
    //     setLikeStatus(true)
    //   } else {
    //     setLikeStatus(false)
    //   }
    if (post.likes.includes(authContext.user._id)) {
      setLikeStatus(true)
    } else {
      setLikeStatus(false)
    }
  }, [authContext.user._id, post.likes])

  const handleLikeBtn = () => {
    if (!likeStatus) {
      postContext.likePost(post._id, authContext.user._id)
      setLikeCount(likeCount + 1)
      setLikeStatus(true)
    } else {
      postContext.unLikePost(post._id, authContext.user._id)
      setLikeCount(likeCount - 1)
      setLikeStatus(false)
    }
  }
  const handleBookmarkBtn = () => {
    const formData = {
      type: post.objType,
      typeId: post._id,
    }
    if (!bookmarkStatus) {
      userContext.bookmarkItem(authContext.user._id, formData)
      setBookmarkStatus(true)
    } else {
      userContext.unBookmarkItem(authContext.user._id, formData)
      setBookmarkStatus(false)
    }
  }
  const handleCommentSend = async () => {
    await postContext.addComment(post._id, authContext.user._id, comment)
  }
  return (
    <div className="bg-secondary px-2 py-2 mb-4">
        <span className="">{post.content}</span>
        <span className="text-info">{<Moment fromNow>{post.createdAt}</Moment>}</span>
    </div>
  )
}
