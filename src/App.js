
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './Page/Home/HomePage';
import LoginPage from './Page/Login/LoginPage';
import RegisterPage from './Page/Register/RegisterPage';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='*' element={<HomePage/>}/>
      </Routes>
     </Fragment>    
    </Router>
  );
}

export default App;
