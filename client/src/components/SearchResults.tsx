import React, { useState, useEffect, useContext } from 'react'

// MUI
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from "@material-ui/core/Button"
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from "@material-ui/core/Link"

// Components
import Nominations from "./Nominations"
import PopoverPoster from "./PopoverPoster"
import MovieInfoDialog from "./MovieInfoDialog"
import SnackBarSearch from "./SnackBarSearch"

// utils
import { NominationsContext, PopoverContext } from '../utils/MovieContext'
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import themeFile from '../utils/theme';

// API
import { getMovie } from "./../api/Search"


type Props = {
  movieTitle: String
}

const useStyles = makeStyles((theme: Theme & typeof themeFile) => {
  return ({
    addButton: theme.addButton,
    resultsMovie: theme.resultTitles,
    resultsList: theme.resultsLists,
  })
});

const SearchResults: React.FC<Props> = ({ movieTitle }) => {
  const classes = useStyles();

  const { movieNominations, setNominations } = useContext(NominationsContext)
  const { anchorElPopover, setAnchorElPopover } = useContext(PopoverContext)

  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [movies, setMovies] = useState<IMovies[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const [moviePopoverPoster, setmoviePopoverPoster] = React.useState<string>('');

  const [openDialog, setOpenDialog] = React.useState(false);
  const [movieId, setMovieId] = React.useState<String>('');

  const handleAddNomination = (movieNomination: IMovies) => {
    if (movieNominations.length < 5) {
      setNominations([...movieNominations, movieNomination])
    }
    if (movieNominations.length === 4) {
      setOpenAlert(true)
    }
  }

  const handlePopover = (e: React.MouseEvent<HTMLElement, MouseEvent>, moviePoster: string) => {
    setmoviePopoverPoster(moviePoster)
    setAnchorElPopover(e.currentTarget);
  };

  useEffect(() => {
    fetchMovie(movieTitle)
  }, [movieTitle])

  const fetchMovie = (movieTitle: String): void => {
    getMovie(movieTitle)
      .then((movieData: IMovies[] | any) => {
        if (movieTitle !== '') {
          setLoading(true)
          if (movieData.data.Response === "False") {
            setLoading(false)
            setOpenAlertError(true)
          }
        }
        setMovies([...movieData.data.Search])
        setLoading(false)
      })
      .catch((err: Error) => console.log(err))
  }

  const openDialogMovie = (movieimdbID: String) => {
    setMovieId(movieimdbID)
    setOpenDialog(true)
  }

  const nominationsContainMovie = (movieimdbID: String) => {
    let nominationsContainMovie = false
    movieNominations.forEach((m) => {
      if (m.imdbID === movieimdbID) {
        return nominationsContainMovie = true
      }
    })
    return nominationsContainMovie
  }

  const mapMovies = () => {
    return (
      movies.map((movie, k) =>
        <Grid
          key={k}
          className={classes.resultsList}
        >
          {k !== 0 ? <Divider variant="middle" /> : <> </>}
          <ListItem>
            <Grid container>

              <Grid
                item
                sm={9}
                xs={12}
                container
                justify="flex-start"
              >
                <Typography
                  variant='subtitle2'
                  component="h2"
                  aria-owns={Boolean(anchorElPopover) ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(e: any) => { handlePopover(e, movie.Poster) }}
                  onMouseLeave={() => { setAnchorElPopover(null) }}
                  style={{ color: themeFile.colors.white }}

                >
                  <Link color="inherit" onClick={() => { openDialogMovie(movie.imdbID) }}>
                    <strong>{movie.Title}</strong> ({movie.Year})
                  </Link>
                </Typography>
              </Grid>
              <Grid
                item
                sm={3}
                xs={12}
                container
                justify="flex-end"
              >

                <Button variant="outlined"
                  disabled={nominationsContainMovie(movie.imdbID) || movieNominations.length >= 5}
                  onClick={() => { handleAddNomination(movie) }}
                  className={classes.addButton}
                  size="small"
                  id={`button${k}`}
                >
                  Nominate
                  </Button>
              </Grid>
            </Grid>
          </ListItem>
        </Grid >
      )
    )
  }
  return (
    <>
      <Grid
        container
        spacing={3}
        item
        style={{ padding: '30px 0px' }}
      >
        <Grid item sm={6} xs={6}>
          <Paper variant="outlined" square style={{ backgroundColor: themeFile.colors.grey }}>
            <Typography variant="h6" component="h1" className={classes.resultsMovie}>
              Results for movie
          </Typography>
            {!loading ? (
              <List>
                {mapMovies()}
              </List>
            ) : (
              <Grid container justify="center">
                <CircularProgress style={{ padding: 50, color: 'black' }} />
              </Grid>
            )}
          </Paper>
        </Grid>

        <SnackBarSearch
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          openAlertError={openAlertError}
          setOpenAlertError={setOpenAlertError}
          movieTitle={movieTitle} />

        <PopoverPoster
          moviePopoverPoster={moviePopoverPoster} />
        <MovieInfoDialog
          openDialog={openDialog}
          onClose={() => { setOpenDialog(false) }}
          movieId={movieId}
          button={"Nominate"} />

        <Grid item xs={6} container>
          <Nominations nominationData={movieNominations} />
        </Grid>
      </Grid >
    </>
  )
}

export default SearchResults;
