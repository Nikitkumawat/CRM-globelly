import { ReactNode, useState } from 'react'

import { useAuth } from 'src/context/AuthContext.tsx'

export default function Authenticated({ children }: { children: ReactNode }) {
  const { isInitialized, isAuthenticated } = useAuth()
  const [error, setError] = useState('')

  if (!isInitialized) {
    return <p>Loading...</p>
  }

  // Not authenticated so we initiate the OIDC login flow
  //if (!isAuthenticated) {
  //  window.location.replace("/auth/login");
  //} else {
  return <>{children}</>
  //}
}
