"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Dados de exemplo
const movimentacoes = [
  {
    id: "1",
    data: "2023-05-15",
    tipo: "entrada",
    peca: "Filtro de Óleo",
    quantidade: 10,
    motivo: "Compra",
    responsavel: "Carlos Silva",
    documento: "CP001",
  },
  {
    id: "2",
    data: "2023-05-16",
    tipo: "saida",
    peca: "Filtro de Óleo",
    quantidade: 2,
    motivo: "Venda",
    responsavel: "Ana Souza",
    documento: "OS123",
  },
  {
    id: "3",
    data: "2023-05-18",
    tipo: "entrada",
    peca: "Pastilha de Freio",
    quantidade: 8,
    motivo: "Compra",
    responsavel: "Carlos Silva",
    documento: "CP002",
  },
  {
    id: "4",
    data: "2023-05-20",
    tipo: "saida",
    peca: "Óleo Motor 5W30",
    quantidade: 5,
    motivo: "Venda",
    responsavel: "Ana Souza",
    documento: "OS124",
  },
  {
    id: "5",
    data: "2023-05-22",
    tipo: "saida",
    peca: "Pastilha de Freio",
    quantidade: 2,
    motivo: "Venda",
    responsavel: "Ana Souza",
    documento: "OS125",
  },
]

export default function MovimentacaoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"entrada" | "saida">("entrada")

  const openModal = (type: "entrada" | "saida") => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "entrada":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <ArrowDownLeft className="mr-1 h-3 w-3" />
            Entrada
          </Badge>
        )
      case "saida":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            Saída
          </Badge>
        )
      default:
        return <Badge variant="outline">{tipo}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Movimentação de Estoque</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => openModal("entrada")}>
            <ArrowDownLeft className="mr-2 h-4 w-4" />
            Registrar Entrada
          </Button>
          <Button variant="outline" onClick={() => openModal("saida")}>
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Registrar Saída
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total de Entradas</CardTitle>
            <CardDescription>Quantidade de entradas no mês</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">28</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total de Saídas</CardTitle>
            <CardDescription>Quantidade de saídas no mês</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">42</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Balanço</CardTitle>
            <CardDescription>Diferença entre entradas e saídas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">-14</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Histórico de Movimentações</CardTitle>
              <CardDescription>Registro de entradas e saídas de peças</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar peça..." className="w-full sm:w-[250px] pl-8" />
              </div>
              <Select>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saida">Saída</SelectItem>
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
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Peça</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movimentacoes.map((mov) => (
                <TableRow key={mov.id}>
                  <TableCell>{new Date(mov.data).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>{getTipoBadge(mov.tipo)}</TableCell>
                  <TableCell className="font-medium">{mov.peca}</TableCell>
                  <TableCell className="text-center">{mov.quantidade}</TableCell>
                  <TableCell>{mov.motivo}</TableCell>
                  <TableCell>{mov.responsavel}</TableCell>
                  <TableCell>{mov.documento}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
