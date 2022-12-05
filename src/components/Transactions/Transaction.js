import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../util/firebase'
import Modal from './modal'
const Transaction = ({ data, name, pathkey }) => {
  const navigate = useNavigate()
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

    const chk = getConfirmation("Are You Sure?")

    if (chk) {
      const ref = db.ref(`/${name}/transactions/${pathkey}/${key}`);
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

    return reversedElement.map((dt, ind) => {//${dt[1].type === 'Expense' ? 'bg-red-500' : 'bg-green-500'}`
      return (
        <tr key={dt[0]} id={`${key}/${dt[0]}`} className={`table-row bg-opacity-30 shadow-sm ${dt[1].type === 'Expense' ? 'text-[#BDA9FB]' : 'text-[#67E8F9]'}`}>
          <td className="transaction-text font-semibold text-start">{dt[1].category} {dt[1].other && 
          (<span className='bg-slate-400 bg-opacity-30 font-thin text-xs'>{`--${dt[1].other[0].toUpperCase()}${dt[1].other.slice(1)}--`}</span>)}</td>
          <td className="transaction-text text-center"> {dt[1].amount} ৳</td>
          <td className="delete-container flex text-end flex-row-reverse  self-center px-0 bg-[#fff] hover:bg-red-500 rounded-xl absolute md:relative right-8">
            <button
              className="delete-button text-end "
              type="button"
              onClick={handleDelete}
              id="delete"
            >
              <img
                className="delete-img "
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
    <table className="transactions-table w-[100%] ] ">

      {data.map((el, index) => {
        return (

          <div key={"tab-" + index} className='mt-2 bg-[#1d1b1b] scrollbar-hide'>
            <tr className="flex px-4  bg-opacity-40 font-bold bg-[rgb(26, 25, 25)]  h-4">
              <td className='  text-[15px] text-start  w-[60%]'>{el[0].split('-')[0]} <span className='text-[.7rem] bg-[#535050] p-1'>{`${getDay(el[0])}`}</span>
                <span className='text-[.55rem]'>{`  ${el[0].split('-')[1]}.${el[0].split('-')[2]}`} </span></td>
              <td className='flex gap-10 text-[14px]  bg-opacity-30 px-2'>
                <p className=' text-[14px] text-[#BDA9FB]'>{`${el[1]}৳`}</p>
                <p className=' text-[14px] text-[#67E8F9]'>{`${el[2]}৳`} </p>

              </td>
            </tr>
            <hr className='mx-4 mb-0' />
            {getRows(el[3], el[0])}

          </div>
        )
      })}

    </table>
  )
}

export default Transaction
