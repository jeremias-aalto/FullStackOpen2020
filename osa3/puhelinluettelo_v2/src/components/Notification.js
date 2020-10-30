import React from 'react'

const ConfirmationMessage = ({ message }) => {
  if (message === null) {return null}
  return (
    <div className="confirmation">
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {return null}
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default { ConfirmationMessage, ErrorMessage }