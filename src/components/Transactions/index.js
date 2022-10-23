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
       const tempdata=(Object.entries(downData).map(el=>{
                return el;
       }))
       setData(tempdata.reverse())
    })
  }, [])

  return (


        <table className="transactions-table w-[100%] ">
          {data && data.reverse().map((el)=>(<Transaction key={el[0]} data= {el}/>))}
        </table>
 
    
  )
}

export default TransactionList