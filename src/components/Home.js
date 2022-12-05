import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetContext } from '../Context.js'
import Header from './Header/index.js'
import TransactionList from './Transactions/index.js'

const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [selMonth, setSelMonth] = useState()
    const myContext = GetContext()
    useEffect(() => {
        if (localStorage.getItem("user") == null) {
            navigate('/login')
        }
        else {
            setName(JSON.parse(localStorage.getItem('user'))['name'])

        }

    }, [])
    useEffect(() => {
        // if (myContext)
            // console.log(myContext);
    }, [myContext])
    const handleMonthChange = (e) => {
        setSelMonth(e.target.value)
    }
    return (
        <div className='appContainer bg-[#000] scrollbar-hide'>

            <div className='responsive-container scrollbar-hide'>
                <div className='sticky top-0 mb-2 z-20 scrollbar-hide'>
                    <div className='absolute text-[#fff] left-[35%] top-0 '>
                        <p >Welcome <span className=''>{name.length > 0 ? name.toUpperCase() : name}</span></p>
                    </div>
                    <Header name={name} setter={setSelMonth} onchange={handleMonthChange} />
                </div>
                <div className='mb-6 scrollbar-hide'>
                    {name.length > 0 && <TransactionList selMonth={selMonth} name={name} />}
                </div>
            </div>
        </div>
    )
}

export default Home