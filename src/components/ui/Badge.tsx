import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        {
          'bg-emerald-600 text-white': variant === 'default',
          'bg-slate-700 text-slate-300': variant === 'secondary',
          'border border-slate-600 text-slate-300 bg-transparent': variant === 'outline'
        },
        className
      )}
    >
      {children}
    </span>
  )
}