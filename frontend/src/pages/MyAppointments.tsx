import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchCoucheeAppointmentsAsync } from '../store/couchee/couchesAppoointmentSlice'
import PageLoader from '../components/PageLoader'
import { formatDate } from '../Helpers/DateHelper'
import { Link } from 'react-router-dom'

function MyAppointments() {

    const { auth } = useAuth()

    const { loading, data } = useSelector((state: RootState) => state.coucheeAppointments)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchCoucheeAppointmentsAsync({ pageSize: 1, pageIndex: 0, token: auth.token }))
    }, [])
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12">
                    {
                        loading ? <PageLoader /> : <>
                            <div className="d-flex justify-content-between mb-3 align-items-center">
                                <h4>You have <b className='badge bg-success' >{data.length}</b> Appointments</h4>
                                <Link to="/user-home" className='btn btn-dark'>New Appointment</Link>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr >
                                        <th className='bg-dark text-white'>SN</th>
                                        <th className='bg-dark text-white'>Couch Name</th>
                                        <th className='bg-dark text-white'>Appointment Date</th>
                                        <th className='bg-dark text-white'>Time Slot</th>
                                        <th className='bg-dark text-white'>Request Date</th>
                                        <th className='bg-dark text-white'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.map((row, index) => {
                                            return (<tr key={row._id}>
                                                <td>{(index + 1)}</td>
                                                <td>{row.couchName}</td>
                                                <td>{formatDate(row.appointmentDate)}</td>
                                                <td>{row.timeSlot}</td>
                                                <td>{formatDate(row.registeredDate)}</td>
                                                <td className='text-center'>
                                                    <button className='btn btn-danger btn-sm'>Cancel</button>
                                                </td>
                                            </tr>)
                                        })
                                    }

                                    {
                                        data && data.length == 0 ? <>
                                            <tr>
                                                <th className='text-center' colSpan={10}>No Data</th>
                                            </tr>
                                        </> : <></>
                                    }


                                </tbody>
                            </table>
                        </>
                    }

                </div>
            </div>
        </div>
    )
}

export default MyAppointments