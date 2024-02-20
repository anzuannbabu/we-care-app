import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchCouchAppointmentsAsync } from '../store/couches/couchesAppoointmentSlice'
import useAuth from '../hooks/useAuth'

function CouchHome() {
  const { auth } = useAuth()

  const { loading, data } = useSelector((state: RootState) => state.couchAppointments)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchCouchAppointmentsAsync({ pageSize: 1, pageIndex: 0, token: auth.token }))
  }, [])

  return (
    <>
      <div className="container pt-5">
        <h3>Appointments</h3> <hr />

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
              data.map((row, index) => <div key={row._id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body bg-dark text-white text-center px-5 py-4 rounded">
                    <h4>Appointment Date</h4>
                    {/* <h4>{row.appointmentDate}</h4> */}
                    <h4>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(row.appointmentDate))}</h4>
                    <h5>Slot: {row.timeSlot}</h5>
                    <div className="d-flex justify-content-between mt-5">
                      <div>Booking Id: {(index + 1)}</div>
                      <div>Booking By: {row.coucheeName}</div>
                    </div>
                  </div>
                </div>
              </div>)
          }
        </div>
      </div>
    </>
  )
}

export default CouchHome