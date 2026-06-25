import React from "react"
import SweetAlert from "react-bootstrap-sweetalert"

const ConfirmActions = (props) =>{

    const handleConfirm = ()=>{
      props.handleConfirmFn(props.value)
    }
    const handleCancel = ()=>{
    props.handleCancelDialog(false)
    if(props.handleCancelFn && props.handleCancelFnValue ){
      props.handleCancelFn(props.handleCancelFnValue)
    }
  }
    return(
        <SweetAlert
      
        showCancel
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        title={
          <span>
            <small>{props.title}</small>
          </span>
        }
        onConfirm={() => handleConfirm() }
        onCancel={() => handleCancel()}
      >
        {" "}
        <span>آیا مطمن هستید؟</span>
      </SweetAlert>
    )
}



export default ConfirmActions;
