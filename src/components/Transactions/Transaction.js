import React from 'react'
import { useState } from 'react'
const Transaction = ({ data, title = 10, amount = 10, type = 10 }) => {
  const [totalEx, setTotalEx] = useState('0')
  const [totalIn, setTotalIn] = useState('0')
  const handleDelete = () => {

  }
  // console.log(data[1]);
  return (
    <div className='mt-2'>
      <li className="">
        <p className=' text-[12px]'>{data[0]}{"TotalEx:-" + totalEx} {"Total Income:-" + totalIn}</p>
      </li>
      {data && Object.entries(data[1]).map(el => {
        if (el[1].type === "Expense") {
          return (<li className="table-row">
            <p className="transaction-text text-center">{el[1].category}</p>
            <p className="transaction-text"> {el[1].type}</p>
            <p className="transaction-text text-center"> {el[1].amount} ৳</p>
            <div className="delete-container text-end">
              <button
                className="delete-button text-end pl-4"
                type="button"
                onClick={handleDelete}
                id="delete"
              >
                <img
                  className="delete-img"
                  src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
                  alt="delete"
                />
              </button>
            </div>
          </li>)
        }
        else if (el[1].type === 'Income') {
          return (<li className="table-row">
            <p className="transaction-text text-center">{el[1].category}</p>
            <p className="transaction-text"> {el[1].type}</p>
            <p className="transaction-text text-center"> {el[1].amount} ৳</p>
            <div className="delete-container text-end">
              <button
                className="delete-button text-end pl-4"
                type="button"
                onClick={handleDelete}
                id="delete"
              >
                <img
                  className="delete-img"
                  src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
                  alt="delete"
                />
              </button>
            </div>
          </li>)
        }
      })}
      <li className="table-row">
        <p className="transaction-text text-start pl-2">{title}</p>
        <p className="transaction-text">Rs {amount}</p>
        <p className="transaction-text text-end pr-2">{type}</p>
        <div className="delete-container text-end">
          <button
            className="delete-button text-end pl-4"
            type="button"
            onClick={handleDelete}
            id="delete"
          >
            <img
              className="delete-img"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
              alt="delete"
            />
          </button>
        </div>
      </li>



    </div>
  )
}

export default Transaction