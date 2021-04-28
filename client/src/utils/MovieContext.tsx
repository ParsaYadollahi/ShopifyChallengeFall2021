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
  anchorElPopover: HTMLElement | null
  setAnchorElPopover: React.Dispatch<React.SetStateAction<EventTarget & HTMLElement | null>>
}


export const PopoverContext = createContext<TPopoverContext>({
  anchorElPopover: null,
  setAnchorElPopover: () => { }
})
