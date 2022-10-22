import React from 'react'
import './index.css'
const Header = ({balanceAmount=10000,expensesAmount=1000,incomeAmount=1000}) => {
  return (  
    <div className="money-details-container">
      <div className="balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="details-img"
        />
        <p className="details-money" id="balanceAmount">
             {balanceAmount} ৳
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
             {incomeAmount} ৳
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
             {expensesAmount} ৳
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header