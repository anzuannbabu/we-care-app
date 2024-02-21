import React from 'react'

function PageLoader() {
    return (
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
    )
}

export default PageLoader