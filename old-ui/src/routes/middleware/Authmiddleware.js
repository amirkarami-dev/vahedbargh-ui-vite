import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { getRoleUser } from "helpers/service_helper";

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  matches_sm,
  openNotification,
  roles,
  children,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
    props = {...props,isAuthProtected,matches_sm, openNotification}
      if (isAuthProtected && !localStorage.getItem("authUser")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
     
      if(roles &&  !getRoleUser().some(r=> roles.indexOf(r)>=0)){

        return <Redirect to={{pathname:'/dashboard'}} />
      }
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware
