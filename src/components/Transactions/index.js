import React, { useEffect, useState } from 'react'
import Transaction from './Transaction'
import './index.css'
import { db } from '../../util/firebase'
import { GetContext } from '../../Context'
const TransactionList = ({ name = "" }) => {
  const myContext = GetContext()
  const [data, setData] = useState();


  useEffect(() => {

    if (name.length > 0) {
      const ref = db.ref(`/${name}/transactions`);
      ref.on("value", snapshot => {

        const downData = snapshot.val()

        let tempdata = (Object.entries(downData).map(el => {
          if (el[0].toString() != 'title') {
            return el
          }
        }))
        const tempCells = []
        let ex = 0;
        let inc = 0;
        tempdata=(JSON.parse(JSON.stringify(tempdata)));
        tempdata.reverse().map((el) => {
          if (el) {
            const x = getData(el[0], el[1])
            ex += Number.parseInt(x[1])
            inc += Number.parseInt(x[2])
            tempCells.push(x)
          }
        })
        myContext.setExin({ 'ex': ex, 'in': inc })
        setData(tempCells)
      })
    }

  }, [])

  const getData = (date, dt) => {

    let tex = 0;
    let tin = 0;

    const cells = Object.entries(dt).map((el) => {

      if (el[1].type === "Expense")
        tex += Number.parseInt(el[1].amount)
      else
        tin += Number.parseInt(el[1].amount)
      return [el[0], el[1]]
    })

    return [date, tex, tin, cells]
  }

  return (


    <div >
      {data && <Transaction
        data={data}
        name={name} />}
    </div>


  )
}

export default TransactionList