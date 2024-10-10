import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authToken, setAuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);

  let history = useNavigate()

  let loginUser = async (e) => {
    e.preventDefault()
    let response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    })
    let data = await response.json()
    if (response.status === 200) {
      setAuthToken(data)
      setUser(jwtDecode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      history('/')
    } else {
      alert('Something went wrong')
    }
    console.log('data:', data)
    console.log('response:', response)
  }

  let logoutUser = () => {
    setAuthToken(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    history('/login')
  }

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser:logoutUser,
  }
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}