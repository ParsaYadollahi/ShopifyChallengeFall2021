import axios, { AxiosResponse } from 'axios'

const baseUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_NEXT_PUBLIC_OMDB_API_KEY}`


export const getMovie = async (movieTitle: String): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const movieData: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "s=" + movieTitle
    )
    return movieData
  } catch (error) {
    throw new Error(error);
  }
};


export const getMovieById = async (movieId: String): Promise<AxiosResponse<ApiDataTypeId>> => {
  try {
    const movieData: AxiosResponse<ApiDataTypeId> = await axios.get(
      baseUrl + "i=" + movieId
    )
    return movieData
  } catch (error) {
    throw new Error(error);
  }
};
