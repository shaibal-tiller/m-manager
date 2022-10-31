import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header/index.js'
import TransactionList from './Transactions/index.js'

const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    useEffect(() => {
        if (localStorage.getItem("user") ==null) {
            navigate('/login')
        }
        else {
          
            
            setName(JSON.parse(localStorage.getItem('user'))['name'])
           
        }
    }, [])


    return (
        <div className='appContainer'>
        
            <div className='responsive-container'>
            <p className='fixed top-0 '>Welcome <span className='text-[#52f]'>{name.length>0? name.toUpperCase():name}</span></p>
            <Header/>
                <div className=''>
                 {name.length>0  &&  <TransactionList  name={name}/>}
                </div>
            </div>
        </div>
    )
}

export default Home