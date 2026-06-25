import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

const Sidebar = props => {
  const isCondensed = props.type === "condensed"
  
  return (
      <div 
        className="vertical-menu"
        style={{
          width: isCondensed ? '90px' : '250px',
          position: 'fixed',
          top: '70px',
          bottom: 0,
          marginTop: 0,
          zIndex: 5,
          transition: 'width 0.3s ease'
        }}
      >
          <SidebarContent 
            appMenus={props.appMenus} 
            userInfo={props.userInfo} 
            userBalance={props.userBalance}
            isCondensed={isCondensed}
          />
        
    
      </div>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
