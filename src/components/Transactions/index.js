import React, { useEffect, useState } from 'react'
import Transaction from './Transaction'
import './index.css'
import { db } from '../../util/firebase'
import { GetContext } from '../../Context'

const TransactionList = ({ name = "",loadingSetter }) => {
  const myContext = GetContext()
  const [data, setData] = useState();

  const getDateFormat = (dt) => {
    const splits = dt.split("-")
    return `${splits[1]}-${splits[0]}-${splits[2]}`
  }
  useEffect(() => {

    if (name.length > 0) {
      const ref = db.ref(`/${name}/transactions`);
      loadingSetter(true)
      ref.on("value", snapshot => {

        const downData = snapshot.val()

        if (downData) {
          let tempdata = (Object.entries(downData).map(el => {
            if (el[0].toString() != 'title') {
              return el
            }
          }))
          const tempCells = []
          let ex = 0;
          let inc = 0;
          tempdata = (JSON.parse(JSON.stringify(tempdata)));


          tempdata =tempdata.sort((a, b) => {
            if (a && b) {
              return new Date(getDateFormat(b[0])) - new Date(getDateFormat(a[0]))
            }
            
          })
          
          tempdata.map((el) => {
            if (el) {
              const x = getData(el[0], el[1])
              ex += Number.parseInt(x[1])
              inc += Number.parseInt(x[2])
              tempCells.push(x)
            }
          })
          myContext.setExin({ 'ex': ex, 'in': inc })
          myContext.setTnxData(tempCells)
          setData(tempCells)
        }
        else { setData([]) }
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
        name={name}
        loadingSetter={loadingSetter} />}
    </div>


  )
}

export default TransactionList
