import React, { useContext, useEffect } from 'react'

// MUI
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Link from "@material-ui/core/Link"
import { TransitionProps } from '@material-ui/core/transitions';

// Components
import PopoverPoster from "./PopoverPoster"
import MovieInfoDialog from "./MovieInfoDialog"

// utils
import { NominationsContext, PopoverContext } from '../utils/MovieContext'
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import themeFile from '../utils/theme';
import Divider from '@material-ui/core/Divider'


type Props = {
  nominationData: IMovies[]
}

const useStyles = makeStyles((theme: Theme & typeof themeFile) => {
  return ({
    removeButton: theme.removeButton,
    resultNominations: theme.resultTitles,
    resultsList: theme.resultsLists,
    removeButtonDialog: theme.removeButtonDialog,
    addButtonDialog: theme.addButtonDialog
  })
});

const dialogTransition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Nominations: React.FC<Props> = ({ nominationData }) => {

  const classes = useStyles();

  const { movieNominations, setNominations } = useContext(NominationsContext)
  const { anchorElPopover, setAnchorElPopover } = useContext(PopoverContext)
  const [moviePopoverPoster, setmoviePopoverPoster] = React.useState<string>('');

  const [openDialog, setOpenDialog] = React.useState(false);
  const [movieId, setMovieId] = React.useState<String>('');

  const handlePopover = (e: React.MouseEvent<HTMLElement, MouseEvent>, moviePoster: string) => {
    setmoviePopoverPoster(moviePoster)
    setAnchorElPopover(e.currentTarget);
  };

  useEffect(() => {
    const localNominations = JSON.parse(localStorage.getItem("nominations") || "[]")
    if (localNominations.length !== 0) {
      setOpenDialog(true)
    }
    setNominations([...localNominations])
  }, [setOpenDialog, setNominations])

  useEffect(() => {
    localStorage.setItem("nominations", JSON.stringify(movieNominations))
  }, [movieNominations])

  const handleDeleteNomination = (movieNomination: IMovies) => {
    setNominations(movieNominations.filter((deletedNomination) => deletedNomination.Title !== movieNomination.Title));
  }

  const openDialogMovie = (movieimdbID: String) => {
    setMovieId(movieimdbID)
    setOpenDialog(true)
  }

  const mapNominations = () => {
    return (
      nominationData.map((nomination, k) =>
        <Grid
          key={k}
          className={classes.resultsList}
        >
          {k !== 0 ? <Divider variant="middle" /> : <> </>}
          <ListItem key={k}>
            <Grid
              container
              justify="center"
            >

              <Grid
                item
                xs={12}
                sm={9}
                container
                justify="flex-start"
              >
                <Typography
                  variant='subtitle2'
                  component="h2"
                  aria-owns={Boolean(anchorElPopover) ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(e: any) => { handlePopover(e, nomination.Poster) }}
                  onMouseLeave={() => { setAnchorElPopover(null); setmoviePopoverPoster('') }}
                  style={{ color: themeFile.colors.white, }}
                >
                  <Link color="inherit" onClick={() => { openDialogMovie(nomination.imdbID) }}>
                    <strong>{nomination.Title}</strong> ({nomination.Year})
                  </Link>
                </Typography>
              </Grid>
              <Grid item sm={3} xs={12} container
                justify="flex-end">
                <Button variant="outlined"
                  onClick={(e) => { handleDeleteNomination(nomination) }}
                  className={classes.removeButton}
                  size="small"
                  id={`deleteButton${k}`}
                >
                  Remove
                  </Button>
              </Grid>
            </Grid>
          </ListItem>
        </Grid>
      )
    )
  }



  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
      >
        <Grid item xs={12}>
          <Paper variant="outlined" square style={{ backgroundColor: themeFile.colors.grey }}>
            <Typography variant="h6" component="h1" className={classes.resultNominations}>
              Nominations
          </Typography>
            <List>
              {mapNominations()}
            </List>
          </Paper>
        </Grid>

      </Grid >

      <Dialog
        open={openDialog}
        keepMounted
        TransitionComponent={dialogTransition}
        onClick={() => { setOpenDialog(false) }}
      >
        <Grid style={{ backgroundColor: themeFile.colors.grey }}>
          <DialogTitle id="dialogKeep" style={{ color: themeFile.colors.white }} >Would you like to <strong>keep</strong> your previous nominations?</DialogTitle>
          <DialogActions >
            <Button onClick={() => { setOpenDialog(false) }} id="buttonKeep" className={classes.addButtonDialog}>
              Keep
          </Button>
            <Button
              id="buttonClear"
              onClick={() => {
                setOpenDialog(false)
                setNominations([])
              }}
              className={classes.removeButtonDialog}
            >
              Remove
          </Button>
          </DialogActions>
        </Grid>
      </Dialog>
      <PopoverPoster moviePopoverPoster={moviePopoverPoster} />
      <MovieInfoDialog openDialog={openDialog} onClose={() => { setOpenDialog(false) }} movieId={movieId} button={"Remove"} />
    </>

  )
}


export default Nominations;
