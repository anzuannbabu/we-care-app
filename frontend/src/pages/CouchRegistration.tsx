import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import InputError from '../components/InputError'
import LoadingButton from '../components/LoaderButton'

function CouchRegistration() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // const { setAuth } = useAuth();

    const navigate = useNavigate(); //TODO: this hook might not needed here if I use modal box

    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit = async (values: any) => {

        setLoading(true)
        setError('')
        setSuccess('')
        axios.post("http://localhost:8008/auth/registerCouch", {
            ...values
        }).then(res => {
            setLoading(false);
            setSuccess(`Life Couch Registered Succesfull, please use email: ${res.data.Email} and your password to login`)

        }).catch((err: any) => {
            setLoading(false);
            console.log(err)
            setError(err.response.data.message || "Oops! something is not right, Please contact support")
        })

    };

    return (
        <>
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="card bg-dark text-light">
                            <div className="card-body px-5">
                                <h4 className="text-center my-4">Life Couch Profile</h4>
                                <hr />
                                {/* error section */}
                                {
                                    error && <>
                                        <div className="alert alert-danger">{error}</div>
                                    </>
                                }
                                {
                                    success && <>
                                        <div className="alert alert-success">
                                            {success} <br />
                                            <p>
                                                Click
                                                {/* <a href="user-login.html">here</a> */}
                                                <Link to="/couch-login">here</Link>
                                                to login
                                            </p>
                                        </div>
                                    </>
                                }
                                {/* ./error section */}
                                <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    {...register('name', { required: 'This field is required' })}
                                                />
                                                <InputError inputError={errors.name} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="pwd" className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    id="pwd"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    {...register('password', { required: 'This field is required' })}
                                                />
                                                <InputError inputError={errors.password} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="dob" className="form-label">Date Of Birth</label>
                                                <input
                                                    type="date"
                                                    id="dob"
                                                    className="form-control"
                                                    placeholder="Date of Birth"
                                                    {...register('birthday', { required: 'This field is required' })}
                                                />
                                                <InputError inputError={errors.birthday} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="form-group">
                                                <p>Gender</p>
                                                <div className="d-flex">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            value='female'
                                                            id="female"
                                                            required
                                                            {...register('gender', { required: 'This field is required' })}
                                                        />
                                                        <label className="form-check-label" htmlFor="female">
                                                            Female
                                                        </label>
                                                    </div>
                                                    &nbsp; &nbsp; &nbsp;
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            value='male'
                                                            id="male"
                                                            {...register('gender', { required: 'This field is required' })}
                                                        />
                                                        <label className="form-check-label" htmlFor="male">
                                                            Male
                                                        </label>
                                                    </div>
                                                </div>
                                                <InputError inputError={errors.gender} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="mobile" className="form-label">Mobile</label>
                                                <input
                                                    type="number"
                                                    id="mobile"
                                                    className="form-control"
                                                    placeholder="Mobile"
                                                    {...register('mobile', { required: 'This field is required' })}
                                                />
                                                <InputError inputError={errors.mobile} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    {...register('email', { required: 'This field is required' })}
                                                />
                                                <InputError inputError={errors.email} />
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="specialty" className="form-label">specialty</label>
                                                <input
                                                    type="text"
                                                    id="specialty"
                                                    className="form-control"
                                                    placeholder="Specialty"
                                                    {...register('specialty', { required: 'This field is required' })}
                                                />
                                                <InputError inputError={errors.specialty} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="pincode" className="form-label">PinCode</label>
                                                <input
                                                    type="text"
                                                    id="pincode"
                                                    className="form-control"
                                                    placeholder="Pincode"
                                                    {...register('pinCode', { required: 'This field is required' })}
                                                />
                                                <InputError inputError={errors.pinCode} />
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    className="form-control"
                                                    placeholder="City"
                                                    {...register('city', { required: 'This field is required' })}
                                                />
                                                <InputError inputError={errors.city} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="state" className="form-label">State</label>
                                                <input
                                                    type="text"
                                                    id="state"
                                                    className="form-control"
                                                    placeholder="State"
                                                    {...register('state', { required: 'This field is required' })}
                                                />
                                                <InputError inputError={errors.state} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="country" className="form-label">Country</label>
                                                <select
                                                    className="form-select"
                                                    id="country"
                                                    aria-label="Select Country"
                                                    {...register('country', { required: 'This field is required' })}
                                                >
                                                    <option value="">Select Country</option>
                                                    <option value="1">Country Name</option>
                                                    <option value="2">Country Name</option>
                                                    <option value="3">Country Name</option>
                                                </select>
                                                <InputError inputError={errors.country} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center my-4">
                                        {/* <button className="btn btn-success my-3 w-50">Submit</button> */}
                                        <LoadingButton className="btn btn-success my-3 w-50" loading={loading}>Submit</LoadingButton>
                                        <p>
                                            Do you have an account? click
                                            {/* <a href="user-login.html">here</a> */}
                                            <Link to="/couch-login">here</Link>
                                            to login
                                        </p>
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

export default CouchRegistration