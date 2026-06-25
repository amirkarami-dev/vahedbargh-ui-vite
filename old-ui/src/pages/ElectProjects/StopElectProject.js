import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  CircularProgress,
  TextField,
  Alert,
  Checkbox,
} from "@mui/material"
import { setInvalidateEmpty } from "common/global"

import React, { useState, useReducer } from "react"

export const StopElectProject = ({ rowData, mainProps }) => {
  const style = {
    // border: "2px solid #000",
    p: 2,
  }

  const [isErrorValid, setIsErrorValid] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      stopDes: rowData.stopDes?rowData.stopDes:'',
      isStop: rowData.isStop??false
    }
  )
  const [open, setOpen] = useState(false)
  const handleInput = evt => {
    setHasError(false)
    const name = evt.target.name
    let newValue = evt.target.value
    if(newValue == "on") newValue = evt.target.checked
    setFormInput({ [name]: newValue })
  }

  const handleSubmitForm = async (event, values) => {
    const { onStopElectProject } = mainProps
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.forEach((value, name) => {
      setFormInput({ [name]: value })
    })
    console.log('rowData', rowData.id);
    let mapToSave = {
      ...formInput,
      gpId: rowData.id,
      isStop: formInput.isStop === 'true' || formInput.isStop === true,

    }
    await onStopElectProject(mapToSave)
  }

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Checkbox
          checked={rowData.isStop?? false}
          onChange={() => {
            setOpen(!open)
          }}
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
        />
      

        <Dialog
          open={open}
          onClose={() => {
            setOpen(false)
          }}
        >
          <form onSubmit={handleSubmitForm}>
            <DialogTitle align="center">توقف پرونده</DialogTitle> { rowData.fileNumber}
            <DialogContent>
              <Box sx={{ ...style }}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >


                  <Grid item sx={{ paddingTop: 2 }} xs={12}>
                    <TextField
                      size="small"
                      fullWidth
                      required
                      multiline={true}
                      row={6}
                      value={formInput.stopDes}
                      name="stopDes"
                      label="توضیحات توقف پرونده"
                      type="text"
                      onChange={handleInput}
                      onInvalid={setInvalidateEmpty}
                      onInput={setInvalidateEmpty}
                    />
                  </Grid>
                  <Grid item sx={{ paddingTop: 2 }} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formInput.isStop ?? false}
                          onChange={handleInput}
                          name="isStop"
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="توقف پرونده"
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>

              <DialogActions>
                <Box sx={{ display: "flex" }}>
                  {mainProps.loading ? (
                    <CircularProgress disableShrink />
                  ) : (
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isErrorValid}
                    >
                      ذخیره
                    </Button>
                  )}
                </Box>
              </DialogActions>
          
          </form>
        </Dialog>
      </Box>
    </div>
  )
}
