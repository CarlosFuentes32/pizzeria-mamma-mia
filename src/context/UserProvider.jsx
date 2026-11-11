import { useState } from 'react'
import { UserContext } from './UserContext.js'

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true)

  const logout = () => setToken(false)

  return (
    <UserContext.Provider value={{ token, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
