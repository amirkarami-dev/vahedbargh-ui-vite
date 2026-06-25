import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"

import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
  getAppMenus,
  getUserBalance,
  getUserInfo
} from "../../store/actions"

// Layout Related Components
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import Rightbar from "../CommonForBoth/Rightbar"
import "./layout.scss"

const Layout = (props) => {
  const [isMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("themeMode") || "light"
  )

  const toggleTheme = () => {
    const next = themeMode === "light" ? "dark" : "light"
    setThemeMode(next)
    localStorage.setItem("themeMode", next)
  }

  useEffect(() => {
    props.getAppMenus()
    props.getUserBalance()
    props.getUserInfo()

    window.scrollTo(0, 0)
    
    if (props.leftSideBarTheme) {
      props.changeSidebarTheme(props.leftSideBarTheme)
    }

    if (props.layoutWidth) {
      props.changeLayoutWidth(props.layoutWidth)
    }

    if (props.leftSideBarType) {
      props.changeSidebarType(props.leftSideBarType)
    }
    
    if (props.topbarTheme) {
      props.changeTopbarTheme(props.topbarTheme)
    }
  }, [])

  const toggleMenuCallback = () => {
    if (props.leftSideBarType === "default") {
      props.changeSidebarType("condensed", isMobile)
    } else if (props.leftSideBarType === "condensed") {
      props.changeSidebarType("default", isMobile)
    }
  }

  return (
    <React.Fragment>
      <div id="layout-wrapper" className="modern-layout" data-theme={themeMode} style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header
          toggleMenuCallback={toggleMenuCallback}
          themeMode={themeMode}
          onToggleTheme={toggleTheme}
        />
        <Sidebar
          theme={props.leftSideBarTheme}
          type={props.leftSideBarType}
          isMobile={isMobile}
          appMenus={props.lstAppMenu}
          userBalance={props.userBalance}
          userInfo={props.userInfo}
        />
        <div className="main-content" style={{ 
          flex: '1',
          marginLeft: isMobile ? '0' : (props.leftSideBarType === 'condensed' ? '' : ''),
          transition: 'margin-left 0.2s'
        }}>{props.children}</div>
        <Footer />
      </div>
      {props.showRightSidebar ? <Rightbar /> : null}
    </React.Fragment>
  )
}

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
  getAppMenus: PropTypes.func,
  getUserBalance: PropTypes.func,
  getUserInfo: PropTypes.func
}

const mapStateToProps = state => {
  return {
    ...state.Layout,
    ...state.AppMenus,
    ...state.USERs
  }
}

export default connect(mapStateToProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
  getAppMenus,
  getUserBalance,
  getUserInfo
})(withRouter(Layout))
