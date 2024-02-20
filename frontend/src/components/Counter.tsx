import { AppDispatch, RootState } from './../store/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementAsync } from '../store/counter/counterSlice';

function Counter() {
    //select the state we want to use
    const { value: count, loading } = useSelector((state: RootState) => state.counter)

    //use dispatcher to dispatch our count action
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div>
            <h1 className='count'>{count}</h1>
            <hr />
            <div className="d-flex justify-content-center">
            <button className='btn btn-primary' onClick={() => { dispatch(incrementAsync(1)) }} disabled={loading}>
                {loading ? 'Please Wait' : 'Increment'}
            </button>
            &nbsp;
            &nbsp;
            <button className='btn btn-primary' onClick={() => { dispatch(decrement()) }}>Dicrement</button>
            </div>
        </div>
    )
}

export default Counter