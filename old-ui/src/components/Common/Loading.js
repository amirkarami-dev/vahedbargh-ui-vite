import React from 'react'

export const LoadingBall = ({loading})=> {
console.log("🚀 ~ file: Loading.js ~ line 4 ~ LoadingBall ~ loading", loading)
  return (
     <>
   {loading&&  <div className="loader">
      <div className="ball"></div>
       <div className="ball"></div>
      <div className="ball"></div>
         <span>Loading...</span>
      </div>}
     </>

  )
}
