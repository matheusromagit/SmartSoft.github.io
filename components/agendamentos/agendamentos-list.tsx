"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, ClipboardList, Calendar, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Agendamento {
  id: number
  data: Date
  hora: string
  cliente: string
  veiculo: string
  servico: string
  status: string
}

interface AgendamentosListProps {
  agendamentos: Agendamento[]
}

export function AgendamentosList({ agendamentos }: AgendamentosListProps) {
  const { toast } = useToast()
  const [items, setItems] = useState(agendamentos)

  const handleStatusChange = (id: number, newStatus: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))

    toast({
      title: "Status atualizado",
      description: `Agendamento atualizado para "${newStatus}"`,
    })
  }

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id))

    toast({
      title: "Agendamento excluído",
      description: "O agendamento foi excluído com sucesso",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmado":
        return <Badge className="bg-green-500">Confirmado</Badge>
      case "Pendente":
        return <Badge variant="outline">Pendente</Badge>
      case "Cancelado":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Nenhum agendamento</h3>
        <p className="mt-2 text-sm text-muted-foreground">Não há agendamentos para esta data.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((agendamento) => (
        <div key={agendamento.id} className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="font-medium">{agendamento.hora}</div>
          </div>
          <div className="flex-1 grid gap-1">
            <div className="font-medium">{agendamento.cliente}</div>
            <div className="text-sm text-muted-foreground">{agendamento.veiculo}</div>
            <div className="text-sm">{agendamento.servico}</div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            {getStatusBadge(agendamento.status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange(agendamento.id, "Confirmado")}>
                  <ClipboardList className="mr-2 h-4 w-4" />
                  <span>Confirmar</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange(agendamento.id, "Cancelado")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Cancelar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(agendamento.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Excluir</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
