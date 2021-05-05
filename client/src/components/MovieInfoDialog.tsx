import React, { useState, useEffect, useContext } from 'react'

import Dialog from '@material-ui/core/Dialog';
import Button from "@material-ui/core/Button"
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

// Components
import { getMovieById } from "./../api/Search"
import poster404 from "./../images/poster404.png"

// utils
import { NominationsContext } from '../utils/MovieContext'
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import themeFile from '../utils/theme';
import { AxiosResponse } from 'axios';

export interface SimpleDialogProps {
  openDialog: boolean;
  onClose: () => void;
  movieId: String;
  button: String;
}

const useStyles = makeStyles((theme: Theme & typeof themeFile) => {
  return ({
    removeButton: theme.removeButtonDialog,
    addButton: theme.addButtonDialog,
    props: {
      fontSize: '12px',
      fontWeight: 600,
      color: themeFile.colors.white
    },
    propTitle: {
      fontSize: '10px',
      padding: '20px 0px',
      color: themeFile.colors.white
    }
  })
});


const MovieInfoDialog = (props: SimpleDialogProps) => {

  const classes = useStyles()
  const { onClose, openDialog, movieId, button } = props;

  const { movieNominations, setNominations } = useContext(NominationsContext)
  const [movieData, setMovieData] = useState<IMoviesId>()

  useEffect(() => {
    fetchMovieById(movieId)
  }, [movieId])

  const fetchMovieById = (movieId: String): void => {
    getMovieById(movieId)
      .then((movieData: AxiosResponse<ApiDataTypeId>) => {
        setMovieData(movieData.data)
      })
      .catch((err: Error) => console.log(err))
  }

  const nominationsContainMovie = (movieimdbID: String | undefined) => {
    let nominationsContainMovie = false
    movieNominations.forEach((m) => {
      if (m.imdbID === movieimdbID) {
        return nominationsContainMovie = true
      }
    })
    return nominationsContainMovie
  }

  const handleAddNomination = (movieNomination: IMovies) => {
    if (movieNominations.length < 5) {
      setNominations([...movieNominations, movieNomination])
    }
    onClose()
  }

  const handleDeleteNomination = (movieNomination: IMovies) => {
    setNominations(movieNominations.filter((deletedNomination) => deletedNomination.Title !== movieNomination.Title));
    onClose()
  }

  const titles = [
    "Title",
    "Release Date",
    "Director(s)",
    "Genre(s)",
    "Awards",
    "Rating (IMDB)"
  ]
  const mapData = [
    movieData?.Title,
    movieData?.Released,
    movieData?.Director,
    movieData?.Genre,
    movieData?.Awards,
    movieData?.imdbRating,
    movieData?.Plot
  ]

  const displayData = () => {
    return (
      mapData.map((prop, k) =>
        <Grid item key={k} style={{ padding: "5px 0px" }}>
          <Typography variant="body1" className={classes.props}>
            {prop}
          </Typography>
          {k !== 6 ? (
            <Typography variant="caption" className={classes.propTitle}>
              {titles[k]}
            </Typography>
          ) : (<> </>)}
        </Grid>
      )
    )
  }

  const displayButton = (button: String) => {
    return (
      button === "Nominate" ? (
        <Button
          className={classes.addButton}
          disabled={nominationsContainMovie(movieData?.imdbID) || movieNominations.length >= 5}
          onClick={() => {
            handleAddNomination(movieData!)
          }}
        >
          {button}
        </Button>
      ) : (
        <Button
          className={classes.removeButton}
          onClick={() => { handleDeleteNomination(movieData!) }}
        >
          {button}
        </Button>
      )
    )
  }

  return (
    movieId !== '' ? (
      <Dialog
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
        open={openDialog}
      >
        <Card style={{ backgroundColor: themeFile.colors.grey }}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} style={{ padding: '20px 0px 0px 20px' }}>
              <Typography variant="h6" style={{
                fontWeight: 600, color: themeFile.colors.green
              }}>
                Movie Details - {movieData?.Title} ({movieData?.Year})
            </Typography>
            </Grid>
            <Grid item xs={5}>
              <CardMedia
                style={{ padding: 10 }}
                src={movieData?.Poster === "N/A" ? poster404 : movieData?.Poster}
                title="Movie Poster"
                component="img"
              />
            </Grid>
            <Grid item xs={7} style={{ padding: 10 }}>
              <CardContent style={{ padding: "10px 25px" }}>
                {displayData()}
              </CardContent>

              <Grid container justify="flex-end" item xs={12} style={{ padding: 10 }}>
                {displayButton(button)}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Dialog >
    ) : <> </>)
}

export default MovieInfoDialog
