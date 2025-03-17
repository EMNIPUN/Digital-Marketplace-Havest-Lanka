import React from 'react'

function SampleLogin() {
    return (
        <form action="/login/sample-login" method="POST">
            <input type="email" name="email" placeholder="Enter email" required />
            <input type="password" name="password" placeholder="Enter password" required />
            <button type="submit">Login</button>
        </form>
    )
}

export default SampleLogin