"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { AgendamentoModal } from "@/components/agendamentos/agendamento-modal"
import { AgendamentosList } from "@/components/agendamentos/agendamentos-list"
import { Plus, ChevronLeft } from "lucide-react"
import { format, addDays, isSameDay } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function AgendamentosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [view, setView] = useState<"calendar" | "day">("calendar")

  // Dados de exemplo para agendamentos
  const agendamentos = [
    {
      id: 1,
      data: new Date(),
      hora: "08:30",
      cliente: "Carlos Silva",
      veiculo: "Honda Civic (ABC-1234)",
      servico: "Troca de óleo e filtros",
      status: "Confirmado",
    },
    {
      id: 2,
      data: new Date(),
      hora: "10:00",
      cliente: "Maria Oliveira",
      veiculo: "Toyota Corolla (DEF-5678)",
      servico: "Revisão completa",
      status: "Confirmado",
    },
    {
      id: 3,
      data: addDays(new Date(), 1),
      hora: "09:00",
      cliente: "João Santos",
      veiculo: "Fiat Uno (GHI-9012)",
      servico: "Alinhamento e balanceamento",
      status: "Pendente",
    },
    {
      id: 4,
      data: addDays(new Date(), 2),
      hora: "14:00",
      cliente: "Ana Pereira",
      veiculo: "Volkswagen Gol (JKL-3456)",
      servico: "Diagnóstico eletrônico",
      status: "Confirmado",
    },
    {
      id: 5,
      data: addDays(new Date(), 2),
      hora: "16:30",
      cliente: "Pedro Souza",
      veiculo: "Chevrolet Onix (MNO-7890)",
      servico: "Troca de pastilhas de freio",
      status: "Pendente",
    },
  ]

  // Filtra agendamentos para a data selecionada
  const filteredAgendamentos = agendamentos.filter((agendamento) => isSameDay(agendamento.data, selectedDate))

  // Função para verificar se uma data tem agendamentos
  const hasAgendamentos = (date: Date) => {
    return agendamentos.some((agendamento) => isSameDay(agendamento.data, date))
  }

  // Função para renderizar o conteúdo com base na visualização
  const renderContent = () => {
    if (view === "calendar") {
      return (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
              <CardDescription>Selecione uma data para ver os agendamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date)
                    setView("day")
                  }
                }}
                className="rounded-md border"
                locale={ptBR}
                modifiers={{
                  hasAgendamentos: (date) => hasAgendamentos(date),
                }}
                modifiersClassNames={{
                  hasAgendamentos: "bg-primary/20 font-bold",
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Próximos Agendamentos</CardTitle>
              <CardDescription>Agendamentos para os próximos dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agendamentos.slice(0, 5).map((agendamento) => (
                  <div key={agendamento.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-1">
                      <p className="font-medium">{agendamento.cliente}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(agendamento.data, "dd/MM/yyyy")} às {agendamento.hora}
                      </p>
                      <p className="text-sm">{agendamento.servico}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedDate(agendamento.data)
                        setView("day")
                      }}
                    >
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    } else {
      return (
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle className="text-xl">
                Agendamentos para {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </CardTitle>
              <CardDescription>{filteredAgendamentos.length} agendamentos para esta data</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setView("calendar")}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar ao Calendário
            </Button>
          </CardHeader>
          <CardContent>
            <AgendamentosList agendamentos={filteredAgendamentos} />
          </CardContent>
        </Card>
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>
          <p className="text-muted-foreground">Gerencie os agendamentos da sua oficina</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      {renderContent()}

      <AgendamentoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedDate={selectedDate} />
    </div>
  )
}
