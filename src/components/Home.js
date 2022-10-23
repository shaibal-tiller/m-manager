import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header/index.js'
import TransactionList from './Transactions/index.js'
import { db } from '../util/firebase.js'
const Home = () => {
    const navigate = useNavigate()
  
    const goInput = () => {
        navigate('/addTransaction')
    }
   
    return (
        <div className='appContainer'>
            <button onClick={goInput} className='absolute px-2 rounded-[40px] font-bold right-0 top-[5%] hover:scale-105 bg-[#c3cf8d] text-xl leading-14'>+</button>
            <div className='responsive-container'>
                <Header
                />
                <div className=''>
                    <TransactionList />
                </div>
            </div>
        </div>
    )
}

export default Home