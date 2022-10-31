import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import InputTransaction from './components/Input';
import { useEffect, useState } from 'react';
import { AppContext } from './Context';
import Login from './components/User';
import CreateId from './components/User/createAcount';
import Overview from './components/Analysis';

function App() {
  const navigate = useNavigate()
  const [exin, setExin] = useState({})
  const [overviewType,setOverviewType]= useState('')
  const [tnxData, setTnxData]= useState([])
  const [loginSt,setLoginSt]= useState(false)
  const data = {
    exin,
    setExin,

    tnxData,
    setTnxData,

    overviewType,
    setOverviewType,
    loginSt,
    setLoginSt
  }



const handleLogout= ()=>{
  setLoginSt(true)
   data.setExin({})
   data.setTnxData([])
   data.setOverviewType("")
   window.localStorage.removeItem('user');
   window.localStorage.removeItem('income_cat');
   window.localStorage.removeItem('expense_cat');
  navigate('/login')
}
  return (
    <AppContext.Provider value={data}>

      <div className="App">
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/transactions' element={<Home />} />
          <Route path='/addTransaction' element={<InputTransaction />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createAccount' element={<CreateId />} />
          <Route path='/overview' element={<Overview />} />
        </Routes>
   {  loginSt &&   <button className='absolute bottom-0 left-0' onClick={handleLogout}> 
   <i class="fa fa-power-off"></i> </button>}
      </div>
    </AppContext.Provider>
  );
}

export default App;
