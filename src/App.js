import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import InputTransaction from './components/Input';
import { useEffect, useState } from 'react';
import { AppContext } from './Context';
import Login from './components/User';
import CreateId from './components/User/createAcount';

function App() {
  const navigate = useNavigate()
  const [exin, setExin] = useState({})
  const data = {
    exin,
    setExin
  }

  // const [user, setUser] = useState(null)
  // const [logState, setLogState] = useState(false)
  // useEffect(() => {
  //   if (!(window.localStorage.getItem('user') == null)) {
  //     setLogState(true)     
  //   }
  // }, [])
  // useEffect(()=>{
  //     if(localStorage.getItem(user)){
  //     setLogState(true)
  //   }
  // },[localStorage.getItem(user)])

  return (
    <AppContext.Provider value={data}>
      <div className="App">
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/transactions' element={<Home/>} />
          <Route path='/addTransaction' element={<InputTransaction />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createAccount' element={<CreateId />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
