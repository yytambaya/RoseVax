import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core"
import React, { useContext } from "react"
import { AuthContext } from "../../../context/authContext/authContext"
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded"
import SupervisedUserCircleRoundedIcon from "@material-ui/icons/SupervisedUserCircleRounded"
import BookmarksRoundedIcon from "@material-ui/icons/BookmarksRounded"
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded"
import { useHistory } from "react-router-dom"
import { NoticeCard } from "./Notice/NoticeCard"
import { API } from "../../../utils/proxy"
import { Announcement, Folder, Highlight, NotificationImportant, Poll } from "@material-ui/icons"

export const HomeSideBar = () => {
  const authContext = useContext(AuthContext)
  const history = useHistory()
  return (
    <div>
      <Paper variant="elevation" elevation={3}>
        <List component="nav">
          <ListItem
            button
            onClick={() => {
              history.push(`/profile/${authContext.user._id}`)
            }}
          >
            <ListItemIcon>
              <Avatar
                alt={authContext.user.name}
                src={`${API}/pic/user/${authContext.user._id}`}
                style={{ height: "50px", width: "50px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary={<b>{authContext.user.name}</b>}
              secondary={
                <Typography variant="subtitle2" color="textSecondary">
                  {authContext.user.role === 0 && "Admin"}
                  {authContext.user.role === 1 && "Faculty"}
                  {authContext.user.role === 2 && "Admin"}
                </Typography>
              }
            />
          </ListItem>
          <Divider />

          <ListItem
            button
            onClick={() => {
              history.push("/announcements")
            }}
          >
            <ListItemIcon>
              <NotificationImportant />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="button">Announcements</Typography>}
            />
          </ListItem>

          <ListItem 
            button
            onClick={() => {
              history.push("/events")
            }}
          >
            <ListItemIcon>
              <EventNoteRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="button">Events</Typography>}
            />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              history.push("/polls")
            }}
          >
            <ListItemIcon>
              <Poll />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="button">Polls</Typography>}
            />
          </ListItem>
          
          <ListItem button>
            <ListItemIcon>
              <Highlight />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="button">Idea submission</Typography>}
            />
          </ListItem>
          
          

          <ListItem
            button
            onClick={() => {
              history.push(`/resources`)
            }}
          >
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="button">Resources</Typography>}
            />
          </ListItem>
        </List>
      </Paper>
      {/*<NoticeCard />*/}
    </div>
  )
}
