import {
  DEL_PROJECT_PROCESS,
  DEL_PROJECT_PROCESS_FAIL,
  DEL_PROJECT_PROCESS_SUCCESS,
  DESELECT_GP,
  EPP_ACCEPTED,
  EPP_ACCEPTED_FAIL,
  EPP_ACCEPTED_SUCCESS,
  EPP_APPROVED,
  EPP_APPROVED_FAIL,
  EPP_APPROVED_SUCCESS,
  EPP_UPDATE_IS_MAIN,
  EPP_UPDATE_IS_MAIN_FAIL,
  EPP_UPDATE_IS_MAIN_SUCCESS,
  GET_EPP_BYGPID,
  GET_EPP_BYGPID_FAIL,
  GET_EPP_BYGPID_SUCCESS,
  GET_LIST_PROJECT_PROCESS_ENG,
  GET_LIST_PROJECT_PROCESS_ENG_FAIL,
  GET_LIST_PROJECT_PROCESS_ENG_SUCCESS,
  PROJECT_PROCESS,
  PROJECT_PROCESS_FAIL,
  PROJECT_PROCESS_SUCCESS,
  RESET_ELECT_PROCESS_FLAG,
  SELECT_GP,
  UPSERT_CHECKLIST,
  UPSERT_CHECKLIST_FAIL,
  UPSERT_CHECKLIST_SUCCESS,
  UPSERT_COMMENT,
  UPSERT_COMMENT_FAIL,
  UPSERT_COMMENT_SUCCESS,
  UPSERT_ERTFORM,
  UPSERT_ERTFORM_FAIL,
  UPSERT_ERTFORM_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  lstEpp: [],
  lstProjectProcessEng: [],
  lstProjectProcessEngTotal: 0,
  selectedProject: [{ page: 1, selectArr: [] }],
  flatSelectedProject: { projectId: [] },
  countSelectedProject: 0,
  error: "",
  success: "",
  loading: false,
  triggerReload: 0,
}

const updateComment = (lstProjectProcessEng, payload) => {
  const findPpIndex = lstProjectProcessEng.findIndex(
    x => x.electProjectId === payload.electProjectId
  )
  if (findPpIndex !== -1) {
    const findCommentIndex = lstProjectProcessEng[
      findPpIndex
    ].commentEngForm.findIndex(x => x.id === payload.id)
    if (findCommentIndex !== -1) {
      lstProjectProcessEng[findPpIndex].commentEngForm[findCommentIndex] =
        payload
    } else {
      lstProjectProcessEng[findPpIndex].commentEngForm.push(payload)
    }
  }
  return lstProjectProcessEng
}


const electProjectProcesses = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EPP_BYGPID:
    case PROJECT_PROCESS:
    case GET_LIST_PROJECT_PROCESS_ENG:
    case DEL_PROJECT_PROCESS:
    case UPSERT_COMMENT:
    case UPSERT_CHECKLIST:
    case UPSERT_ERTFORM:
    case EPP_APPROVED:
      case EPP_ACCEPTED:
      case EPP_UPDATE_IS_MAIN:
      return {
        ...state,
        loading: true,
      }
    case GET_EPP_BYGPID_SUCCESS:
      return {
        ...state,
        loading: false,
        lstEpp: action.payload,
      }
    case PROJECT_PROCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "با موفقیت تخصیص انجام شد",
        triggerReload: state.triggerReload + 1,
      }

    case DEL_PROJECT_PROCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "با موفقیت حذف شد",
        triggerReload: state.triggerReload + 1,
      }

    case GET_LIST_PROJECT_PROCESS_ENG_SUCCESS:
      return {
        ...state,
        loading: false,
        lstProjectProcessEng: action.payload.data.map(item => ({
          ...item,
          commentEngForm: item.commentEngForm ? item.commentEngForm : [],
          checkListForm: item.checkListForm ? item.checkListForm : [],
          checkListEdc: item.checkListEdc ? item.checkListEdc : [],
        })),
        lstProjectProcessEngTotal: action.payload.totalItems,
      }

    case UPSERT_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        // lstProjectProcessEng: updateComment(
        //   state.lstProjectProcessEng,
        //   action.payload
        // ),
        triggerReload: state.triggerReload + 1,
        success: "اظهار نظر انجام شد",
      }

    case UPSERT_CHECKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        triggerReload: state.triggerReload + 1,
        success: "چک لیست انجام شد",
      }

    case UPSERT_ERTFORM_SUCCESS:
    case EPP_APPROVED_SUCCESS:
    case EPP_ACCEPTED_SUCCESS:
    case EPP_UPDATE_IS_MAIN_SUCCESS:
      return {
        ...state,
        loading: false,
        triggerReload: state.triggerReload + 1,
        success: "تغییرات انجام شد",
      }

    case GET_EPP_BYGPID_FAIL:
    case PROJECT_PROCESS_FAIL:
    case GET_LIST_PROJECT_PROCESS_ENG_FAIL:
    case DEL_PROJECT_PROCESS_FAIL:
    case UPSERT_COMMENT_FAIL:
    case UPSERT_CHECKLIST_FAIL:
    case UPSERT_ERTFORM_FAIL:
    case EPP_APPROVED_FAIL:
    case EPP_ACCEPTED_FAIL:
    case EPP_UPDATE_IS_MAIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload ? action.payload : "خطای پیش بینی نشده",
        success: "",
      }

    case SELECT_GP:
      if (state.selectedProject.findIndex(x => x.page === action.payload.page) ===-1)
        state.selectedProject.push(action.payload)
      
      let newSelectedProject = state.selectedProject.map(x => {
        if (x.page === action.payload.page)
          return { ...x, selectArr: action.payload.selectArr }
        return x
      })
      let countSelected = 0
      let flatSelected = { projectId: [] }
      newSelectedProject.forEach(element => {
        countSelected += element.selectArr.length
        element.selectArr.forEach(arr => flatSelected.projectId.push(arr))
      })
      return {
        ...state,
        selectedProject: newSelectedProject,
        countSelectedProject: countSelected,
        flatSelectedProject: flatSelected,
      }

    case DESELECT_GP:
      return {
        ...state,
        countSelectedProject: 0,
        selectedProject: [{ page: 1, selectArr: [] }],
        flatSelectedProject: { projectId: [] },
      }

    case RESET_ELECT_PROCESS_FLAG:
      console.log("RESET_ELECT_PROCESS_FLAG")
      return {
        ...state,
        success: null,
        error: null,
        triggerReload: 0,
      }

    default:
      return state
  }
}

export default electProjectProcesses
