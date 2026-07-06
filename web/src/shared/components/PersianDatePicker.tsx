import { useEffect, useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import DatePickerRaw from 'react-multi-date-picker'
import DateObjectRaw from 'react-date-object'
import persian from 'react-date-object/calendars/persian'
import gregorian from 'react-date-object/calendars/gregorian'
import persian_fa from 'react-date-object/locales/persian_fa'
import persian_en from 'react-date-object/locales/persian_en'
import gregorian_en from 'react-date-object/locales/gregorian_en'

// Loosely typed — the Persian calendar lib has partial/untyped sub-paths.
/* eslint-disable @typescript-eslint/no-explicit-any */
const DatePicker = DatePickerRaw as any
const DateObject = DateObjectRaw as any
/* eslint-enable @typescript-eslint/no-explicit-any */

export type PersianDateValue = {
  gregorian: string | null
  persian: string | null
  julianDay: unknown
}

type Props = {
  defaultDate?: string
  setPersianDate: (v: PersianDateValue) => void
  setDefault?: boolean
  disable?: boolean
  // Show a clear (✕) icon inside the input to reset the date. Default on;
  // pass `closable={false}` for read-only/auto dates (e.g. the register date).
  closable?: boolean
}

// Ported from old-ui components/Common/PersianDatePickerInline.js (MUI shell
// removed; same DateObject conversion to {gregorian, persian, julianDay}).
export function PersianDatePicker({
  defaultDate,
  setPersianDate,
  setDefault = true,
  disable = false,
  closable = true,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<any>(() =>
    defaultDate ? new Date(defaultDate) : setDefault ? new Date() : null,
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emit = (date: any) => {
    if (!date) {
      setPersianDate({ gregorian: null, persian: null, julianDay: null })
      return
    }
    const object = { date, format: 'YYYY/MM/DD' }
    setPersianDate({
      gregorian: new DateObject(object).convert(gregorian, gregorian_en).format('YYYY-MM-DD'),
      persian: new DateObject(object).convert(persian, persian_en).format(),
      julianDay: new DateObject(object),
    })
  }

  // Emit the initial value on mount (and when defaultDate changes).
  useEffect(() => {
    const initial = defaultDate ? new Date(defaultDate) : setDefault ? new Date() : null
    setValue(initial)
    emit(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDate])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (date: any) => {
    setValue(date)
    emit(date)
  }

  const showClear = closable && !disable && !!value

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <DatePicker
        value={value ?? undefined}
        onChange={onChange}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        disabled={disable}
        editable={false}
        placeholder="تاریخ"
        inputClass="ant-input ant-input-outlined"
        // The picker wraps the input in its own container; force it full-width so
        // the input fills this relative box and the clear icon sits inside it.
        containerStyle={{ width: '100%' }}
        style={{ height: 32, width: '100%', paddingInlineEnd: showClear ? 24 : undefined }}
      />
      {showClear && (
        <CloseCircleFilled
          aria-label="clear date"
          onMouseDown={e => {
            e.preventDefault()
            e.stopPropagation()
            setValue(null)
            emit(null)
          }}
          style={{
            position: 'absolute',
            insetInlineEnd: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(0, 0, 0, 0.25)',
            cursor: 'pointer',
            fontSize: 12,
            zIndex: 2,
          }}
        />
      )}
    </div>
  )
}
