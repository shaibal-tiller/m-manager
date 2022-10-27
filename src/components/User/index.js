import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../util/firebase'
import './index.css'

const Login = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState()
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const checkUser = (name, pass, hint) => {
    // console.log(`/userDetails`);
    const ref = db.ref(`${name.trim()}/user`)
    ref.on("value", snapshot => {
      if (snapshot.val()) {
        if (snapshot.val().pass === pass) {
          hint.style.color = 'green'
          hint.style.fontSize = '18px'
          hint.innerHTML = "✅ Login Successful!"
          const refr= db.ref(`${name.trim()}/categories`)
          refr.on('value',snapshotr=>{
          
            localStorage.setItem('income_cat', JSON.stringify(snapshotr.val().income_cat))
            localStorage.setItem('expense_cat', JSON.stringify(snapshotr.val().expense_cat))
          })
          
          localStorage.setItem('user', JSON.stringify({ name: name, pass: pass }))
          setTimeout(() => {
            navigate('/transactions')
          }, 300);
        }
        else {
          hint.style.color = 'red'
          hint.style.fontSize = '18px'
          hint.innerHTML = "⛔ Incorrect Password!"
        }
      }
      else {
        hint.style.color = 'red'
        hint.style.fontSize = '18px'
        hint.innerHTML = "⛔ Account Doesn't Exist!"
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const hint = document.getElementsByClassName("clearfix")[0]
    const data = e.target
    const name = data[0].value.trim()
    const pass = data[1].value
    if (name && pass) {
      checkUser(name, pass, hint)
      // localStorage.setItem('user', JSON.stringify({ name: name, pass: pass }))
      // navigate('/transactions')

    }
    else {

      hint.style.color = 'red'
      hint.style.fontSize = '18px'
      hint.innerHTML = `⛔ Enter ${name.length?'Password':'User Name'}!`
    }
  }
  return (
    <div>
      <div className="logo text-center">

      </div>
      <div className="wrapper">
        <div className="inner-warpper text-center">
          <h2 className="title">Login to your account</h2>
          <form onSubmit={handleSubmit} id="formvalidate">
            <div className="input-group">
              <label className="palceholder" htmlFor="userName">User Name</label>
              <input className="form-control" onChange={handleChange} name="userName" id="userName" type="text" placeholder="" />
              <span className="lighting"></span>
            </div>
            <div className="input-group">
              <label className="placeholder" htmlFor="userPassword">Password</label>
              <input className="form-control" onChange={handleChange} name="userPassword" id="userPassword" type="password" placeholder="" />
              <span className="lighting"></span>
            </div>

            <button type="submit" id="login">Login</button>
            <div className="clearfix supporter">

            </div>
          </form>
        </div>
        <div className="signup-wrapper text-center">
          <a href="/createaccount">Don't have an accout? <span className="text-primary">Create One</span></a>
        </div>
      </div>

    </div>
  )
}

export default Login