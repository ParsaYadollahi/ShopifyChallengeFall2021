import { createContext } from 'react';

type TContext = {
  movieNominations: IMovies[];
  setNominations: React.Dispatch<React.SetStateAction<IMovies[]>>
}

export const NominationsContext = createContext<TContext>({
  movieNominations: [],
  setNominations: () => { }
})


type TPopoverContext = {
  anchorElPopover: Element | null
  setAnchorElPopover: React.Dispatch<React.SetStateAction<Element | null>>
}


export const PopoverContext = createContext<TPopoverContext>({
  anchorElPopover: null,
  setAnchorElPopover: () => { }
})
