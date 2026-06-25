import React, { useCallback, useEffect, useMemo, useState } from "react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import persian_en from "react-date-object/locales/persian_en"
import gregorian_en from "react-date-object/locales/gregorian_en"
import gregorian from "react-date-object/calendars/gregorian"
import DateObject from "react-date-object"
import "./style.scss"
import { Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

const DEFAULT_FORMAT = "YYYY/MM/DD"
const GREGORIAN_FORMAT = "YYYY-MM-DD"
const getEmptyDate = () => ({
  gregorian: null,
  persian: null,
  julianDay: null,
})

const buildDatePayload = (date, format = DEFAULT_FORMAT) => {
  if (!date) return getEmptyDate()

  const object = { date, format }

  return {
    gregorian: new DateObject(object)
      .convert(gregorian, gregorian_en)
      .format(GREGORIAN_FORMAT),
    persian: new DateObject(object).convert(persian, persian_en).format(),
    julianDay: new DateObject(object),
  }
}

export const PersianDatePicker = ({
  setPersianDate,
  disable = false,
  setDefault = true,
  onClose,
  label,
  portal = true,
  zIndex = 2000,
}) => {
  const [state, setState] = useState(() => {
    const initialDate = setDefault ? new Date() : null

    return {
      date: initialDate,
      format: DEFAULT_FORMAT,
      ...buildDatePayload(initialDate),
    }
  })

  const pickerLabel = label || "تاریخ"

  const emitDate = useCallback(
    payload => {
      if (typeof setPersianDate === "function") {
        setPersianDate(payload)
      }
    },
    [setPersianDate]
  )

  const portalTarget = useMemo(() => (typeof document !== "undefined" ? document.body : undefined), [])

  useEffect(() => {
    if (setDefault) {
      const date = new Date()
      const payload = buildDatePayload(date)

      setState(prev => ({
        ...prev,
        date,
        format: DEFAULT_FORMAT,
        ...payload,
      }))
      emitDate(payload)
    } else {
      const emptyDate = getEmptyDate()

      setState(prev => ({
        ...prev,
        date: null,
        format: DEFAULT_FORMAT,
        ...emptyDate,
      }))
      emitDate(emptyDate)
    }
  }, [setDefault, emitDate])

  const convert = (date, format = DEFAULT_FORMAT) => {
    const payload = buildDatePayload(date, format)

    setState({
      ...payload,
      date,
      format,
    })

    emitDate(payload)
  }

  const clearDate = () => {
    const emptyDate = getEmptyDate()

    setState({
      ...emptyDate,
      date: null,
      format: DEFAULT_FORMAT,
    })
    emitDate(emptyDate)
  }

  return (
    <div className={`persian-date-picker ${disable ? "persian-date-picker--disabled" : ""}`}>
      <span className="persian-date-picker__label">{pickerLabel}</span>

      <div className="persian-date-picker__field">
        <DatePicker
          value={state.date}
          onChange={convert}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          disabled={disable}
          onClose={onClose}
          editable={false}
          placeholder={pickerLabel}
          portal={portal}
          portalTarget={portalTarget}
          zIndex={zIndex}
          inputClass="persian-date-picker__input"
          containerClassName="persian-date-picker__container"
          className="persian-date-picker-calendar"
        >
          <Button
            type="link"
            danger
            size="small"
            disabled={disable}
            icon={<DeleteOutlined />}
            onClick={clearDate}
            className="persian-date-picker__clear-btn"
          >
            پاک کردن
          </Button>
        </DatePicker>
      </div>
    </div>
  )
}
