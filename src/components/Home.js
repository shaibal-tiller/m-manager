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
            <button onClick={goInput} className='absolute px-2 rounded-[40px] right-0 top-[5%] bg-slate-500 text-5xl leading-10'>+</button>
            <div className='responsive-container'>
                <Header
                    balanceAmount={10}
                    incomeAmount={12}
                    expensesAmount={35}
                />
                <div className=''>
                    <TransactionList />
                </div>
            </div>
        </div>
    )
}

export default Home