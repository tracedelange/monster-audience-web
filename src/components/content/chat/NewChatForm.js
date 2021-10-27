import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NewConvoUserItem from './NewConvoUserItem';

export default function NewChatForm({ open, setOpen, handleClose, handleSubmitChat, friendsList, currentUser }) {


  const [userArray, setUserArray] = useState([])
  const [userFieldInput, setUserFieldInput] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  // console.log(friendsList)
  const handleInputChange = (e) => {
    setSelectedUser(null)
    setUserFieldInput(e.target.value)
  }

  const handleResultClick = (data) => {

    setSelectedUser(data)
    setUserFieldInput(data.username)

  }

  useEffect(() => {

    let results = []
    friendsList.forEach(item => {
      if (item.id !== currentUser.id) {
        if ((item.username).includes(userFieldInput)) {
          results.push(<NewConvoUserItem handleClick={handleResultClick} key={item.id} data={item} />)
        }
      }
    })

    setUserArray(results)
  }, [userFieldInput])

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth='sm'
        onClose={handleClose}
        className='new-chat-dialog'>
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a user to start a conversation:
          </DialogContentText>
          <TextField
            label='Username'

            inputProps={{ sx: { backgroundColor: selectedUser ? '#e3f9ff' : 'white' } }}
            margin="dense"
            fullWidth
            autoComplete={"false"}
            value={userFieldInput}

            variant="outlined"
            onChange={handleInputChange}
          />
          <ul className='username-convo-list'>
            {userArray.length == friendsList.length ?
              null
              :
              userArray
            }

          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>


          <Button disabled={selectedUser ? false : true} onClick={() => {
            handleSubmitChat(selectedUser)
            setUserFieldInput('')
            setSelectedUser(null)
            setUserArray([])
          }}>Create Chat</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
