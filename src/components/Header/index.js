import React from 'react'
import { GetContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
import './index.css'
const Header = ({ }) => {
  const navigate = useNavigate()
  const goInput = () => {
    navigate('/addTransaction')
  }
  const myContext = GetContext()
  const handleIncome=(e)=>{
    myContext.setOverviewType('Income')
    navigate('/overview')
  }
  const handleExpense=(e)=>{
    myContext.setOverviewType('Expense')
    navigate('/overview')
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
      <button onClick={goInput} className='w-[100px] rounded-[40px] font-bold  hover:scale-105 bg-[#5f5f5d] text-xl leading-14'>+</button>
 
    </div>
  )
}

export default Header