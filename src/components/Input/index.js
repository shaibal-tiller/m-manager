import React, { useEffect } from 'react'
import { useState } from 'react';
import { json, useNavigate } from 'react-router-dom'
import './index.css'
import { getexpenseCategories, getincomeCategories } from '../../util/util';
import { db } from '../..//util/firebase.js'

const InputTransaction = () => {
  const expenseCategories = getexpenseCategories()
  expenseCategories.push("...+")
  const incomeCategories = getincomeCategories()
  incomeCategories.push('...+')
  const titleInput = 10
    ; const amountInput = 10

  const [typeVal, setTypeVal] = useState("Expense");
  const [cateValue, setCateVal] = useState("")
  const [amount, setAmount] = useState(0)
  const [otherValue, setOtherValue] = useState()
  const navigate = useNavigate()
  const [name, setName] = useState("")

  useEffect(() => {
    const getName = JSON.parse(localStorage.getItem('user')).name
    if (getName) {
      setName(getName)
    }
  }, [])

  useEffect(() => {
    if (cateValue === '...+') {
      const x = document.getElementById('cateAdd')
      x.style.display = 'block'
    }
  }, [cateValue])
  const handleChange = (e) => {
    setAmount(e.target.value)
  }
  const handleChangeOther = (e) => {
    setOtherValue(e.target.value)
  }
  const selectCate = (e) => {

    setCateVal(e.target.innerHTML)
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
    if (e.key == 'Enter') {
      expenseCategories.pop()
      expenseCategories.push(e.target.value.trim())
      db.ref(`/${name}/categories/${typeVal == 'Income' ? 'income_cat' : 'expense_cat'}`).set(expenseCategories).catch((e) => { console.log(e); });
      document.getElementById("cateAdd").style.display = "none"
    }
  }
  useEffect(()=>{
    setCateVal("")   
  },[typeVal])
  return (
    <div className='appContainer mt-8'>
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

              {typeVal === "Expense" && expenseCategories && expenseCategories.map((el, index) => (
                <p onClick={selectCate} key={"ex" + index}
                  className='hover:cursor-pointer active:bg-[#99dad3] mr-2 mb-2 bg-[#acebe5] px-2 rounded-lg'>{el}</p>)
              )}
              {typeVal === "Income" && incomeCategories && incomeCategories.map((el, index) => (
                <p onClick={selectCate} key={"in" + index}
                  className='hover:cursor-pointer active:bg-[#99dad3] mr-2 mb-2 bg-[#acebe5] px-2 rounded-lg'>{el}</p>)
              )}
              <div>
                <input onKeyPress={handleKey} type={'text'} style={{ display: 'none' }} id="cateAdd"
                  className='hover:cursor-pointer active:bg-[#99dad3] mr-2 mb-2 bg-[#acebe5] px-2 rounded-lg' /> </div>
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