import React from 'react'

// MUI
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"

function Nominations() {
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
              Nominations
          </Typography>
          </Paper>
        </Grid>

      </Grid >
    </>

  )
}


export default Nominations;
