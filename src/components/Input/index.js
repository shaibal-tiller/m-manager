import React, { useEffect } from 'react'
import { useState } from 'react';
import { json, useNavigate } from 'react-router-dom'
import './index.css'
import { getexpenseCategories, getincomeCategories } from '../../util/util';
import { db } from '../..//util/firebase.js'
import DatePicker from '../../util/DatePicker';


const getToday = () => {
  const todaydate = new Date()
  const today = todaydate.getDate() + "-" + (todaydate.getMonth() + 1) + "-" + todaydate.getFullYear()
  return today
  // setDate(today)
}
const InputTransaction = () => {

  const [typeVal, setTypeVal] = useState("Expense");
  const [cateValue, setCateVal] = useState("")
  const [amount, setAmount] = useState(0)
  const [otherValue, setOtherValue] = useState()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [in_cat, setin_cat] = useState(getincomeCategories())
  const [ex_cat, setex_cat] = useState(getexpenseCategories())
  const [dateTime, setDateTime] = useState()
  const expenseCategories = []
  const incomeCategories = []

  useEffect(() => {
    const getName = JSON.parse(localStorage.getItem('user')).name
    if (getName) {
      setName(getName)
    }
    setex_cat([...ex_cat, '...+'])
    setin_cat([...in_cat, '...+'])
  }, [])
  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  const handleChangeOther = (e) => {
    setOtherValue(e.target.value)
  }

  const selectCate = (e) => {
    if (e.target.innerHTML !== '...+')
      setCateVal(e.target.innerHTML)
    else {
      setCateVal("")
      const x = document.getElementById('cateAdd')
      x.style.display = 'block'
    }
  }

  const formatData = () => {
    if (otherValue) {
      return {
        'type': typeVal,
        'amount': Number.parseInt(amount),
        'category': cateValue,
        'other': otherValue
      }
    }
    else {
      return {
        'type': typeVal,
        'amount': Number.parseInt(amount),
        'category': cateValue,
        'other': ""
      }
    }
  }

  const upload = () => {
    const readyData = formatData()
    db.ref(`/${name}/transactions/${dateTime.pathKey}/${dateTime.date}/${dateTime.time}`).set(readyData).catch((e) => { console.log(e); });
  }

  const handleHome = () => {
    navigate('/')
  }

  const handleContinue = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeVal && cateValue && amount) {
      upload()
      setTypeVal("Expense")
      setAmount(0)
      setCateVal("")
      setOtherValue("")
      const x = new Date();
      const month = x.getMonth() + 1
      setDateTime({ pathKey: x.getFullYear() + "-" + month, 'date': x.getDate() + "-" + (x.getMonth() + 1) + "-" + x.getFullYear(), 'time': x.getTime() })
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (typeVal && cateValue && amount) {
      upload()
      navigate("/")
    }
  }

  const handleKey = (e) => {
    if (e.target.parentNode.childNodes[0].value.trim().length > 0) {
      const x = [...(ex_cat.slice(0, ex_cat.length - 1)), e.target.parentNode.childNodes[0].value.trim()]
      const y = [...(in_cat.slice(0, in_cat.length - 1)), e.target.parentNode.childNodes[0].value.trim()]
      typeVal === 'Income' ? db.ref(`/${name}/categories/income_cat}`).set(y).catch((e) => { console.log(e); }) :
        db.ref(`/${name}/categories/expense_cat}`).set(x).catch((e) => { console.log(e); });

      typeVal === 'Income' ? setin_cat([...(in_cat.slice(0, in_cat.length - 1)), e.target.parentNode.childNodes[0].value.trim(), '...+']) :
        setex_cat([...(ex_cat.slice(0, ex_cat.length - 1)), e.target.parentNode.childNodes[0].value.trim(), '...+'])

    }

    document.getElementById("cateAdd").childNodes[0].value = ""
    document.getElementById("cateAdd").style.display = "none"

  }

  useEffect(() => {
    localStorage.setItem('expense_cat', JSON.stringify(ex_cat.slice(0, ex_cat.length - 1)))
  }, [ex_cat])
  useEffect(() => {
    setCateVal("")
  }, [typeVal])

  /*   const getConfirmation = (text) => {
      if (window.confirm(text) == true) {
        return true
      }
      else {
        return false
      }
    }
  
    const deleteCateitem = (x) => {
      if (x.length > 0) {
        let newC= []
       expenseCategories.map((el) => {
          if (el && el !== x && el!=='...+' )
          {
             newC.push(el)
          }
  
        })
        db.ref(`/${name}/categories/${typeVal == 'Income' ? 'income_cat' : 'expense_cat'}`).set(newC).catch((e) => { console.log(e); });
      
      }
    }
  
  
    const deleteCate = (e) => {
      const chk = getConfirmation("Are You Sure to Delete?")
      if (chk)
        deleteCateitem(e.target.innerHTML)
      else
        console.log("cancel");
    } */


  const handleDateChange = (e) => {
    const x = new Date(e.target.value)
    // setDate(e.target.value)
  }



  return (
    <div className='appContainer pt-2 h-[100vh] bg-black'>
      <div className='responsive-container'>
        <div className="transaction-details">
          <form className="transaction-form" onSubmit={handleSubmit}>
            <h1 className="transaction-header self-center">ADD Transaction</h1>
            <label className="input-label" htmlFor="select">
              TYPE
            </label>
            <select
              id="select"
              className="inputa"
              value={typeVal}

              onChange={(e) => {
                setTypeVal(e.target.value)
              }}
            >


              <option key={1} value={"Expense"}>
                {"Expense"}
              </option>
              <option key={2} value={"Income"}>
                {"Income"}
              </option>


            </select>
            <label className="input-label" htmlFor="amount">
              AMOUNT
            </label>
            <input
              type="number"
              id="amount"
              className="inputa"
              value={amount}//{amountInput}
              onChange={handleChange}//{this.onChangeAmountInput}
              placeholder="AMOUNT"
            />
            <label className="input-label" htmlFor="date">
              DATE
            </label>
            <DatePicker formatter={setDateTime} name="date" />
            {/*   <input
              type="date"
              id="date"

              className="inputa"
              value={date}//{amountInput}
              onChange={handleDateChange}//{this.onChangeAmountInput}
              placeholder="dd-mm-yyyy"
              min="01-01-1997" max="31-12-2030"

            /> */}
            <label className="input-label mt-1" htmlFor="title">
              CATEGORY
            </label>
            <input
              disabled
              type="text"
              id="title"
              value={cateValue}
              className="input"
              placeholder="Category"
            />
            <input
              onChange={handleChangeOther}
              type="text"
              value={otherValue}
              className="inputa"
              placeholder="Other"
            />
            <div id={"category"} className='mb-2 flex-wrap flex category-pallete '>

              {typeVal === "Income" && in_cat.map((el, index) => {
                return (
                  <p onClick={selectCate} key={"in" + index}
                    className='cate hover:cursor-pointer active:bg-[#99dad3] mr-2
                   mb-2 bg-[#acebe5] px-2 rounded-lg'>{el}</p>)
              }
              )}
              {typeVal === "Expense" && ex_cat.map((el, index) => {

                return (
                  <p onClick={selectCate} key={"ex" + index}
                    className='cate hover:cursor-pointer active:bg-[#99dad3] mr-2
                   mb-2 bg-[#acebe5] px-2 rounded-lg'>{el}</p>)
              }
              )}
              <div id="cateAdd" className='relative rounded-lg' style={{ display: 'none' }} >
                <input type={'text'}
                  className=' text-[#000] px-1 hover:cursor-pointer rounded-md bg-opacity-60' />
                <span onClick={handleKey} className=' px-1 absolute right-0 text-[#000] bg-[#e1e1e1] bg-opacity-60 
                   drop-shadow-lg rounded-sm  hover:cursor-pointer'> ADD</span>  </div>
            </div>
            <div className='btn-container mt-2'>
              <button onClick={handleContinue} className="buttona mr-2">
                Continue
              </button>
              <button type="submit" className="buttona">
                Add
              </button>
              <button onClick={handleHome} className="ml-24 buttona">
                Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default InputTransaction