import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../../util/firebase'
const Transaction = ({ data }) => {


  const handleDelete = (e) => {

    const key = e.target.parentElement.parentElement.parentElement.id;

    const ref = db.ref(`${key}`);
    ref.on("value", snapshot => {
      console.log(snapshot.val());
    })
    ref.remove()


  }
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const getDay = (dat) => {
    const cellDateArr = dat.split('-')
    const cellDate = `${cellDateArr[1]}/${cellDateArr[0]}/${cellDateArr[2]}`

    const day = weekdays[new Date(cellDate).getDay()]
    return day
  }


  return (
    <table className="transactions-table w-[100%]">
      {data.map((el, index) => (
        <div key={"tab-" + index} className='mt-2'>
          <tr className="flex justify-around bg-[#8fc6db] bg-opacity-40 font-bold ">
            <td className=' text-[12px]  w-[1/2]'>{el[0]} {`[--${getDay(el[0])}--]`}</td>
            <td className='flex gap-10 text-[12px] bg-[#8fc6db] bg-opacity-30 px-2'>

              <p className=' text-[12px] text-red-500'>{el[1] + "  ৳"}</p>
              <p className=' text-[12px] text-green-500'>{el[2] + " ৳"} </p>

            </td>
          </tr>
          {el[3].map((dt, ind) => (
            <tr key={dt[0]} id={`${el[0]}/${dt[0]}`} className={`table-row bg-opacity-30 shadow-md ${dt[1].type === 'Expense' ? 'bg-red-500' : 'bg-green-500'}`}>
              <td className="transaction-text font-semibold text-start">{dt[1].category}</td>
              <td className="transaction-text text-center"> {dt[1].amount} ৳</td>
              <td className="delete-container text-end">
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
          ))}
        </div>
      ))}

    </table>
  )
}

export default Transaction
