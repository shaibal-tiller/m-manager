import React from 'react'
import { GetContext } from '../../Context'
import './index.css'
const Header = ({}) => {
  const myContext= GetContext()
  return (  
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
  )
}

export default Header