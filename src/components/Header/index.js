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
  return (
    <div>
      <div className="money-details-container">
        <div className="balance-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
            className="details-img"
          />
          <p className="details-money" id="balanceAmount">
            {myContext.exin.in - myContext.exin.ex} ৳
          </p>
        </div>
        <div className="income-container">
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
        <div className="expenses-container">
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
      </div>
      <button onClick={goInput} className='w-[100px] px-2 rounded-[40px] font-bold right-0 top-[5%] hover:scale-105 bg-[#c3cf8d] text-xl leading-14'>+</button>
 
    </div>
  )
}

export default Header