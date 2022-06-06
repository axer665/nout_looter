import React from 'react'
import {Link} from 'react-router-dom'

const navbar = () => {
    return (
        <div>
            <p> This is Navbar </p>
            <Link to="/admin"></Link>
            <Link to="#">
                <p> link </p>
            </Link>
        </div>
    )
}

export default navbar