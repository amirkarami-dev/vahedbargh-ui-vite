import type { ReactNode } from 'react'
import { cn } from '@/features/public/landing/lib/cn'

type BadgeVariant = 'urgent' | 'important' | 'info' | 'success' | 'default'

const variantClasses: Record<BadgeVariant, string> = {
  urgent: 'bg-red-600/15 text-red-500 border-red-600/30',
  important: 'bg-amber-600/15 text-amber-500 border-amber-600/30',
  info: 'bg-blue-600/15 text-blue-500 border-blue-600/30',
  success: 'bg-emerald-600/15 text-emerald-500 border-emerald-600/30',
  default: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
}

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
