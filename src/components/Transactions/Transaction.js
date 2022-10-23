import React, { useEffect } from 'react'
import { useState } from 'react'
const Transaction = ({ data, title = 10, amount = 10, type = 10 }) => {
  const [totalEx, setTotalEx] = useState(0)
  const [totalIn, setTotalIn] = useState(0)
  const handleDelete = () => {

  }
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const getDay = () => {
    const cellDateArr = data[0].split('-')
    const cellDate = `${cellDateArr[1]}/${cellDateArr[0]}/${cellDateArr[2]}`

    const day = weekdays[new Date(cellDate).getDay()]
    return day
  }
  useEffect(() => {
    let tex = 0;
    let tin = 0;

    Object.values(data[1]).map(el => {
     
      if (el.type === 'Expense') {
        tex += Number.parseInt(el.amount)
      
      }
      else {
        tin += Number.parseInt(el.amount)
      }
    })
    setTotalEx(tex)
    setTotalIn(tin)
  }, [])
  const getAmount = (dt) => {
    if (dt.type === 'Expense')
      setTotalEx(totalEx + Number.parseInt(dt.amount))
    else if (dt.type === 'Income')
      setTotalEx(totalIn + Number.parseInt(dt.amount))
  }

  return (
    <div className='mt-2'>
      <tr className="flex justify-around bg-[#8fc6db] bg-opacity-40 font-bold ">
        <p className=' text-[12px]  w-[1/2]'>{data[0]} {`[--${getDay()}--]`}</p>
        <div className='flex gap-5 text-[12px] bg-[#8fc6db] bg-opacity-30 px-2'>

          Expense :  <p className=' text-[12px] text-red-500'>{totalEx+"  ৳"}</p>
          Income :  <p className=' text-[12px] text-green-500'>{"" + totalIn} ৳</p>

        </div>
      </tr>
      {data && Object.entries(data[1]).map(el => {

        return (<li className={`table-row bg-opacity-30 shadow-md ${el[1].type === 'Expense' ? 'bg-red-500' : 'bg-green-500'}`}>
          <cell className="transaction-text font-semibold text-start">{el[1].category}</cell>
          <cell className="transaction-text text-center"> {el[1].amount} ৳</cell>
          <cell className="delete-container text-end">
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
          </cell>
        </li>)

        {/* else if (el[1].type === 'Income') {
          return (<li className="table-row">
            <p className="transaction-text text-center">{el[1].category}</p>
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
        } */}
      })}




    </div>
  )
}

export default Transaction