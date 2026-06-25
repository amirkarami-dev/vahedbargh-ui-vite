import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
import ReqRegister from "./auth/reqRegister/reducer"

//Calendar
import calendar from "./calendar/reducer"

// Channels
import channels from './channels/reducer'

// Users
import USERs from './users/reducer'

// ElectProjects
import ElectProjects from './electProjects/reducer'

// AppMenus
import AppMenus from './appMenu/reducer'

// Engineer
import Engineers from './engineers/reducer'

// QuarterTariff
import QuarterTariff from './quarterTariffs/reducer'

// Common
import Commons from './commons/reducer'

// Change Password
import ChangePassword from './auth/changePassword/reducer'

// Payment
import Payment from './payment/reducer'

// Accounting
import Accounting from './accounting/reducer'

// ElectProjectProcesses
import ElectProjectProcesses from './electProjectProcesses/reducer'


// Supports
import Supports from './supports/reducer'

// RequestDemo
import RequestDemo from './requestDemo/reducer'

// EngPayment
import EngPayment from './engPayment/reducer'

// quotas
import Quotas from './quotas/reducer'


const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  ReqRegister,
  channels,
  USERs,
  ElectProjects,
  AppMenus,
  Engineers,
  QuarterTariff,
  Commons,
  ChangePassword,
  Payment,
  Accounting,
  ElectProjectProcesses,
  Supports,
  RequestDemo,
  EngPayment,
  Quotas
})

export default rootReducer
