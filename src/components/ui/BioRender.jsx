import React from 'react'

const BioRender = ({ bio }) => {
  return (
    <div
      className="prose dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: bio }}
    />
  )
}

export default BioRender
