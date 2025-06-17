"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, User, LogOut, Settings, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const { isMobile } = useSidebar()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    // Em produção, isso seria uma chamada real para logout
    router.push("/")
  }

  return (
    <header
      className={`sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
        {isMobile && <SidebarTrigger />}
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="hidden md:inline-flex">AutoGest</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-end md:justify-between">
        {!searchOpen ? (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className={`text-sm font-medium ${
                pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/clientes"
              className={`text-sm font-medium ${
                pathname.startsWith("/dashboard/clientes")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Clientes
            </Link>
            <Link
              href="/dashboard/veiculos"
              className={`text-sm font-medium ${
                pathname.startsWith("/dashboard/veiculos")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Veículos
            </Link>
            <Link
              href="/dashboard/agendamentos"
              className={`text-sm font-medium ${
                pathname.startsWith("/dashboard/agendamentos")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Agendamentos
            </Link>
            <Link
              href="/dashboard/ordens-servico"
              className={`text-sm font-medium ${
                pathname.startsWith("/dashboard/ordens-servico")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Ordens de Serviço
            </Link>
          </nav>
        ) : (
          <div className="hidden md:flex flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Buscar clientes, veículos, ordens de serviço..."
              className="w-full"
              autoFocus
              onBlur={() => setSearchOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          {!searchOpen && (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
          )}

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  3
                </Badge>
                <span className="sr-only">Notificações</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer py-3">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Nova ordem de serviço</p>
                      <p className="text-sm text-muted-foreground">Cliente agendou um serviço para hoje às 14:00</p>
                      <p className="text-xs text-muted-foreground">Há 30 minutos</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Perfil</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">João da Silva</p>
                  <p className="text-xs text-muted-foreground">admin@autogest.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Ajuda</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
