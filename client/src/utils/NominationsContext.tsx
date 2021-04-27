import { createContext } from 'react';

type TContext = {
  movieNominations: IMovies[];
  setNominations: React.Dispatch<React.SetStateAction<IMovies[]>>
}

export const NominationsContext = createContext<TContext>({
  movieNominations: [],
  setNominations: () => { }
})
