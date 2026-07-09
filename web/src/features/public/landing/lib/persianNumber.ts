const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianNumber(num: number | string): string {
  return String(num).replace(/\d/g, d => persianDigits[Number(d)])
}

// Jalali date strings are already "YYYY/MM/DD" — just render Persian digits.
export function formatJalaliDate(date: string): string {
  return toPersianNumber(date ?? '')
}
