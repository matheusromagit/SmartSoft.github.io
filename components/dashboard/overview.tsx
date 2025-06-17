"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Car, PenToolIcon as Tool } from "lucide-react"

export function DashboardOverview() {
  const todayAppointments = [
    {
      id: 1,
      time: "08:30",
      client: "Roberto Almeida",
      vehicle: "Hyundai HB20 2021",
      service: "Troca de óleo e filtros",
    },
    {
      id: 2,
      time: "10:00",
      client: "Fernanda Costa",
      vehicle: "Jeep Renegade 2020",
      service: "Revisão completa",
    },
    {
      id: 3,
      time: "11:30",
      client: "Marcelo Ribeiro",
      vehicle: "Ford Ka 2019",
      service: "Alinhamento e balanceamento",
    },
    {
      id: 4,
      time: "14:00",
      client: "Juliana Mendes",
      vehicle: "Nissan Kicks 2022",
      service: "Diagnóstico eletrônico",
    },
  ]

  const inProgressServices = [
    {
      id: "OS-2023-001",
      client: "Carlos Silva",
      vehicle: "Honda Civic 2020",
      service: "Troca de embreagem",
      mechanic: "André Souza",
      progress: 75,
    },
    {
      id: "OS-2023-003",
      client: "João Santos",
      vehicle: "Fiat Uno 2018",
      service: "Reparo no sistema de freios",
      mechanic: "Ricardo Oliveira",
      progress: 40,
    },
    {
      id: "OS-2023-005",
      client: "Pedro Souza",
      vehicle: "Chevrolet Onix 2022",
      service: "Troca de correia dentada",
      mechanic: "Marcos Lima",
      progress: 60,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral</CardTitle>
        <CardDescription>Acompanhe os agendamentos e serviços em andamento</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="agendamentos">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="agendamentos">Agendamentos de Hoje</TabsTrigger>
            <TabsTrigger value="em-andamento">Serviços em Andamento</TabsTrigger>
          </TabsList>
          <TabsContent value="agendamentos" className="space-y-4 pt-4">
            <div className="grid gap-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-2 rounded-lg border p-4 md:flex-row md:items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-medium">{appointment.time}</div>
                  </div>
                  <div className="flex-1 grid gap-1">
                    <div className="font-medium">{appointment.client}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Car className="mr-1 h-4 w-4" />
                      {appointment.vehicle}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Tool className="mr-1 h-4 w-4" />
                      {appointment.service}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <Button size="sm">Iniciar Serviço</Button>
                    <Button variant="outline" size="sm">
                      Reagendar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="em-andamento" className="space-y-4 pt-4">
            <div className="grid gap-4">
              {inProgressServices.map((service) => (
                <div key={service.id} className="flex flex-col gap-2 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{service.id}</div>
                    <Badge variant="outline">{service.progress}% Concluído</Badge>
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">{service.client}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Car className="mr-1 h-4 w-4" />
                      {service.vehicle}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Tool className="mr-1 h-4 w-4" />
                      {service.service}
                    </div>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${service.progress}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={service.mechanic} />
                        <AvatarFallback>
                          {service.mechanic
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{service.mechanic}</span>
                    </div>
                    <Button size="sm">Atualizar</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
