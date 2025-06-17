"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

// Context para gerenciar o estado do sidebar
interface SidebarContextProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextProps>({
  isOpen: false,
  setIsOpen: () => {},
  isMobile: false,
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const isMobile = useMobile()

  return <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>{children}</SidebarContext.Provider>
}

// Componente Sidebar principal
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { isOpen, setIsOpen, isMobile } = useSidebar()

  // Versão mobile usa Sheet do Shadcn
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="absolute left-4 top-4 z-40 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-48 p-0">
          <div className="flex h-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  // Versão desktop é um sidebar fixo
  return (
    <div
      className={cn("fixed inset-y-0 left-0 z-50 flex h-screen w-48 flex-col border-r bg-background", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Componentes para as diferentes partes do sidebar
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn("shrink-0 bg-background", className)} {...props} />
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <ScrollArea className={cn("flex-1", className)}>
      <div {...props} />
    </ScrollArea>
  )
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return <div className={cn("shrink-0 bg-background", className)} {...props} />
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <div className={cn("px-2 py-2", className)} {...props} />
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return <div className={cn("my-1", className)} {...props} />
}

export function SidebarSeparator() {
  return <Separator className="my-2" />
}

interface SidebarTriggerProps extends React.ComponentPropsWithoutRef<typeof Button> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { setIsOpen } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("md:hidden", className)}
      onClick={() => setIsOpen((prev) => !prev)}
      {...props}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Menu</span>
    </Button>
  )
}

// Novo componente para itens colapsáveis no sidebar
interface SidebarCollapsibleProps {
  trigger: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarCollapsible({ trigger, children, defaultOpen = false }: SidebarCollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className="my-1">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {React.cloneElement(trigger as React.ReactElement, {
          onClick: (e: React.MouseEvent) => {
            e.preventDefault()
            setIsOpen(!isOpen)
          },
        })}
      </div>
      <div className={cn("overflow-hidden transition-all duration-200 ease-in-out", isOpen ? "max-h-96" : "max-h-0")}>
        {children}
      </div>
    </div>
  )
}
