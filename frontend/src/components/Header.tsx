

import React from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Header() {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()

    //logout function
    const handleLogout = () => {
        setAuth(null)
        navigate('/')
    }
    return (

        <nav className="navbar navbar-expand-sm bg-dark text-white">
            <div className="container-fluid">
                {/* <a href="./index.html" className="navbar-brand text-light">WeCare</a> */}
                <Link to="/" className='navbar-brand text-light'>WeCare</Link>
                <ul className="navbar-nav ml-auto">
                    {
                        auth && auth?.token && (<>
                            <li className="nav-item">
                                {/* <a className="nav-link text-white " style={{ cursor: 'pointer' }} href='#'>View Profile</a> */}
                                <Link className='nav-link text-white' to='/'>Home</Link>
                            </li> &nbsp;&nbsp;&nbsp;
                            <li className="nav-item">
                                {/* <a className="nav-link text-white " style={{ cursor: 'pointer' }} href='#'>View Profile</a> */}
                                <Link className='nav-link text-white' to='/user-profile'>View Profile</Link>
                            </li> &nbsp;&nbsp;&nbsp;
                            {
                                auth?.user?.userCategory === 'couch' ? <>
                                    <li className="nav-item">
                                        <Link to='/my-schedule' className="nav-link text-white " >My Schedules</Link>
                                    </li> &nbsp;&nbsp;&nbsp;
                                </> : <>
                                    <li className="nav-item">
                                        <Link to='/user-appointmens' className="nav-link text-white " >My Appointments</Link>

                                    </li> &nbsp;&nbsp;&nbsp;
                                </>
                            }

                            <li className="nav-item">
                                <a className="nav-link text-white" style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout ({auth?.user?.name})</a>
                            </li>
                        </>)
                    }

                    {/* this login page is not needed */}
                    {/* {
                        (!auth?.token) && (<>
                            <li className="nav-item">
                                <Link to='user-login' className="nav-link text-white">Login</Link>
                            </li>
                        </>)
                    } */}


                    <li className="nav-item">
                        <a className="nav-link text-white" href="#">+91 9999 9909</a>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default Header