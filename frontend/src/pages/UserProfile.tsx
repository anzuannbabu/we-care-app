import React from 'react'
import useAuth from '../hooks/useAuth'

function UserProfile() {
    const { auth } = useAuth()
    return (
        <>
            <div className="container mt-5 pt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-sm-12 col-lg-6">
                        <div className="card bg-dark text-white">
                            <div className="card-body d-flex justify-content-start align-items-center">
                                <div className="text-center mb-4 w-50 pt-4">
                                    <img className='rounded-circle bg-light' width={220} height={220} src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
                                </div>
                                <div className=" w-50">
                                    <h3>{auth?.user?.name}</h3> <hr />
                                    <h5>Role: {auth?.user?.role}</h5>
                                    {/* <h6>Date Of Birth: {auth?.user?.dob}</h6> */}
                                    <h6>Date Of Birth: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(auth?.user?.dob))}</h6>
                                    <h6>Mobile: {auth?.user?.mobile}</h6>
                                    <h6>Email: {auth?.user?.email}</h6>

                                    {
                                        auth?.user?.role === 'Couch' ? <h6>Specialty: {auth?.user?.specialty}</h6> : <></>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserProfile