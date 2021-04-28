import React, { useContext } from 'react'
import { NominationsContext } from '../utils/NominationsContext'

// MUI
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from "@material-ui/core/Button"

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
    resultsList: theme.resultsLists
  })
});


const Nominations: React.FC<Props> = ({ nominationData }) => {

  const classes = useStyles();


  const { movieNominations, setNominations } = useContext(NominationsContext)

  const handleDeleteNomination = (movieNomination: IMovies) => {
    setNominations(movieNominations.filter((deletedNomination) => deletedNomination.Title !== movieNomination.Title));
  }

  const mapNominations = () => {
    return (
      nominationData.map((nomination, k) =>
        <Grid
          key={k}
          className={classes.resultsList}
        >
          {k != 0 ? <Divider variant="middle" /> : <> </>}
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
                justify="flex-start"
              >
                <Typography variant='subtitle2' component="h2">
                  {nomination.Title} ({nomination.Year})
                </Typography>
              </Grid>
              <Grid item xs={4} container
                justify="flex-end">
                <Button variant="outlined"
                  onClick={(e) => { handleDeleteNomination(nomination) }}
                  className={classes.removeButton}
                  size="small"
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
          <Paper variant="outlined" square>
            <Typography variant="h6" component="h1" className={classes.resultNominations}>
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
