import PropTypes from "prop-types"
import React, { useEffect } from "react"

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import {
  userRoutes,
  authRoutes,
  meetRoutes,
} from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

import { useMediaQuery, useTheme } from "@mui/material"

import { notification } from "antd"

notification.config({
  duration: 1,
  rtl: true,
})
const App = props => {
  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  const theme = useTheme()
  const matches_sm = useMediaQuery(theme.breakpoints.down("sm"))
  const [api, contextHolder] = notification.useNotification()
  const openNotification = (type, placement, message) => {
    api[type]({
      message,
      placement,
    })
  }
  return (
    <React.Fragment>
      {contextHolder}
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              roles={route.roles}
              matches_sm={matches_sm}
              openNotification={openNotification}
              exact
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              roles={route.roles}
              children={route.children}
              matches_sm={matches_sm}
              openNotification={openNotification}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
