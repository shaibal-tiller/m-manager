import React, { useEffect, useState } from 'react'
import Transaction from './Transaction'
import './index.css'
import { db } from '../../util/firebase'
const TransactionList = () => {
  const [data,setData]= useState();
  useEffect(() => {
    const ref = db.ref("/");
    ref.on("value", snapshot => {
      const downData = snapshot.val()
       setData(Object.entries(downData).map(el=>{
                return el;
       }))
    })
  }, [])

  return (
    <div className="history-transactions">
      <h1 className="transaction-header">History</h1>
      <div className="transactions-table-container">
        <ul className="transactions-table">
          <li className="table-header text-center">

          </li>
          {data && data.map((el)=>(<Transaction key={el[0]} data= {el}/>))}
        </ul>
      </div>
    </div>
  )
}

export default TransactionList