"use client"

import { useState, useEffect } from "react"
import { DashboardOverview } from "@/components/dashboard/overview"
import { DashboardCards } from "@/components/dashboard/cards"
import { DashboardCharts } from "@/components/dashboard/charts"
import { DashboardRecent } from "@/components/dashboard/recent"
import { DashboardAlerts } from "@/components/dashboard/alerts"
import { NotificationModal } from "@/components/dashboard/notification-modal"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardPage() {
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    // Mostrar a notificação modal após um pequeno delay para garantir que a página carregou
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>
          <ThemeToggle />
        </div>
        <p className="text-muted-foreground">Visão geral da sua oficina mecânica</p>
      </div>

      <DashboardAlerts />
      <DashboardCards />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <DashboardCharts className="lg:col-span-4" />
        <DashboardRecent className="lg:col-span-3" />
      </div>
      <DashboardOverview />

      {/* Modal de notificação centralizado */}
      <NotificationModal open={showNotification} onOpenChange={setShowNotification} />
    </div>
  )
}
