import React from 'react';
import './App.css';

// Components
import SearchBar from "./components/SearchBar"

// MUI
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

function App() {
  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={10}
        >
          <Typography variant="h4" component="h1" style={{ padding: '100px 0px 15px 0px' }}>
            The Shoppies
          </Typography>

          <SearchBar />

        </Grid>
      </Grid>
    </>
  );
}

export default App;
