import React, { useState } from "react"
import './App.css';

// Components
import SearchBar from "./components/SearchBar"
import PopoverHelp from "./components/PopoverHelp"

// MUI
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Popover from '@material-ui/core/Popover';

// Icons
import ShopIcon from '@material-ui/icons/Shop';
import HelpIcon from '@material-ui/icons/Help';

// Theme
import themeFile from './utils/theme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';


const useStyles = makeStyles((theme: Theme & typeof themeFile) => {
  return ({
    title: {
      padding: '100px 0px 15px 0px',
      fontWeight: 500,
      color: themeFile.colors.green
    },
    helpIcon: {
      fontSize: 20,
      verticalAlign: 'middle',
      padding: '0px 10px',
      color: '#575757'
    },
    shopIcon: {
      color: themeFile.colors.green,
      fontSize: 50,
      verticalAlign: 'middle'
    }
  })
});

const theme = createMuiTheme(themeFile);

function App() {
  const classes = useStyles()
  const [anchorElPopover, setAnchorElPopover] = useState<Element | null>(null);

  const handlePopoverOpen = (e: React.MouseEvent<Element, MouseEvent>) => {
    setAnchorElPopover(e.currentTarget);
  };

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item xs={10}
          >
            <Typography variant="h4" component="h1" className={classes.title}>
              <ShopIcon className={classes.shopIcon} />
              The Shoppies
                <HelpIcon
                className={classes.helpIcon}
                aria-owns={Boolean(anchorElPopover) ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={(e: React.MouseEvent<Element, MouseEvent>) => { handlePopoverOpen(e) }}
                onMouseLeave={() => { setAnchorElPopover(null) }}
              />

              <Popover
                open={Boolean(anchorElPopover)}
                anchorEl={anchorElPopover}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={() => { setAnchorElPopover(null) }}
                disableRestoreFocus
                style={{ pointerEvents: 'none' }}

              >
                <PopoverHelp />
              </Popover>
            </Typography>
            <SearchBar />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </>
  );
}

export default App;
