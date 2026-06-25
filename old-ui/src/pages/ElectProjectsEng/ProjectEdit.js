import { ArrowBack, SpaceBar } from "@mui/icons-material"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  LinearProgress,
  CircularProgress,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  IconButton,
} from "@mui/material"
import { setInvalidateEmpty } from "common/global"
import { enumToArray, serializeQuery } from "helpers/service_helper"
import React, { useState, useReducer, useEffect } from "react"
import CloseIcon from "@mui/icons-material/Close"

export const ProjectEdit = ({ rowData, mainProps }) => {
  const style = {
    // border: "2px solid #000",
    p: 2,
  }
  const [isErrorValid, setIsErrorValid] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      inspectionStatus: rowData.row.inspectionStatus
        ? rowData.row.inspectionStatus
        : 1,
      description: rowData.row.description
    }
  )
  const onlyAlphanumericRegex = /[^a-z0-9]/gi;
  const [open, setOpen] = useState(false)


  const handleInput = evt => {
    setHasError(false)
    const name = evt.target.name
    const newValue = evt.target.value

    setFormInput({ [name]: newValue })
  }



  const handleSubmitForm = async (event, values) => {
    const { onUpdateProcessExpertStage, onUpdateProcessMapStage, onUpdateProcessDefectStage } = mainProps
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.forEach((value, name) => {
      setFormInput({ [name]: value })
    })
    let mapToSave = {
      ...formInput,
      inspectionStatus: +formInput.inspectionStatus,
      idFileProcess: +rowData.row.idFileProcess,
      solarDateDeliverEngineer: rowData.row.solarDateDeliverEngineer,
      julianDateDeliverEngineer: rowData.row.julianDateDeliverEngineer,
      idQuarterTariffOld: +rowData.row.idQuarterTariff,
      idFile: +rowData.row.idFile,
      idElectProject: rowData.row.idElectProject,
      defect: +formInput.inspectionStatus === 1? formInput.defect === "true" || formInput.defect === true:false,
      packageNeed: formInput.packageNeed === "true" || formInput.packageNeed === true,
      totalElectUse: rowData.row.electProjectDetail.totalUsage,
      totalPipeUse:+formInput.totalPipeUse,
      packageSerialNumber: formInput.packageSerialNumber
    }
    if(mapToSave.inspectionStatus ===1 && mapToSave.totalElectUse === 0 && rowData.row.projectLevel === 2)
    {
      alert("در بخش الزامات مقدار برق  مصرفی را وارد کنید ")
      return
    }

      if(rowData.row.projectLevel === 1 && mapToSave.inspectionStatus === 2 ){
        if(window.confirm('آیا مطمن هستید که این پرونده را تایید نمیکنید'))
          {
          await onUpdateProcessExpertStage({process:mapToSave,queryString:serializeQuery({idFile:rowData.row.idFile})})
          } else{
          return
          }
      }
      if(rowData.row.projectLevel === 1 && mapToSave.inspectionStatus === 3 ){
        if(window.confirm('آیا مطمن هستید که این پرونده را قبول نمیکنید'))
          {
          await onUpdateProcessExpertStage({process:mapToSave,queryString:serializeQuery({idFile:rowData.row.idFile})})
          } else{
          return
          }
      }
      else if (rowData.row.projectLevel === 1 ) {
        if(window.confirm(`${mapToSave.packageNeed?'پکیج/آبگرمکن دیواری فن دار نیاز دارد را انتخاب کرده اید آیا مطمنی هستید':
        'پکیج/آبگرمکن دیواری فن دار نیاز ندارد را انتخاب کرده اید آیا مطمن هستید'}`))
          {
          await onUpdateProcessExpertStage({process:mapToSave,queryString:serializeQuery({idFile:rowData.row.idFile})})
          } else{
          return
          }
    } else if (rowData.row.projectLevel === 2) {
       await onUpdateProcessMapStage({process:mapToSave,queryString:serializeQuery({idFile:rowData.row.idFile})})
    } else if (rowData.row.projectLevel === 3) {
       await onUpdateProcessDefectStage({process:mapToSave,queryString:serializeQuery({idFile:rowData.row.idFile})})
    }

    setOpen(false)
  }
  return (
    <div>
      <Box sx={{ display: "flex" }}></Box>
      {rowData.row.inspectionStatus ===0? <Button
      fullWidth
        variant="contained"
        color="primary"
        size="small"
        style={{}}
        onClick={() => {
          setOpen(!open)
        }}
      >اعلام نظر
      </Button> : <Button   variant="contained"  color="info" onClick={()=>{alert(rowData.row.description?rowData.row.description:'نوشته نشده')}}>نمایش </Button>}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <form onSubmit={handleSubmitForm}>
        <DialogTitle>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>
              {rowData.row.projectLevel == 1 ?'مشخص کردن وضعیت در مرحله ممیزی':'مشخص کردن وضعیت در مرحله نقشه'}
              </Box>
              <Box>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
         
          <DialogContent>
          <p className="text-info p-1">پرونده: {rowData.row.fileNumber}_تعداد واحد:{rowData.row.unitNumber}_طبقه:{rowData.row.numberOfFloor === 0?rowData.row.unitNumber>1?'چند واحدی':'همکف':rowData.row.numberOfFloor}-مجری: {rowData.row.executorName}-مالک:{rowData.row.landLordName} </p>
          <h6>توجه فرمایید...</h6>
          <li className="text-info pt-1"> با انتخاب عدم قبول این پرونده مبلغ برای شما لحاظ نمیشود .</li>

          {rowData.row.projectLevel == 1 &&
            <>       
            <li className="text-danger pt-1"> بعد از ذخیره نمی توانید تعداد واحد و نوع لوله گذاری و پارامتر بازرسی را تغییر دهید .</li>
            <li className="text-primary pt-1"> بعد از ذخیره میتوانید نیاز به پکیج/آبگرمکن را دوباره تغییر دهید در قسمت شماره پرونده </li>
            </>
            }
    
            <Box>
              {rowData.row.packageNeed && (rowData.row.projectLevel == 2 || rowData.row.projectLevel == 3)&& +formInput.inspectionStatus !==3 ? (
                <>
                <br />
                <h6>
            پکیج/آبگرمکن لازم دارد:
              {rowData.row.packageSerialNumber?(
                <>
                <p><ArrowBack />
                سریال: {rowData.row.packageSerialNumber}
                 /شرکت: {rowData.row.packageCompanyName}
                 /تابلوساز: {rowData.row.packageInstallerName}
                 /موبایل: {rowData.row.packageInstallerPhoneNumber}
                </p>
                <li className="text-info"> در صورت اشتباه نوشتن شماره سریال توسط تابلوساز میتوانید آنرا اصلاح نمایید.</li>
                <Grid className=" pt-1" item xs={12}>
                    <TextField
                      size="small"
                      fullWidth
                      required
                      multiline={true}
                      row={4}
                      value={formInput.packageSerialNumber}
                      name="packageSerialNumber"
                      label="شماره سریال"
                      type="text"
                      onChange={handleInput}
                    />
                  </Grid>
                </>
              ):<li className="pt-1 text-danger"> ذخیره غیر فعال است چون تابلوساز شماره سریال را وارد نکرده است.</li>}
              </h6>
                </>
              ):'' 
              
              }
            </Box>
            <Box sx={{ ...style }}>
              <Grid container justifyContent="center" alignItems="center">
                {rowData.row.projectLevel == 2 &&
                  <Grid item xs={6}>

                      <TextField
                        margin="dense"
                        size="small"
                        required
                        autoFocus
                        value={rowData.row.electProjectDetail.totalUsage}
                        name="totalElectUse"
                        label="مقدار کل برق  مصرفی"
                        type="number"
                        disabled
                      />

                      <TextField
                        margin="dense"
                        size="small"
                        required={+formInput.inspectionStatus===1 && formInput.defect==="false"}
                        autoFocus
                        value={
                          formInput.totalPipeUse ? formInput.totalPipeUse : +formInput.inspectionStatus!==1?0:''
                        }
                        name="totalPipeUse"
                        label="متراژ کل لوله"
                        type="number"
                        onChange={handleInput}
                        disabled={+formInput.inspectionStatus!==1}
                      />
                
                  </Grid>
                  }
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="radio-inspectionStatus-label">
                      تعیین وضعیت
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="radio-inspectionStatus-label"
                      name="inspectionStatus"
                      value={formInput.inspectionStatus}
                      onChange={handleInput}
                      
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="انجام شد"
                      />
                        {rowData.row.projectLevel == 1 &&
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="انشعاب تعلق نمیگیرد/عدم همکاری مجری/مالک"
                      />
                        }
                      <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label="عدم قبول این پرونده(کنسل)"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                
                {(rowData.row.projectLevel ===2 || rowData.row.projectLevel ===3) && +formInput.inspectionStatus ===1 && <Grid item xs={rowData.row.projectLevel * 6}>
                 
                  <FormControl>
                    <FormLabel id="radio-defect-label">نقص</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="radio-defect-label"
                      name="defect"
                      value={formInput.defect ? formInput.defect : "false"}
                      onChange={handleInput}
                      
                    >
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="ندارد"
                      />

                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="دارد"
                      />
                    </RadioGroup>
                  </FormControl>
                 
                </Grid> } 
                {rowData.row.projectLevel == 1 && +formInput.inspectionStatus ===1 && 
                <>
                <Grid item xs={12}>
                    <FormControl>
                      <FormLabel id="radio-packageNeed-label">
                        نیاز به پکیج/آبگرمکن دیواری فن دار
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="radio-packageNeed-label"
                        name="packageNeed"
                        value={
                          formInput.packageNeed ? formInput.packageNeed : "true"
                        }
                        onChange={handleInput}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="دارد"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="ندارد"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </>
       
                }

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    margin="dense"
                    required
                    autoFocus
                    multiline={true}
                    rows={4}
                    value={formInput.description ? formInput.description : ""}
                    name="description"
                    label="توضیحات"
                    type="text"
                    onChange={handleInput}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions>
            <Box sx={{ display: "flex" }}>
            {mainProps.success && <p className="text-info">اطلاعات با موفقیت ذخیره شد</p>}
          {mainProps.error && <p className="text-danger">{mainProps.error}</p>}
              {mainProps.loading ? (
                <CircularProgress disableShrink />
              ) :(
                (rowData.row.packageNeed && rowData.row.packageSerialNumber) || !rowData.row.packageNeed || +rowData.row.projectLevel ===1 || +formInput.inspectionStatus ===3 || formInput.defect==="true"?
                <Button 
                variant="contained" 
                type="submit"
                >
                   ذخیره
                </Button>:'ذخیره غیر فعال است'
                
              )}
              
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
