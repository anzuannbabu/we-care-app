import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { fetchPostsAsync } from '../store/posts/postsSlice'

function Posts() {
    const { loading, data } = useSelector((state: RootState) => state.posts)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchPostsAsync({ pageSize: 1, pageIndex: 0 }))
    }, [])
    return (
        <>
            <h1>Posts</h1>
            {
                loading && <h4>Featching Data</h4>
            }

            {
                data.length > 0 ? (<>
                    {
                        data.map(row => <div className="card mb-3 p-3" key={row.id}>
                            <div className="card-title border-bottom">
                                <h4>{row.title}</h4>
                            </div>
                            <div className="card-body">{row.body}</div>
                        </div>)
                    }
                </>) : (<>
                    <div className='card w-100'>
                    <h5 className='text-center text-danger'>No Data Found</h5>
                    </div>
                </>)
            }
        </>
    )
}

export default Posts