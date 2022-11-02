import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../../util/firebase'
import Modal from './modal'
const Transaction = ({ data, name }) => {
 const getConfirmation = (text) => {
    if (window.confirm(text) == true) {
      return true
    }
    else {
      return false
    }
  }
  const handleDelete = (e) => {
    const key = e.target.parentElement.parentElement.parentElement.id;
    console.log(key);
  const chk = getConfirmation("Are You Sure?")

    if (chk) {
      const ref = db.ref(`/${name}/transactions/${key}`);
      ref.on("value", snapshot => {
      })
      ref.remove()
    }

  }
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const getDay = (dat) => {
    const cellDateArr = dat.split('-')
    const cellDate = `${cellDateArr[1]}/${cellDateArr[0]}/${cellDateArr[2]}`

    const day = weekdays[new Date(cellDate).getDay()]
    return day
  }
  const getRows = (element, key) => {
    const reversedElement = element.sort((a, b) => b[0] - a[0])

    return reversedElement.map((dt, ind) => {
      return (
        <tr key={dt[0]} id={`${key}/${dt[0]}`} className={`table-row bg-opacity-30 shadow-md ${dt[1].type === 'Expense' ? 'bg-red-500' : 'bg-green-500'}`}>

          <td className="transaction-text font-semibold text-start">{dt[1].category}</td>
          <td className="transaction-text text-center"> {dt[1].amount} ৳</td>
          <td className="delete-container flex text-end flex-row-reverse">
          <button
            className="delete-button text-end"
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

          </td>
        </tr>
      )
    })
  }

  return (
    <table className="transactions-table w-[100%]">

      {data.map((el, index) => {
        return (

          <div key={"tab-" + index} className='mt-2'>
            <tr className="flex justify-around bg-[#8fc6db] bg-opacity-40 font-bold ">
              <td className=' text-[14px]  w-[1/2]'>{el[0]} {`[--${getDay(el[0])}--]`}</td>
              <td className='flex gap-10 text-[14px] bg-[#8fc6db] bg-opacity-30 px-2'>

                <p className=' text-[16px] text-red-500'>{el[1] + " ৳"}</p>
                <p className=' text-[16px] text-green-500'>{el[2] + " ৳"} </p>

              </td>
            </tr>
            {getRows(el[3], el[0])}

          </div>
        )
      })}

    </table>
  )
}

export default Transaction
