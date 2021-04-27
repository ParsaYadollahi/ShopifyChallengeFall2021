type ApiDataType = {
  Poster: String,
  Title: String,
  Type: String,
  Year: String,
  imdbID: String
}

type IMovies = {
  Title: String,
  Year: String
}

type contextNomination = {
  nominationedMovies: IMovies[],
  addNominatedMovies: (nominatedMovies: IMovies[], addNominatedMovie: IMovies[]) => void
  deleteNominatedMovies: (nominatedMovies: IMovies[], deleteNominatedMovie: IMovies[]) => void
}
