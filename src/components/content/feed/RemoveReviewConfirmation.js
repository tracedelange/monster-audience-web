import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { deleteReview } from '../../../requests';
import { deleteReviewStore } from '../../../actions/feed';
import { useDispatch } from 'react-redux';

export default function AlertDialog({data, feedIndex}) {


    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = () => {
        setOpen(false)
        // console.log(data)
        deleteReview(data.id)
        .then(res=> {
            if (res.ok){
                dispatch(deleteReviewStore({review_id : data.id, subject_id : data.subject_id}))
            } else {
                console.log('Uh oh')
            }
        })
    }

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <>
            <RemoveCircleOutlineIcon onClick={handleClickOpen} className='removeSVG' />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You're about to delete your review. This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color={'primary'} onClick={handleClose} autoFocus >Cancel</Button>
                    <Button sx={{color: 'red'}} onClick={handleDelete} >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
