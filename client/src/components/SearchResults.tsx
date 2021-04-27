import React, { useContext } from 'react'

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


// Components
import Nominations from "./Nominations"

// utils
import { NominationsContext } from '../utils/NominationsContext'

type Props = {
  movieData: IMovies[]
}

const SearchResults: React.FC<Props> = ({ movieData }) => {

  const { movieNominations, setNominations } = useContext(NominationsContext)
  const [open, setOpen] = React.useState(false);

  const handleAddNomination = (movieNomination: IMovies) => {
    if (movieNominations.length < 5) {
      setNominations([...movieNominations, movieNomination])
    } else {
      setOpen(true)
    }
  }

  const mapMovies = () => {
    return (
      movieData.map((movie, k) =>
        <ListItem key={k}>
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
              justify="flex-start">
              <Typography>
                {movie.Title} ({movie.Year})
                </Typography>
            </Grid>
            <Grid item xs={4} container
              justify="flex-end">


              <Button variant="outlined"
                disabled={movieNominations.includes(movie)}
                onClick={(e) => { handleAddNomination(movie) }}
              >
                Nominate
                  </Button>
            </Grid>
          </Grid>
        </ListItem>)
    )
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <Paper variant="outlined" square>
            <Typography variant="h6" component="h1">
              Results for movie
          </Typography>
            <List>
              {mapMovies()}
            </List>
          </Paper>
        </Grid>

        <Snackbar open={open} autoHideDuration={3000} onClose={() => { setOpen(false) }} >
          <Alert severity="warning" onClose={() => { setOpen(false) }}>
            <AlertTitle>Warning</AlertTitle>
            Delete one of your nominations to <strong> add this movie! </strong>
          </Alert>
        </Snackbar >

        <Grid item xs={6} container>
          <Nominations nominationData={movieNominations} />
        </Grid>
      </Grid >


    </>
  )
}

export default SearchResults;
