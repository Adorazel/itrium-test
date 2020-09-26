import React from "react"

const ErrorIndicator = ({error = {message: "Something went wrong..."}}) => {
  return <div className="alert alert-danger" role="alert">
    {error.message}
  </div>
}

export default ErrorIndicator