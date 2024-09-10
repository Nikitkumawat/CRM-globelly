import { FC, ReactNode, createContext, useContext, useEffect, useReducer } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'

const cookieDetailsName = 'token_details'

// Fill user properties here.
interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
}


interface AuthState {
  isInitialized: boolean
  isAuthenticated: boolean
  principal: UserDTO | null
  globalPermissions: Array<string>
}

interface AuthContextValue extends AuthState {
  globalPermissions: Array<string>
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

type InitializeAction = {
  type: 'INITIALIZE'
  payload: {
    isAuthenticated: boolean
    principal: UserDTO | null
    globalPermissions: Array<string>
  }
}

type LoginAction = {
  type: 'LOGIN'
  payload: {
    principal: UserDTO
    globalPermissions: Array<string>
  }
}

type LogoutAction = {
  type: 'LOGOUT'
}

type Action = InitializeAction | LoginAction | LogoutAction

const initialAuthState: AuthState = {
  isAuthenticated: true, // Make sure to keep false to enable auth
  isInitialized: true,
  principal: null,
  globalPermissions: [],
}

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'INITIALIZE': {
      const { isAuthenticated, principal, globalPermissions } = action.payload
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        globalPermissions: globalPermissions,
        principal,
      }
    }
    case 'LOGIN': {
      const { principal, globalPermissions } = action.payload
      return {
        ...state,
        isAuthenticated: true,
        globalPermissions: globalPermissions,
        principal,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        principal: null,
      }
    }
  }
}

const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  logout: () => {},
})

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialAuthState)

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      // If the cookie is not present then we assume that we are not authenticated
      const accessTokenDetails = Cookies.get(cookieDetailsName)
      if (!accessTokenDetails) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            principal: null,
            globalPermissions: [],
          },
        })
        return
      }

      try {
        // We are authenticated so the following requests should succeed
        // Retrieve User details, Role information
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            principal: {},
            globalPermissions: [],
          },
        })
      } catch (error) {
        console.log('Initialization - user non authenticated', error)
        // Call logout just to be safe in case of edge cases. For example, the cookie may be here but the
        // JWT key had to be invalidated. This will force the user to re-login
        logout()

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            principal: null,
            globalPermissions: [],
          },
        })
      }
    }

    initialize()
      .then(() => {})
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const logout = () => {
    axios
      .get('/api/auth/logout', {})
      .then(() => {
        dispatch({ type: 'LOGOUT' })
      })
      .catch((error) => {
        console.log(error)
        throw new Error('Failed to logout')
      })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
