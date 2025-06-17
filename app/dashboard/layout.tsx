"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { NotificationModal } from "@/components/dashboard/notification-modal"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    // Simular uma notificação após 2 segundos
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto pl-0 md:pl-48">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 md:px-6">
            <div className="md:hidden">{/* Espaço para o botão de menu em dispositivos móveis */}</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setShowNotification(true)}>
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notificações</span>
              </Button>
              <ThemeToggle />
            </div>
          </header>
          <main className="p-4 md:p-6">{children}</main>
        </div>
        <NotificationModal open={showNotification} onOpenChange={setShowNotification} />
      </div>
    </SidebarProvider>
  )
}
