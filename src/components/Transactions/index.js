import React, { useEffect, useState } from 'react'
import Transaction from './Transaction'
import './index.css'
import { db } from '../../util/firebase'
import { GetContext } from '../../Context'
const TransactionList = () => {
  const myContext= GetContext()
  const [data, setData] = useState();
  useEffect(() => {
    const ref = db.ref("/");
    ref.on("value", snapshot => {
      
      const downData = snapshot.val()
      const tempdata = (Object.entries(downData).map(el => {
        return el;
      }))
      const tempCells = []
      let ex=0;
      let inc=0;
      tempdata.reverse().map(el => {
        const x = getData(el[0], el[1])
        ex+= Number.parseInt(x[1])
        inc+=Number.parseInt(x[2])
        
        tempCells.push(x)
      })
      myContext.setExin({'ex':ex, 'in':inc})
    
      setData(tempCells)
    })
    
    
  }, [])

  const getData = (date, dt) => {

    let tex = 0;
    let tin = 0;

    const cells = Object.entries(dt).map((el) => {
   
      if (el[1].type === "Expense")
        tex += Number.parseInt(el[1].amount)
      else
        tin += Number.parseInt(el[1].amount)
      return [el[0],el[1]]
    })

    return [date, tex, tin, cells]
  }

  return (


    <div >
      {data && <Transaction
        data={data}  />}
    </div>


  )
}

export default TransactionList