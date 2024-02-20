import React, { useState } from 'react'
import { useForm } from 'react-hook-form';//TODO: study more on this package, it deals with forms
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '../components/LoaderButton';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import InputError from '../components/InputError';

function UserLogin({ ...props }) {
    const { type } = props
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit = async (values: any) => {

        setLoading(true)
        setError('')
        setSuccess('')
        axios.post("http://localhost:8008/auth/token", {
            username: values.username,
            password: values.password
        }).then(res => {
            setLoading(false);
            //extract the token values and put them into the user session
            //console.log(res.data)
            setSuccess("Authenticated, Redirecting...")
            //decode the token
            const token = res.data.access_token as string;
            const payload = JSON.parse(atob(token.split(".")[1]) || "{}");
            const userCategory: 'couch' | 'couchee' = payload?.user?.userCategory;
            setAuth({
                ...payload,
                token: token
            })
            // console.log(payload)
            if (userCategory === 'couch') {
                navigate("/couch-home");
            } else {
                navigate("/user-home");
            }


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
                    <div className="col-md-6">
                        <div className="card bg-dark text-light">
                            <div className="card-body px-5">
                                <h4 className="text-center my-4">Login As
                                    {
                                        type !== null && type === 'couch' ? ' Life Couch' : ' User'
                                    }

                                </h4>
                                <hr />
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
                                <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="name" className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    id="name"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    {...register('username', { required: 'Email is required' })}
                                                />


                                                <InputError inputError={errors.username} />

                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-12 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="pwd" className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    id="pwd"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    {...register('password', { required: 'Password is required' })}
                                                />


                                                <InputError inputError={errors.password} />
                                            </div>
                                        </div>


                                    </div>
                                    <div className="text-center my-4">
                                        {/* <button className="btn btn-success my-3 w-50">Login</button> */}

                                        <LoadingButton className="btn btn-success my-3 w-50" loading={loading}>Login</LoadingButton>

                                        <p>You don't have an account? click
                                            {/* <a href="user-registration.html">here</a> */}
                                            {
                                                type !== null && type === 'couch' ? <Link to="/couch-registration">here</Link> : <Link to="/user-registration">here</Link>
                                            }

                                            to register</p>
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

export default UserLogin;


// const ErrorMessage = ({...props}) => {
//     return <>
//         {
//             props.inputError && (
//                 <div className="text-danger" >
//                     {props.inputError?.message}
//                 </div>
//             )
//         }
//     </>
// }