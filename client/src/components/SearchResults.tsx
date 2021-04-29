import React, { useState, useEffect, useContext } from 'react'
import axios, { AxiosResponse } from 'axios'

// MUI
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from "@material-ui/core/Button"
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import Nominations from "./Nominations"
import PopoverPoster from "./PopoverPoster"

// utils
import { NominationsContext, PopoverContext } from '../utils/MovieContext'
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import themeFile from '../utils/theme';


type Props = {
  movieTitle: String
}

const useStyles = makeStyles((theme: Theme & typeof themeFile) => {
  return ({
    addButton: theme.addButton,
    resultsMovie: theme.resultTitles,
    resultsList: theme.resultsLists
  })
});

const baseUrl = "https://www.omdbapi.com/?apikey=4b14c67e&s="

const getMovie = async (movieTitle: String): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const movieData: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + movieTitle
    )
    return movieData
  } catch (error) {
    throw new Error(error);
  }
};

const SearchResults: React.FC<Props> = ({ movieTitle }) => {

  const classes = useStyles();

  const { movieNominations, setNominations } = useContext(NominationsContext)
  const { anchorElPopover, setAnchorElPopover } = useContext(PopoverContext)

  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [movies, setMovies] = useState<IMovies[]>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const [moviePopoverPoster, setmoviePopoverPoster] = React.useState<string>('');



  const handleAddNomination = (movieNomination: IMovies) => {
    if (movieNominations.length < 5) {
      setNominations([...movieNominations, movieNomination])
    } else {
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
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >

              <Grid
                item
                xs={8}
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

                >
                  {movie.Title} ({movie.Year})
                </Typography>
              </Grid>
              <Grid item xs={4} container
                justify="flex-end">


                <Button variant="outlined"
                  disabled={nominationsContainMovie(movie.imdbID)}
                  onClick={(e) => { handleAddNomination(movie) }}
                  className={classes.addButton}
                  size="small"
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
        <Grid item xs={6}>
          <Paper variant="outlined" square>
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

        <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => { setOpenAlert(false) }} id="snackBarWarning" >
          <Alert severity="warning" onClose={() => { setOpenAlert(false) }}>
            <AlertTitle>Warning</AlertTitle>
            <strong id="strongMovieTitleWarning" >Delete </strong> one of your nominations to <strong> add this movie! </strong>
          </Alert>
        </Snackbar >

        <Snackbar open={openAlertError} autoHideDuration={2700} onClose={() => { setOpenAlertError(false) }} id="snackBarError" >
          <Alert severity="error" onClose={() => { setOpenAlertError(false) }}>
            <AlertTitle>Error</AlertTitle>
            The movie <strong id="strongMovieTitleError">{movieTitle}</strong> doesn't exist!
          </Alert>
        </Snackbar >

        <PopoverPoster moviePopoverPoster={moviePopoverPoster} />

        <Grid item xs={6} container>
          <Nominations nominationData={movieNominations} />
        </Grid>
      </Grid >
    </>
  )
}

export default SearchResults;
