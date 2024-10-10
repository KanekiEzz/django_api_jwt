import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path='/' element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
