import React from 'react'

// MUI
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from "@material-ui/core/Button"

// Components
import Nominations from "./Nominations"

type Props = {
  movieData: IMovies[]
}

const SearchResults: React.FC<Props> = ({ movieData }) => {

  const mapMovies = () => {
    return (
      movieData.map(movie =>
        <>
          <ListItem>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >

              <Grid item xs={8} container
                justify="flex-start">
                <Typography>
                  {movie.Title} ({movie.Year})
                </Typography>
              </Grid>
              <Grid item xs={4} container
                justify="flex-end">
                <Button variant="outlined" >
                  Nominate
                  </Button>
              </Grid>
            </Grid>
          </ListItem>
        </>)
    )
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Paper variant="outlined" square style={{ padding: '20px' }}>
            <Typography variant="h6" component="h1">
              Results for movie
          </Typography>
            <List>
              {mapMovies()}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={6} container
        >
          <Nominations />
        </Grid>
      </Grid >


    </>
  )
}

export default SearchResults;
