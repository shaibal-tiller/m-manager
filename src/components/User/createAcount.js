import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../Context'
import { db } from '../../util/firebase'

import './index.css'
const CreateId = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState()
  const handleChange = (e) => {
    setValue(e.target.value)
  }

const myContext= useContext(AppContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target
    const name = data[0].value.trim()
    const pass = data[1].value
    const rePass = data[2].value
    const hint = document.getElementsByClassName("clearfix")[0]
    if (name && pass && rePass) {
      if (pass === rePass) {
        const ref = db.ref(`/${name}`);
        ref.on("value", snapshot => {
          //taken name
          if (snapshot.val()) {
            hint.style.color = 'red'
            hint.innerHTML = "⚠ NAME TAKEN!!"
          }
          else {
            //successful
            const date = new Date()
            myContext.setLoginSt(true)
            const categories = {
              'income_cat': [
                'Allowance', 'Salary', 'Loan', 'Bonus', 'Side Earnings', 'Other'
              ],
              'expense_cat': ['Food Outing', 'Transportations', 'House Rent', ' Social Life',

                'Clothing', 'Bevereges', 'Cigarette', 'Gift', 'Beauty', 'Health', 'Medicine', 'Snacks']
            }
            db.ref(`/${name}`).set({ user: { 'name': name, 'pass': pass, 'created': date.toLocaleDateString(), }, 'transactions': { title: name }, categories}).catch((e) => { console.log(e); });
            navigate('/')
            hint.style.color = 'green'
            hint.innerHTML = "REGISTRATION DONE"
            localStorage.setItem('user', JSON.stringify({ name: name, pass: pass }))
            const refr= db.ref(`${name.trim()}/categories`)
            refr.on('value',snapshotr=>{
            
              localStorage.setItem('income_cat', JSON.stringify(snapshotr.val().income_cat))
              localStorage.setItem('expense_cat', JSON.stringify(snapshotr.val().expense_cat))
            })
            
            setTimeout(() => {
              navigate('/transactions')
            }, 300);
          }
        })


      }
      else {
        hint.style.color = 'red'
        hint.innerHTML = `⚠ Password Doesn't match`

      }
    }
    else {
      hint.style.color = 'red'
      hint.innerHTML = `⚠ Enter ${name ? pass ? 'Password Confirmation' : 'Password' : 'User Name'}!`
    }
  }
  return (
    <div className=' bg-black text-[#fff] h-[100vh] p-2'>
      <div className="logo text-center">
      </div>
      <div className="wrapper  bg-black text-[#fff]">
        <div className="inner-warpper text-center">
          <h2 className="title">Register your account</h2>
          <form onSubmit={handleSubmit} id="formvalidate">
            <div className="input-group">
              <label className="palceholder" htmlFor="userName">User Name</label>
              <input className="form-control" onChange={handleChange} name="userName" id="userName" type="text" placeholder="" />
              <span className="lighting"></span>
            </div>
            <div className="input-group">
              <label className="palceholder" htmlFor="userPassword">Password</label>
              <input className="form-control" onChange={handleChange} name="userPassword" id="userPassword" type="password" placeholder="" />
              <span className="lighting"></span>
            </div>
            <div className="input-group">
              <label className="palceholder" htmlFor="userPasswordConfirm">Confirm Password</label>
              <input className="form-control" onChange={handleChange} name="userPasswordConfirm" id="userPasswordConfirm" type="password" placeholder="" />
              <span className="lighting"></span>
            </div>

            <button className='border border-1 py-2 rounded-2xl hover:bg-[#4b4848]' type="submit" id="login">Submit</button>
            <div className="clearfix text-red-500">

            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default CreateId