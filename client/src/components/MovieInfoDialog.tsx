import React, { useState } from 'react'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"


export interface SimpleDialogProps {
  openDialog: boolean;
  onClose: () => void;
}


const MovieInfoDialog = (props: SimpleDialogProps) => {

  const { onClose, openDialog } = props;


  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={openDialog}>


      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Disagree
          </Button>
        <Button onClick={onClose}>
          Agree
          </Button>
      </DialogActions>

    </Dialog >
  )


}




export default MovieInfoDialog
