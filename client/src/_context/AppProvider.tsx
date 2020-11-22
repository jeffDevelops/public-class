import React, { createContext, FC, ReactNode, useContext, useState } from 'react'
import { App, User } from 'realm-web'

interface AppContextValue {
  app: App
  user: User | null
  setUser(user: User): void
}

export const AppContext = createContext({} as AppContextValue)

interface Props {
  app: App
  children: ReactNode
}

const AppContextProvider: FC<Props> = ({ app, children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  return (
    <AppContext.Provider value={{ app, user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider

export const useApp = (): AppContextValue => {
  const appContextValue = useContext(AppContext)

  if (!appContextValue)
    throw new Error(
      'Tried consuming AppContextProvider context value from outside its render hierarchy.',
    )

  return appContextValue
}
