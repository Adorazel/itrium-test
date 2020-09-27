import React from "react"

const Queue = ({queue}) => {

  const types = {
    GET: "badge-success",
    POST: "badge-primary",
    PUT: "badge-warning",
    DELETE: "badge-danger",
  }

  return <div>
    {
      queue.map(item => {
        return <span key={item.id} className={`badge ${types[item.method]} mr-1`}>{item.method}</span>
      })
    }
  </div>
}

export default Queue