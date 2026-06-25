import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import RequestRegister from "../pages/Authentication/RequestRegister"
import SubmitSms from "../pages/Authentication/SubmitSms"
import TransactionPublic from "../pages/Accounting/TP"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Channels

// Auctions

// pages
import Projects from "pages/Projects"
import CreateProject from "pages/CreateProject"
import ElectProjects from "pages/ElectProjects"
import ElectProjectsPanelMaker from "pages/ElectProjectsPanelMaker"
import ElectProjectProcessEng from "pages/ElectProjectProcessEng"
import ElectProjectProcessList from "pages/ElectProjectProcessList"
import Accounting from "pages/Accounting"
import UserFiles from "pages/UserFiles"
import BaseInfo from "pages/BaseInfo"
import Reports_electProjects from "pages/Reports/electProjects"
import Reports_engInvoice from "pages/Reports/accounting"
import ElectProjectProcess from "pages/ElectProjectProcess"
import Reports_Engineers from "pages/Reports/engineers"
import EngWork from "pages/EngWork"
import Support from "pages/Support"
import Ticket from "pages/Support/Ticket"
import EngPayment from "pages/EngPayment"
import ElectProjectProcessEdc from "pages/ElectProjectProcessEdc"
import ElectProjectsEdc from "pages/ElectProjectsEdc"
import ProjectPublic from "pages/ElectProjects/EP"
import PipingPlan from "pages/PipingPlan"

const userRoutes = [
  {
    id: 1001,
    parent_id: null,
    title: "Dashboard",
    icon: "mdi mdi-view-dashboard",
    path: "/dashboard",
    component: Dashboard,
    roles: [
      "Administrator",
      "Engineer",
      "Employee",
      "Accountant",
      "PanelMaker",
      "ElectAdmin",
      "Section",
    ],
    hide: false,
  },

  {
    id: 1002,
    parent_id: null,
    title: "BaseInfo",
    icon: "ti-settings",
    path: "/BaseInfo",
    roles: ["Administrator", "Accountant", "Section"],
    hide: false,
  },
  {
    id: 100201,
    parent_id: 1002,
    title: "ExeEng",
    icon: "ti-settings",
    path: "/BaseInfo/ExeEng",
    component: BaseInfo,
    roles: ["Administrator", "Accountant", "Section"],
    hide: false,
  },

  {
    id: 1003,
    parent_id: null,
    title: "Project",
    icon: "mdi mdi-dns",
    path: "/projects",
    component: Projects,
    roles: [
      "Administrator",
      "Engineer",
      "PanelMaker",
      "ElectAdmin",
      "Section",
      "Employee",
    ],
    hide: false,
  },
  {
    id: 100301,
    parent_id: 1003,
    title: "CreateProject",
    icon: "ti-files",
    path: "/projects/create",
    component: Projects,
    roles: ["Administrator", "Section"],
    hide: false,
  },
  {
    id: 100302,
    parent_id: 1003,
    title: "CreateElectProject",
    icon: "ti-files",
    path: "/projects/CreateProject",
    component: CreateProject,
    roles: ["ElectAdmin"],
    hide: false,
  },
  {
    id: 100303,
    parent_id: 1003,
    title: "ProjectList",
    icon: "ti-files",
    path: "/projects/ElectProjects",
    component: ElectProjects,
    roles: ["Administrator", "Section", "Employee"],
    hide: false,
  },
  {
    id: 100303,
    parent_id: 1003,
    title: "ProjectList",
    icon: "ti-files",
    path: "/projects/ElectProjectsEdc",
    component: ElectProjectsEdc,
    roles: ["ElectAdmin"],
    hide: false,
  },
  {
    id: 100304,
    parent_id: 1003,
    title: "ProjectList",
    icon: "ti-files",
    path: "/projects/ElectProjectsPanelMaker",
    component: ElectProjectsPanelMaker,
    roles: ["PanelMaker"],
    hide: false,
  },
  //{id:100304,parent_id:1003, title:"MyProjects",icon:"ti-files", path: "/projects/ElectProjectsEng", component: ElectProjectsEng,roles:[ 'Engineer'],hide:false},
  {
    id: 100305,
    parent_id: 1003,
    title: "MyProjectProcess",
    icon: "ti-files",
    path: "/projects/ElectProjectProcessEng",
    component: ElectProjectProcessEng,
    roles: ["Engineer"],
    hide: false,
  },
  {
    id: 100306,
    parent_id: 1003,
    title: "MyProjectProcessEdc",
    icon: "ti-files",
    path: "/projects/ElectProjectProcessEdc",
    component: ElectProjectProcessEdc,
    roles: ["ElectAdmin"],
    hide: false,
  },
  {
    id: 100307,
    parent_id: 1003,
    title: "ElectProjectProcess",
    icon: "ti-files",
    path: "/projects/ElectProjectProcess",
    component: ElectProjectProcess,
    roles: ["Administrator", "Section"],
    hide: false,
  },
  {
    id: 100308,
    parent_id: 1003,
    title: "ElectProjectProcessList",
    icon: "ti-files",
    path: "/projects/ElectProjectProcessList",
    component: ElectProjectProcessList,
    roles: ["Administrator", "Section"],
    hide: false,
  },

  {
    id: 1004,
    parent_id: null,
    title: "EngWork",
    icon: "ti-control-play",
    path: "/EngWork",
    component: EngWork,
    roles: ["Administrator", "Engineer", "Employee", "Accountant"],
    hide: false,
  },
  {
    id: 1005,
    parent_id: null,
    title: "Profile",
    icon: "ti-user",
    path: "/profile",
    component: UserProfile,
    roles: [
      "Administrator",
      "Engineer",
      "Accountant",
      "Employee",
      "Section",
      "ElectAdmin",
    ],
    hide: false,
  },
  {
    id: 1006,
    parent_id: null,
    title: "Accounting",
    icon: "ti-wallet",
    path: "/accounting",
    component: Accounting,
    roles: ["Administrator", "Engineer", "Accountant", "Section"],
    hide: false,
  },
  {
    id: 1007,
    parent_id: null,
    title: "MyFiles",
    icon: "ti-files",
    path: "/userFile",
    component: UserFiles,
    roles: ["Administrator", "Engineer", "PanelMaker", "ElectAdmin", "Section"],
    hide: false,
  },
  // {id:1007,parent_id:null,title:"Learning",icon:"ti-control-play", path: "/learning", component: Learning,roles:['Administrator', 'Engineer', 'Employee', 'Accountant'] },
  {
    id: 1008,
    parent_id: null,
    title: "Support",
    icon: "ti-comments",
    path: "/support",
    component: Support,
    roles: ["Administrator", "Engineer", "Employee", "Accountant"],
    hide: false,
  },
  {
    id: 100801,
    parent_id: null,
    title: "Support",
    icon: "ti-comments",
    path: "/support/:id",
    component: Ticket,
    roles: ["Administrator", "Engineer", "Employee", "Accountant"],
    hide: true,
  },

  {
    id: 1009,
    parent_id: null,
    title: "Reports",
    icon: "ti-file",
    path: "/reports",
    roles: ["Administrator", "Accountant", "Engineer"],
    hide: false,
  },
  {
    id: 100901,
    parent_id: 1009,
    title: "Projects",
    icon: "ti-file",
    path: "/reports/electProjects",
    component: Reports_electProjects,
    roles: ["Administrator"],
    hide: false,
  },
  {
    id: 100902,
    parent_id: 1009,
    title: "EngInvoices",
    icon: "ti-server",
    path: "/reports/engInvoices",
    component: Reports_engInvoice,
    roles: ["Accountant"],
    hide: false,
  },
  {
    id: 100903,
    parent_id: 1009,
    title: "EngMyReports",
    icon: "ti-server",
    path: "/reports/engReports",
    component: Reports_Engineers,
    roles: ["Engineer"],
    hide: false,
  },

  // {id:1010,parent_id:null, title:"ElectProjectProcessListView",icon:"ti-files", path: "/projects/ElectProjectProcessListView", component: ElectProjectProcessListView,roles:['Employee', 'Engineer'],hide:false},

  {
    id: 1011,
    parent_id: null,
    title: "EngPaymentManagement",
    icon: "ti-files",
    path: "/accounting/EngPayment",
    component: EngPayment,
    roles: ["Accountant"],
    hide: false,
  },
  // Piping Plan
  {
    id: 1012,
    parent_id: null,
    title: "ترسیم پلان",
    icon: "ti-layout-grid2",
    path: "/plan",
    component: PipingPlan,
    roles: ["Administrator"],
    hide: false,
  },

  // USERs
  // {id:1008,parent_id:null,title:"Users", icon:"ti-user", path:"/users", component: USERs,roles:['Administrator'],hide:false},
  // this route should be at the end of all other routes
  {
    id: 1017,
    parent_id: null,
    title: "",
    index: 1,
    icon: "ti-user",
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    roles: ["Administrator", "Engineer", "Accountant"],
    hide: false,
  },
]

const authRoutes = [
  { path: "/logout", component: Logout, hide: false },
  { path: "/login", component: Login, hide: false },
  { path: "/forgot-password", component: ForgetPwd, hide: false },
  { path: "/register", component: Register, hide: false },
  { path: "/request-register", component: RequestRegister, hide: false },
  { path: "/submit-sms", component: SubmitSms, hide: false },
  { path: "/tp", component: TransactionPublic, hide: false },
  { path: "/ep", component: ProjectPublic, hide: false },
]



export { userRoutes, authRoutes }
