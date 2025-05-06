import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './components/Register';
import Header from './components/header';
import Login from './components/login';
import { useState } from 'react';
import Dashboard from './components/dashboard';
import Products from './components/products';


function App() {
  const [loggedIn,setLoggedIn]=useState(false);
    return (
   <BrowserRouter>
   <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
   <Routes>
    <Route path="register" element={<Register/>}/>
    <Route path="login" element={<Login setLoggedIn={setLoggedIn}/>}/>
    <Route path="dashboard/*" element={<Dashboard/>}/>
    <Route path="products" element={<Products/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
