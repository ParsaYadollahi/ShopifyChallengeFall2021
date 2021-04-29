type ApiDataType = {
  Poster: String,
  Title: String,
  Type: String,
  Year: String,
  imdbID: String
}

type ApiDataTypeId = {
  Title: String
  Year: String
  Rated: String
  Released: String
  Runtime: String
  Genre: String
  Director: String
  Writer: String
  Actors: String
  Plot: String
  Language: String
  Country: String
  Awards: String
  Poster: string
  Ratings: String
  Metascore: String
  imdbRating: String
  imdbVotes: String
  imdbID: String
  Type: String
  DVD: String
  BoxOffice: String
  Production: String
  Website: String
  Response: String
}

type IMovies = {
  Title: String,
  Year: String,
  Poster: string,
  imdbID: String
}

interface IMoviesId extends IMovies {
  Released: String,
  Director: String,
  Plot: String,
  Genre: String,
  Awards: String,
  imdbRating: String
}

type contextNomination = {
  nominationedMovies: IMovies[],
  addNominatedMovies: (nominatedMovies: IMovies[], addNominatedMovie: IMovies[]) => void
  deleteNominatedMovies: (nominatedMovies: IMovies[], deleteNominatedMovie: IMovies[]) => void
}
