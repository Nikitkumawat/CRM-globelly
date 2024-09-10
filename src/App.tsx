import * as axios from 'axios'
import { AxiosError, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  setupAxiosInterceptors(() => {
    //onUnauthenticated
    window.location.href = '/'
  })

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App

export const setupAxiosInterceptors = (onUnauthenticated: () => void) => {
  const onResponseSuccess = (response: AxiosResponse) => response
  const onResponseFail = (error: AxiosError) => {
    const status = error.status || error.response?.status
    console.log(`Response - ${error.message}`)
    if (status === 403 || status === 401) {
      // We only try to refresh if the token_details cookies is missing
      const accessTokenDetails = Cookies.get('token_details')
      if (!accessTokenDetails) {
        return refreshToken()
          .then(() => {
            console.log('attempting to refresh token')
            if (error.config) {
              return axios.default.request(error.config)
            }
          })
          .catch((e) => {
            console.log('Failed to refresh token', e)
            onUnauthenticated()
          })
      }
    }
    return Promise.reject(error)
  }
  axios.default.interceptors.response.use(onResponseSuccess, onResponseFail)
}

function refreshToken() {
  return axios.default.get('/api/auth/oidc/refresh', {})
}
