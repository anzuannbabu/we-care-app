import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import InputError from './InputError'
import LoadingButton from './LoaderButton'
import useAuth from '../hooks/useAuth'

function NewAppointment({ ...props }) {
    const { auth } = useAuth()
    const { couch } = props
    const allowedSlots = ['9AM to 10AM', '10AM to 11AM', '11AM to 12PM', '2PM to 3PM', '3PM to 4PM', '4PM to 5PM']

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // const { setAuth } = useAuth();

    const navigate = useNavigate(); //TODO: this hook might not needed here if I use modal box

    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const onSubmit = async (values: any) => {
        //create an appointment
        setLoading(true)
        setError('')
        setSuccess('')
        axios.post("http://localhost:8008/api/v1/appointments", {
            ...values,
            couchId: couch._id,
            couchName: couch.Name,//this should be validated in the backend to avoid invalid infomration
        }, {
            headers: {
                Authorization: `bearer ${auth?.token}`
            }
        }).then(res => {
            setLoading(false);
            setSuccess(`Appointment created successfully`)
            reset()
            setTimeout(() => {
                props.setShowNewAppointment({ show: false, couch: null });
            }, 2000);

        }).catch((err: any) => {
            setLoading(false);
            console.log(err)
            setError(err.response.data.message || "Oops! something is not right, Please contact support")
        })

    };

    return (
        <>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="card bg-dark text-white px-3 py-2 pb-3">
                            <div className="card-body">
                                <h3 className='text-center py-3'>Proceed with your Appointment</h3>
                                {
                                    error && <>
                                        <div className="alert alert-danger">{error}</div>
                                    </>
                                }
                                {
                                    success && <>
                                        <div className="alert alert-success">{success}</div>
                                    </>
                                }
                                <div className="alert alert-info">
                                    <h5>Couch Details</h5> <hr />
                                    <h6>Name: {couch?.Name}</h6>
                                    <h6>Specialty: {couch?.Specialty}</h6>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                                    <div className="form-group my-4">
                                        <label htmlFor="appDate">Appointment Date</label>
                                        <input type="date" className='form-control' {...register('appointmentDate', { required: 'This field is required' })} />
                                        <InputError inputError={errors.appointmentDate} />
                                    </div>
                                    <div className="form-group my-4">
                                        <h6 className='mb-0 pb-0 d-block'>Preffered Slots</h6> <br />
                                        <div className="row">
                                            {
                                                allowedSlots.map(slot => <div key={slot} className="col-sm-12 col-md-4">
                                                    <input type="radio" value={slot} {...register('timeSlot', { required: 'This field is required' })} id={slot} className='form-check-input' />
                                                    &nbsp;&nbsp;
                                                    <label htmlFor={slot}>{slot}</label>
                                                </div>)
                                            }
                                            <InputError inputError={errors.timeSlot} />
                                        </div>
                                    </div>
                                    {/* <pre>{JSON.stringify(couch, null, 2)}</pre> */}
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <button className='btn btn-secondary' type='button' onClick={() => props.setShowNewAppointment({ show: false, couch: null })}>Go Back</button>
                                        {/* <button className='btn btn-success'>Confirm Appintment</button> */}
                                        <LoadingButton className="btn btn-success px-4" loading={loading}>Confirm Appintment</LoadingButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewAppointment