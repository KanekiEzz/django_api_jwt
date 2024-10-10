import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let { user, logoutUser} = useContext(AuthContext)
  console.log('user=>', user)
  return (
    <div>
      <Link to='/'>Home</Link>
      <span> | </span>
      {user ? (
        <button onClick={logoutUser}>Logout</button>
      ) : (
        <Link to='/login'>Login</Link>
      )}


      {user && <p>count id: <span>{user.user_id}</span>  <br /> Hello {user.username}</p>}

    </div>
  )
}

export default Header