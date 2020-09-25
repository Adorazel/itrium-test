import React from "react"

const ErrorIndicator = ({error}) => {
  return (
    <div className="alert alert-danger" role="alert">
      {error.message || "Something went wrong..."}
    </div>
  )
}

export default ErrorIndicator