import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header/index.js'
import TransactionList from './Transactions/index.js'

const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [loading,setLoading]= useState(true)
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
                    {loading && <div class="center">
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>}
                    {name.length > 0 && <TransactionList name={name} loadingSetter={setLoading} />}
                </div>
            </div>
        </div>
    )
}

export default Home