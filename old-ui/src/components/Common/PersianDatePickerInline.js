import React, { useEffect, useState } from "react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import persian_en from "react-date-object/locales/persian_en"
import gregorian_en from "react-date-object/locales/gregorian_en"
import gregorian from "react-date-object/calendars/gregorian"
import DateObject from "react-date-object"
import "./style.scss"
import { Box, Button, Grid } from "@mui/material"
import { Delete } from "@mui/icons-material"
export const PersianDatePickerInline = ({
  setPersianDate,
  disable = false,
  setDefault = true,
  defaultDate,
  onClose,
  label,
  onlyYear = false,
  onlyMonth = false,
}) => {
  const [state, setState] = useState({ format: "YYYY/MM/DD" })
  let objectInit = { date: new Date(defaultDate), format: "YYYY/MM/DD" }
  useEffect(() => {
    const initDate = {
      gregorian: new DateObject(objectInit)
        .convert(gregorian, gregorian_en)
        .format("YYYY-MM-DD"),
      persian: new DateObject(objectInit).convert(persian, persian_en).format(),
      julianDay: new DateObject(objectInit),
    }
    if (setDefault || defaultDate) {
      setPersianDate(initDate)
    } else {
      setPersianDate({
        gregorian: null,
        persian: null,
        julianDay: null,
      })
    }
  }, [defaultDate])

  const convert = (date, format = state.format) => {
    let object = { date, format }
    setState({
      gregorian: new DateObject(object)
        .convert(gregorian, gregorian_en)
        .format("YYYY-MM-DD"),
      persian: new DateObject(object).convert(persian, persian_en).format(),
      julianDay: new DateObject(object),
      jsDate: date?.toUTC(),
      ...object,
    })
    setPersianDate({
      gregorian: new DateObject(object)
        .convert(gregorian, gregorian_en)
        .format("YYYY-MM-DD"),
      persian: new DateObject(object).convert(persian, persian_en).format(),
      julianDay: new DateObject(object),
    })
  }
  const clearDate = () => {
    setState({
      gregorian: null,
      persian: null,
      julianDay: null,
      jsDate: null,
      date: null,
      format: null,
    })
    setPersianDate({
      gregorian: null,
      persian: null,
      julianDay: null,
    })
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignContent: "center",
      }}
    >
      <Grid item xs={2} sx={{ pt: 1 }}>
      {label}
      </Grid>
      <Grid item xs={10}>
        <DatePicker
          onlyYearPicker = {onlyYear}
          onlyMonthPicker = {onlyMonth}
          value={state.date || (setDefault && new Date(defaultDate))}
          onChange={convert}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          disabled={disable}
          onClose={onClose}
          editable={false}
          placeholder={label?label:"تاریخ"}
          children ={<Button onClick={clearDate}  endIcon={<Delete />} disabled={disable}>
          پاک کردن
        </Button>}
        />
  
      </Grid>

      {/* <span>{state.persian?.toString?.()}</span> */}
    </Box>
  )
}
