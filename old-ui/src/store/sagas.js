import { all, fork } from "redux-saga/effects"

// public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import calendarSaga from "./calendar/saga"
import ReqRegisterSaga from "./auth/reqRegister/saga"

// Channels
import channelsSaga from "./channels/saga"
// Users
import USERsSaga from "./users/saga"

// ElectProjects
import electProjectsSaga from "./electProjects/saga"

// Engineer
import engineersSaga from "./engineers/saga"

// Quarter Tariff
import quarterTariffSaga from "./quarterTariffs/saga"

// Commons
import commonsSaga from "./commons/saga"

// Change Password
import changePasswordSaga from "./auth/changePassword/saga"

// Payment
import PaymentSaga from "./payment/saga"

// Accounting
import AccountingSaga from "./accounting/saga"

// Epp
import ElectProjectProcessesSaga from "./electProjectProcesses/saga"

// Supports
import SupportsSaga from "./supports/saga"
// Request Demo
import RequestDemoSaga from "./requestDemo/saga"

// EngPayment
import EngPaymentSaga from "./engPayment/saga"

// Quotas
import QuotasSaga from "./quotas/saga"

export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    LayoutSaga(),
    fork(calendarSaga),
    ReqRegisterSaga(),
    channelsSaga(),
    USERsSaga(),
    electProjectsSaga(),
    engineersSaga(),
    quarterTariffSaga(),
    commonsSaga(),
    changePasswordSaga(),
    PaymentSaga(),
    AccountingSaga(),
    ElectProjectProcessesSaga(),
    SupportsSaga(),
    RequestDemoSaga(),
    EngPaymentSaga(),
    QuotasSaga(),
  ])
}
