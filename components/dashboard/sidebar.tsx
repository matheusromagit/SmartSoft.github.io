"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarCollapsible,
} from "@/components/ui/sidebar"
import {
  Users,
  Car,
  Calendar,
  ClipboardList,
  Package,
  CreditCard,
  BarChart2,
  Settings,
  HelpCircle,
  Wrench,
  User,
  MessageSquare,
  ChevronDown,
  ShoppingCart,
  ArrowRightLeft,
  PlusCircle,
  Receipt,
  Calculator,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    if (path !== "/dashboard" && pathname.startsWith(path)) {
      return true
    }
    return false
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex h-14 items-center justify-between border-b px-3 py-2">
        <Link href="/dashboard" className="flex items-center gap-1 font-semibold">
          <Wrench className="h-5 w-5 text-primary" />
          <span className="text-lg">AutoGest</span>
        </Link>
        <ThemeToggle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start px-2",
                isActive("/dashboard") && pathname === "/dashboard" && "bg-accent text-accent-foreground",
              )}
            >
              <BarChart2 className="mr-1.5 h-4 w-4" />
              <span>Visão Geral</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/clientes"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start px-2",
                isActive("/dashboard/clientes") && "bg-accent text-accent-foreground",
              )}
            >
              <Users className="mr-1.5 h-4 w-4" />
              <span>Clientes</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/veiculos"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start px-2",
                isActive("/dashboard/veiculos") && "bg-accent text-accent-foreground",
              )}
            >
              <Car className="mr-1.5 h-4 w-4" />
              <span>Veículos</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/agendamentos"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start px-2",
                isActive("/dashboard/agendamentos") && "bg-accent text-accent-foreground",
              )}
            >
              <Calendar className="mr-1.5 h-4 w-4" />
              <span>Agendamentos</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/ordens-servico"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start px-2",
                isActive("/dashboard/ordens-servico") && "bg-accent text-accent-foreground",
              )}
            >
              <ClipboardList className="mr-1.5 h-4 w-4" />
              <span>Ordens</span>
            </Link>
          </SidebarMenuItem>

          {/* Estoque com submenu */}
          <SidebarCollapsible
            trigger={
              <button
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "w-full justify-between px-2",
                  (isActive("/dashboard/estoque") ||
                    isActive("/dashboard/estoque/compras") ||
                    isActive("/dashboard/estoque/movimentacao") ||
                    isActive("/dashboard/estoque/cadastro")) &&
                    "bg-accent text-accent-foreground",
                )}
              >
                <div className="flex items-center">
                  <Package className="mr-1.5 h-4 w-4" />
                  <span>Estoque</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
            }
            defaultOpen={
              isActive("/dashboard/estoque") ||
              isActive("/dashboard/estoque/compras") ||
              isActive("/dashboard/estoque/movimentacao") ||
              isActive("/dashboard/estoque/cadastro")
            }
          >
            <div className="pl-4 pt-1">
              <SidebarMenuItem>
                <Link
                  href="/dashboard/estoque"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-full justify-start px-2",
                    isActive("/dashboard/estoque") &&
                      pathname === "/dashboard/estoque" &&
                      "bg-accent text-accent-foreground",
                  )}
                >
                  <Package className="mr-1.5 h-4 w-4" />
                  <span>Visão Geral</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/dashboard/estoque/cadastro"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-full justify-start px-2",
                    isActive("/dashboard/estoque/cadastro") && "bg-accent text-accent-foreground",
                  )}
                >
                  <PlusCircle className="mr-1.5 h-4 w-4" />
                  <span>Cadastro de Peças</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/dashboard/estoque/compras"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-full justify-start px-2",
                    isActive("/dashboard/estoque/compras") && "bg-accent text-accent-foreground",
                  )}
                >
                  <ShoppingCart className="mr-1.5 h-4 w-4" />
                  <span>Compras</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/dashboard/estoque/movimentacao"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-full justify-start px-2",
                    isActive("/dashboard/estoque/movimentacao") && "bg-accent text-accent-foreground",
                  )}
                >
                  <ArrowRightLeft className="mr-1.5 h-4 w-4" />
                  <span>Entrada/Saída</span>
                </Link>
              </SidebarMenuItem>
            </div>
          </SidebarCollapsible>

          {/* Financeiro com submenu */}
          <SidebarCollapsible
            trigger={
              <button
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "w-full justify-between px-2",
                  (isActive("/dashboard/financeiro") ||
                    isActive("/dashboard/financeiro/contas") ||
                    isActive("/dashboard/financeiro/tributacao")) &&
                    "bg-accent text-accent-foreground",
                )}
              >
                <div className="flex items-center">
                  <CreditCard className="mr-1.5 h-4 w-4" />
                  <span>Financeiro</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
            }
            defaultOpen={
              isActive("/dashboard/financeiro") ||
              isActive("/dashboard/financeiro/contas") ||
              isActive("/dashboard/financeiro/tributacao")
            }
          >
            <div className="pl-4 pt-1">
              <SidebarMenuItem>
                <Link
                  href="/dashboard/financeiro"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-full justify-start px-2",
                    isActive("/dashboard/financeiro") &&
                      pathname === "/dashboard/financeiro" &&
                      "bg-accent text-accent-foreground",
                  )}
                >
                  <CreditCard className="mr-1.5 h-4 w-4" />
                  <span>Visão Geral</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/dashboard/financeiro/contas"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-full justify-start px-2",
                    isActive("/dashboard/financeiro/contas") && "bg-accent text-accent-foreground",
                  )}
                >
                  <Receipt className="mr-1.5 h-4 w-4" />
                  <span>Contas a Pagar/Receber</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/dashboard/financeiro/tributacao"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-full justify-start px-2",
                    isActive("/dashboard/financeiro/tributacao") && "bg-accent text-accent-foreground",
                  )}
                >
                  <Calculator className="mr-1.5 h-4 w-4" />
                  <span>Tributação</span>
                </Link>
              </SidebarMenuItem>
            </div>
          </SidebarCollapsible>

          <SidebarMenuItem>
            <Link
              href="/dashboard/relatorios"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start px-2",
                isActive("/dashboard/relatorios") && "bg-accent text-accent-foreground",
              )}
            >
              <BarChart2 className="mr-1.5 h-4 w-4" />
              <span>Relatórios</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/whatsapp"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start px-2",
                isActive("/dashboard/whatsapp") && "bg-accent text-accent-foreground",
              )}
            >
              <MessageSquare className="mr-1.5 h-4 w-4" />
              <span>WhatsApp</span>
              <Badge variant="destructive" className="ml-auto">
                4
              </Badge>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="/dashboard/ajuda"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start px-2",
                isActive("/dashboard/ajuda") && "bg-accent text-accent-foreground",
              )}
            >
              <HelpCircle className="mr-1.5 h-4 w-4" />
              <span>Ajuda</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/configuracoes"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start px-2",
                isActive("/dashboard/configuracoes") && "bg-accent text-accent-foreground",
              )}
            >
              <Settings className="mr-1.5 h-4 w-4" />
              <span>Configurações</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/perfil"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start px-2",
                isActive("/dashboard/perfil") && "bg-accent text-accent-foreground",
              )}
            >
              <User className="mr-1.5 h-4 w-4" />
              <span>Meu Perfil</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
