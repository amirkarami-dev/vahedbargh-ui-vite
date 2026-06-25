import axios from "axios"
import { post, del, get, put,postAttach,getImageFile } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = (data) => post(url.POST_FAKE_REGISTER, data)

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

//send sms verify Methods
const postSmsRegister = async (urlMan,mobileNumber)=> {
  const {mobile,countryCode} = mobileNumber;
  
  let data = JSON.stringify({
    "method": "sms",
    "smart": false,
    "mobile": mobile.toString(),
    "templateID": 8,
    "param1": "electUnit App",
    "length": 4,
    "countryCode":parseInt(countryCode)
  });

  let config = {
    method: 'post',
    url: urlMan,
    headers: { 
      'accept-language': 'en-IR', 
      'content-type': 'application/json', 
      'apiKey': 'eb7a8cb30c3e3e427cf32ff99d8031ba'
    },
    data : data
  };
  return axios(config)
  .then(response =>{
    console.log("response send sms:",response);
    if (response) {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    }
  }).catch(err => {
   
    let message
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found"
          break
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team"
          break
        case 401:
          message = "Invalid credentials"
          break
        default:
          message = err[1]
          break
      }
    }
    throw message
  })
}
//send sms verify Methods
const postAuctionResult = async (urlMan,auctionResult)=>{
  const {auctionId,userId,price} = auctionResult;
  
  let data = JSON.stringify({
    "auctionId": auctionId,
    "userId": userId,
    "price": parseInt(price),
    "templateID": 8,
    "status": 1
  });

  let config = {
    method: 'post',
    url: urlMan,
    headers: { 
      'accept-language': 'en-IR', 
      'content-type': 'application/json'
    },
    data : data
  };
  return axios(config)
  .then(response => {
    console.log("response send sms:",response);
    if (response) {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    }
  }).catch(err => {
   
    let message ='problem:CORS policy|net::ERR_FAILED'
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found"
          break
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team"
          break
        case 401:
          message = "Invalid credentials"
          break
        default:
          message = err[1]
          break
      }
    }
    throw message
  })
}
//verify sms code
const postSmsToSubmit = async (urlMan,code,mobileNumber)=>{
  let data = JSON.stringify({
  
    "mobile": mobileNumber,
    "otp": code.smsNumber
  
  });

  let config = {
    method: 'post',
    url: urlMan,
    headers: { 
      'accept-language': 'en-IR', 
      'content-type': 'application/json', 
      'apiKey': 'eb7a8cb30c3e3e427cf32ff99d8031ba'
    },
    data : data
  };
  return axios(config)
  .then(response =>{
    console.log(response);
    if (response) {
      
      if (response.status >= 200 || response.status <= 299) {
  
        return response.data
      }

      throw response.data.error.message
    }
  }).catch(err => {
   
    let message
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found"
          break
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team"
          break
        case 401:
          message = "Invalid credentials"
          break
        default:
          message = err[1]
          break
      }
    }
    throw message
  })
}
//Send Sms to Amir
const postSmsRegisterToAmir =  async (urlMan, dataMan)=>{
  let data = JSON.stringify({
    "method": "sms",
    "smart": false,
    "mobile": "9183805612",
    "templateID": 10,
    "param1": "Re:"+ dataMan.mobile.toString()+"@",
    "length": 4
  });

  let config = {
    method: 'post',
    url: urlMan,
    headers: { 
      'accept-language': 'fa-IR', 
      'content-type': 'application/json', 
      'apiKey': '4775409e8f08331f3a7db68261d55187'
    },
    data : data
  }
  return axios(config)
  .then(response =>{
    if (response) {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    }
  }).catch(err => {
    let message
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found"
          break
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team"
          break
        case 401:
          message = "Invalid credentials"
          break
        default:
          message = err[1]
          break
      }
    }
    throw message
  })
}
// post Code Register  Method
const postCustomerRegister = data => post(url.POST_CUSTOMER_REGISTER,data)

// Identity Method
const postJwtLogin = data => post(url.POST_JWT_LOGIN, data)
const postJwtLoginByCode = data => post(url.POST_JWT_LOGIN_BY_CODE, data)
const delJwtSession = data => post(url.DELETE_JWT_SESSION,data)
export const changePasswordApi = data => post(url.CHANGE_PASSWORD_URL,data)
// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)

//#region Events
export const getEvents = () => get(url.GET_EVENTS)
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)
export const updateEvent = event => put(url.UPDATE_EVENT, event)
export const deleteEvent = event => del(url.DELETE_EVENT, { headers: { event } })
//#endregion
 

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES)

//#region Channel 
export const getChannels = () => get(url.GET_CHANNELS)
export const getChannelById = event => get(url.GET_CHANNEL_BYID +"/"+event[0].channelId)
export const insertChannel = event => post(url.INSERT_CHANNEL,event)
export const upsertChannel = event => post(url.UPSERT_CHANNEL,event)
export const updateChannel = event => put(url.UPDATE_CHANNEL+"/"+event[0].channelId,event[1].channel)
export const updateChannelAuction = event => post(url.ADD_CHANNEL_AUCTION,event)
export const deleteChannel = id => post(url.DELETE_CHANNEL,id)
//#endregion

//#region ElectProjects
export const upsertElectProject = event => post(url.UPSERT_ELECTPROJECT_URL,event)
export const upsertCommentApi = data => post(url.UPSERT_COMMENT_URL,data)
export const upsertCheckListApi = data => post(url.UPSERT_CHECKLIST_URL,data)
export const upsertCheckListEdcApi = data => post(url.UPSERT_CHECKLIST_EDC_URL,data)
export const upsertErtFormApi = data => post(url.UPSERT_ERTFORM_URL,data)
export const getElectProjects = ({searchValue,page,pageSize}) =>get(url.GET_ELECTPROJECTS_URL+"?searchValue="+searchValue + "&Page=" + page + "&PageSize=" + pageSize)
export const getElectProjectsFilterApi = (queryString) =>get(url.GET_ELECTPROJECTS_FILTER_URL+"?" + queryString)
export const getElectProjectsFullFilterApi = (data) =>post(url.GET_ELECTPROJECTS_FULL_FILTER_URL,data)
export const getElectProjectReport = (queryString) =>get(url.GET_ELECTPROJECT_REPORT_URL+"?" + queryString)
export const getElectProjectsEng = (queryString) =>get(url.GET_ELECTPROJECTS_ENG_URL+"?" + queryString)
export const postFileElectProjectApi = (attach) => postAttach(url.POST_ADD_FILE_ELECTPROJECT_URL,attach)
export const getProjectInfoApi = (projectId) => post(url.GET_PROJECT_INFO_URL + "?projectId=" + projectId)




export const updateProcessExpertStage = (data) => postAttach(url.UPDATE_PROCESS_EXPERT_STAGE_URL,data)
export const updateProcessMapStage = (data) => postAttach(url.UPDATE_PROCESS_MAP_STAGE_URL,data)
export const updateProcessDefectStage = (data) => postAttach(url.UPDATE_PROCESS_DEFECT_STAGE_URL,data)

export const updateProcessExpertStageNew = (data) => postAttach(url.UPDATE_PROCESS_EXPERT_STAGE_NEW_URL,data)
export const updateProcessMapStageNew = (data) => postAttach(url.UPDATE_PROCESS_MAP_STAGE_NEW_URL,data)
export const updateProcessDefectStageNew = (data) => postAttach(url.UPDATE_PROCESS_DEFECT_STAGE_NEW_URL,data)

export const getElectProjectFile = (electProjectId) => get(url.GET_ELECTPROJECT_FILES_URL + "?electProjectId=" + electProjectId)
export const getElectProjectFreeApi = (fileNumber) => get(url.GET_ELECTPROJECT_FREE_URL + "?fileNumber=" + fileNumber)
export const getPanelMaker = () => get(url.GET_PANEL_MAKER_URL)
export const sendElectProjectToElect = (fileNumber) => post(url.SEND_ELECTPROJECT_TOELECT_URL+"?FileNumber="+ fileNumber)
export const submitElectProjectByAdmin = (electProjectId) => post(url.SUBMIT_ELECTPROJECT_ADMIN_URL+"?Id="+ electProjectId)
export const addPanelMaker = (data) => post(url.ADD_PANEL_MAKER_URL, data )
export const submitPackage = ({fileNumber,smsCode,serialNumber}) => post(url.SUBMIT_PACKAGE_URL+"?FileNumber="+ fileNumber + "&SmsCode=" + smsCode +"&SerialNumber=" + serialNumber )
export const resetPackageApi = id => post(url.RESET_PACKAGE_URL+"?GpId="+ id )
export const resolvedDefectApi = id => post(url.RESOLVED_DEFECT_URL+"?GpId="+ id )
export const stopElectProjectApi = data => post(url.STOP_ELECTPROJECT_URL,data)
export const updateElectProjectDetails = (data) => post(url.UPDATE_ELECTPROJECT_DETAILS_URL,data)
export const updateElectProject = (data) => post(url.UPDATE_ELECTPROJECT_URL,data)
export const updateElectProjectEngApi = (data) => post(url.UPDATE_ELECTPROJECT_ENG_URL,data)
export const deleteElectProject = id => post(url.DELETE_ELECTPROJECT_URL,id)
export const submitPanel = (data) => post(url.SUBMIT_PANEL_URL, data)
export const amountSmsApi = (data) => post(url.AMOUNT_SMS_URL, data)
export const updateElectProjectStatusApi = (data) => post(url.UPDATE_ELECTPROJECT_STATUS_URL, data)
export const updateDefectDesApi = (data) => post(url.UPDATE_DEFECT_DES_URL, data)
export const updateByEdcApi = data => post(url.UPDATE_BY_EDC_URL,data)


//#endregion

//#region Accounting and Transaction
export const getTransactionsApi = (data) => post(url.GET_TRANSACTION_API, data)
export const getInvoicesApi = () => get(url.GET_INVOICES_API)
export const getEngInvoicesApi = (engId) => get(url.GET_ENG_INVOICES_API +`?engId=${engId}`)
export const getEngInvoiceReportApi = ({engId,startDate,endDate}) => get(url.GET_ENG_INVOICE_REPORT_API +`?engId=${engId}&startDate=${startDate}&endDate=${endDate}`)
export const postPaymentCustom = event => post(url.POST_PAYMENT_CUSTOM_URL,event)
export const postEngPaymentCustomApi = event => post(url.POST_ENG_PAYMENT_CUSTOM_URL,event)
export const getEngWorkApi = (queryString) => get(url.GET_ENG_WORK_URL+"?" + queryString)

//#endregion

//#region epp
export const getEppById = id => get(url.GET_EPP_BYEPID_API + "?EpId=" + id)
export const deleteProjectProcessApi = id => get(url.DEL_EPP_URL + "?EppId=" + id)
export const projectProcessApi = (data) => post(url.PROJECT_PROCESS_URL,data)
export const getListProjectProcessEngApi = (data) =>post(url.GET_LIST_PROJECT_PROCESS_ENG_URL, data)
export const getListProjectProcessReportApi = (queryString) =>get(url.GET_LIST_PROJECT_PROCESS_REPORT_URL+"?" + queryString)
export const eppApprovedApi = data => post(url.EPP_APPROVED_URL,data)
export const eppAcceptedApi = data => post(url.EPP_ACCEPTED_URL,data)
export const eppEngChangeApi = data => post(url.EPP_Eng_Change_URL,data)
export const eppUpdateIsMainApi = data => post(url.EPP_UPDATE_IS_MAIN_URL,data)

//#endregion


//#region Users 
export const getUSERs = () => get(url.GET_USERS)
export const insertUSER = event =>  post(url.INSERT_USER,event)
export const updateUSER = event =>  post(url.UPDATE_USER,event)
export const deleteUSER = id => post(url.DELETE_USER,id)
export const getUserBalance = () => get(url.GET_USER_BALANCE)
export const getUserInfoApi = () => get(url.GET_USER_INFO_URL)
export const getUserFiles = userId => get(url.GET_USER_FILES_URL+"?UserId="+ userId)
export const postUserFile = (attach) => postAttach(url.ADD_USER_FILE_URL,attach)
export const deleteUserFile = id => post(url.DELETE_USER_FILE_URL,id)
//#endregion


//#endregion

//#region Engineer
export const getListEngineerApi = (filter) => get(url.GET_LIST_ENGINEER_URL +`?${filter}`)
export const upsertEngineerApi = (data) => post(url.UPSERT_ENGINEER_URL,data)
export const upsertEngHistoryApi = (data) => post(url.UPSERT_ENG_HISTORY_URL,data)
//#endregion

//#region Common
export const getFilesCommon = (path)=> get(url.GET_FILES_COMMON_URL+`?path=upload/${path.folder}/${path.path}`)
//#endregion

//#region Qurter Tariff
export const getListQuarterTariffApi = () => get(url.GET_LIST_QUARTERTARIFF_URL)
//#endregion

//#region Payment
export const getPaymentMelli = amount => post(url.GET_PAYMENT_MELLI_URL,amount)
export const getPaymentMelliPublic = values => post(url.GET_PAYMENT_MELLI_PUBLIC_URL,values)
//#endregion


//#region Support
export const getListSupportApi = (queryString) => get(url.GET_LIST_SUPPORT_URL+"?" + queryString)
export const upsertSupportApi = (data) => postAttach(url.UPSERT_SUPPORT_URL,data)
export const getListTicketApi = (queryString) => get(url.GET_LIST_TICKET_URL+"?" + queryString)
export const upsertTicketApi = (data) => post(url.UPSERT_TICKET_URL,data)
export const closedSupportApi = id => post(url.CLOSED_SUPPORT_URL+"?SupportId="+ id)
export const postAddSupportFileApi = (attach) => postAttach(url.POST_ADD_SUPPORT_FILE_URL,attach)
export const getSupportFilesApi = (supportId) => get(url.GET_SUPPORT_FILES_URL + "?supportId=" + supportId)
export const deleteSupportFileApi = id => post(url.DELETE_SUPPORT_FILE_URL,id)
//#endregion


//#region EngPaymentList
export const getEngPaymentListApi = (queryString) => get(url.GET_ENG_PAYMENT_LIST_URL+"?" + queryString)
export const getEngPaymentTaskApi = () => get(url.GET_ENG_PAYMENT_TASK_URL)
export const upsertEngPaymentListApi = (data) => post(url.UPSERT_ENG_PAYMENT_LIST_URL,data)
export const updateEngPaymentListApi = (data) => post(url.UPDATE_ENG_PAYMENT_LIST_URL,data)
export const engPaymentApprovedApi = (data) => post(url.ENG_PAYMENT_APPROVED_URL,data)


//#region EngQuotaBurnList
export const getEngQuotaBurnListApi = (queryString) => get(url.GET_ENG_QUOTA_BURN_URL+"?" + queryString)
export const engQuotaBurnApprovedApi = (data) => post(url.ENG_QUOTA_BURN_APPROVED_URL,data)
export const engQuotaBurnUpdateApi = (data) => post(url.ENG_QUOTA_BURN_UPDATE_URL,data)



//#endregion
export const getDashboardToken = (dashboardId) => get(url.GET_DASHBOARD_TOKEN_URL + "?dashboardId=" + dashboardId)
//export const getElectProjects = ()=>get(url.)
// Request Demo
export const postRequestDemo = data => post(url.REQUEST_DEMO_URL, data)
// Users for Support
//#region ElectProjects 

//#endregion
export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postCustomerRegister,
  postJwtLogin,
  postJwtLoginByCode,
  postJwtForgetPwd,
  delJwtSession,
  postJwtProfile,
  postSmsRegister,
  postSmsToSubmit,
  postAuctionResult,
  postSmsRegisterToAmir,
  
}
