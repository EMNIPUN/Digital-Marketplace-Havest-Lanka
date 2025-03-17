import React from 'react'
import Token from '../logins/Token'

function Body() {
    console.log(Token().userId)
    return (
        <div>Body</div>
    )
}

export default Body