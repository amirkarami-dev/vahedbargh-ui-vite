import clsx from "clsx"
import { ProjectEdit } from "./ProjectEdit"
import { ProjectFiles } from "./ProjectFiles"
import ProjectDetails from "./ProjectDetails"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { ProjectRequired } from "./ProjectRequired"
import { ProjectProcess } from "./ProjectProcess"
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  direction: "ltr",
}))

export const renderEditButton = (params, { props }) => {
  return <ProjectEdit rowData={params} mainProps={props} />
}

export const renderProjectRequired = (params, { props }) => {
  return (
    <ProjectRequired
      rowData={params}
      mainProps={props}
      isReadOnly={params.row.projectLevel === 2}
    />
  )
}
export const renderProjectProcess = (params, { props }) => {
  return <ProjectProcess rowData={params} mainProps={props} />
}
export const renderFileButton = (params, { props }) => {
  return <ProjectFiles rowData={params} mainProps={props} />
}

export const renderFloorNumber = params => {
  if (params.row.numberOfFloor == 0 && params.row.unitNumber == 1)
    return <small>همکف</small>
  if (params.row.numberOfFloor == 0 && params.row.unitNumber > 1)
    return <small>چند واحدی</small>
  return params.row.numberOfFloor
}

export const renderDetailsButton = (params, { props }) => {
  return <ProjectDetails rowData={params} mainProps={props} />
}

export const renderAllColumn = (params, props) => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item>
            <Grid container>
              <Grid item xs={6}>
                {renderDetailsButton(params, props)}
              </Grid>
              <Grid item xs={6}>
                {renderFileButton(params, props)}
              </Grid>
              <Grid item xs={6} className="pt-1">
                {renderProjectRequired(params, props)}
              </Grid>

              <Grid item xs={6} className="pt-1">
                {renderEditButton(params, props)}
              </Grid>
              <Grid item xs={12}  className="pt-1">
              <span>مالک:</span>
                {params.row.electProjectDetail.landlordName}
              </Grid>
              <Grid item xs={12}  className="pt-1">
              <span>تاریخ ارجاع:</span>
                {params.row.solarDateDeliverEngineer}
      
              </Grid>
              <Grid item xs={12}>
              <span>تاریخ تایید:</span>
                {params.row.solarDateDeliverOffice}
            
              </Grid>
              <Grid item xs={12} className="pt-1">
                <Accordion
                  expanded={props.expanded === `panel${params.row.fileNumber}`}
                  onChange={props.handleChangeExpand(
                    `panel${params.row.fileNumber}`
                  )}
                  elevation={0}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      color={
                        props.expanded === `panel${params.row.fileNumber}`
                          ? "green"
                          : "primary"
                      }
                      fontSize={13}
                    >
                      م:{params.row.executorName} / مرحله:
                      {`${props.props.t(
                        "project." + params.row.projectLevelName
                      )}`}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Paper elevation={1} className="p-1">
                      <Grid container spacing={1} textAlign="left">
                        <Grid item xs={6}>
                          طبقه:{renderFloorNumber(params)}
                        </Grid>
                        {params.row.projectLevelEnum === 1 && (
                          <Grid item xs={6}>
                            {renderProjectProcess(params, props)}
                          </Grid>
                        )}
                        <Grid item xs={6}>
                          واحد:{params.row.unitNumber}
                        </Grid>

                        <Grid item xs={6}>
                          نوع بازرسی:{" "}
                          {props.props.t(
                            "project." + params.row.inspectionTypeName
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          پارامتر بازرسی:{" "}
                          {params.row.inspectionParameterTypeName}
                        </Grid>
                        <Grid item xs={6}>
                          لوله کشی:
                          {props.props.t(
                            "project." + params.row.pipingTypeName
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          وضعیت:{" "}
                          {props.props.t(
                            "project." + params.row.inspectionStatusName
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          پکیج/آبگرمکن:{" "}
                          {params.row.packageNeed?'نیاز دارد':'نیاز ندارد'}
                        </Grid>
                      </Grid>
                    </Paper>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
export const mobileColumn = props => [
  {
    field: "allColumn",
    headerName: "اطلاعات پرونده",
    renderCell: params => renderAllColumn(params, props),
    flex: 1,
    hide: !props.matches_sm,
  },
  {
    field: "fileNumber",
    headerName: "شماره پرونده",
    renderCell: params => renderDetailsButton(params, props),
    width: "120",
    hide: props.matches_sm,
  },
  {
    field: "Edit",
    headerName: "اعلام نظر",
    renderCell: params => renderEditButton(params, props),
    hide: props.matches_sm,
  },
  {
    field: "Detail",
    headerName: "الزامات",
    renderCell: params => renderProjectRequired(params, props),
    width: "110",

    hide: props.matches_sm,
  },
  {
    field: "File",
    headerName: "فایلها",
    renderCell: params => renderFileButton(params, props),
    hide: props.matches_sm,
  },

  {
    field: "unitNumber",
    headerName: "واحد",
    width: "30",
    hide: props.matches_sm,
  },
  {
    field: "numberOfFloor",
    headerName: "طبقه",
    width: "60",
    renderCell: params => renderFloorNumber(params),
    hide: props.matches_sm,
  },
  {
    field: "executorName",
    headerName: "مجری",
    width: "130",
    hide: props.matches_sm,
  },
  {
    field: "ownerName",
    headerName: "مالک",
    width: "130",
    valueGetter: params =>params.row.electProject.landlordName,
    hide: props.matches_sm,
  },
  // {
  //   field: "section",
  //   headerName: "شهر",
  //   renderCell: ({ row }) => {
  //     let returnValue = "-"
  //     if (row.idSection > 0) {
  //       returnValue = CityFromSection(row.idSection)
  //     }
  //     return returnValue
  //   },
  // },
  // {
  //   field: "buildingType",
  //   headerName: "نوع کاربری",
  //   valueGetter: (params) =>
  //   `${props.props.t('project.' + params.row.buildingTypeName)}`,
  // },
  {
    field: "inspectionTypeName",
    headerName: "نوع بازرسی",
    valueGetter: params =>
      `${props.props.t("project." + params.row.inspectionTypeName)}`,
    width: "80",
    hide: props.matches_sm,
  },
  {
    field: "inspectionParameterTypeName",
    headerName: "سایزکنتور",
    width: "70",
    hide: props.matches_sm,
  },
  {
    field: "pipingTypeName",
    headerName: "لوله کشی",
    width: "80",
    valueGetter: params =>
      `${props.props.t("project." + params.row.pipingTypeName)}`,
    hide: props.matches_sm,
  },
  {
    field: "projectLevelName",
    headerName: "مرحله",
    width: "80",
    valueGetter: params =>
      `${params.row.projectLevelName}`,
    hide: props.matches_sm,
  },
  {
    field: "packageNeed",
    headerName: "پکیج/آبگرمکن",
    renderCell: ({ row }) => {
      if (row.packageNeed) {
        return 'دارد'
      }
      return 'ندارد'
    },
    hide: props.matches_sm
  },
  {
    field: "solarDateDeliverOffice",
    headerName: "تاریخ تایید",
    width: "100",
    hide: props.matches_sm,
  },
  {
    field: "inspectionStatusName",
    headerName: "وضعیت",
    width: "90",
    cellClassName: params => {
      if (params.row.inspectionStatus === 0) {
        return ""
      } 
      return clsx("super-app", {
        negative: params.row.inspectionStatus === 0,
        positive: params.row.inspectionStatus === 1,
        disapproval: params.row.inspectionStatus === 2.
      })
    },
    valueGetter: params =>
      `${props.props.t("project." + params.row.inspectionStatusName)}${params.row.defect?'+نقص':''}`,
    hide: props.matches_sm,
  },
  {
    field: "ProjectProcess",
    headerName: "نظرکارشناس",
    renderCell: params => renderProjectProcess(params, props),
    hide: props.matches_sm,
  },
  {
    field: "solarDateDeliverEngineer",
    headerName: "تاریخ ارجاع",
    width: "100",
    hide: props.matches_sm,
  }
]
