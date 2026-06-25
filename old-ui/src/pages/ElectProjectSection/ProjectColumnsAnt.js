import { CityFromSection, GetCityWithSection } from "hooks/returnCityName"
import { ProjectFiles } from "./ProjectFiles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ProjectProcess } from "./ProjectProcess"
import {
  Paper,
  styled,
} from "@mui/material"
import ProjectFileNumber from "./ProjectFileNumber"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  direction: "ltr",
}))

export const renderFileButton = (row, { props, setErrorMessage }) => {
  return (
    <ProjectFiles
      rowData={row}
      mainProps={props}
      setErrorMessage={setErrorMessage}
    />
  )
}



export const renderFloorNumber = row => {
  if (row.numberOfFloor == 0 && row.unitNumber == 1)
    return <small>همکف</small>
  if (row.numberOfFloor == 0 && row.unitNumber > 1)
    return <small>چند واحدی</small>
  return row.numberOfFloor
}

export const renderExeFullName = (row, props) => {
  return row.executor.fullName
}

export const renderProjectProcess = (row, { props }) => {
  return <ProjectProcess rowData={row} mainProps={props} />
}



export const renderEditButton = (params, { props }, isEng) => {
  if(isEng) return <span>{params.fileNumber}</span>
  return <ProjectFileNumber rowData={params} mainProps={props} />
}

export const projectColumnsAnt = props => [

  //fileNumber
  {
    title: "شماره پرونده",
    key: "fileNumber",
    render: params => renderEditButton(params, props, props.currentUser.role === "Engineer")

  },
//   // unitNumber
  {
    title: "واحد",
    dataIndex:"unitNumber",
    key: "unitNumber",

  },
//   // numberOfFloor
  {
    title: "طبقه",
    key: "numberOfFloor",
    render: params => renderFloorNumber(params),
  },
//   // ProjectProcess
  {
    title: "تخصیص",
    key: "ProjectProcess",
    render: row => renderProjectProcess(row, props),
  },
    // projectLevel
    {
      title: "مرحله پرونده",
      key: "projectLevel",
      dataIndex: "projectLevel"
    },
//   // Fils
  {
    title: "فایلها",
    key: "File",
    render: row => renderFileButton(row, props),
    hidden: props.currentUser.role === "Engineer"
  },
//   // landlordName
  {
    title: "مالک",
    key: "landlordName",
    dataIndex: "landlordName"

  },
//   //exeFullName
  {
    title: "مجری",
    key: "exeFullName",
    render: row => renderExeFullName(row, props)

  },
//   // section
  {
    title: "شهر",
    key: "section",
    render: (row) => {
      let returnValue = "-"
      if (row.idSection > 0) {
        returnValue = GetCityWithSection(row.idSection)
      }
      return returnValue
    },
  },
  // ownershipType
  {
    title: "تاریخ ثبت",
    key: "solarRegisterDate",
    dataIndex: "solarRegisterDate"
  },
//   // buildingType
  {
    title: "نوع کاربری",
    key: "buildingType",
    dataIndex: "buildingType"
  },
//   // isOk
  {
    key: "isOk",
    title: "تاییدواحد برق ",
    type: "boolean",
    render: (row) => {
      if (row.isOk) {
        return "بله"
      }
      return "خیر"
    },
    hidden: props.currentUser.role === "Engineer"
  }
].filter(f=>f.hidden!==true)
