import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


function LandingPage() {
    const navigation = useNavigate()
    const { auth } = useAuth();

    useEffect(() => {
        if (auth && auth.token) {
            //go to home page based on user category
            if (auth?.user?.userCategory === 'couch') {
                navigation('/couch-home')
            } else {
                navigation('/user-home')
            }
        }
    }, [])

    return (
        <>
            <div className="container pt-4">

                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <h1 className="text-center">We are at the heart of appropriate care</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card bg-dark">
                            <div className="card-body text-center">

                                <img className="rounded w-100" src="https://master-sprints-new.s3.eu-central-1.amazonaws.com/testimonial/16999896306553c87e65fef-1.jpg" alt="" />

                                <Link to="/couch-login"><button className="btn btn-info w-100 my-4">Login as Coach</button></Link>
                                <Link to="/couch-registration"><button className="btn btn-info w-100 ">Join as Coach</button></Link>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-dark">
                            <div className="card-body text-center">
                                <img className="rounded w-100" src="https://master-sprints-new.s3.eu-central-1.amazonaws.com/testimonial/16999896306553c87e65fef-1.jpg" alt="" />
                                {/* <a href="user-login.html" className="btn btn-info w-100 my-4">Login as User</a> */}

                                <Link to="/user-login"><button className="btn btn-info w-100 my-4">Login as User</button></Link>
                                <Link to="/user-registration"><button className="btn btn-info w-100 ">Join as User</button></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default LandingPage