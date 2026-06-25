import PropTypes from "prop-types"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Space, Tooltip } from "antd"
import {
  MenuOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons"

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

//i18n
import { withTranslation } from "react-i18next"

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions"

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const Header = props => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
      setIsFullscreen(true)
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
      setIsFullscreen(false)
    }
  }

  function tToggle() {
    var body = document.body
    if (window.screen.width <= 992) {
      // Mobile: only toggle sidebar visibility, preserve vertical-collpsed state
      body.classList.toggle("sidebar-enable")
    } else {
      // Desktop: toggle condensed mode and ensure sidebar is enabled
      body.classList.toggle("vertical-collpsed")

      // Update Redux state to toggle between condensed and default
      const isCurrentlyCollapsed = body.classList.contains("vertical-collpsed")
      props.changeSidebarType(
        isCurrentlyCollapsed ? "condensed" : "default",
        false
      )
    }
  }

  return (
    <header id="page-topbar" className="app-header">
      <div className="app-header__inner">
        <div className="app-header__start">
          {/* Menu Toggle Button */}
          <Tooltip title="منو" placement="bottom">
            <button
              type="button"
              className="app-header__icon-btn"
              onClick={() => tToggle()}
            >
              <MenuOutlined />
            </button>
          </Tooltip>

          {/* Logo & Title */}
          <Link to="/" className="app-header__brand">
            <span className="app-header__logo">
              <ThunderboltOutlined />
            </span>
            <span className="app-header__titles">
              <span className="app-header__title">
                دفتر اجرایی نظارت برق استان کردستان
              </span>
              <span className="app-header__subtitle">
                سامانه مدیریت پروژه‌های برق
              </span>
            </span>
          </Link>
        </div>

        <div className="app-header__end">
          <Space size={12}>
            {/* Dark / Light Mode Toggle */}
            <Tooltip
              title={props.themeMode === "dark" ? "حالت روشن" : "حالت تیره"}
              placement="bottom"
            >
              <button
                type="button"
                className="app-header__icon-btn"
                onClick={props.onToggleTheme}
                aria-label="تغییر حالت تیره و روشن"
              >
                {props.themeMode === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
            </Tooltip>

            {/* Fullscreen Toggle */}
            <Tooltip
              title={isFullscreen ? "خروج از تمام صفحه" : "تمام صفحه"}
              placement="bottom"
            >
              <button
                type="button"
                className="app-header__icon-btn"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <FullscreenExitOutlined />
                ) : (
                  <FullscreenOutlined />
                )}
              </button>
            </Tooltip>

            {/* Notification */}
            <NotificationDropdown userInfo={props.userInfo} />

            {/* Profile Menu */}
            <ProfileMenu />
          </Space>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
  userInfo: PropTypes.object,
  themeMode: PropTypes.string,
  onToggleTheme: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout
  return {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
    userInfo: state.USERs.userInfo,
  }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header))
