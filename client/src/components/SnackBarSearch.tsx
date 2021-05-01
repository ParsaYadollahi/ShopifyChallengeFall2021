// MUI
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export interface SnackBarProps {
  openAlert: boolean | undefined,
  openAlertError: boolean | undefined,
  setOpenAlert: (bool: boolean) => void
  setOpenAlertError: (bool: boolean) => void,
  movieTitle: String

}


const SnackBarSearch = (props: SnackBarProps) => {

  const {
    openAlert,
    openAlertError,
    setOpenAlert,
    setOpenAlertError,
    movieTitle } = props

  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={4000} onClose={() => { setOpenAlert(false) }} id="snackBarWarning" >
        <Alert severity="info" onClose={() => { setOpenAlert(false) }}>
          <AlertTitle>Warning</AlertTitle>
            You've reached a max of 5 total nominations. <br /><strong id="strongMovieTitleWarning" >Delete </strong> one of your nominations to <strong> add another movie! </strong>
        </Alert>
      </Snackbar >

      <Snackbar open={openAlertError} autoHideDuration={2700} onClose={() => { setOpenAlertError(false) }} id="snackBarError" >
        <Alert severity="error" onClose={() => { setOpenAlertError(false) }}>
          <AlertTitle>Error</AlertTitle>
            The movie <strong id="strongMovieTitleError">{movieTitle}</strong> doesn't exist!
          </Alert>
      </Snackbar >
    </>
  )

}

export default SnackBarSearch
