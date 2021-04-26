import React from 'react'

// MUI
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

export default function SearchResults() {
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
          </Paper>
        </Grid>

      </Grid >
    </>
  )
}
