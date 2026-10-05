import type { ReactNode } from "react"
import { DEFAULT_ORDER_ONLINE_URL } from "@/lib/content-defaults"
import { cn } from "@/lib/utils"

const DEFAULT_CLASS =
  "font-display inline-flex min-h-11 items-center justify-center rounded-full border-2 border-coal bg-coal px-6 text-[14px] leading-none tracking-[0.04em] text-cream transition-colors hover:border-orange hover:bg-orange sm:min-h-12 sm:px-7 sm:text-[15px]"

type OrderOnlineButtonProps = {
  className?: string
  children?: ReactNode
}

/** In-page Order Online CTA → Cash App. FAB stays separate in the layout. */
export function OrderOnlineButton({
  className,
  children = "Order Online",
}: OrderOnlineButtonProps) {
  return (
    <a
      href={DEFAULT_ORDER_ONLINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(DEFAULT_CLASS, className)}
    >
      <span className="block translate-y-[0.08em]">{children}</span>
    </a>
  )
}
