"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardRecentProps {
  className?: string
}

export function DashboardRecent({ className }: DashboardRecentProps) {
  const recentOrders = [
    {
      id: "OS-2023-001",
      client: "Carlos Silva",
      vehicle: "Honda Civic 2020",
      status: "Em andamento",
      statusColor: "bg-yellow-500",
    },
    {
      id: "OS-2023-002",
      client: "Maria Oliveira",
      vehicle: "Toyota Corolla 2019",
      status: "Concluído",
      statusColor: "bg-green-500",
    },
    {
      id: "OS-2023-003",
      client: "João Santos",
      vehicle: "Fiat Uno 2018",
      status: "Aguardando peças",
      statusColor: "bg-blue-500",
    },
    {
      id: "OS-2023-004",
      client: "Ana Pereira",
      vehicle: "Volkswagen Gol 2021",
      status: "Concluído",
      statusColor: "bg-green-500",
    },
    {
      id: "OS-2023-005",
      client: "Pedro Souza",
      vehicle: "Chevrolet Onix 2022",
      status: "Em andamento",
      statusColor: "bg-yellow-500",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Ordens Recentes</CardTitle>
        <CardDescription>Últimas ordens de serviço registradas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={order.client} />
                <AvatarFallback>
                  {order.client
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{order.client}</p>
                <p className="text-sm text-muted-foreground">{order.vehicle}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${order.statusColor}`} />
                <span className="text-sm">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
