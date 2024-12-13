import React from 'react'
import "./login.css"

function LoginPage({ onLogin }) {
    return (
        <div className='loginPage'>
            <h1>Monkeys Typing🍌</h1>
            <button onClick={onLogin}> Join </button>
        </div>
    )
}

export default LoginPage