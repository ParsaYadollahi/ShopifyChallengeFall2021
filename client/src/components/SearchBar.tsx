import React from 'react'

// MUI
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper"
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function SearchBar() {
  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Paper variant="outlined" square>

            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              style={{ padding: '30px' }}
            >
              <Grid item xs={12}>
                <Typography>
                  Movie title
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Search Movie"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />


              </Grid>
            </Grid>
          </Paper>

        </Grid>
      </Grid>
    </>

  )
}
