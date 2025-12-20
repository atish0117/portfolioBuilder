import React from 'react'

const TagLineRender = ({ tagLine }) => {
  return (
    <div
      className="prose dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: tagLine }}
    />
  )
}

export default TagLineRender
