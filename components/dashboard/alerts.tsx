"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Clock, Package, ClipboardList, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function DashboardAlerts() {
  const router = useRouter()

  const alerts = [
    {
      id: 1,
      title: "Estoque crítico",
      description: "5 itens com estoque abaixo do mínimo",
      icon: Package,
      color: "text-yellow-500",
      action: () => router.push("/dashboard/estoque?tab=baixo-estoque"),
    },
    {
      id: 2,
      title: "Ordens de serviço atrasadas",
      description: "3 ordens de serviço estão atrasadas",
      icon: ClipboardList,
      color: "text-red-500",
      action: () => router.push("/dashboard/ordens-servico"),
    },
    {
      id: 3,
      title: "Agendamentos para hoje",
      description: "8 agendamentos programados para hoje",
      icon: Clock,
      color: "text-blue-500",
      action: () => router.push("/dashboard/agendamentos"),
    },
  ]

  return (
    <Card className="border-l-4 border-l-yellow-500">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-lg font-medium">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <span>Itens que precisam de atenção</span>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex flex-col rounded-lg border p-4 transition-all hover:shadow-md">
              <div className="flex items-center gap-2">
                <alert.icon className={`h-5 w-5 ${alert.color}`} />
                <h3 className="font-medium">{alert.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{alert.description}</p>
              <Button variant="ghost" className="mt-2 justify-start px-0 text-sm font-medium" onClick={alert.action}>
                Ver detalhes
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
