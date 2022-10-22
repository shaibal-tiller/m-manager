import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import InputTransaction from './components/Input';


function App() {
  return (
    <div className="App">
   
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/addTransaction'  element={<InputTransaction/>}/>
   </Routes>
     </div>
  );
}

export default App;
