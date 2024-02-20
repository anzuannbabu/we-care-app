import React from 'react'

function InputError({ ...props }) {
  return <>
    {
      props.inputError && (
        <div className="text-danger" >
          {props.inputError?.message}
        </div>
      )
    }
  </>
}

export default InputError