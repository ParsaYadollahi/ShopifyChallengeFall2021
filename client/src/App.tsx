import React from 'react';
import './App.css';

// Components
import SearchBar from "./components/SearchBar"

// MUI
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

// Theme
import themeFile from './utils/theme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme(themeFile);

function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
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
      </MuiThemeProvider>
    </>
  );
}

export default App;
