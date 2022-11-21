import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header/index.js'
import TransactionList from './Transactions/index.js'

const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    useEffect(() => {
        if (localStorage.getItem("user") == null) {
            navigate('/login')
        }
        else {


            setName(JSON.parse(localStorage.getItem('user'))['name'])

        }
    }, [])


    return (
        <div className='appContainer'>

            <div className='responsive-container'>
                <div className='sticky top-0 mb-2 z-20'>
                    <div className='absolute text-[#fff] left-[35%] top-0 '>
                        <p >Welcome <span className=''>{name.length > 0 ? name.toUpperCase() : name}</span></p>
                    </div>
                    <Header />
                </div>
                <div className='mb-6'>
                    {name.length > 0 && <TransactionList name={name} />}
                </div>
            </div>
        </div>
    )
}

export default Home