import { Button, ButtonGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'

const NumeralButton = props => {
const {changeValue,changeValueDecimal, callBack,objName, lblName, initValue} = props
const [counter,setCounter] = useState(initValue)

useEffect(()=>{
    callBack({target:{name:`${objName}`, value:counter, attributes:{type:'number'}}})
},[counter])
const handleIncrement = () =>{
    setCounter(Number((counter + changeValue).toFixed(1)))
}

const handleIncrementDecimal = () =>{
    setCounter(Number((counter + changeValueDecimal).toFixed(1)))

}

const handleDecrementDecimal = () =>{
    if(counter-changeValueDecimal<0){
        setCounter(0)
        return
    }
    setCounter(Number((counter - changeValueDecimal).toFixed(1)))
    }

    const handleDecrement = () =>{
        if(counter-changeValue<0){
            setCounter(0)
            return
        }
        setCounter(Number((counter - changeValue).toFixed(1)))
        }

  return (
    <div style={{display:'flex',flexDirection:'column',alignContent:'end',alignItems:'center' }}>
           
           {lblName}
    <ButtonGroup size="small" aria-label="small outlined button group">

  
        {changeValueDecimal>0 && counter>0 && <Button onClick={handleIncrementDecimal}>+</Button>}
         {counter>0 && changeValueDecimal>0 && <Button onClick={handleDecrementDecimal}>-</Button>}
        {counter>0 && <Button variant="contained" color='info' >{counter}</Button>}
    

      
           <Button onClick={handleIncrement}>+</Button>   
   {counter>0 && <Button onClick={handleDecrement}>-</Button>}    
    </ButtonGroup>
    </div>
  )
}

export default NumeralButton