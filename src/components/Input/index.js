import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './index.css'
import { expenseCategories, incomeCategories } from '../../util/util';
import { db } from '../..//util/firebase.js'

const InputTransaction = () => {
  const titleInput = 10
    ; const amountInput = 10
  const optionId = ""
  const transactionTypeOptions = []
  const [typeVal, setTypeVal] = useState("Expense");
  const [cateValue, setCateVal] = useState("")
  const [amount, setAmount] = useState(0)
  const [otherValue, setOtherValue] = useState()
  const navigate = useNavigate()
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
        'amount': amount,
        'category': otherValue,
      }
    }
    else {
      return {
        'type': typeVal,
        'amount': amount,
        'category': cateValue,
      }
    }
  }
  const upload = () => {
    const date = new Date
    const today = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    const time = date.getTime()
    const readyData = formatData()
    db.ref(`${today}/${time}`).set(readyData).catch((e) => { console.log(e); });

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
              className="input"
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
              className="input"
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
              className="input"
              placeholder="Other"
            />
            <div id={"category"} className='mb-2 flex-wrap flex category-pallete '>

              {typeVal === "Expense" && expenseCategories.map((el, index) => (
                <p onClick={selectCate} key={"ex" + index}
                  className='hover:cursor-pointer active:bg-[#99dad3] mr-2 mb-2 bg-[#acebe5] px-2 rounded-lg'>{el}</p>)
              )}
              {typeVal === "Income" && incomeCategories.map((el, index) => (
                <p onClick={selectCate} key={"in" + index}
                  className='hover:cursor-pointer active:bg-[#99dad3] mr-2 mb-2 bg-[#acebe5] px-2 rounded-lg'>{el}</p>)
              )}

            </div>
            <div className='btn-container mt-2'>
              <button onClick={handleContinue} className="button mr-2">
                Continue
              </button>
              <button type="submit" className="button">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default InputTransaction