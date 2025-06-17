"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Filter, MoreHorizontal, Eye, Edit, Trash, CreditCard, Printer } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { OrdemServicoModal } from "@/components/ordens-servico/ordem-servico-modal"

// Dados de exemplo
const ordensServico = [
  {
    id: "1",
    numero: "OS-2023-001",
    cliente: "João Silva",
    veiculo: "Fiat Palio - ABC-1234",
    dataEntrada: "2023-05-10",
    dataPrevista: "2023-05-12",
    status: "concluida",
    valor: 350.0,
  },
  {
    id: "2",
    numero: "OS-2023-002",
    cliente: "Maria Oliveira",
    veiculo: "VW Gol - DEF-5678",
    dataEntrada: "2023-05-15",
    dataPrevista: "2023-05-17",
    status: "em_andamento",
    valor: 850.0,
  },
  {
    id: "3",
    numero: "OS-2023-003",
    cliente: "Carlos Santos",
    veiculo: "Honda Civic - GHI-9012",
    dataEntrada: "2023-05-18",
    dataPrevista: "2023-05-20",
    status: "aguardando_aprovacao",
    valor: 1200.0,
  },
  {
    id: "4",
    numero: "OS-2023-004",
    cliente: "Ana Souza",
    veiculo: "Toyota Corolla - JKL-3456",
    dataEntrada: "2023-05-20",
    dataPrevista: "2023-05-22",
    status: "aguardando_pecas",
    valor: 650.0,
  },
]

export default function OrdensServicoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluida":
        return <Badge variant="success">Concluída</Badge>
      case "em_andamento":
        return <Badge variant="default">Em andamento</Badge>
      case "aguardando_aprovacao":
        return <Badge variant="outline">Aguardando aprovação</Badge>
      case "aguardando_pecas":
        return <Badge variant="warning">Aguardando peças</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Ordens de Serviço</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Criar OS
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total</CardTitle>
            <CardDescription>Todas as OS</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">42</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Em andamento</CardTitle>
            <CardDescription>OS em execução</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Aguardando</CardTitle>
            <CardDescription>OS pendentes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Concluídas</CardTitle>
            <CardDescription>OS finalizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">22</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Ordens de Serviço</CardTitle>
              <CardDescription>Gerencie as ordens de serviço da oficina</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar OS..." className="w-full sm:w-[250px] pl-8" />
              </div>
              <Select>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                  <SelectItem value="em_andamento">Em andamento</SelectItem>
                  <SelectItem value="aguardando_aprovacao">Aguardando aprovação</SelectItem>
                  <SelectItem value="aguardando_pecas">Aguardando peças</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Data Entrada</TableHead>
                <TableHead>Previsão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordensServico.map((os) => (
                <TableRow
                  key={os.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => (window.location.href = `/dashboard/ordens-servico/${os.id}`)}
                >
                  <TableCell className="font-medium">{os.numero}</TableCell>
                  <TableCell>{os.cliente}</TableCell>
                  <TableCell>{os.veiculo}</TableCell>
                  <TableCell>{new Date(os.dataEntrada).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{new Date(os.dataPrevista).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{getStatusBadge(os.status)}</TableCell>
                  <TableCell className="text-right">R$ {os.valor.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = `/dashboard/ordens-servico/${os.id}`
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Efetuar Pagamento
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Printer className="mr-2 h-4 w-4" />
                          Gerar PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={(e) => e.stopPropagation()}>
                          <Trash className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <OrdemServicoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
