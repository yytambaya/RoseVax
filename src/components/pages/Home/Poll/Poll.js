import React, { useContext, useEffect } from "react"
import { Home } from "../../../common/Base/Home"
import { PollCard } from "./PollCard"

export const Polls = () => {
  
    return (
    <Home>
      <div className="px-2">
        <PollCard/>    
    </div>
    </Home>
  )
}
