import { upsertArray } from "helpers/service_helper"
import {
  GET_ELECTPROJECTS_FAIL,
  GET_ELECTPROJECTS_SUCCESS,
  RESET_ELECTPROJECT_FLAG,
  UPSERT_ElECTROJECT_FAIL,
  UPSERT_ElECTROJECT_SUCCESS,
  ADD_FILE_ELECTPROJECT_FAIL,
  ADD_FILE_ELECTPROJECT_SUCCESS,
  GET_ELECTPROJECTS_ENG_SUCCESS,
  GET_ELECTPROJECTS_ENG_FAIL,
  GET_ELECTPROJECTS_ENG,
  GET_ELECTPROJECTS,
  UPDATE_PROCESS_STAGE_FAIL,
  UPDATE_PROCESS_STAGE_SUCCESS,
  UPDATE_PROCESS_EXPERT_STAGE,
  GET_ELECTPROJECT_FILES,
  GET_ELECTPROJECT_FILES_SUCCESS,
  GET_ELECTPROJECT_FILES_FAIL,
  GET_PANEL_MAKER,
  GET_PANEL_MAKER_SUCCESS,
  GET_PANEL_MAKER_FAIL,
  SEND_ELECTPROJECT_TOELECT_FAIL,
  SEND_ELECTPROJECT_TOELECT_SUCCESS,
  SEND_ELECTPROJECT_TOELECT,
  SUBMIT_ELECTPROJECT_ADMIN_FAIL,
  SUBMIT_ELECTPROJECT_ADMIN,
  SUBMIT_ELECTPROJECT_ADMIN_SUCCESS,
  ADD_PANEL_MAKER_FAIL,
  ADD_PANEL_MAKER,
  ADD_PANEL_MAKER_SUCCESS,
  SUBMIT_PACKAGE,
  SUBMIT_PACKAGE_FAIL,
  SUBMIT_PACKAGE_SUCCESS,
  UPDATE_ELECTPROJECT_DETAILS,
  UPDATE_ELECTPROJECT_DETAILS_SUCCESS,
  DELETE_ELECTPROJECT_FAIL,
  DELETE_ELECTPROJECT_SUCCESS,
  UPDATE_ELECTPROJECT,
  UPDATE_ELECTPROJECT_SUCCESS,
  UPDATE_ELECTPROJECT_FAIL,
  UPDATE_ELECTPROJECT_ENG,
  GET_ELECTPROJECT_REPORT,
  GET_ELECTPROJECT_REPORT_SUCCESS,
  GET_ELECTPROJECT_REPORT_FAIL,
  GET_ELECTPROJECT_FREE,
  GET_ELECTPROJECT_FREE_FAIL,
  GET_ELECTPROJECT_FREE_SUCCESS,
  GET_ELECTPROJECTS_FILTER,
  GET_ELECTPROJECTS_FILTER_SUCCESS,
  GET_ELECTPROJECTS_FILTER_FAIL,
  GET_ELECTPROJECTS_FULL_FILTER,
  GET_ELECTPROJECTS_FULL_FILTER_SUCCESS,
  GET_ELECTPROJECTS_FULL_FILTER_FAIL,
  UPDATE_PROCESS_EXPERT_STAGE_NEW,
  UPDATE_PROCESS_DEFECT_STAGE_NEW,
  UPDATE_PROCESS_MAP_STAGE_NEW,
  UPDATE_PROCESS_STAGE_NEW_FAIL,
  UPDATE_PROCESS_STAGE_NEW_SUCCESS,
  UPDATE_ELECTPROJECT_DETAILS_NEW,
  UPDATE_ELECTPROJECT_DETAILS_NEW_SUCCESS,
  UPDATE_ELECTPROJECT_DETAILS_FAIL,
  UPDATE_ELECTPROJECT_DETAILS_NEW_FAIL,
  UPDATE_ELECTPROJECT_ENG_NEW,
  RESET_PACKAGE,
  RESET_PACKAGE_SUCCESS,
  RESET_PACKAGE_FAIL,
  RESOLVED_DEFECT,
  RESOLVED_DEFECT_SUCCESS,
  RESOLVED_DEFECT_FAIL,
  STOP_ELECTPROJECT,
  STOP_ELECTPROJECT_SUCCESS,
  STOP_ELECTPROJECT_FAIL,
  ADD_FILE_ELECTPROJECT,
  DELETE_ELECTPROJECT,
  UPSERT_ElECTROJECT,
  SUBMIT_PANEL,
  SUBMIT_PANEL_SUCCESS,
  SUBMIT_PANEL_FAIL,
  AMOUNT_SMS,
  AMOUNT_SMS_SUCCESS,
  AMOUNT_SMS_FAIL,
  GET_ELECTPROJECTS_FULL_FILTER_CHILDREN_SUCCESS,
  UPDATE_ELECTPROJECT_STATUS,
  UPDATE_ELECTPROJECT_STATUS_SUCCESS,
  UPDATE_ELECTPROJECT_STATUS_FAIL,
  UPDATE_ELECTPROJECT_DEFECT_DES_FAIL,
  UPDATE_ELECTPROJECT_DEFECT_DES_SUCCESS,
  UPDATE_ELECTPROJECT_DEFECT_DES,
  UPSERT_CHECKLIST_EDC,
  UPSERT_CHECKLIST_EDC_SUCCESS,
  UPSERT_CHECKLIST_EDC_FAIL,
  UPDATE_BY_EDC,
  UPDATE_BY_EDC_FAIL,
  UPDATE_BY_EDC_SUCCESS,
  GET_PROJECT_INFO,
  GET_PROJECT_INFO_SUCCESS,
  GET_PROJECT_INFO_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  lstElectProjects: [],
  lstElectProjectsFilter: [],
  lstElectProjectsFullFilter: [],
  lstElectProjectReport: [],
  lstElectProjectsTotal: 0,
  lstElectProjectsFullFilterTotal: 0,
  lstElectProjectReportTotal: 0,
  lstElectProjectFiles: [],
  electProjectFree: null,
  lstPanelMaker: [],
  //costPermitDomestic: 1651000,
  costPermitDomestic: 2500000,
  //costPermitDomesticPlus: 301600,
  costPermitDomesticPlus: 456600,
  // costPermitIndustrial: 3575000,
  costPermitIndustrial: 5413000,
  minUserBalance: 0,
  currentIdElectProject: 0,
  addedPlanFile: false,
  error: "",
  success: "",
  loading: false,
  actionName: {},
  triggerReload:0,
  projectInfo:null
}

const electProjects = (state = INIT_STATE, action) => {
  switch (action.type) {
    //#region loading
    case GET_ELECTPROJECTS:
    case GET_ELECTPROJECTS_FILTER:
    case GET_ELECTPROJECTS_FULL_FILTER:
    case GET_ELECTPROJECT_REPORT:
    case GET_ELECTPROJECTS_ENG:
    case UPDATE_PROCESS_EXPERT_STAGE:
    case UPDATE_PROCESS_EXPERT_STAGE_NEW:
    case UPDATE_PROCESS_DEFECT_STAGE_NEW:
    case UPDATE_PROCESS_MAP_STAGE_NEW:
    case GET_ELECTPROJECT_FILES:
    case GET_ELECTPROJECT_FREE:
    case GET_PANEL_MAKER:
    case SEND_ELECTPROJECT_TOELECT:
    case SUBMIT_ELECTPROJECT_ADMIN:
    case ADD_PANEL_MAKER:
    case SUBMIT_PACKAGE:
    case UPDATE_ELECTPROJECT_DETAILS:
    case UPDATE_ELECTPROJECT_DETAILS_NEW:
    case UPDATE_ELECTPROJECT:
    case UPDATE_ELECTPROJECT_ENG:
    case UPDATE_ELECTPROJECT_ENG_NEW:
    case RESET_PACKAGE:
    case RESOLVED_DEFECT:
    case STOP_ELECTPROJECT:
    case ADD_FILE_ELECTPROJECT:
    case DELETE_ELECTPROJECT:
    case UPSERT_ElECTROJECT:
    case SUBMIT_PANEL:
    case AMOUNT_SMS:
    case UPDATE_ELECTPROJECT_STATUS:
    case UPDATE_ELECTPROJECT_DEFECT_DES:
    case UPSERT_CHECKLIST_EDC:
    case UPDATE_BY_EDC:
    case GET_PROJECT_INFO:
      return {
        ...state,
        loading: true,
      }
    //#endregion

    //#region Success
    case GET_ELECTPROJECTS_ENG_SUCCESS:
      return {
        ...state,
        loading: false,
        lstElectProjects: action.payload,
        success: "لیست پرونده آپدیت شد",
        triggerReload: state.triggerReload + 1

      }
    case GET_ELECTPROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        lstElectProjects: action.payload.data,
        lstElectProjectsTotal: action.payload.totalItems,
        success: "لیست پرونده آپدیت شد",
      }
    case GET_ELECTPROJECTS_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        lstElectProjectsFilter: action.payload.data,
        lstElectProjectsFilterTotal: action.payload.totalItems,
        success: "لیست پرونده آپدیت شد",
      }
    case GET_ELECTPROJECTS_FULL_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        lstElectProjectsFullFilter: action.payload.data,
        lstElectProjectsFullFilterTotal: action.payload.totalItems,
        success: "لیست پرونده آپدیت شد",
      }
      
    case GET_ELECTPROJECTS_FULL_FILTER_CHILDREN_SUCCESS:
      return {
        ...state,
        loading: false,
        lstElectProjectsFullFilter: state.lstElectProjectsFullFilter.map((item)=>{
          if(item.id === action.payload.parentId){
            return {
              ...item,
              children: action.payload.children.data
            }
          }
          return item
        }),
        lstElectProjectsFullFilterTotal: action.payload.totalItems,
        success: "لیست زیر پرونده ها آپدیت شدند",
      }
    case GET_ELECTPROJECT_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        lstElectProjectReport: action.payload.data,
        lstElectProjectReportTotal: action.payload.totalItems,
        success: "لیست گزارش آپدیت شد",
      }
    case UPSERT_ElECTROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        // lstElectProjects: upsertArray(state.lstElectProjects, action.payload),
        success: "پرونده با موفقیت ایجاد شد",
        currentIdElectProject: action.payload,
        error: null,
        addedPlanFile: false,
        triggerReload: state.triggerReload + 1
      }

    case DELETE_ELECTPROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "پرونده با موفقیت حذف شد ",
      }

    case GET_ELECTPROJECT_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        lstElectProjectFiles: action.payload,
        success: "فایلهای پرونده بارگذاری شدند",
        error: null,
      }
    case GET_ELECTPROJECT_FREE_SUCCESS:
      return {
        ...state,
        loading: false,
        electProjectFree: action.payload,
        success: "پرونده بارگذاری شد",
        error: null,
      }
    case GET_PANEL_MAKER_SUCCESS:
      return {
        ...state,
        loading: false,
        lstPanelMaker: action.payload,
        success: "تابلوساز پرونده بارگذاری شدند",
        error: null,
      }

    case ADD_FILE_ELECTPROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        // lstElectProjects: upsertArray(state.lstElectProjects, action.payload),
        success: "فایل با موفقیت بارگذاری شد",
        error: null,
        addedPlanFile: true,
        triggerReload: state.triggerReload + 1

      }

      case GET_PROJECT_INFO_SUCCESS:
        return {
          ...state,
          loading: false,
          projectInfo: action.payload,
        }

    case UPDATE_PROCESS_STAGE_SUCCESS:
    case UPDATE_PROCESS_STAGE_NEW_SUCCESS:
    case RESET_PACKAGE_SUCCESS:
    case SUBMIT_PANEL_SUCCESS:
    case UPDATE_ELECTPROJECT_STATUS_SUCCESS:
    case UPDATE_ELECTPROJECT_DEFECT_DES_SUCCESS:
    case UPSERT_CHECKLIST_EDC_SUCCESS:
    case UPDATE_BY_EDC_SUCCESS:

      return {
        ...state,
        loading: false,
        success: "تغییرات با موفقیت انجام شد",
        triggerReload: state.triggerReload + 1
      }

    case RESOLVED_DEFECT_SUCCESS:
      return {
        ...state,
        lstElectProjects: state.lstElectProjects.map(x => {
          if (x.id === action.payload.id) return { ...x, isSolvedDefect: action.payload.resolved }
          return x
        }),
        loading: false,
        success: "این پرونده برای تخصیص آماده شد",
      }
    case STOP_ELECTPROJECT_SUCCESS:
        return {
          ...state,
          lstElectProjectsFullFilter: state.lstElectProjectsFullFilter.map(x => {
            if (x.id === action.payload.id) return { ...x, isStop: action.payload.isStop, stopDes: action.payload.stopDes }
            return x
          }),
          loading: false,
          success: "این پرونده متوقف شد"
        }
    case SEND_ELECTPROJECT_TOELECT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "پرونده با موفقیت به شرکت برق  ارسال گردید",
      }

    case SUBMIT_ELECTPROJECT_ADMIN_SUCCESS:
      return {
        ...state,
        // lstElectProjects: state.lstElectProjects.map(x => {
        //   if (x.id === action.payload) return { ...x, isOk: true }
        //   return x
        // }),
        // lstElectProjectsFullFilter: state.lstElectProjectsFullFilter.map(x => {
        //   if (x.id === action.payload) return { ...x, isOk: true }
        //   return x
        // }),
        loading: false,
        success: "پرونده با موفقیت تایید شد",
        triggerReload: state.triggerReload + 1
      }

    case ADD_PANEL_MAKER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "درخواست تایید برای تابلوساز ارسال شد",
        triggerReload: state.triggerReload + 1

      }

    case SUBMIT_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "درخواست تایید شما با موفقیت انجام شد",
      }
    case UPDATE_ELECTPROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "الزامات با موفقیت به روز رسانی شد",
      }
      case UPDATE_ELECTPROJECT_DETAILS_NEW_SUCCESS:
        return {
          ...state,
          loading: false,
          success: "الزامات با موفقیت به روز رسانی شد",
          triggerReload:state.triggerReload + 1
        }
    case UPDATE_ELECTPROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "پرونده با موفقیت به روز رسانی شد",
        triggerReload:state.triggerReload + 1
      }

      case AMOUNT_SMS_SUCCESS:
        return {
          ...state,
          loading: false,
          success: "مبلغ بالانس جهت پرداخت به مالک ارسال شد",
        }
      
        
    //#endregion

    //#region Fails
    case GET_ELECTPROJECTS_FAIL:
    case GET_ELECTPROJECTS_FILTER_FAIL:
    case GET_ELECTPROJECTS_FULL_FILTER_FAIL:
    case GET_ELECTPROJECT_REPORT_FAIL:
    case GET_ELECTPROJECTS_ENG_FAIL:
    case UPSERT_ElECTROJECT_FAIL:
    case ADD_FILE_ELECTPROJECT_FAIL:
    case UPDATE_PROCESS_STAGE_FAIL:
    case UPDATE_PROCESS_STAGE_NEW_FAIL:
    case GET_ELECTPROJECT_FILES_FAIL:
    case GET_ELECTPROJECT_FREE_FAIL:
    case GET_PANEL_MAKER_FAIL:
    case SEND_ELECTPROJECT_TOELECT_FAIL:
    case SUBMIT_ELECTPROJECT_ADMIN_FAIL:
    case ADD_PANEL_MAKER_FAIL:
    case SUBMIT_PACKAGE_FAIL:
    case DELETE_ELECTPROJECT_FAIL:
    case UPDATE_ELECTPROJECT_FAIL:
    case UPDATE_ELECTPROJECT_DETAILS_FAIL:
    case UPDATE_ELECTPROJECT_DETAILS_NEW_FAIL:
    case RESET_PACKAGE_FAIL:
    case RESOLVED_DEFECT_FAIL:
    case STOP_ELECTPROJECT_FAIL:
    case SUBMIT_PANEL_FAIL:
    case AMOUNT_SMS_FAIL:
    case UPDATE_ELECTPROJECT_STATUS_FAIL:
    case UPDATE_ELECTPROJECT_DEFECT_DES_FAIL:
    case UPSERT_CHECKLIST_EDC_FAIL:
    case UPDATE_BY_EDC_FAIL:
    case GET_PROJECT_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload ? action.payload : "خطای پیش بینی نشده",
        success: "",
      }
    //#endregion

    //#region Reset
    case RESET_ELECTPROJECT_FLAG:
      return {
        ...state,
        success: null,
        error: null,
        triggerReload:0
      }
    //#endregion
    default:
      return state
  }
}

export default electProjects
