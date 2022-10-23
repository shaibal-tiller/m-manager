import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import InputTransaction from './components/Input';
import { useState } from 'react';
import { AppContext } from './Context';

function App() {
const [exin,setExin]= useState({})
const data= {
  exin,
  setExin
}
  return (
    <AppContext.Provider value={data}>
    <div className="App">
   
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/addTransaction'  element={<InputTransaction/>}/>
   </Routes>
     </div>
     </AppContext.Provider>
  );
}

export default App;
