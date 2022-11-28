import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../../Context'
import Example from './PieChart';

const Overview = () => {
  const [data, setData] = useState([])
  const readyDataElement = (el) => {
    return { name: el[0], value: el[1] }
  }
  const myContext = useContext(AppContext)

  const prepareDate = () => {
    let tempData = {}
    myContext.tnxData.map(el => {
      el[3].map((elm) => {
        if (elm[1].type === myContext.overviewType) {
          tempData[elm[1].category] = tempData[elm[1].category] ? elm[1].amount + tempData[elm[1].category] : elm[1].amount
        }
      })
    })
    const temp2 = []
    Object.entries(tempData).map(el => {
      temp2.push(readyDataElement(el))
    })
    if (temp2.length > 0) {
      setData(temp2)
    }
  }
  useEffect(() => {
    prepareDate()
  }, [])
  return (
    <div className='flex flex-col w-full items-center h-[100vh] '>
      <div className=' z-[500] text-lg  font-semibold tracking-wider
       bg-[#5f5c5c] bg-opacity-70 w-full text-[#eee]'>
        Analysis
      </div>
      <div className='h-[100%] bg-[#383737] w-[100%] '>
       {data.length &&  <Example dataval={data} />}
       {!data.length && <div className=' mt-12 text-2xl font-bold text-[#fff] border-[#fff] border-1 '>NO DATA</div>}

      </div>

    </div>
  )
}

export default Overview