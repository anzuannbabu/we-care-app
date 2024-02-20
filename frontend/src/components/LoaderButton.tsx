import React from 'react'

function LoadingButton(props:any) {
    return (
        <>
            {
                (props.loading) ? (<>
                    <button className={props.className} disabled={props.loading}>
                        <div className='loading-indicator'>
                            <div className="spinner-border" role="status" style={{ width: '23px', height: '23px' }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div>
                                {props.loadingText || "Please wait..."}
                            </div>
                        </div>
                    </button>
                </>) : (<>
                    <button className={props.className} type={props.type} onClick={props.onClick}>
                        {props.children}
                    </button>
                </>)
            }
        </>
    )
}

export default LoadingButton