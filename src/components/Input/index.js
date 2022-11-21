import React, { useEffect } from 'react'
import { useState } from 'react';
import { json, useNavigate } from 'react-router-dom'
import './index.css'
import { getexpenseCategories, getincomeCategories } from '../../util/util';
import { db } from '../..//util/firebase.js'

const InputTransaction = () => {

  const [typeVal, setTypeVal] = useState("Expense");
  const [cateValue, setCateVal] = useState("")
  const [amount, setAmount] = useState(0)
  const [otherValue, setOtherValue] = useState()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [in_cat, setin_cat] = useState(getincomeCategories())
  const [ex_cat, setex_cat] = useState(getexpenseCategories())
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
        'category': otherValue,
      }
    }
    else {
      return {
        'type': typeVal,
        'amount': Number.parseInt(amount),
        'category': cateValue,
      }
    }
  }

  const upload = () => {

    const date = new Date
    const today = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    const time = date.getTime()
    const readyData = formatData()
    db.ref(`/${name}/transactions/${today}/${time}`).set(readyData).catch((e) => { console.log(e); });

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
      
     // setex_cat( );
      // expenseCategories.push(e.target.parentNode.childNodes[0].value.trim())
       db.ref(`/${name}/categories/${typeVal == 'Income' ? 'income_cat' : 'expense_cat'}`).set([...(ex_cat.slice(0,ex_cat.length-1)),e.target.parentNode.childNodes[0].value.trim()]).catch((e) => { console.log(e); });
      typeVal == 'Income' ? setin_cat([...(in_cat.slice(0,in_cat.length-1)),e.target.parentNode.childNodes[0].value.trim(),'...+']): setex_cat([...(ex_cat.slice(0,ex_cat.length-1)),e.target.parentNode.childNodes[0].value.trim(),'...+'])
      
       // const current = JSON.parse(localStorage.getItem((typeVal == "Income") ? "income_cat" : "expense_cat"))
      // localStorage.setItem(typeVal == 'Income' ? 'income_cat' : 'expense_cat', JSON.stringify([...current, e.target.parentNode.childNodes[0].value]));
      // e.target.parentNode.childNodes[0].value = ""
    }
    // localStorage.setItem(`${typeVal == 'Income' ? 'income_cat' : 'expense_cat'`)
    document.getElementById("cateAdd").childNodes[0].value=""
    document.getElementById("cateAdd").style.display = "none"

  }

useEffect(()=>{
  localStorage.setItem('expense_cat',JSON.stringify(ex_cat.slice(0,ex_cat.length-1)))
},[ex_cat])
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



  return (
    <div className='appContainer pt-8 h-[100vh] bg-black'>
      <div className='responsive-container'>
        <div className="transaction-details">
          <form className="transaction-form" onSubmit={handleSubmit}>
            <h1 className="transaction-header">Add Transaction</h1>
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
            <label className="input-label" htmlFor="title">
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
                  className='hover:cursor-pointer ' /> <span onClick={handleKey} className='pl-2 absolute right-0 bg-[#e1e1e1] bg-opacity-60  drop-shadow-lg rounded-sm  hover:cursor-pointer'> ADD</span>  </div>
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