import { Button, Grid, TextField } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { Form, Modal } from "react-bootstrap"
import { AuthContext } from "../../../context/authContext/authContext"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"

export const PollModal = ({
  show,
  handleModal,
  pollFunction,
  modalTitle,
  poll,
}) => {
  const authContext = useContext(AuthContext)
  const [uploadFile, setUploadFile] = useState(null)
  const [preview, setPreview] = useState(poll === undefined ? "" : poll.picture)
  const [content, setContent] = useState(poll === undefined ? "" : poll.content)
  const [title, setTitle] = useState(poll === undefined ? "" : poll.title)
  const [pollBody, setPollBody] = useState(poll === undefined ? "" : poll.poll)
  const [titleError, setTitleError] = useState("")
  const [pollBodyError, setPollBodyError] = useState("")

  //console.log(preview)
  const handleForm = async (e) => {
    e.preventDefault()
    if(title != "" && pollBody != ""){
      //alert("Perfect")
      const formData = new FormData()
      formData.append("user", authContext.user._id)
      formData.append("title", title)
      formData.append("poll", pollBody)
      const pollData = {
        user: authContext.user._id,
        title,
        poll: pollBody,
      }
      poll
        ? await pollFunction(authContext.user._id, poll._id, pollData)
        : await pollFunction(authContext.user._id, pollData)
      handleModal()
    }else{
      if(title == ""){
        setTitleError("invalid title")
      }
      if(pollBody == ""){
        setPollBodyError("invalid link")
      }
    } 
  }
  const styleTheme =
    authContext.theme === "dark"
      ? { background: "#121212", color: "whitesmoke" }
      : null
  const styleThemeMain =
    authContext.theme === "dark" ? { background: "rgb(0 0 0 / 88%)" } : null

  return (
    <Modal
      show={show}
      onHide={handleModal}
      centered
      size="lg"
      id="input-modal"
      style={styleThemeMain}
    >
      <Modal.Header closeButton style={styleTheme}>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={styleTheme}>
        <form onSubmit={handleForm}>
          <Grid container justify="space-between" direction="row" spacing={3}>
            <Grid item container direction="column" md={6}>
              <Grid item>
              <TextField
                  className="mb-3"
                  variant="outlined"
                  placeholder="Title"
                  size="small"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {titleError && <p className=" text-danger mb-3">{titleError}</p>}
                
                <TextField
                  multiline
                  fullWidth
                  className="mb-3"
                  variant="outlined"
                  rows={4}
                  placeholder="Poll"
                  size="small"
                  value={pollBody}
                  onChange={(e) => setPollBody(e.target.value)}
                />
                {pollBodyError && <p className=" text-danger mb-3">{pollBodyError}</p>}
                
              </Grid>
              {/*<Grid item>
                <Form.File
                  type="file"
                  onChange={(e) => {
                    setUploadFile(e.target.files[0])
                    setPreview(URL.createObjectURL(e.target.files[0]))
                  }}
                  label="Upload media"
                  multiple
                />
              </Grid>*/}
            </Grid>
            {/*<Grid item md={6}>
              {uploadFile || preview ? (
                <img src={preview} alt="input file" width="100%" />
              ) : (
                <div
                  className="container"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60%",
                    flexDirection: "column",
                  }}
                >
                  <AddPhotoAlternateIcon fontSize="large" />
                  <h6>Image Preview</h6>
                </div>
              )}
            </Grid>*/}
          </Grid>
        </form>
      </Modal.Body>
      <Modal.Footer style={styleTheme}>
        <Button size="small" onClick={handleModal}>
          Discard
        </Button>
        <Button type="submit" size="small" onClick={handleForm}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
