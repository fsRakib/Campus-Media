import React from 'react'
import { CreatePost } from './CreatePost'
import { Chit } from './Chit'

const Feed = () => {
  return (
    <div className="w-[50%] border border-gray-200">
        <div>
            <CreatePost/>
            <Chit/>
        </div>
    </div>
  )
}

export default Feed