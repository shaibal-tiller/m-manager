import React, { useEffect, useState } from 'react'
import { GetContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import { db } from '../../util/firebase'
import './index.css'
const Header = ({ name, onchange, setter }) => {
  const [months, setMonths] = useState([])
  const navigate = useNavigate()
  const myContext = GetContext()
  const goInput = () => {
    navigate('/addTransaction')
  }

  const handleIncome = (e) => {
    myContext.setOverviewType('Income')
    navigate('/overview')
  }
  const handleExpense = (e) => {
    myContext.setOverviewType('Expense')
    navigate('/overview')
  }

  useEffect(() => {
    if (name) {
      const ref = db.ref(`/${name}/transactions/`);
      ref.on('value', snapshot => {
        // Object.entries(snapshot.exportVal()).map(el => {
        //   if (typeof (el[1]) === 'object') {
        //     const x = new Date(el[0])
        //     console.log(x.toLocaleString("default", { month: "long" }) + "-" + x.getFullYear());
        //   }
        // }) 
        let temp = Object.entries(snapshot.exportVal()).map(el => {
          return el[0]
        })
        temp = temp.slice(0, temp.length - 1)
        temp.sort((a, b) =>  new Date(b) - new Date(a))

        // console.log(temp.sort((a,b)=> {new Date(b)>new Date(b)})
        setMonths(temp);
      setter(temp[0])
    })
}
  }, [name])
useEffect(() => {
  if (months.length) {
    myContext.setMonths(months)
  }
}, [months])

const getmonth = (element) => {
  const dt = new Date(element)
  return (dt.toLocaleString("default", { month: "long" }) + "-" + dt.getFullYear());
}


return (
  <div className='px-2 bg-black pt-2'>
    <div className="money-details-container">

      <div className="income-container text-[#67E8F9] " onClick={handleIncome}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="details-img"
        />
        <div>

          <p className="details-money" id="incomeAmount">
            {myContext.exin.in} ৳
          </p>
        </div>
      </div>
      <div className="expenses-container text-[#BDA9FB]" onClick={handleExpense}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expense"
          className="details-img"
        />
        <div>

          <p className="details-money" id="expensesAmount">
            {myContext.exin.ex} ৳
          </p>
        </div>
      </div>
      <div className="balance-container text-[#BCF062]">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="details-img"
        />
        <p className="details-money" id="balanceAmount">
          {myContext.exin.in - myContext.exin.ex} ৳
        </p>
      </div>
    </div>
    <div className='flex items-center'>
      <div className='w-[40%]'>
        <select  defaultValue={months.length ? months[0] : ""} className=' bg-transparent border-1 px-2 rounded-lg' onChange={onchange}>
          {months.length && months.map((el, index) => {
            return (<option key={el} name={el} value={el} className='bg-black'>{getmonth(el)}</option>)
          })}
        </select>
      </div>
      <button onClick={goInput} className=' w-[100px] rounded-[40px] font-bold  hover:scale-105 bg-[#5f5f5d] text-xl leading-14'>+</button>
    </div>
  </div>
)
}

export default Header