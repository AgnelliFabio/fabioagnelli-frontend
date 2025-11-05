import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  onClick?: () => void
}

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className,
  onClick 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900',
        {
          'bg-emerald-600 text-white hover:bg-emerald-700': variant === 'default',
          'border border-slate-600 text-slate-300 hover:bg-slate-800': variant === 'outline',
          'text-slate-300 hover:bg-slate-800': variant === 'ghost'
        },
        {
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'default',
          'px-8 py-4 text-lg': size === 'lg'
        },
        className
      )}
    >
      {children}
    </button>
  )
}