import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchCouchesAsync } from '../store/couches/couchesSlice'
import NewAppointment from '../components/NewAppointment'

function UserHome() {
    const [showNewAppointmnet, setShowNewAppointment] = useState({ show: false, couch: {} })

    const { loading, data } = useSelector((state: RootState) => state.couches)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchCouchesAsync({ pageSize: 1, pageIndex: 0 }))
    }, [])

    return (
        <>
            {
                showNewAppointmnet.show ? (<NewAppointment couch={showNewAppointmnet.couch} setShowNewAppointment={setShowNewAppointment} />) : (
                    <div className="container">
                        <div className="row my-4">
                            <div className="col-md-4 col-sm-12">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder='Search' />
                                </div>
                            </div>
                        </div>

                        {/* list of couches */}
                        <div className="row justify-content-center">
                            {
                                loading ? (<>
                                    <div className="col-sm-12  mt-5 pt-5">
                                        <div className='loading-indicator mt-5 pt-5'>
                                            <div className="spinner-border" role="status" style={{ width: '23px', height: '23px' }}>
                                                <span className="visually-hidden">Loading...</span>
                                            </div>

                                            <div>
                                                Fetching Data, Please wait
                                            </div>
                                        </div>
                                    </div>
                                </>) :
                                    data.map(row => <div key={row._id} className="col-md-6 mb-4">
                                        <div className="card couch-box">
                                            <div className="card-body d-flex justify-content-start align-items-center">
                                                <div className="profile-pic">
                                                    <img width={220} height={220} src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="" />
                                                </div>
                                                <div className="profile-details">
                                                    <h2>{row.Name}</h2>
                                                    <h4>{row.Email}</h4>
                                                    <p>Mobile No : {row.Mobile}</p>
                                                    <p>Specialty : {row.Specialty}</p>
                                                    <button className='btn btn-primary rounded-button' onClick={() => {
                                                        setShowNewAppointment({ show: true, couch: row })
                                                    }}>Book An Appointment</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default UserHome

