import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Homepage from './components/pages/Homepage';
import Signup from './components/auth/Signup';
import ListManager from './components/dashboard/ListManager';
import Header from './components/pages/Header';
import Profile from './components/pages/Profile';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path='/' Component={Homepage} />
      <Route path='/login' Component={Login} />
      <Route path='/signup' Component={Signup} />
      <Route path="/profile" Component={Profile} />
      <Route path='/listmanager' Component={ListManager} />
      </Routes>
    </Router>
  );
}

export default App;
