'use client'
import {useRouter, usePathname } from 'next/navigation'
import React, { createContext, useState, useEffect, useContext, useMemo } from 'react'

interface IHistoryContext {
  history: string[],
  setHistory(data: string[]): void,
  backIfPreviosIsProde(): void,
}

export const HistoryContext = createContext<IHistoryContext | null>(null)


export default function HistoryContextProvider({ children } : {children : React.ReactNode}) {
const router = useRouter();
const [history, setHistory] = useState<string[]>([])

//   function back() {
//     for (let i = history.length - 2; i >= 0; i--) {
//       const route = history[i]
//       if (!route.includes('#') && route !== pathname) {
//         router.push(route)

//         // if you want to pop history on back
//         const newHistory = history.slice(0, i)
//         setHistory(newHistory)

//         break
//       }
//     }
//   }
     //check if router has a new path
    const currentPath = usePathname();
    console.log(currentPath + "<-  currnet path is  " + history[history.length-1])
    useEffect(() => {
        if(history[history.length-1] != currentPath){
            setHistory([...history, currentPath])
    }}, [history, currentPath])

    function backIfPreviosIsProde() {
        console.log(history[history.length-2] + "<-  previos path is  ")
        if(history && history.length > 1){
            if(history[history.length-2].startsWith('/prode/')){
                router.back();
                history.pop();
            }
        }
        
    }

  

  return (
    <HistoryContext.Provider
      value={{
        backIfPreviosIsProde,
        history,
        setHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  if (context === null) {
    throw new Error('useHistory must be used within a HistoryContextProvider')
  }
  return context
}