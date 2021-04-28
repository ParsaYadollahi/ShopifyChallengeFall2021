import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'

// MUI
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper"
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

// utils
import { NominationsContext } from '../utils/NominationsContext'

// Components
import SearchResults from "./SearchResults"

const baseUrl = "https://www.omdbapi.com/?apikey=4b14c67e&s="

const getMovie = async (movieTitle: { title: String }): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const movieData: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + movieTitle.title
    )
    return movieData
  } catch (error) {
    throw new Error(error);
  }
};

const SearchBar: React.FC = () => {

  const [movieNominations, setNominations] = useState<IMovies[]>([])

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
                  name='body'
                  type='text'
                  variant="outlined"
                  id='title'
                  value={textFieldData.title}
                  placeholder='Search Movie'
                  fullWidth
                  onChange={handleTextField}
                  onKeyPress={handleKeywordKeyPress}
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

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >

            <NominationsContext.Provider
              value={{ movieNominations, setNominations }}
            >
              <Grid item xs={12}>
                <SearchResults movieTitle={movie} />
              </Grid>

            </NominationsContext.Provider>

          </Grid>

        </Grid>
      </Grid>
    </>

  )
}


export default SearchBar;
