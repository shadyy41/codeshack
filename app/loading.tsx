import React from 'react'
import Spinner from './components/spinner'

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner sizeclass="h-8 w-8 sm:h-16 sm:w-16" borderclass="border-4"/>
    </div>
  )
}

export default Loading