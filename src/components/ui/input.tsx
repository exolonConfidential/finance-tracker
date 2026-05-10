import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-white/10 bg-background/30 backdrop-blur-md px-4 py-2 text-sm text-foreground shadow-sm transition-all duration-300",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60",
          // THE NEW FOCUS STATE: Thinner ring (ring-1) + Neon Glow Shadow + Primary Border
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary focus-visible:bg-background/60 focus-visible:shadow-[0_0_15px_rgba(79,70,229,0.25)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }