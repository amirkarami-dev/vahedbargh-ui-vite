// Minimal class-name joiner for the landing zone (clsx-style, no tailwind-merge
// dependency — the ported components toggle whole class sets, not conflicting
// single utilities, so a plain join is sufficient).
type ClassValue = string | number | null | false | undefined | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = []
  const walk = (v: ClassValue) => {
    if (!v) return
    if (Array.isArray(v)) v.forEach(walk)
    else out.push(String(v))
  }
  inputs.forEach(walk)
  return out.join(' ')
}
