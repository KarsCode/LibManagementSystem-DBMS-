import './App.css';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/UserHomePage';
import { UserContextProvider } from './UserContext';
import UserProfile from './pages/UserProfile';
import AdminHomePage from './pages/AdminHomePage';

function App() {
  return (
    
      <div>
        <UserContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route index element ={<HomePage/>}/> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path = "/usrhome" element ={<HomePage/>}/>
          <Route path = "/adminhome" element ={<AdminHomePage/>}/>
          <Route path="/profile/:userId" element={<UserProfile />} />
          
        </Routes>
        </UserContextProvider>
      </div>
    
  );
}

export default App;
