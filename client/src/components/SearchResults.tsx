import React from 'react'

// MUI
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

type Props = {
  movieData: IMovies[]
}

const SearchResults: React.FC<Props> = ({ movieData }) => {
  movieData.map(movie => console.log(movie.Title))
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Paper variant="outlined" square>
            <Typography>
              Results for movie
          </Typography>
            <div>
              {movieData.map(movie => <div>{movie.Title}</div>)}
            </div>
          </Paper>
        </Grid>

      </Grid >
    </>
  )
}

export default SearchResults;
