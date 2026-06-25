// REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register"
export const POST_CUSTOMER_REGISTER = "/api/users"
// GSOTP
export const GSOTP_HOST = "https://api.gsotp.com"
export const APIKEY = "d63beac1e9248a69ceffa2637f3d2901"
// LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login"
export const POST_JWT_LOGIN = "/Identity/Login"
export const POST_JWT_LOGIN_BY_CODE = "/Identity/LoginByCode"
export const DELETE_JWT_SESSION = "/Identity/Logout"
export const CHANGE_PASSWORD_URL = "/Identity/ChangePassword"
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd"
export const POST_FAKE_JWT_PASSWORD_FORGET = "/Identity/ChangeToDefaultPassword"

// PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/post-fake-profile"

// CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"
export const GET_CATEGORIES = "/categories"

// CHANNELS
export const GET_CHANNELS = "/Channel/GetClientChannels"
export const GET_CHANNEL_BYID = "/Channel/GetChannelById"
export const UPSERT_CHANNEL = "/Channel/UpsertChannelMeet"
export const INSERT_CHANNEL = "/Channel"
export const DELETE_CHANNEL = "/Channel/DeleteChannel"
export const UPDATE_CHANNEL = "/Channel"
// Auction
export const ADD_CHANNEL_AUCTION = "/Channel/AddAuction"

// Users

export const GET_USERS = "/Clients/GetAllUsers"
export const INSERT_USER = "/Clients/AddUser"
export const DELETE_USER = "/clients/DeleteUser"
export const UPDATE_USER = "/clients/UpdateUser"
export const GET_USER_BALANCE = "/Users/GetUserBalance"
export const GET_USER_INFO_URL = "/Users/GetUserInfo"
export const GET_USER_FILES_URL = "/Users/GetUserFiles"
export const ADD_USER_FILE_URL = "/Users/AddFile"
export const DELETE_USER_FILE_URL = "/Users/DeleteFile"

// ElectProjects
export const GET_ELECTPROJECTS_URL = "/ElectProjects/GetClientElectProjects"
export const GET_ELECTPROJECTS_FILTER_URL =
  "/ElectProjects/GetClientElectProjectsFilter"
export const GET_ELECTPROJECTS_FULL_FILTER_URL =
  "/ElectProjects/GetClientElectProjectsFullFilter"
export const GET_ELECTPROJECT_REPORT_URL =
  "/ElectProjects/GetClientElectProjectReport"
export const GET_ELECTPROJECTS_ENG_URL = "/ElectProjects/GetClientElectProjectsEng"
export const UPSERT_ELECTPROJECT_URL = "/ElectProjects/Upsert"
export const UPSERT_COMMENT_URL = "/ElectProjects/UpsertComment"
export const UPSERT_CHECKLIST_URL = "/ElectProjects/UpsertCheckList"
export const UPSERT_CHECKLIST_EDC_URL = "/ElectProjects/UpsertCheckListEdc"
export const UPSERT_ERTFORM_URL = "/ElectProjects/UpsertErtForm"
export const POST_ADD_FILE_ELECTPROJECT_URL = "/ElectProjects/AddFile"
export const GET_PROJECT_INFO_URL = "/ElectProjects/GetProjectInfo"


export const UPDATE_PROCESS_EXPERT_STAGE_URL =
  "/ElectProjectProcesses/UpdateStatusExpertStageByEng"
export const UPDATE_PROCESS_MAP_STAGE_URL =
  "/ElectProjectProcesses/UpdateStatusMapStageByEng"
export const UPDATE_PROCESS_DEFECT_STAGE_URL =
  "/ElectProjectProcesses/UpdateStatusDefectStageByEng"

export const UPDATE_PROCESS_EXPERT_STAGE_NEW_URL =
  "/ElectProjectProcesses/UpdateStatusExpertStageByEngNew"
export const UPDATE_PROCESS_MAP_STAGE_NEW_URL =
  "/ElectProjectProcesses/UpdateStatusMapStageByEngNew"
export const UPDATE_PROCESS_DEFECT_STAGE_NEW_URL =
  "/ElectProjectProcesses/UpdateStatusDefectStageByEngNew"

export const GET_ELECTPROJECT_FILES_URL = "/ElectProjects/GetElectProjectFilesById"
export const GET_ELECTPROJECT_FREE_URL = "/Identity/GetElectProjectFree"
export const GET_PANEL_MAKER_URL = "/ElectProjects/GetPanelMaker"
export const SEND_ELECTPROJECT_TOELECT_URL = "/ElectProjects/Signature"
export const SUBMIT_ELECTPROJECT_ADMIN_URL = "/ElectProjects/SubmitByAdmin"
export const ADD_PANEL_MAKER_URL = "/ElectProjects/AddPanelMaker"
export const SUBMIT_PACKAGE_URL = "/Identity/SubmitPackage"
export const RESET_PACKAGE_URL = "/ElectProjects/ResetPackage"
export const RESOLVED_DEFECT_URL = "/ElectProjects/ResolvedDefect"
export const STOP_ELECTPROJECT_URL = "/ElectProjects/StopElectProject"
export const UPDATE_ELECTPROJECT_DETAILS_URL =
  "/ElectProjects/UpdateElectProjectDetails"
export const UPDATE_ELECTPROJECT_URL = "/ElectProjects/UpdateElectProject"
export const UPDATE_ELECTPROJECT_ENG_URL = "/ElectProjects/UpdateElectProjectByEng"
export const DELETE_ELECTPROJECT_URL = "/ElectProjects/DeleteElectProject"
export const SUBMIT_PANEL_URL = "/ElectProjects/SubmitPanel"
export const AMOUNT_SMS_URL = "/ElectProjects/AmountSms"
export const UPDATE_ELECTPROJECT_STATUS_URL = "/ElectProjects/UpdateElectProjectStatus"
export const UPDATE_DEFECT_DES_URL = "/ElectProjects/UpdateDefectDes"
export const UPDATE_BY_EDC_URL = "/ElectProjects/UpdateByEdc"

// Accounting Transaction
export const GET_TRANSACTION_API = "/Transactions/GetClientUserTransactions"
export const GET_INVOICES_API = "/Transactions/GetClientInvoices"
export const GET_ENG_INVOICES_API = "/Transactions/GetEngClientInvoices"
export const GET_ENG_INVOICE_REPORT_API =
  "/Transactions/GetClientEngInvoiceReport"
export const POST_PAYMENT_CUSTOM_URL = "/Transactions/PaymentCustom"
export const POST_ENG_PAYMENT_CUSTOM_URL = "/Transactions/EngPaymentCustom"
export const GET_ENG_WORK_URL = "/Transactions/GetClientEngWork"

// Epp
export const GET_EPP_BYEPID_API = "/ElectProjectProcesses/GetProjectProcessByEpId"
export const DEL_EPP_URL = "/ElectProjectProcesses/DeleteProjectProcess"
export const PROJECT_PROCESS_URL = "/ElectProjectProcesses/ProjectProcess"
export const GET_LIST_PROJECT_PROCESS_ENG_URL = "/ElectProjectProcesses/GetListProjectProcessEng"
export const GET_LIST_PROJECT_PROCESS_REPORT_URL = "/ElectProjectProcesses/GetListProjectProcessReport"
export const EPP_APPROVED_URL = "/ElectProjectProcesses/EppApproved"
export const EPP_ACCEPTED_URL = "/ElectProjectProcesses/EppAccepted"
export const EPP_Eng_Change_URL = "/ElectProjectProcesses/EppEngChange"
export const EPP_UPDATE_IS_MAIN_URL = "/ElectProjectProcesses/EppUpdateIsMain"


// Engineer
export const GET_LIST_ENGINEER_URL = "Engineers/GetEngineerByClient"
export const UPSERT_ENGINEER_URL = "Engineers/UpsertEngineer"
export const UPSERT_ENG_HISTORY_URL = "Engineers/UpsertEngHistory"

// Quarter Tariff
export const GET_LIST_QUARTERTARIFF_URL = "QuarterTariffs/GetQuarterTariffs"

// Common
export const GET_FILES_COMMON_URL = "Users/GetUserFile"

// Payment
export const GET_PAYMENT_MELLI_URL = "Transactions/PaymentMelli"
export const GET_PAYMENT_MELLI_PUBLIC_URL = "Identity/PaymentMelliPublic"

// Support
export const GET_LIST_SUPPORT_URL = "Supports/GetSupports"
export const UPSERT_SUPPORT_URL = "Supports/Upsert"
export const CLOSED_SUPPORT_URL = "Supports/ClosedSupport"
export const GET_LIST_TICKET_URL = "Supports/GetTickets"
export const UPSERT_TICKET_URL = "Supports/UpsertTicket"
export const POST_ADD_SUPPORT_FILE_URL = "Supports/AddFile"
export const GET_SUPPORT_FILES_URL =  "Supports/GetSupportFiles"
export const DELETE_SUPPORT_FILE_URL = "/Supports/DeleteFile"
// Users for Support (direct recipients)
export const GET_USERS_FOR_SUPPORT_URL = "/Users/GetUsersForSupport"

// EngPaymentList
export const UPSERT_ENG_PAYMENT_LIST_URL = "Transactions/UpsertEngPaymentList"
export const UPDATE_ENG_PAYMENT_LIST_URL = "Transactions/UpdateEngPaymentList"
export const GET_ENG_PAYMENT_LIST_URL = "Transactions/GetEngPaymentList"
export const GET_ENG_PAYMENT_TASK_URL = "Transactions/GetEngPaymentTasks"
export const ENG_PAYMENT_APPROVED_URL = "Transactions/EngPaymentApproved"


// EngQuotaBurnList
export const GET_ENG_QUOTA_BURN_URL = "Quotas/GetEngQuotaBurnList"
export const ENG_QUOTA_BURN_APPROVED_URL = "Quotas/EngQuotaBurnApproved"
export const ENG_QUOTA_BURN_UPDATE_URL = "Quotas/EngQuotaBurnUpdate"


// MetaBase
export const GET_DASHBOARD_TOKEN_URL = "MetaBase/GetDashboardToken"
// Request Demo
export const REQUEST_DEMO_URL = "/RequestDemo/RequestDemo"