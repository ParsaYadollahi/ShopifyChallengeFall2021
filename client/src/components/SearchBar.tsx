import React, { useState } from 'react'

// MUI
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper"
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

// utils
import { NominationsContext, PopoverContext } from '../utils/MovieContext'
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import themeFile from '../utils/theme';

// Components
import SearchResults from "./SearchResults"

const useStyles = makeStyles((theme: Theme & typeof themeFile) => {
  return ({
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: `${theme.palette.primary.main} !important`,
      }
    },
    notchedOutline: {
      borderWidth: '1px',
      borderColor: '#d9ded1 !important'
    },
    cssLabel: {
      color: themeFile.colors.white,
    },
    cssFocused: {
      color: themeFile.colors.white,
      borderColor: '#d9ded1 !important'
    },
    input: {
      color: themeFile.colors.white
    }

  })
});

const SearchBar: React.FC = () => {
  const classes = useStyles()

  const [movieNominations, setNominations] = useState<IMovies[]>([])
  const [anchorElPopover, setAnchorElPopover] = useState<Element | null>(null)
  const [movie, setMovieTitle] = useState<String>('')
  const [textFieldData, setTextFieldData] = useState<{ title: String }>({ title: '' })


  const handleTextField = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTextFieldData({
      ...textFieldData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (textFieldData !== undefined) {
        setMovieTitle(textFieldData.title)
        setTextFieldData({ title: "" })
      }
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ margin: '30px 0px' }}
      >
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            square
            style={{ backgroundColor: themeFile.colors.grey }}>

            <Grid
              container
              style={{ padding: '30px' }}
            >
              <Grid item xs={12}>
                <Typography style={{ color: themeFile.colors.white }}>
                  Movie title
                </Typography>
                <TextField
                  name='body'
                  type='text'
                  variant="outlined"
                  id='title'
                  value={textFieldData.title}
                  placeholder='Search Movie'
                  fullWidth
                  onChange={handleTextField}
                  onKeyPress={handleKeywordKeyPress}
                  style={{ color: themeFile.colors.white }}


                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: themeFile.colors.white }} />
                      </InputAdornment>
                    ),
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                      input: classes.input
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          <Grid>
            <NominationsContext.Provider
              value={{ movieNominations, setNominations }}
            >
              <PopoverContext.Provider value={{ anchorElPopover, setAnchorElPopover }}>
                <Grid item xs={12}>
                  <SearchResults movieTitle={movie} />
                </Grid>
              </PopoverContext.Provider>
            </NominationsContext.Provider>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default SearchBar;
