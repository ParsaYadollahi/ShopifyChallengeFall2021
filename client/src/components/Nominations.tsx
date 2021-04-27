import React, { useContext } from 'react'
import { NominationsContext } from '../utils/NominationsContext'

// MUI
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from "@material-ui/core/Button"

type Props = {
  nominationData: IMovies[]
}

const Nominations: React.FC<Props> = ({ nominationData }) => {


  const { movieNominations, setNominations } = useContext(NominationsContext)

  const handleDeleteNomination = (movieNomination: IMovies) => {
    setNominations(movieNominations.filter((deletedNomination) => deletedNomination.Title !== movieNomination.Title));
  }

  const mapNominations = () => {
    return (
      nominationData.map((nomination, k) =>
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
                {nomination.Title} ({nomination.Year})
                </Typography>
            </Grid>
            <Grid item xs={4} container
              justify="flex-end">
              <Button variant="outlined"
                onClick={(e) => { handleDeleteNomination(nomination) }}
              >
                Delete
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
      >
        <Grid item xs={12}>
          <Paper variant="outlined" square>
            <Typography variant="h6" component="h1">
              Nominations
          </Typography>
            <List>
              {mapNominations()}
            </List>
          </Paper>
        </Grid>

      </Grid >
    </>

  )
}


export default Nominations;
