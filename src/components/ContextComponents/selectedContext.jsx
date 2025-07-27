import { Children, createContext, useContext, useState } from 'react';

export const selectedContext = createContext();

export function SelectedProvider({children}) {
    const [selected, setSelected] = useState('')
return(
    <selectedContext.Provider value={{selected, setSelected}}>
        {children}
    </selectedContext.Provider>
)
}

export function useSelected(){
    return useContext (selectedContext)
}
